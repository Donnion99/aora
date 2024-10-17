import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
} from "react-native";
import dayjs from "dayjs";
import { router } from "expo-router";
import ImageViewer from "react-native-image-zoom-viewer";

const { width, height } = Dimensions.get("window");

const ProjectCard = ({
  Project_Type,
  clientName,
  startDate,
  Budget,
  creator,
  avatar,
  imageUrl, // Ensure you pass imageUrl as a prop
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formattedDate = dayjs(startDate).format("DD/MM/YYYY");

  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          router.push("/home");
        }}
      >
        {/* Gradient Overlay */}
        <View style={styles.overlay} />

        {/* Content Row */}
        <View style={styles.contentRow}>
          {/* Left Content */}
          <View style={styles.leftContent}>
            {/* Project clientName
             */}
            <Text style={styles.clientName}>Client: {clientName}</Text>

            {/* Client Name */}

            {/* Project Description */}
            <Text style={styles.Budget}>{Budget}</Text>

            {/* Start Date */}
            <Text style={styles.dateText}>Start Date: {formattedDate}</Text>

            <View style={styles.row}>
              <Text style={styles.Project_Type}>{Project_Type}</Text>
            </View>

            {/* Creator Info */}
            {/* <View style={styles.creatorContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <Text style={styles.creatorName}>{creator}</Text>
            </View> */}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Image on Right */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.imageContainer}
          >
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Modal for displaying image */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
              <ImageViewer
                imageUrls={[{ url: imageUrl }]}
                enableSwipeDown
                onSwipeDown={() => setModalVisible(false)}
                renderIndicator={() => null} // Hides the image index
                renderHeader={() => null} // Hides the header
                saveToLocalByLongPress={false}
                enablePreload={true}
                enableImageZoom={true}
              />
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#161622",
    borderColor: "#FF9C01",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 6,
    padding: 0, // Adjusted to remove inner padding; handled in contentRow
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
  },
  contentRow: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
    paddingRight: 10, // Space between text and divider
  },
  divider: {
    width: 2,
    backgroundColor: "#FF9C01",
    height: "100%",
    marginHorizontal: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  clientName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  Project_Type: {
    fontSize: 15,
    color: "#fff",
  },
  dateText: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  Budget: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
    lineHeight: 22,
  },
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderColor: "#fff",
    borderWidth: 2,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
  },
  closeButtonContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    zIndex: 1,
  },
  closeButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 30,
    lineHeight: 30,
  },
  safeArea: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ProjectCard;
