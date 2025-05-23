import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Search, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import MapWrapper from '../components/MapWrapper';
import foodBankData from '../../assets/food_banks_geocoded.json';

import Svg, { Path } from 'react-native-svg';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/Footer';
import styles from '../styles/LaunchScreen';

// How it Works Card info
const stepsData = [
  { number: "01", title: "Enter Your Location", description: "Start by entering your zip code or allowing location access to find resources near you." },
  { number: "02", title: "Explore Options", description: "Browse affordable grocery stores, food banks, community kitchens, and federal assistance programs." },
  { number: "03", title: "Find Resources", description: "Discover nutritious recipes, educational resources, and federal assistance programs available to you." },
  { number: "04", title: "Build Knowledge", description: "Learn sustainable food practices while accessing the support you need for a healthier lifestyle." }
];

interface FoodBankData {
  Name: string;
  State: string;
  Address: string;
  City: string;
  "State Zipcode": string;
  Contact: string;
  latitude: number;
  longitude: number;
  geocoding_status: string;
}

const LaunchScreen = () => {
  const [selectedFood, setSelectedFood] = useState<FoodBankData | null>(null);
  const [foodBanks, setFoodBanks] = useState<FoodBankData[]>([]);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [location, setLocation] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const locationsPerPage = 5;

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 2.3,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.delay(100),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Load food bank data from JSON
  useEffect(() => {
    const validFoodBanks = foodBankData.filter((bank: FoodBankData) =>
      bank.latitude && bank.longitude && bank.geocoding_status === 'success'
    );
    setFoodBanks(validFoodBanks);
    setLoading(false);
  }, []);

  const handleFilterToggle = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredSources = foodBanks.filter(bank =>
    !location ||
    bank.State.toLowerCase().includes(location.toLowerCase()) ||
    bank.City.toLowerCase().includes(location.toLowerCase()) ||
    bank["State Zipcode"].includes(location)
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <Navigation>
          {/* Hero Section */}
          <View style={styles.heroPattern}>
          <View style={styles.heroContainer}>
            <View style={styles.row}>
              {/* Text Section */}
              <View style={styles.textSection}>
                <Text style={styles.heading}>
                  Find Affordable,{'\n'}
                  <Text style={styles.gradientText}>Healthy Food </Text>
                  Nearby
                </Text>
                <Text style={styles.subText}>
                  Access nutritious food options, discover budget-friendly recipes, and connect with assistance programs.
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={[styles.heroButton, styles.buttonPrimary]}
                    // onPress={scrollToMap}
                  >
                    <Text style={styles.heroButtonText}>Explore Food Map ➔</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.heroButton, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Learn More</Text>
                  </TouchableOpacity>
                </View>
              </View>

                {/* Image Section */}
                <View style={styles.imageSection}>
                  <View style={styles.circleContainer}>
                    <View style={styles.circleBg} />
                    <View style={[styles.foodItem, styles.food1]}>
                      <Text style={styles.emoji}>🥦</Text>
                    </View>
                    <View style={[styles.foodItem, styles.food2]}>
                      <Text style={styles.emoji}>🍎</Text>
                    </View>
                    <View style={[styles.foodItem, styles.food3]}>
                      <Text style={styles.emoji}>🍞</Text>
                    </View>
                    <View style={styles.pinContainer}>
                      <Animated.View
                        style={[
                          styles.ping,
                          {
                            transform: [{ scale: pulseAnim }],
                            opacity: pulseAnim.interpolate({
                              inputRange: [1, 2.0],
                              outputRange: [0.6, 0],
                            }),
                          },
                        ]}
                      />
                      <View style={styles.pin}>
                        <Text style={styles.emoji}>📍</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.waveContainer}>
              <Svg width="100%" height={120} viewBox="0 0 1440 120" preserveAspectRatio="none">
                <Path d="M0,80 C360,160 1080,0 1440,80 L1440,120 L0,120 Z" fill="#fff" />
              </Svg>
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>How It Works</Text>
            <Text style={styles.subtitle}>Budget Bites connects you with healthy food resources, knowledge, and assistance.</Text>
          </View>
          <View style={styles.stepsContainer}>
            {stepsData.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <Text style={styles.stepNumber}>{step.number}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            ))}
          </View>

          {/* Map Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Find Food Near You</Text>
            <Text style={styles.subtitle}>Discover affordable and nutritious food options in your area</Text>
          </View>

          <View style={styles.mapSectionContainer}>
            {/* Left Column */}
            <View style={styles.searchColumn}>
              <View style={styles.searchHeader}>
                <View style={styles.searchBar}>
                  <Search size={18} color="#666" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Enter your location..."
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
                <View style={styles.filterContainer}>
                  <View style={styles.filterHeader}>
                    <Filter size={16} color="#666" />
                    <Text style={styles.filterHeaderText}>Filters</Text>
                  </View>
                  <View style={styles.filterOptions}>
                    {['organic', 'fresh', 'local', 'seasonal', 'sustainable'].map(filter => (
                      <TouchableOpacity
                        key={filter}
                        style={[styles.filterChip, activeFilters.includes(filter) ? styles.filterChipActive : {}]}
                        onPress={() => handleFilterToggle(filter)}
                      >
                        <Text
                          style={[
                            styles.filterChipText,
                            activeFilters.includes(filter) ? styles.filterChipTextActive : {}
                          ]}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <ScrollView style={styles.resultsList}>
                {filteredSources.slice(currentPage * locationsPerPage, (currentPage + 1) * locationsPerPage).map((bank) => (
                  <TouchableOpacity
                    key={bank.Name}
                    style={[
                      styles.resultCard,
                      selectedFood?.Name === bank.Name ? styles.resultCardSelected : {}
                    ]}
                    onPress={() => setSelectedFood(bank)}
                  >
                    <View style={styles.resultCardHeader}>
                      <View style={styles.resultCardTitleContainer}>
                        <Text style={styles.resultCardTitle}>{bank.Name}</Text>
                      </View>
                    </View>

                    <View style={styles.resultCardDetails}>
                      <View style={styles.resultCardDetail}>
                        <MapPin size={14} color="#666" />
                        <Text style={styles.resultCardDetailText}>
                          {`${bank.Address}, ${bank.City}, ${bank["State Zipcode"]}`}
                        </Text>
                      </View>
                      <View style={styles.resultCardDetail}>
                        <View style={styles.contactStateContainer}>
                          <Text style={styles.resultCardDetailText}>{bank.Contact}</Text>
                          <View style={styles.inlineTag}>
                            <Text style={styles.tagText}>{bank.State}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.locationsControlContainer}>
                <Text style={styles.locationsControlText}>
                  {filteredSources.length > 0 ? 
                    `Showing ${currentPage * locationsPerPage + 1}-${Math.min((currentPage + 1) * locationsPerPage, filteredSources.length)} out of ${filteredSources.length} locations` : 
                    'No locations found'}
                  {filteredSources.length > 0 ? ` (Page ${currentPage + 1} of ${Math.ceil(filteredSources.length / locationsPerPage)})` : ''}
                </Text>
                <View style={styles.locationsControlButtons}>
                  <TouchableOpacity 
                    style={[styles.locationsControlButton, currentPage === 0 ? styles.locationsControlButtonDisabled : {}]} 
                    onPress={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.locationsControlButton, (currentPage + 1) * locationsPerPage >= filteredSources.length ? styles.locationsControlButtonDisabled : {}]} 
                    onPress={() => setCurrentPage(prev => (prev + 1) * locationsPerPage < filteredSources.length ? prev + 1 : prev)}
                    disabled={(currentPage + 1) * locationsPerPage >= filteredSources.length}
                  >
                    <ChevronRight size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.mapColumn}>
              <View style={styles.mapContainer}>
                <MapWrapper
                  selectedFood={selectedFood}
                  setSelectedFood={(food: FoodBankData) => setSelectedFood(food)}
                  foodBanks={filteredSources}
                />
              </View>
            </View>
          </View>
        </Navigation>
        <Footer/>
      </ScrollView>
    </View>
  );
};

export default LaunchScreen;