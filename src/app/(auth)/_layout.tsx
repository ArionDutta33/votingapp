import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

const AuthLayout = () => {
  const { user } = useAuth();
  if (user) {
    return <Redirect href={"/profile"} />;
  }
  //   if (user) <Redirect href={"/profile"} />;
  return <Slot />;
};

export default AuthLayout;

const styles = StyleSheet.create({});
