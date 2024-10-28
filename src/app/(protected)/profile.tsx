import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "@rneui/themed";
import { Redirect } from "expo-router";

const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>user id: {user?.id}</Text>
      <Button title={"Sign Out"} onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
