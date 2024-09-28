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
  Modal,
} from "react-native";
import { logout } from "./(tabs)/profile";
import { images } from "../constants";
import useAppwrite from "../lib/useAppwrite";
import {
  getAllPosts,
  getLatestPosts,
  signOut,
  getAllProjects,
} from "../lib/appwrite";
import { EmptyState, SearchInput, Trending } from "../components";
import ProjectCard from "../components/ProjectCard";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";
import CreateProject from "../components/CreateProject"; // Import the CreateProject component

import { icons } from "../constants";

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllProjects);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

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

  // Function to handle the project creation
  const handleCreateProject = (projectData) => {
    console.log("Project Created:", projectData);
    // Here, you can call your function to save the project data
    // Close the modal after submission
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ProjectCard
            title={item.Project_Name}
            description={item.Description} // Assuming you have a description field
            creator={user.username}
            avatar={user.avatar}
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
              {/* Add the Create Project button here */}
              <Button
                title="Create Project"
                onPress={() => setModalVisible(true)}
                className="bg-blue-500 text-white rounded px-4 py-2"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Projects Found"
            subtitle="No projects created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Button
        title="home"
        onPress={() => {
          router.push("/home");
        }}
      />

      {/* Modal for creating a project */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CreateProject onSubmit={handleCreateProject} />
        <Button title="Close" onPress={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
