import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";

const CreateProject = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("ongoing"); // Default status
  const [clientName, setClientName] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSubmit = () => {
    const projectData = {
      projectName,
      description,
      startDate,
      endDate,
      budget: parseFloat(budget),
      status,
      clientName,
    };
    onSubmit(projectData); // Call the onSubmit function from props with project data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Project</Text>
      <TextInput
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Enter Project Name"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter Description"
        style={[styles.input, styles.descriptionInput]}
        multiline
      />
      <TextInput
        value={clientName}
        onChangeText={setClientName}
        placeholder="Enter Client Name"
        style={styles.input}
      />
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>Pick Start Date</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DatePicker
          date={startDate}
          onDateChange={setStartDate}
          mode="date"
          maximumDate={new Date()} // Optional: Set maximum date to today
          onTouchCancel={() => setShowStartDatePicker(false)} // Close the picker when touched outside
        />
      )}
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>Pick End Date</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DatePicker
          date={endDate}
          onDateChange={setEndDate}
          mode="date"
          maximumDate={new Date()} // Optional: Set maximum date to today
          onTouchCancel={() => setShowEndDatePicker(false)} // Close the picker when touched outside
        />
      )}
      <TextInput
        value={budget}
        onChangeText={setBudget}
        placeholder="Enter Budget"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Ongoing" value="ongoing" />
        <Picker.Item label="Completed" value="completed" />
        <Picker.Item label="Pending" value="pending" />
      </Picker>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Project</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#161622",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9C01",
    marginBottom: 20,
  },
  label: {
    color: "#d4d4d4",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF9C01",
    borderRadius: 10,
    padding: 10,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top", // For multiline input
  },
  dateButton: {
    backgroundColor: "#FF9C01",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  dateButtonText: {
    color: "#161622",
    fontWeight: "bold",
  },
  picker: {
    borderColor: "#FF9C01",
    borderWidth: 1,
    borderRadius: 10,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#FF9C01",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#161622",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateProject;
