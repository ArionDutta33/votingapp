import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { supabase } from "../lib/supabase";
// const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];

const HomeScreen = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log("fetchPolls");
      let { data, error } = await supabase.from("Polls").select("*");
      if (error) {
        Alert.alert("error fetching polls", error.message);
      }
      console.log(data);
      setPolls(data); //!error
    };
    fetchPolls();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <Link href={"/poll/new"}>
              <AntDesign name="plus" size={24} color="black" />
            </Link>
          ),
        }}
      />
      <GestureHandlerRootView>
        <FlatList
          data={polls}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <Link href={`/poll/${item.id}`} style={styles.pollContainer}>
              <Text style={styles.pollTitle}>
                {item.id} : Example poll question //!error
              </Text>
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
