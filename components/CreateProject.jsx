import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as DocumentPicker from "expo-document-picker";
import { createProject } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const CreateProject = ({ onSubmit, onClose }) => {
  const { user } = useGlobalContext();

  const [clientName, setClientName] = useState("");
  const [budget, setBudget] = useState("");
  const [projectType, setProjectType] = useState("Labour");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("ongoing");
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const projectData = {
    clientName,
    budget,
    projectType,
    startDate,
    endDate: isEndDateEnabled ? endDate : null,
    status,
    image: imageUri,
    userId: user.$id,
  };

  const handleSubmit = async () => {
    if (!clientName.trim()) {
      Alert.alert("Validation Error", "Client Name is required.");
      return;
    }
    if (!budget.trim()) {
      Alert.alert("Validation Error", "Valid Budget is required.");
      return;
    }
    if (isEndDateEnabled && endDate && endDate < startDate) {
      Alert.alert("Validation Error", "End Date cannot be before Start Date.");
      return;
    }

    try {
      const newProject = await createProject(projectData);
      console.log("Project Created Successfully:", newProject);
      onClose(); // Close the modal after submission
    } catch (error) {
      Alert.alert("Submission Error", error.message);
    }
  };

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/*"] : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setImageUri(result.assets[0]);
      }
    } else {
      Alert.alert("Document picked", "No document was selected.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create New Project</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Close Form"
              accessibilityRole="button"
            >
              <Icon name="close" size={24} color="#FF9C01" />
            </TouchableOpacity>
          </View>

          <TextInput
            value={clientName}
            onChangeText={setClientName}
            placeholder="Enter Client Name"
            style={styles.input}
            placeholderTextColor="#AAAAAA"
          />

          <TextInput
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter Budget [ex. 40 Lacks]"
            style={styles.input}
            placeholderTextColor="#AAAAAA"
          />

          <TouchableOpacity
            onPress={() => openPicker("image")}
            style={styles.imageContainer}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri.uri }}
                resizeMode="cover"
                style={styles.imagePreview}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="cloud-upload-outline" size={30} color="#FF9C01" />
                <Text style={styles.imagePlaceholderText}>Choose an image</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Project Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={projectType}
              onValueChange={setProjectType}
              style={styles.picker}
              dropdownIconColor="#FF9C01"
            >
              <Picker.Item label="Labour" value="Labour" />
              <Picker.Item label="With-Material" value="With-Material" />
              <Picker.Item label="Consultancy" value="Consultancy" />
              <Picker.Item
                label="Consultancy+Labour"
                value="Consultancy+Labour"
              />
            </Picker>
          </View>

          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setStartDatePickerVisibility(true)}
          >
            <Text style={styles.dateButtonText}>
              {startDate ? startDate.toDateString() : "Pick Start Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setStartDate(date);
              setStartDatePickerVisibility(false);
            }}
            onCancel={() => setStartDatePickerVisibility(false)}
            date={startDate}
          />

          <View style={styles.optionalContainer}>
            <Text style={styles.label}>End Date (Optional)</Text>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsEndDateEnabled(!isEndDateEnabled)}
            >
              <Text style={styles.toggleButtonText}>
                {isEndDateEnabled ? "Disable" : "Enable"}
              </Text>
            </TouchableOpacity>
          </View>

          {isEndDateEnabled && (
            <>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setEndDatePickerVisibility(true)}
              >
                <Text style={styles.dateButtonText}>
                  {endDate ? endDate.toDateString() : "Pick End Date"}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setEndDate(date);
                  setEndDatePickerVisibility(false);
                }}
                onCancel={() => setEndDatePickerVisibility(false)}
                date={endDate || new Date()}
              />
            </>
          )}

          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={setStatus}
              style={styles.picker}
              dropdownIconColor="#FF9C01"
            >
              <Picker.Item label="Ongoing" value="ongoing" />
              <Picker.Item label="Completed" value="completed" />
              <Picker.Item label="Pending" value="pending" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#161622",
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9C01",
  },
  closeButton: {
    padding: 5,
  },
  input: {
    height: 50,
    borderColor: "#FF9C01",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#FFFFFF",
    marginBottom: 15,
    backgroundColor: "#222222", // Dark background for inputs
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF9C01",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2A35",
  },
  imagePlaceholderText: {
    color: "#FF9C01",
  },
  label: {
    fontSize: 16,
    color: "#FF9C01",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#FF9C01",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: "#FFFFFF",
  },
  dateButton: {
    height: 50,
    borderColor: "#FF9C01",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  dateButtonText: {
    color: "#FFFFFF",
  },
  optionalContainer: {
    marginBottom: 15,
  },
  toggleButton: {
    padding: 10,
    backgroundColor: "#FF9C01",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  toggleButtonText: {
    color: "#161622",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FF9C01",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#161622",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateProject;
