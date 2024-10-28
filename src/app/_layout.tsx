import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";

const _layout = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
