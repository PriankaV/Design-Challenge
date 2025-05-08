import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const recipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
    instructions: 'Cook spaghetti. Mix eggs and cheese. Fry pancetta. Combine all with spaghetti.',
    source: 'https://example.com/spaghetti-carbonara',
  },
  {
    id: '2',
    title: 'Chicken Curry',
    ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions', 'Garlic'],
    instructions: 'Cook onions and garlic. Add chicken and curry powder. Pour coconut milk and simmer.',
    source: 'https://example.com/chicken-curry',
  },
];

const RecipeScreen = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const renderRecipeCard = ({ item }: { item: typeof recipes[0] }) => (
    <TouchableOpacity onPress={() => toggleCard(item.id)} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      {expandedCard === item.id && (
        <View style={styles.details}>
          <Text style={styles.subtitle}>Ingredients:</Text>
          {item.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.text}>- {ingredient}</Text>
          ))}
          <Text style={styles.subtitle}>Instructions:</Text>
          <Text style={styles.text}>{item.instructions}</Text>
          <Text style={styles.subtitle}>Source:</Text>
          <Text style={styles.link}>{item.source}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
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
  details: {
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    marginTop: 4,
  },
  link: {
    fontSize: 14,
    color: 'blue',
    marginTop: 4,
  },
});

export default RecipeScreen;