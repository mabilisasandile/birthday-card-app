import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BirthdayCard from './assets/components/BirthdayCard';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <BirthdayCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
