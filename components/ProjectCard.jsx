// components/ProjectCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ProjectCard = ({ title, description, creator, avatar }) => {
  return (
    <TouchableOpacity className="bg-white rounded-lg p-4 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Background Image (optional) */}
      <Image
        source={{ uri: "https://example.com/background.jpg" }} // Replace with your background image URL
        className="absolute inset-0 rounded-lg opacity-30"
        resizeMode="cover"
      />
      <View className="relative z-10">
        <Text className="font-bold text-lg text-gray-800">{title}</Text>
        <Text className="text-gray-600 mt-1">{description}</Text>
        <View className="flex flex-row items-center mt-2">
          <Image
            source={{ uri: avatar }}
            className="w-8 h-8 rounded-full border-2 border-white shadow"
          />
          <Text className="ml-2 text-gray-700 font-medium">{creator}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectCard;
