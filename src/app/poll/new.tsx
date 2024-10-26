import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const createPoll = () => {};

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
        <View style={{justifyContent:'center'}}>
          <TextInput
            key={index}
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
            onPress={()=>{
                //delete option based on index
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

      <Button title="Create Poll" />
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
