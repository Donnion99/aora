import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { logout } from "./(tabs)/profile";
import { images } from "../constants";
import useAppwrite from "../lib/useAppwrite";
import { getAllPosts, getLatestPosts, signOut } from "../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../components";

import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";

import { icons } from "../constants";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <TouchableOpacity
                  onPress={logout}
                  className="flex w-full items-end mb-10"
                >
                  <Image
                    source={icons.logout}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <SearchInput placeholder={"Search your Project"} />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                My Projects
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Button
        title="profile"
        onPress={() => {
          router.push("/profile");
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
