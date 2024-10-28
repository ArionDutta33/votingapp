import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Redirect, router, Stack } from "expo-router";
import {
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const createPoll = async () => {
    setError("");
    if (!question) {
      setError("Please provide the question");
      return;
    }

    const validOptions = options.filter((option) => !!option);
    if (validOptions.length < 2) {
      setError("Please provide at least two options");
      return;
    }

    // Insert poll into the Polls table, including the options as an array
    const { data: pollData, error: pollError } = await supabase
      .from("Polls")
      .insert([{ question, options: validOptions }]) // Ensure you pass options here
      .select()
      .single();

    if (pollError) {
      Alert.alert("Failed to create poll");
      console.error(pollError);
      return;
    }

    // Navigate back after successful creation
    router.back();
  };

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack.Screen options={{ title: "New Poll" }} />
      <Text style={styles.label}>Title</Text>
      <TextInput
        onChangeText={setQuestion}
        value={question}
        placeholder="Type your question here"
        style={styles.input}
      />
      <Text style={styles.label}>Options</Text>
      {options.map((option, index) => (
        <View key={index} style={{ justifyContent: "center" }}>
          <TextInput
            value={option}
            onChangeText={(text) => {
              const updated = [...options];
              updated[index] = text;
              setOptions(updated);
            }}
            style={styles.input}
            placeholder={`Option ${index + 1}`}
          />
          <Feather
            style={{
              position: "absolute",
              right: 10,
            }}
            name="x"
            size={18}
            color="gray"
            onPress={() => {
              // Delete option based on index
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
          />
        </View>
      ))}
      <Button
        title="Add Options"
        onPress={() => setOptions([...options, ""])}
      />
      <Button title="Create Poll" onPress={createPoll} />
      <Text style={{ color: "crimson", fontSize: 18 }}>{error}</Text>
    </GestureHandlerRootView>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1, // Ensure the view takes up available space
  },
  label: {
    fontWeight: "500",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5, // Add some margin for better spacing
  },
});
