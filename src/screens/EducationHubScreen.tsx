import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Navigation from '../components/navigation/Navigation';

const { width } = Dimensions.get('window');

const educationTopics = [
  {
    id: '1',
    title: 'Drink More Water',
    category: 'Hydration',
    description: 'Drink at least 8 cups of water daily. Staying hydrated improves focus and digestion.',
    image: require('../../assets/edu/water.png'),
  },
  {
    id: '2',
    title: 'Filter Your Water',
    category: 'Hydration',
    description: 'Use carbon filters or boiling methods to ensure clean drinking water.',
    image: require('../../assets/edu/filter.png'),
  },
  {
    id: '3',
    title: 'Protein Goals',
    category: 'Macros',
    description: 'Get 0.8–1.2g of protein per pound of body weight to support muscle growth.',
    image: require('../../assets/edu/protein.png'),
  },
  {
    id: '4',
    title: 'Smart Meal Prep',
    category: 'Meal Prep',
    description: 'Cook meals in bulk, label, and store for easy access and less waste.',
    image: require('../../assets/edu/mealprep.png'),
  },
];

const EducationHubScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navigation />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.heading}>Education Hub</Text>
        <Text style={styles.subheading}>Browse through nutrition and prep tips</Text>

        <FlatList
          horizontal
          data={educationTopics}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationHubScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 20,
  },
  subheading: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 20,
  },
  cardList: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    width: width * 0.7,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    color: '#00b894',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#636e72',
  },
});
