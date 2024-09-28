import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";

const CreateProject = ({ onSubmit }) => {
  const [projectId, setProjectId] = useState("");
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
      projectId,
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
    <View className="p-4">
      <Text className="text-lg font-bold mb-4">Create New Project</Text>

      <Text>Project ID</Text>
      <TextInput
        value={projectId}
        onChangeText={setProjectId}
        placeholder="Enter Project ID"
        className="border p-2 mb-4"
      />

      <Text>Project Name</Text>
      <TextInput
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Enter Project Name"
        className="border p-2 mb-4"
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter Description"
        className="border p-2 mb-4"
        multiline
      />

      <Text>Start Date</Text>
      <Button
        title="Pick Start Date"
        onPress={() => setShowStartDatePicker(true)}
      />
      {showStartDatePicker && (
        <DatePicker
          date={startDate}
          onDateChange={setStartDate}
          mode="date"
          maximumDate={new Date()} // Optional: Set maximum date to today
          onTouchCancel={() => setShowStartDatePicker(false)} // Close the picker when touched outside
        />
      )}

      <Text>End Date</Text>
      <Button
        title="Pick End Date"
        onPress={() => setShowEndDatePicker(true)}
      />
      {showEndDatePicker && (
        <DatePicker
          date={endDate}
          onDateChange={setEndDate}
          mode="date"
          maximumDate={new Date()} // Optional: Set maximum date to today
          onTouchCancel={() => setShowEndDatePicker(false)} // Close the picker when touched outside
        />
      )}

      <Text>Budget</Text>
      <TextInput
        value={budget}
        onChangeText={setBudget}
        placeholder="Enter Budget"
        className="border p-2 mb-4"
        keyboardType="numeric"
      />

      <Text>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        className="mb-4"
      >
        <Picker.Item label="Ongoing" value="ongoing" />
        <Picker.Item label="Completed" value="completed" />
        <Picker.Item label="Pending" value="pending" />
      </Picker>

      <Text>Client Name</Text>
      <TextInput
        value={clientName}
        onChangeText={setClientName}
        placeholder="Enter Client Name"
        className="border p-2 mb-4"
      />

      <Button title="Submit Project" onPress={handleSubmit} />
    </View>
  );
};

export default CreateProject;
