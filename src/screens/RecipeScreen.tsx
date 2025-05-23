import React, { useState, useEffect } from 'react';
import Navigation from '../components/navigation/Navigation';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Alert } from 'react-native';
import { ChefHat, Search, Clock, Utensils, CookingPot, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { styles } from '../styles/Recipe';
import Footer from '../components/Footer';

export interface RecipeProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strTags?: string;
  ingredients: string[];
  measures: string[];
}

interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

interface ApiResponse {
  meals: ApiMeal[] | null;
}

// Function to extract ingredients and measures from API response
const extractIngredientsAndMeasures = (meal: ApiMeal) => {
  const ingredients: string[] = [];
  const measures: string[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(ingredient.trim());
      measures.push(measure ? measure.trim() : '');
    }
  }
  
  return { ingredients, measures };
};

// Function to transform API response to our RecipeProps format
const transformMealData = (meal: ApiMeal): RecipeProps => {
  const { ingredients, measures } = extractIngredientsAndMeasures(meal);
  
  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strInstructions: meal.strInstructions,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strTags: meal.strTags,
    ingredients,
    measures,
  };
};

// Function to get tags from recipe
const getRecipeTags = (recipe: RecipeProps): string[] => {
  const tags: string[] = [];
  
  if (recipe.strCategory) tags.push(recipe.strCategory);
  if (recipe.strArea) tags.push(recipe.strArea);
  if (recipe.strTags) {
    const recipeTags = recipe.strTags.split(',').map(tag => tag.trim());
    tags.push(...recipeTags);
  }
  
  return tags.filter(tag => tag !== '');
};

