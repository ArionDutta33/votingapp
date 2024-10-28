import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { Button } from "@rneui/themed";
import {
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert(error.message);
    else if (!data?.session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={{ fontWeight: "500", marginBottom: 20 }}>
          Sign in or Create an account
        </Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    flex: 1, // Ensure it takes the full space
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  // input: {
  //   height: 40,
  //   borderColor: "gray",
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  // },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5, // Add some margin for better spacing
  },
});

export default Auth;
