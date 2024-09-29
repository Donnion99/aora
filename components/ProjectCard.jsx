import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { router } from "expo-router";

const ProjectCard = ({
  title,
  clientName,
  startDate,
  description,
  creator,
  avatar,
}) => {
  const formattedDate = dayjs(startDate).format("DD/MM/YYYY");
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        router.push("/home");
      }}
    >
      {/* Gradient Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Project Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Client Name */}
        <View style={styles.row}>
          <Text style={styles.clientText}>Client: {clientName}</Text>
        </View>

        {/* Project Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Start Date */}
        <Text style={styles.dateText}>Start Date: {formattedDate}</Text>

        {/* Creator Info */}
        <View style={styles.creatorContainer}></View>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#161622", // Dark background for contrast
    borderColor: "#FF9C01", // Accent color for border
    borderWidth: 2, // Thicker border for better visibility
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 6,
    padding: 20,
    shadowColor: "#000", // Improved shadow color for depth
    shadowOpacity: 0.5, // Increased opacity for a stronger shadow
    shadowOffset: { width: 0, height: 5 }, // Position of the shadow
    shadowRadius: 10, // Increased radius for a softer shadow
    elevation: 10, // Higher elevation for better shadow effect
    position: "relative", // For background image layering
    overflow: "hidden",
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    opacity: 0.25, // Subtle background image
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)", // Dark overlay for text readability
    borderRadius: 20,
  },
  contentContainer: {
    position: "relative",
    zIndex: 1, // Ensure content is above background and overlay
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", // White for contrast
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  clientText: {
    fontSize: 15,
    color: "#fff", // Light text for subtle contrast
  },
  dateText: {
    fontSize: 14,
    color: "#fff", // Lighter text for non-primary info
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
    lineHeight: 22, // Improve readability
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
});

export default ProjectCard;
