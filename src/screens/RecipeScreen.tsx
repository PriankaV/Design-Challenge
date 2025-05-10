import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecipeStackParamList } from '../utils/types';

const RecipesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RecipeStackParamList, 'RecipeList'>>();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [cuisine, setCuisine] = useState('');
  const recipesPerPage = 6;

  useEffect(() => {
    fetchRecipes();
  }, [cuisine]);

  useEffect(() => {
    filterRecipes();
  }, [search, recipes]);

  const fetchRecipes = async () => {
    try {
      const url = cuisine
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals || []);
      setFiltered(data.meals || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    const filteredList = recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
    setPage(1);
  };

  const renderCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.strMeal}</Text>
        <Text style={styles.cardSubtitle}>Cuisine: {item.strArea || cuisine}</Text>
      </View>
    </TouchableOpacity>
  );

  const startIndex = (page - 1) * recipesPerPage;
  const currentRecipes = filtered.slice(startIndex, startIndex + recipesPerPage);
  const totalPages = Math.ceil(filtered.length / recipesPerPage);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>🍴 Discover New Recipes</Text>
      <Text style={styles.pageSubtitle}>Search by name, filter by cuisine, and tap to learn more.</Text>

      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Picker
          selectedValue={cuisine}
          onValueChange={(value) => setCuisine(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Cuisines" value="" />
          <Picker.Item label="American" value="American" />
          <Picker.Item label="British" value="British" />
          <Picker.Item label="Canadian" value="Canadian" />
          <Picker.Item label="Chinese" value="Chinese" />
          <Picker.Item label="French" value="French" />
          <Picker.Item label="Indian" value="Indian" />
          <Picker.Item label="Italian" value="Italian" />
          <Picker.Item label="Mexican" value="Mexican" />
          <Picker.Item label="Spanish" value="Spanish" />
        </Picker>
      </View>

      <View style={styles.filterInfo}>
        <Text style={styles.filterText}>🔍 {filtered.length} results found</Text>
        <Text style={styles.filterText}>Page {page} of {totalPages}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff914d" style={{ marginTop: 50 }} />
      ) : (
        <>
          <FlatList
            data={currentRecipes}
            renderItem={renderCard}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />

          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageButton, page === 1 && styles.disabledButton]}
              onPress={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <Text>◀ Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pageButton, page === totalPages && styles.disabledButton]}
              onPress={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              <Text>Next ▶</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefcfb',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#333',
  },
  pageSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  searchFilterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  filterInfo: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  filterText: {
    fontSize: 13,
    color: '#444',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  pageButton: {
    backgroundColor: '#ffe0b2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
});