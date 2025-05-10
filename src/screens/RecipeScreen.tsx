import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
<<<<<<< HEAD
import { RecipeStackParamList } from '../utils/types';
=======
import { RecipeStackParamList } from '../types';
import Navigation from '../components/navigation/Navigation';

const CUISINES = [
  '', 'American', 'British', 'Canadian', 'Chinese', 'French', 'Indian', 'Italian', 'Mexican', 'Spanish',
];
>>>>>>> 7d541c8eb51a97339e974256afac55a261bba861

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
      setLoading(true);
      const url = cuisine
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals || []);
      setFiltered(data.meals || []);
      setPage(1);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
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

  const renderCuisineTags = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
      {CUISINES.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.chip,
            cuisine === item && styles.chipSelected,
          ]}
          onPress={() => setCuisine(item)}
        >
          <Text style={cuisine === item ? styles.chipTextSelected : styles.chipText}>
            {item || 'All'}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const startIndex = (page - 1) * recipesPerPage;
  const currentRecipes = filtered.slice(startIndex, startIndex + recipesPerPage);
  const totalPages = Math.ceil(filtered.length / recipesPerPage);

  return (
    <SafeAreaView style={styles.container}>
      <Navigation>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍴 Discover Recipes</Text>
          <Text style={styles.headerSubtitle}>Search by name or filter by cuisine</Text>
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Search recipes..."
            value={search}
            onChangeText={setSearch}
          />
          {renderCuisineTags()}
        </View>

        <View style={styles.filterInfo}>
          <Text style={styles.filterText}>{filtered.length} results found</Text>
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
                <Text style={styles.pageButtonText}>◀ Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.pageButton, page === totalPages && styles.disabledButton]}
                onPress={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
              >
                <Text style={styles.pageButtonText}>Next ▶</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Navigation>
    </SafeAreaView>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefc',
  },
  header: {
    backgroundColor: '#ff914d',
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 10,
  },
  chipScroll: {
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#ff914d',
  },
  chipText: {
    fontSize: 13,
    color: '#444',
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  filterText: {
    fontSize: 13,
    color: '#555',
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 30,
    marginTop: 10,
  },
  pageButton: {
    backgroundColor: '#ffcc9a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
