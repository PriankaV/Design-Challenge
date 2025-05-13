import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Search, MapPin, Filter } from 'lucide-react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import MapWrapper from '../components/MapWrapper';
import Navigation from '../components/navigation/Navigation';

// How it Works Card info
const stepsData = [
  { number: "01", title: "Enter Your Location",  description: "Start by entering your zip code or allowing location access to find resources near you." },
  { number: "02", title: "Explore Options", description: "Browse affordable grocery stores, food banks, community kitchens, and neighbor shares." },
  { number: "03", title: "Connect & Share", description: "Claim available food items or share your extras with neighbors in need." },
  { number: "04", title: "Build Community", description: "Reduce food waste while creating stronger, more resilient neighborhood connections." }
];

// temp food info -- change
const mockfoodSources = [
  { id: 1, name: "Farm Fresh Market", type: "farmer", address: "123 Main St", distance: "0.8 miles", rating: 4.8, tags: ["organic", "fresh"] },
  { id: 2, name: "Green Valley Co-op", type: "coop", address: "456 Oak Ave", distance: "1.2 miles", rating: 4.5, tags: ["organic", "local"] },
  { id: 3, name: "City Farmers Market", type: "market", address: "789 Market St", distance: "0.5 miles", rating: 4.7, tags: ["fresh", "seasonal"] },
  { id: 4, name: "Harbor Fish Market", type: "market", address: "321 Harbor Dr", distance: "1.5 miles", rating: 4.6, tags: ["fresh", "sustainable"] }
];

const LaunchScreen = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [location, setLocation] = useState('');
  const [activeFilters, setActiveFilters] = useState(['fresh']);
  const [selectedSource, setSelectedSource] = useState(null);

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
      ])
    ).start();
  }, []);

  const handleFilterToggle = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const filteredSources = mockfoodSources.filter(source => 
    activeFilters.length === 0 || 
    activeFilters.some(filter => source.tags.includes(filter))
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
                    <TouchableOpacity
                      style={[styles.heroButton, styles.buttonPrimary]}
                    >
                      <Text style={styles.heroButtonText}>Explore Food Map ➔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.heroButton, styles.buttonOutline]}
                    >
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
              <Svg
                viewBox="0 0 1440 120"
                style={styles.svg}
                preserveAspectRatio="none"
              >
                <Path
                  fill="#fff"
                  fillOpacity="1"
                  d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,58.7C1248,43,1344,21,1392,10.7L1440,0L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                />
              </Svg>
            </View>
          </View>

          {/* How It Works Section */}
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
          {/* Left Column - Search and Results */}
          <View style={styles.mapSectionContainer}>
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
                        style={[
                          styles.filterChip,
                          activeFilters.includes(filter) ? styles.filterChipActive : {}
                        ]}
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
                {filteredSources.map(source => (
                  <TouchableOpacity 
                    key={source.id} 
                    style={[
                      styles.resultCard,
                      selectedSource?.id === source.id ? styles.resultCardSelected : {}
                    ]}
                    onPress={() => setSelectedSource(source)}
                  >
                    <View style={styles.resultCardHeader}>
                      <View style={styles.resultCardTitleContainer}>
                        <Text style={styles.resultCardTitle}>{source.name}</Text>
                      </View>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{source.rating}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.resultCardDetails}>
                      <View style={styles.resultCardDetail}>
                        <MapPin size={14} color="#666" />
                        <Text style={styles.resultCardDetailText}>{source.address}</Text>
                      </View>
                      <View style={styles.resultCardDetail}>
                        <Text style={styles.resultCardDetailText}>{source.distance}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.tagsContainer}>
                      {source.tags.map(tag => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Right Column - Map */}
            <View style={styles.mapColumn}>          
              <View style={styles.mapContainer}>
                <MapWrapper selectedFood={selectedFood} setSelectedFood={setSelectedFood} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Navigation>
    </SafeAreaView>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  // Base styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  
  // Typography
  text: {
    color: '#374151',
    fontSize: 16,
  },
  textBold: {
    fontWeight: '600',
  },
  textMuted: {
    color: '#6b7280',
    fontSize: 14,
  },
  textSmall: {
    fontSize: 14,
  },
  textTiny: {
    fontSize: 12,
  },
  
  // Section Headers
  headerContainer: {
    alignItems: 'center',
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#111827',
  },
  subtitle: {
    fontSize: 20,
    color: '#4b5563',
    textAlign: 'center',
    marginHorizontal: 'auto',
    lineHeight: 24,
  },
  
  // Hero Section
  heroPattern: {
    paddingVertical: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#e5fcf1',
  },
  heroContainer: {
    backgroundColor: '#e5fcf1',
  },
  textSection: {
    flex: 1,
    minWidth: 300,
    alignItems: 'flex-start',
    textAlign: 'left',
    marginRight: 250,
  },
  heading: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 48,
    color: '#000',
    marginBottom: 16,
  },
  gradientText: {
    color: '#09b880',
    fontWeight: '800',
  },
  subText: {
    fontSize: 18,
    color: '#4b5563',
    lineHeight: 26,
    marginTop: 16,
    marginBottom: 24,
    maxWidth: 500,
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
    flexWrap: 'wrap',
  },
  heroButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 180,
  },
  buttonPrimary: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#10b981',
    backgroundColor: 'transparent',
  },
  buttonOutlineText: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Hero Image Section
  imageSection: {
    width: 320,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  circleContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 140,
    backgroundColor: '#c3f7de',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  foodItem: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emoji: {
    fontSize: 38,
  },
  food1: {
    top: -30,
    right: -30,
    transform: [{ rotate: '12deg' }],
  },
  food2: {
    bottom: -36,
    right: 50,
    transform: [{ rotate: '-8deg' }],
  },
  food3: {
    left: -30,
    top: '33%',
    transform: [{ rotate: '8deg' }],
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ping: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34d399',
  },
  pin: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  svg: {
    width: '100%',
    height: 120,
  },
  
  // How It Works Section
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
    gap: 20,
    marginBottom: 40,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '22%',
    minWidth: 220,
    height: 220,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#c3f7de',
    justifyContent: 'flex-start',
  },
  stepNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },
  stepDescription: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
  
  // Map Section
  mapSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  
  // Search Column
  searchColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    backgroundColor: '#fff',
    minWidth: 300,
  },
  searchHeader: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    height: 24,
  },
  
  // Filters
  filterContainer: {
    marginTop: 12,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterHeaderText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterChipActive: {
    backgroundColor: '#dcfce7',
    borderColor: '#10b981',
  },
  filterChipText: {
    fontSize: 14,
    color: '#4b5563',
  },
  filterChipTextActive: {
    color: '#10b981',
    fontWeight: '600',
  },
  
  // Results List
  resultsList: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  resultCardSelected: {
    borderWidth: 2,
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  resultCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resultCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4b5563',
  },
  resultCardDetails: {
    marginBottom: 16,
  },
  resultCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultCardDetailText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#4b5563',
  },
  
  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  
  // Map Column
  mapColumn: {
    flex: 1.5,
    backgroundColor: '#f9fafb',
    minWidth: 400,
  },
  mapHeader: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  mapSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 6,
  },
  mapContainer: {
    margin: 20,
    height: 500,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});