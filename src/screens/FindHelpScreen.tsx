import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AccessibilityInfo
} from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width >= 768 ? '48%' : '100%'; // Adjust for tablet/landscape
const CARD_WIDTH = width >= 768 ? '95%' : '90%'; // Adjust card width for different layouts

const FindHelpScreen = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  
  // Check if screen reader is enabled
  useEffect(() => {
    const checkScreenReader = async () => {
      const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setIsScreenReaderEnabled(screenReaderEnabled);
    };
    
    checkScreenReader();
    
    // Listen for screen reader changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (enabled) => {
        setIsScreenReaderEnabled(enabled);
      }
    );
    
    return () => {
      subscription.remove();
    };
  }, []);

  // Additional online resources
  const onlineResources = [
    { title: 'Benefits.gov', description: 'Official government benefits website', url: 'https://www.benefits.gov/benefit/361', icon: 'landmark' },
    { title: 'Feeding America', description: 'Nationwide network of food banks', url: 'https://www.feedingamerica.org/find-your-local-foodbank', icon: 'apple-alt' },
    { title: 'Share Our Strength', description: 'Cooking education programs', url: 'https://cookingmatters.org/courses/', icon: 'book-open' },
    { title: 'FoodPantries.org', description: 'Directory of local food pantries', url: 'https://www.foodpantries.org/', icon: 'map-marker-alt' },
  ];

  const renderResourceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resourceItem}
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityRole="link"
    >
      <View style={styles.resourceIconContainer}>
      </View>
      <View style={styles.resourceContent}>
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <Text style={styles.resourceDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          {/* Online Resources Section */}
          <View style={styles.resourcesSection}>
            <Text style={styles.resourcesTitle}>
              Helpful Websites
            </Text>
            <FlatList
              data={onlineResources}
              scrollEnabled={false}
              keyExtractor={(item) => item.title}
              renderItem={renderResourceItem}
              contentContainerStyle={styles.resourcesList}
            />
          </View>

          {/* Find Foods Near You */}
          <TouchableOpacity
            style={styles.findFoodContainer}
            accessibilityLabel="Find foods near you on our food map"
            accessibilityRole="button"
          >
            <View style={styles.findFoodButton}>
              <Text style={styles.findFoodText}>Find Foods Near You</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light gray background for a cleaner look
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column', // Default to single column
    justifyContent: 'space-between',
  },
  // Online resources section
  resourcesSection: {
    backgroundColor: '#EDE7F6', // Light purple
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  resourcesTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5E35B1', // Dark purple
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourcesTitleIcon: {
    marginRight: 8,
  },
  resourcesList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 2,
  },
  resourceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5E35B1', // Dark purple
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#303F9F', // Darker purple
  },
  resourceDescription: {
    fontSize: 13,
    color: '#757575',
  },
  // Find Food Map Button
  findFoodContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  findFoodButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
  },
  findFoodIcon: {
    marginRight: 10,
  },
  findFoodText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FindHelpScreen;