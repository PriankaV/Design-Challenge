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
  Picker,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecipeStackParamList } from '../types';

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
      <Text style={styles.cardTitle}>{item.strMeal}</Text>
      <Text style={styles.cardSubtitle}>Cuisine: {item.strArea}</Text>
    </TouchableOpacity>
  );

  const startIndex = (page - 1) * recipesPerPage;
  const currentRecipes = filtered.slice(startIndex, startIndex + recipesPerPage);
  const totalPages = Math.ceil(filtered.length / recipesPerPage);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Explore Recipes</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Picker
          selectedValue={cuisine}
          onValueChange={(itemValue) => setCuisine(itemValue)}
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

      <View style={styles.filterBar}>
        <Text style={styles.filterText}>🍽️ Filter</Text>
        <Text style={styles.filterText}>
          Showing {startIndex + 1}–{Math.min(startIndex + recipesPerPage, filtered.length)} of {filtered.length} results
        </Text>
        <Text style={styles.filterText}>Page {page} of {totalPages}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f4a261" style={{ marginTop: 50 }} />
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
              style={styles.pageButton}
              onPress={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pageButton}
              onPress={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              <Text>Next</Text>
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
    backgroundColor: '#fafafa',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  picker: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  filterBar: {
    backgroundColor: '#fff7ed',
    padding: 10,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 13,
    color: '#444',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
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
    gap: 12,
  },
  pageButton: {
    backgroundColor: '#f4e1c1',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
});