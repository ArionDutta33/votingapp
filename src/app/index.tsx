import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Stack } from "expo-router";
const polls = [{id:1},{id:2},{id:3}];

const HomeScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Polls" }} />
      <GestureHandlerRootView>
        <FlatList
          data={polls}
          contentContainerStyle={styles.container}
          renderItem={({ item}) => (
            <Link href={`/poll/${item.id}`} style={styles.pollContainer }>
              <Text style={styles.pollTitle}>{item.id} : Example poll question</Text>
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
