import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';
import MapWrapper from '../components/MapWrapper';
import bannerImage from '../../assets/budgetbites-banner.png';
import Navigation from '../components/navigation/Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const foodData = [
  {
    name: 'Neapolitan Pizza',
    latitude: 40.8529,
    longitude: 14.2681,
    description: 'A simple pizza from Naples, Italy.',
  },
  {
    name: 'Sushi',
    latitude: 35.6762,
    longitude: 139.6503,
    description: 'Vinegared rice with various ingredients from Japan.',
  },
  {
    name: 'Tacos',
    latitude: 23.6345,
    longitude: -102.5528,
    description: 'A traditional Mexican corn or wheat tortilla wrap.',
  },
];

const LaunchScreen = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodSelect = (food: any) => {
    setSelectedFood(food);
  };

  return (

      <ScrollView style={styles.container}>
              <SafeAreaView>
      <Navigation/>
      </SafeAreaView>
      {/* Hero Image */}
      <ImageBackground source={bannerImage} style={styles.hero} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={styles.headline}>Welcome to BudgetBites</Text>
          <Text style={styles.subheadline}>Fighting Hunger. Reducing Waste.</Text>
        </View>
      </ImageBackground>

      {/* Description */}
      <View style={styles.textSection}>
        <Text style={styles.description}>
          Access to healthy, affordable food is a daily challenge for many. Let’s change that.
        </Text>
      </View>

      {/* Conditional Map Rendering */}
      <View style={styles.mapContainer}>
      <MapWrapper selectedFood={selectedFood} setSelectedFood={setSelectedFood} />
      </View>
    </ScrollView>

  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  hero: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subheadline: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  textSection: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  mapContainer: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
});
