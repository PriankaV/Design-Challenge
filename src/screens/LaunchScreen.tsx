import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Navigation from '../components/Navigation';
import bannerImage from '../../assets/budgetbites-banner.png';

const LaunchScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Banner with Image */}
      <ImageBackground
        source={bannerImage}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.headline}>Welcome to BudgetBites.</Text>
          <Text style={styles.subheadline}>
            Fighting Hunger. Reducing Waste. Empowering Communities.
          </Text>
        </View>
      </ImageBackground>

      {/* Description Section */}
      <View style={styles.textSection}>
        <Text style={styles.description}>
          In many neighborhoods across the United States, access to healthy, affordable food is a daily challenge. Families living in food deserts often struggle to find fresh fruit and vegetables, while tons of edible food go to waste every day.
        </Text>
      </View>

      {/* Placeholder for Map */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }}
        style={styles.map}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  navbar: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  logo: {
    fontSize: 18,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  link: {
    fontSize: 14,
    marginHorizontal: 8,
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    fontSize: 16,
  },
  hero: {
    width: '100%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  textSection: {
    padding: 20,
    paddingTop: 24,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    lineHeight: 22,
  },
  map: {
    width: '100%',
    height: 260,
    marginTop: 24,
    marginBottom: 40,
  },
});