interface RecipeCardProps {
  recipe: RecipeProps;
  onClick: (recipe: RecipeProps) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const tags = getRecipeTags(recipe);
  
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={() => onClick(recipe)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.recipeImage} />
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{recipe.strCategory}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.recipeTitle} numberOfLines={2}>{recipe.strMeal}</Text>
        <Text style={styles.recipeDescription} numberOfLines={2}>
          {recipe.strArea} cuisine • {recipe.ingredients.length} ingredients
        </Text>
        <View style={styles.prepTimeContainer}>
          <Clock size={16} color="#666" />
          <Text style={styles.prepTimeText}>30-45 mins</Text>
        </View>
        <View style={styles.tagsContainer}>
          {tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.viewRecipeButton}>
          <Utensils size={16} color="#fff" />
          <Text style={styles.viewRecipeText}>View Recipe</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RecipeDetail: React.FC<{ recipe: RecipeProps }> = ({ recipe }) => {
  const tags = getRecipeTags(recipe);
  const instructions = recipe.strInstructions
    .split(/\r\n|\r|\n/)
    .filter(step => step.trim() !== '')
    .map(step => step.trim());

  // Combine ingredients with their measures
  const ingredientsList = recipe.ingredients.map((ingredient, index) => {
    const measure = recipe.measures[index];
    return measure ? `${measure} ${ingredient}` : ingredient;
  });

  return (
    <View style={styles.recipeDetailContainer}>
      <Text style={styles.detailTitle}>{recipe.strMeal}</Text>
      
      <Image source={{ uri: recipe.strMealThumb }} style={styles.detailImage} />
      
      <View style={styles.modalTagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.modalTag}>
            <Text style={styles.modalTagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.recipeInfoGrid}>
        <View style={styles.infoItem}>
          <Clock size={20} color="#FF6B35" />
          <Text style={styles.infoLabel}>Prep Time</Text>
          <Text style={styles.infoValue}>30-45 mins</Text>
        </View>
        <View style={styles.infoItem}>
          <Utensils size={20} color="#FF6B35" />
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>{recipe.strCategory}</Text>
        </View>
        <View style={styles.infoItem}>
          <CookingPot size={20} color="#FF6B35" />
          <Text style={styles.infoLabel}>Cuisine</Text>
          <Text style={styles.infoValue}>{recipe.strArea}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredientsList.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {instructions.map((step, index) => (
          <View key={index} style={styles.instructionItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.instructionText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>Note:</Text>
        <Text style={styles.tipText}>
          Recipe from TheMealDB. Cooking times may vary based on your experience and equipment.
        </Text>
      </View>
    </View>
  );
};

const RecipeApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeProps | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  
  const RECIPES_PER_PAGE = 15;

  // Fetch recipes from API
  const fetchRecipes = async (query: string = '') => {
    if (!query.trim()) {
      query = 'chicken';
    }

    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data: ApiResponse = await response.json();
      
      if (data.meals) {
        const transformedRecipes = data.meals.map(transformMealData);
        setRecipes(transformedRecipes);
        
        // Extract all unique tags
        const tags = new Set<string>();
        transformedRecipes.forEach(recipe => {
          getRecipeTags(recipe).forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags));
        setCurrentPage(1);
      } else {
        setRecipes([]);
        setAllTags([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      Alert.alert('Error', 'Failed to fetch recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Search recipes when search term changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() || recipes.length === 0) {
        fetchRecipes(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Initial load
  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: RecipeProps) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetail(true);
  };

  const handleBackToRecipes = () => {
    setShowRecipeDetail(false);
    setSelectedRecipe(null);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setCurrentPage(1);
  };

  // Filter recipes based on selected tags
  const filteredRecipes = recipes.filter(recipe => {
    if (selectedTags.length === 0) return true;
    
    const recipeTags = getRecipeTags(recipe);
    return selectedTags.every(tag => recipeTags.includes(tag));
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderRecipeCard = ({ item }: { item: RecipeProps }) => (
    <RecipeCard recipe={item} onClick={handleRecipeClick} />
  );

  const renderTagFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => toggleTag(item)}
      style={[
        styles.filterPill,
        selectedTags.includes(item) ? styles.filterPillActive : styles.filterPillInactive
      ]}
    >
      <Text style={[
        styles.filterPillText,
        selectedTags.includes(item) ? styles.filterPillTextActive : styles.filterPillTextInactive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (showRecipeDetail && selectedRecipe) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Navigation>
            <TouchableOpacity onPress={handleBackToRecipes} style={styles.backButton}>
              <ChevronLeft size={24} color="#FF6B35" />
              <Text style={styles.backButtonText}>Back to Recipes</Text>
            </TouchableOpacity>
            <RecipeDetail recipe={selectedRecipe} />
          </Navigation>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Navigation>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <ChefHat size={32} color="#FF6B35" />
              <Text style={styles.headerTitle}>Recipe Finder</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Discover delicious recipes from around the world. Search for your favorite dishes and explore new cuisines.
            </Text>
          </View>

          {/* Search and Filters */}
          <View style={styles.filtersContainer}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search recipes... (e.g., chicken, pasta, beef)"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            {allTags.length > 0 && (
              <FlatList
                data={allTags}
                renderItem={renderTagFilter}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tagsList}
                contentContainerStyle={styles.tagsListContent}
              />
            )}
          </View>

          {/* Recipe Cards */}
          {!loading && currentRecipes.length > 0 ? (
            <>
              <FlatList
                data={currentRecipes}
                renderItem={renderRecipeCard}
                keyExtractor={(item) => item.idMeal}
                numColumns={5}
                columnWrapperStyle={styles.recipeRow}
                contentContainerStyle={styles.recipesList}
                scrollEnabled={false}
              />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity 
                    onPress={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                  >
                    <ChevronLeft size={20} color={currentPage === 1 ? "#ccc" : "#FF6B35"} />
                    <Text style={[styles.paginationButtonText, currentPage === 1 && styles.paginationButtonTextDisabled]}>
                      Previous
                    </Text>
                  </TouchableOpacity>
                  
                  <View style={styles.paginationInfo}>
                    <Text style={styles.paginationText}>
                      Page {currentPage} of {totalPages}
                    </Text>
                    <Text style={styles.paginationSubtext}>
                      {filteredRecipes.length} recipes total
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                  >
                    <Text style={[styles.paginationButtonText, currentPage === totalPages && styles.paginationButtonTextDisabled]}>
                      Next
                    </Text>
                    <ChevronRight size={20} color={currentPage === totalPages ? "#ccc" : "#FF6B35"} />
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : !loading ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {searchTerm ? 'No recipes found. Try a different search term.' : 'Start searching for recipes!'}
              </Text>
            </View>
          ) : null}
        </Navigation>
        <Footer/>
      </ScrollView>
    </View>
  );
};

export default RecipeApp;