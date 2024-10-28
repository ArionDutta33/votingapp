import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "../lib/supabase";
import { Polls } from "../types/db";
const HomeScreen = () => {
  const [polls, setPolls] = useState<Polls[]>([]);

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
        let { data, error } = await supabase.from("Polls").select("*");
        if (error) {
          Alert.alert("error fetching polls", error.message);
        }
        console.log(data);
        setPolls(data);
      };
    fetchPolls();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          //center the title
          headerTitleAlign: "center",
          headerRight: () => (
            <Link href={"/poll/new"}>
              <AntDesign name="plus" size={24} color="black" />
            </Link>
          ),
          headerLeft: () => (
            <Link href={"/profile"}>
              <AntDesign name="user" size={24} color="black" />
            </Link>
          ),
        }}
      />
      {/* {consol} */}
      <GestureHandlerRootView>
        <FlatList
          data={polls}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <Link href={`/poll/${item.id}`} style={styles.pollContainer}>
              <Text style={styles.pollTitle}>{item.question}</Text>
            </Link>
          )}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  pollTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
//*og
