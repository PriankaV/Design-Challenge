import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const resources = [
  {
    id: '1',
    title: 'Nutrition Facts',
    description: 'Learn about the nutritional value of various foods and how they benefit your health.',
  },
  {
    id: '2',
    title: 'Food Storage Methods',
    description: 'Discover techniques to store food properly and increase its longevity.',
  },
  {
    id: '3',
    title: 'Healthy Eating Tips',
    description: 'Get tips on how to maintain a balanced and healthy diet.',
  },
];

const EducationHubScreen = () => {
  const renderResource = ({ item }: { item: typeof resources[0] }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Education Hub</Text>
      <FlatList
        data={resources}
        renderItem={renderResource}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default EducationHubScreen;