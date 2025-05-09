import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, FlatList, Dimensions, Image } from 'react-native';
import Navigation from '../components/navigation/Navigation';

const categories = [
  {
    title: 'Meal Prep Basics',
    data: [
      {
        title: 'Plan Your Meals',
        description: 'Decide what to eat for the week. Keep meals simple and repeat ingredients.',
        image: require('../../assets/edu/meal-prep.png'),
      },
      {
        title: 'Batch Cook',
        description: 'Cook large portions of versatile foods like rice, chicken, or beans.',
        image: require('../../assets/edu/batch-cook.png'),
      },
    ],
  },
  {
    title: 'Storing Leftovers',
    data: [
      {
        title: 'Use Airtight Containers',
        description: 'Prevent spoilage and preserve freshness by storing food in sealed containers.',
        image: require('../../assets/edu/airtight.png'),
      },
      {
        title: 'Label & Date',
        description: 'Label each container with the contents and date for safe tracking.',
        image: require('../../assets/edu/label-date.png'),
      },
    ],
  },
  {
    title: 'Macros',
    data: [
      {
        title: 'Protein Guide',
        description: 'Essential for muscle repair. Aim for lean sources like chicken, tofu, and beans.',
        image: require('../../assets/edu/protein.png'),
      },
      {
        title: 'Carbs & Energy',
        description: 'Complex carbs like oats and brown rice give sustained energy.',
        image: require('../../assets/edu/carbs.png'),
      },
    ],
  },
  {
    title: 'Healthy Recipes',
    data: [
      {
        title: 'One-Pot Meals',
        description: 'Simplify cleanup with nutrient-packed one-pot dishes.',
        image: require('../../assets/edu/one-pot.png'),
      },
      {
        title: 'Snack Smart',
        description: 'Use pre-cut veggies or yogurt cups for healthy snacks.',
        image: require('../../assets/edu/snacks.png'),
      },
    ],
  },
  {
    title: 'Water',
    data: [
      {
        title: 'Daily Intake',
        description: 'Aim for 8 cups per day, more with activity or heat.',
        image: require('../../assets/edu/water.png'),
      },
      {
        title: 'Filtering Tips',
        description: 'Use charcoal filters or boil tap water to purify.',
        image: require('../../assets/edu/filter.png'),
      },
      {
        title: 'Hydration Benefits',
        description: 'Improves energy, digestion, and skin health.',
        image: require('../../assets/edu/health.png'),
      },
    ],
  },
];


const EducationHubScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navigation>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🍎 Education Hub</Text>
          <Text style={styles.subtitle}>
            Learn to eat smarter, live better, and master the basics of food prep, nutrition, and wellness.
          </Text>
        </View>

        {categories.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <FlatList
              data={section.data}
              horizontal
              keyExtractor={(item) => item.title}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardList}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.description}</Text>
                </View>
              )}
            />
          </View>
        ))}
      </ScrollView>
      </Navigation>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.72;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffefc',
  },
  container: {
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#fddfb5',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#636e72',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff914d',
    marginBottom: 12,
  },
  cardList: {
    paddingVertical: 8,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2d3436',
  },
  cardText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
});

export default EducationHubScreen;

