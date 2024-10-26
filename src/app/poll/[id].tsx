import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const poll = {
  question: 'React Native vs Flutter',
  options: ['React Native', 'Flutter', 'Swift UI'],
};

const vote=() => {
  console.log('Vote');
}

const PollDetails = () => {
  const [selected, setSelected] = useState('React Native');
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen  options={{title:"Poll Voiting"}}/>
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option, index) => (
          <Pressable onPress={() => setSelected(option)} style={styles.optionContainer} key={index}>
            <Ionicons
              name={selected === option ? `checkmark-circle-outline` : `ellipse-outline`}
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
    color: 'dimgray',
    fontWeight: 'bold',
  },
  optionContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
