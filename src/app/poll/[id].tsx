import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Polls } from "@/src/types/db";
import { supabase } from "@/src/lib/supabase";

// const poll = {
//   question: "React Native vs Flutter",
//   options: ["React Native", "Flutter", "Swift UI"],
// };

const PollDetails = () => {
  const [selected, setSelected] = useState("");
  const [poll, setPoll] = useState<Polls | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Fetches all polls from the "Polls" table in the database using Supabase.
     * Alerts the user if there is an error during the fetch operation.
     * Sets the fetched polls data to the state.
     */
    /******  8f329b69-ea56-4a2b-8ffd-d84d1130ef1f  *******/ const fetchPolls =
      async () => {
        console.log("fetchPolls");
        let { data, error } = await supabase
          .from("Polls")
          .select("*")
          .eq("id", Number.parseInt(id))
          .single();
        if (error) {
          Alert.alert("error fetching polls", error.message);
        }
        console.log(data);
        setPoll(data);
      };
    fetchPolls();
  }, []);

  const vote = () => {
    console.log("Vote");
  };
  if (!poll) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Poll Voiting" }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option, index) => (
          <Pressable
            onPress={() => setSelected(option)}
            style={styles.optionContainer}
            key={index}
          >
            <Ionicons
              name={
                selected === option
                  ? `checkmark-circle-outline`
                  : `ellipse-outline`
              }
              size={24}
              color="black"
            />
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>
      <Button onPress={vote} title="Vote" />
    </View>
  );
};

export default PollDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  question: {
    fontSize: 20,
    color: "dimgray",
    fontWeight: "bold",
  },
  optionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
