import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const mockRecipes = [
  {
    id: '1',
    title: 'Baked Mac & Cheese',
    image: 'https://source.unsplash.com/featured/?macandcheese',
    prepTime: '30 min',
    tag: '-30%',
  },
  {
    id: '2',
    title: 'Pasta',
    image: 'https://source.unsplash.com/featured/?pasta',
    prepTime: '20 min',
    tag: 'New',
  },
  {
    id: '3',
    title: 'Dosa',
    image: 'https://source.unsplash.com/featured/?dosa',
    prepTime: '25 min',
  },
  // Add more...
];

const RecipesScreen = () => {
  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>Prep Time: {item.prepTime}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Recipes</Text>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <Text style={styles.filterText}>🍽️ Filter</Text>
        <Text style={styles.filterText}>Showing 1–6 of {mockRecipes.length} results</Text>
        <Text style={styles.filterText}>Show: 6</Text>
        <Text style={styles.filterText}>Sort by: Default</Text>
      </View>

      {/* Recipe Grid */}
      <FlatList
        data={mockRecipes}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />

      {/* Pagination (static for now) */}
      <View style={styles.pagination}>
        <TouchableOpacity style={styles.pageButton}>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pageButton}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f4a261',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff7ed',
  },
  filterText: {
    fontSize: 13,
    color: '#444',
    marginVertical: 5,
  },
  grid: {
    paddingHorizontal: 10,
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  tag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#f77f00',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
    paddingBottom: 0,
  },
  cardSubtitle: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingBottom: 8,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  pageButton: {
    backgroundColor: '#f4e1c1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
