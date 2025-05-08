import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const LaunchPage = () => {
  return (
    <SafeAreaView  style={styles.container}>
      <Text style={styles.title}>Welcome to Budget Bites!</Text>
      <Text style={styles.subtitle}>Your guide to affordable and healthy meals.</Text>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
});

export default LaunchPage;
