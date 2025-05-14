import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Search, MapPin, Filter } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import MapWrapper from '../components/MapWrapper';
import Navigation from '../components/navigation/Navigation';
import styles from '../styles/LaunchScreen';
import foodBankData from '../../assets/food_banks_geocoded.json';

// How it Works Card info
const stepsData = [
  { number: "01", title: "Enter Your Location", description: "Start by entering your zip code or allowing location access to find resources near you." },
  { number: "02", title: "Explore Options", description: "Browse affordable grocery stores, food banks, community kitchens, and neighbor shares." },
  { number: "03", title: "Connect & Share", description: "Claim available food items or share your extras with neighbors in need." },
  { number: "04", title: "Build Community", description: "Reduce food waste while creating stronger, more resilient neighborhood connections." }
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
    <SafeAreaView style={styles.container}>
      <Navigation>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
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
                    Connecting communities with fresh, affordable food options and reducing waste through sharing.
                  </Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.heroButton, styles.buttonPrimary]}>
                      <Text style={styles.heroButtonText}>Explore Food Map ➔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.heroButton, styles.buttonOutline]}>
                      <Text style={styles.buttonOutlineText}>Join Food Share</Text>
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
              <Svg width="100%" height={120} viewBox="0 0 1440 120">
                <Path d="M0,80 C360,160 1080,0 1440,80 L1440,120 L0,120 Z" fill="#c3f7de" />
              </Svg>
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>How It Works</Text>
            <Text style={styles.subtitle}>Budget Bites makes accessing and sharing food simple and straightforward.</Text>
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
                  <Search size={18} color="#666" style={styles.searchIcon} />
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
                {filteredSources.map((bank) => (
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
                        <Text style={styles.resultCardDetailText}>{bank.Contact}</Text>
                      </View>
                    </View>

                    <View style={styles.tagsContainer}>
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>{bank.State}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
        </ScrollView>
      </Navigation>
    </SafeAreaView>
  );
};

export default LaunchScreen;
