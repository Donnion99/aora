import { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
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
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c0c0c" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ProjectCard
            title={item.Project_Name}
            description={item.Description}
            creator={user?.username}
            avatar={user?.avatar}
            startDate={item.Start_Date}
            clientName={item.Client_Name}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View style={styles.logoutButton}>
                <TouchableOpacity onPress={logout}>
                  <Image
                    source={icons.logout}
                    resizeMode="contain"
                    style={styles.logoutIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <SearchInput placeholder={"Search your Project"} />
            <View style={styles.projectsContainer}>
              <Text className="text-lg font-pregular text-gray-100 my-3">
                My Projects
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Projects Found"
            subtitle="No projects created yet"
            btntitle={"Create Project"}
            handlebtn={() => setModalVisible(true)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Circular Button at bottom-right */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for creating a project */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <CreateProject onSubmit={handleCreateProject} />
        {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

// Styles for full screen layout and circular button
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    marginVertical: 16,
    paddingHorizontal: 16,
    spaceY: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 12,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FF9C01", // Using the accent color for consistency
    borderRadius: 30, // Makes the button circular
    width: 60, // Size of the button
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Maintain shadow color
    shadowOffset: { width: 0, height: 5 }, // Adjusted for a deeper shadow
    shadowOpacity: 0.5, // Increased for a stronger effect
    shadowRadius: 6, // Softer shadow
    elevation: 10, // Higher elevation for a pronounced effect
  },
  floatingButtonText: {
    color: "#161622", // Text color for contrast
    fontWeight: "",
    fontSize: 24, // Larger text for visibility
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;
