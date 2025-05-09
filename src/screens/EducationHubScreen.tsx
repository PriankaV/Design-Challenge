import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native';
import { BookOpen, Award, ShoppingBag, Clipboard, Coffee, Droplet } from 'lucide-react';
import Navigation from '../components/navigation/Navigation';

const { width } = Dimensions.get('window');
const imageWidth = width - 32; // Accounting for padding

const EducationHubScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navigation/>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.headerTitle}>Education Hub</Text>
        <Text style={styles.headerSubtitle}>Learn to eat smarter</Text>
        
        {/* Hero Image Placeholder */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "/api/placeholder/800/400" }}
            style={styles.heroImage}
          />
        </View>

        {/* Why Food Education Matters */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <BookOpen color="#6c5ce7" size={22} />
            <Text style={styles.sectionTitle}>Why Food Education Matters</Text>
          </View>
          <Text style={styles.text}>
            Understanding what you eat and how to plan ahead saves money, cuts down stress, and keeps you healthy. With the right habits, you'll have more energy and money, better focus, and fewer irregular junk-food runs.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* How Macros Matter */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Award color="#6c5ce7" size={22} />
            <Text style={styles.sectionTitle}>How Macros Matter</Text>
          </View>
          
          <Text style={styles.subheading}>What are macros?</Text>
          <Text style={styles.text}>
            Macros are the three main nutrient groups—protein, carbohydrates, and fats—that your body requires in relatively large amounts to build tissue, fuel your workouts, and regulate vital functions. Tracking macros ensures you hit the right balance of energy and building blocks to support muscle growth, recovery, and overall health.
          </Text>

          {/* Macros Image Placeholder */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: "/api/placeholder/800/300" }}
              style={styles.contentImage}
            />
          </View>

          <Text style={styles.subheading}>What Macros Should I Aim For? - MEN</Text>
          <View style={styles.macroItem}>
            <View style={[styles.macroBullet, {backgroundColor: '#ff7675'}]} />
            <Text style={styles.text}>Protein: 0.8-1.2 grams per pound of body weight (15-25% of total calories)</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={[styles.macroBullet, {backgroundColor: '#74b9ff'}]} />
            <Text style={styles.text}>Carbohydrates: 2-3 grams per pound (45-60% of calories), adjusting down if very low-carb</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={[styles.macroBullet, {backgroundColor: '#55efc4'}]} />
            <Text style={styles.text}>Fats: 0.3-0.5 grams per pound (20-35% of calories)</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Meal Prepping */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <ShoppingBag color="#6c5ce7" size={22} />
            <Text style={styles.sectionTitle}>Meal Prepping</Text>
          </View>
          
          <Text style={styles.subheading}>Steps to Get Started</Text>
          
          {/* Meal Prep Image Placeholder */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: "/api/placeholder/800/400" }}
              style={styles.contentImage}
            />
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Plan your week: Choose 3-meals/day</Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Shop smart: Buy bulk to save money</Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Choose basics: boost proteins (chicken, tofu)</Text>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>Portion & Store: Use air-tight containers</Text>
          </View>

          <Text style={styles.subheading}>Equipment Checklist</Text>
          <View style={styles.checklistItem}>
            <View style={styles.checkbox} />
            <Text style={styles.checklistText}>Quality knives and cutting board</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={styles.checkbox} />
            <Text style={styles.checklistText}>Sheet pans and saucepans</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={styles.checkbox} />
            <Text style={styles.checklistText}>Glass or BPA-free plastic containers</Text>
          </View>
          <View style={styles.checklistItem}>
            <View style={styles.checkbox} />
            <Text style={styles.checklistText}>Measuring cups/spoons</Text>
          </View>

          <Text style={styles.subheading}>Quick & Healthy Tips</Text>
          
          <View style={styles.tipContainer}>
            <View style={styles.tipHeader}>
              <Clipboard color="#6c5ce7" size={18} />
              <Text style={styles.tipTitle}>Balanced Plate</Text>
            </View>
            <Text style={styles.tipText}>
              Fill half plate with vegetables, quarter with lean protein, quarter with whole grains
            </Text>
          </View>
          
          <View style={styles.tipContainer}>
            <View style={styles.tipHeader}>
              <Coffee color="#6c5ce7" size={18} />
              <Text style={styles.tipTitle}>Mindful Eating</Text>
            </View>
            <Text style={styles.tipText}>
              Eat without screens, chew slowly, recognize fullness cues
            </Text>
          </View>
          
          <View style={styles.tipContainer}>
            <View style={styles.tipHeader}>
              <Droplet color="#6c5ce7" size={18} />
              <Text style={styles.tipTitle}>Hydration First</Text>
            </View>
            <Text style={styles.tipText}>
              Drink a glass of water before meals
            </Text>
            
            {/* Hydration Image Placeholder */}
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: "/api/placeholder/800/250" }}
                style={styles.contentImage}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 24,
  },
  section: {
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
    marginLeft: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginTop: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#636e72',
    marginBottom: 16,
  },
  divider: {
    height: 8,
    backgroundColor: '#f7f7f7',
    marginVertical: 20,
    marginHorizontal: -16,
  },
  imageContainer: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  heroImage: {
    width: imageWidth,
    height: 200,
    borderRadius: 12,
  },
  contentImage: {
    width: imageWidth,
    height: 180,
    borderRadius: 12,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  macroBullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    marginRight: 10,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  stepText: {
    fontSize: 16,
    color: '#636e72',
    flex: 1,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6c5ce7',
    marginRight: 12,
  },
  checklistText: {
    fontSize: 16,
    color: '#636e72',
  },
  tipContainer: {
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2d3436',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#636e72',
  },
});

export default EducationHubScreen;