import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  AccessibilityInfo,
  Image,
} from 'react-native';
import Navigation from '../components/navigation/Navigation';
import { 
  Book, 
  Utensils, 
  PiggyBank, 
  Droplet, 
  Recycle, 
  Info, 
  Video, 
  Play, 
  ShoppingBag 
} from 'lucide-react';
import { ImageBackground } from 'react-native';

// Fun facts about food waste and conservation
const funFacts = [
  { id: '1', fact: 'Did you know? Nearly 1/3 of all food produced globally is wasted each year.' },
  { id: '2', fact: 'Storing potatoes and onions separately makes them both last longer!' },
  { id: '3', fact: 'Freezing leftover bread slices can extend their life by up to 3 months.' },
  { id: '4', fact: 'Banana peels can be used to polish shoes or as garden fertilizer!' },
  { id: '5', fact: 'A family of four can save about $1,500 per year by reducing their food waste.' },
];

// Define consistent interface for content items
export interface ContentItem {
  title: string;
  description: string;
  videoLink?: string;
  extraInfo?: string;
}

// Interface for categories
export interface Category {
  title: string;
  icon: string;
  color: string;
  data: ContentItem[];
}

// Updated categories focused on food accessibility, affordability, and waste reduction
const categories: Category[] = [
  {
    title: 'Save Money & Food',
    icon: 'piggy-bank',
    color: '#10b981',
    data: [
      { title: 'Stretch Your Dollar', description: 'Simple tips to make your groceries last longer and feed more with less.', videoLink: 'budget-meals.mp4' },
      { title: 'No-Waste Cooking', description: 'Use vegetable scraps, bones, and leftovers to create delicious new meals.', videoLink: 'no-waste.mp4' },
      { title: 'Simple Storage Hacks', description: 'Extend food life with everyday containers and items you already have.', videoLink: 'storage.mp4' },
    ],
  },
  {
    title: 'Quick & Easy Meals',
    icon: 'utensils',
    color: '#10b981',
    data: [
      { title: '5-Ingredient Meals', description: 'Healthy, filling recipes using just a few affordable ingredients.', videoLink: '5-ingredient.mp4' },
      { title: 'One-Pot Wonders', description: 'Save time, energy, and water with complete meals in one pot.', videoLink: 'one-pot.mp4' },
      { title: 'Pantry Meals', description: 'Delicious meals using only shelf-stable ingredients.', videoLink: 'pantry.mp4' },
    ],
  },
  {
    title: 'Water Conservation',
    icon: 'droplet',
    color: '#3b82f6',
    data: [
      { title: 'Daily Water Saving', description: 'Simple habits to reduce water usage throughout your home.', extraInfo: 'Save up to $20/month' },
      { title: 'Kitchen Water Hacks', description: 'Creative ways to reuse water from cooking and cleaning.', extraInfo: 'Good for plants too!' },
      { title: 'Fix Leaky Faucets', description: 'How to identify and fix common household water leaks.', videoLink: 'diy-fixes.mp4' },
    ],
  },
  {
    title: 'Waste Reduction',
    icon: 'recycle',
    color: '#10b981',
    data: [
      { title: 'Composting Basics', description: 'Turn food scraps into garden gold with simple composting.', videoLink: 'composting.mp4' },
      { title: 'Reuse Containers', description: 'Creative ways to give food packaging a second life.', extraInfo: 'Zero-waste tips' },
      { title: 'Recycle Right', description: 'Common mistakes when recycling and how to avoid them.', extraInfo: 'Local guidelines' },
    ],
  },
  {
    title: 'Smart Shopping',
    icon: 'shopping-bag',
    color: '#8b5cf6',
    data: [
      { title: 'Budget Shopping', description: 'Strategic approaches to grocery shopping on a budget.', extraInfo: 'Meal planning included' },
      { title: 'Seasonal Buying Guide', description: 'Save by knowing when produce is in season and cheapest.', extraInfo: 'Monthly calendar' },
      { title: 'Bulk Buying Tips', description: 'When bulk buying saves money and when it creates waste.', videoLink: 'bulk-buying.mp4' },
    ],
  },
];

// Sample YouTube Videos
interface YoutubeVideo {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  link: string;
}

const youtubeVideos: YoutubeVideo[] = [
  {
    id: '1',
    title: 'Budget Meal Prep for the Week',
    channel: 'Budget Bytes',
    thumbnail: 'https://via.placeholder.com/320x180',
    link: 'https://youtube.com/watch?v=example1'
  },
  {
    id: '2',
    title: '10 Ways to Reduce Food Waste',
    channel: 'Sustainable Living',
    thumbnail: 'https://via.placeholder.com/320x180',
    link: 'https://youtube.com/watch?v=example2'
  },
  {
    id: '3',
    title: 'Food Bank 101: How to Get Help',
    channel: 'Community Resources',
    thumbnail: 'https://via.placeholder.com/320x180',
    link: 'https://youtube.com/watch?v=example3'
  },
  {
    id: '4',
    title: 'Simple Pantry Organization Tips',
    channel: 'Organized Home',
    thumbnail: 'https://via.placeholder.com/320x180',
    link: 'https://youtube.com/watch?v=example4'
  },
];

const EducationHubScreen = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const fadeAnim = new Animated.Value(1);

  // Check if screen reader is enabled for accessibility features
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      setIsScreenReaderEnabled(screenReaderEnabled);
    });
  }, []);

  // Fun fact carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change fact
        setCurrentFactIndex((prevIndex) => (prevIndex === funFacts.length - 1 ? 0 : prevIndex + 1));

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Filter categories based on active tab
  const getFilteredCategories = () => {
    if (activeTab === 'all') {
      return categories;
    } else {
      return categories.filter(category => {
        switch (activeTab) {
          case 'food':
            return category.title === 'Save Money & Food' || category.title === 'Quick & Easy Meals';
          case 'water':
            return category.title === 'Water Conservation';
          case 'waste':
            return category.title === 'Waste Reduction';
          case 'shopping':
            return category.title === 'Smart Shopping';
          default:
            return true;
        }
      });
    }
  };

  const renderIcon = (iconName: string, size: number, color: string) => {
    switch (iconName) {
      case 'piggy-bank':
        return <PiggyBank size={size} color={color} />;
      case 'utensils':
        return <Utensils size={size} color={color} />;
      case 'droplet':
        return <Droplet size={size} color={color} />;
      case 'recycle':
        return <Recycle size={size} color={color} />;
      case 'shopping-bag':
        return <ShoppingBag size={size} color={color} />;
      case 'video':
        return <Video size={size} color={color} />;
      case 'play':
        return <Play size={size} color={color} />;
      case 'info':
        return <Info size={size} color={color} />;
      default:
        return <Info size={size} color={color} />;
    }
  };

  const renderSectionHeader = (title: string, icon: string, color: string) => (
    <View style={styles.sectionHeaderContainer}>
      <View style={styles.sectionTitleContainer}>
        {renderIcon(icon, 22, color)}
        <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
      </View>
    </View>
  );

  const renderCard = ({ item, sectionColor }: { item: ContentItem; sectionColor: string }) => (
    <TouchableOpacity
      style={styles.card}
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityRole="button"
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardText}>{item.description}</Text>

        {item.videoLink && (
          <View style={[styles.featureTag, { backgroundColor: sectionColor }]}>
            {renderIcon('video', 12, '#fff')}
            <Text style={styles.featureTagText}>Video Tutorial</Text>
          </View>
        )}

        {item.extraInfo && (
          <View style={[styles.featureTag, { backgroundColor: sectionColor }]}>
            {renderIcon('info', 12, '#fff')}
            <Text style={styles.featureTagText}>{item.extraInfo}</Text>
          </View>
        )}

        <View style={[styles.learnMoreButton, { backgroundColor: sectionColor }]}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderYoutubeVideo = ({ item }: { item: YoutubeVideo }) => (
    <View style={styles.videoCard}>
      <Image 
        source={{ uri: item.thumbnail }}
        style={styles.videoThumbnail}
        accessibilityLabel={`Thumbnail for ${item.title}`}
      />
      <View style={styles.playButton}>
        {renderIcon('play', 20, '#fff')}
      </View>
      <View style={styles.videoContent}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoChannel}>{item.channel}</Text>
      </View>
    </View>
  );

  const renderTabButton = (value: string, label: string, iconName: string) => (
    <TouchableOpacity 
      style={[
        styles.tabButton, 
        activeTab === value ? styles.activeTabButton : {}
      ]} 
      onPress={() => setActiveTab(value)}
      accessibilityRole="tab"
      accessibilityState={{ selected: activeTab === value }}
    >
      <View style={styles.tabContent}>
        {renderIcon(iconName, 20, activeTab === value ? '#10b981' : '#64748b')}
        <Text style={[
          styles.tabLabel,
          activeTab === value ? styles.activeTabLabel : {}
        ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navigation>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <ImageBackground
            source={require('../../assets/edu-background.jpg')}
            style={styles.heroPattern}
            resizeMode="cover"
          >
            <View style={styles.heroContainer}>
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>Food & Resource Savings Guide</Text>
                <Text style={styles.heroSubtitle}>
                  Simple, practical ways to reduce waste, save money, and make the most of what you have
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Tabs Navigation */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContainer}>
              {renderTabButton('all', 'All Tips', 'book')}
              {renderTabButton('food', 'Food', 'utensils')}
              {renderTabButton('water', 'Water', 'droplet')}
              {renderTabButton('waste', 'Waste', 'recycle')}
              {renderTabButton('shopping', 'Shopping', 'shopping-bag')}
            </ScrollView>
          </View>

          {/* Main Content - Filtered by Tab */}
          {getFilteredCategories().map((section) => (
            <View key={section.title} style={styles.section}>
              {renderSectionHeader(section.title, section.icon, section.color)}
              <FlatList
                data={section.data}
                horizontal
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardList}
                renderItem={({ item }) => renderCard({ item, sectionColor: section.color })}
                accessibilityLabel={`${section.title} resources`}
              />
            </View>
          ))}
          
          {/* Fun Facts Carousel */}
          <View style={styles.funFactContainer}>
            <Text style={styles.funFactHeader}>Did You Know?</Text>
            <Animated.View style={[styles.funFactContent, { opacity: fadeAnim }]}>
              <Text style={styles.funFactText}>{funFacts[currentFactIndex].fact}</Text>
            </Animated.View>
            <View style={styles.dotContainer}>
              {funFacts.map((_, index) => (
                <View key={index} style={[styles.dot, currentFactIndex === index ? styles.activeDot : {}]} />
              ))}
            </View>
          </View>

          {/* YouTube Videos Section */}
          <View style={styles.section}>
            {renderSectionHeader('Helpful Videos', 'video', '#FF0000')}
            <FlatList
              data={youtubeVideos}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.videoList}
              renderItem={renderYoutubeVideo}
              accessibilityLabel="YouTube food education videos"
            />
          </View>
        </ScrollView>
      </Navigation>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  // Hero Section
  heroPattern: {
    paddingVertical: 80,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  heroContainer: {
    width: '100%',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    maxWidth: 800,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },
  // Tabs navigation
  tabsContainer: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  tabsScrollContainer: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  activeTabButton: {
    backgroundColor: '#e5fcf1',
  },
  tabContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabLabel: {
    color: '#10b981',
    fontWeight: '600',
  },
  // Fun Facts Carousel
  funFactContainer: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  funFactHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 8,
    textAlign: 'center',
  },
  funFactContent: {
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  funFactText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    textAlign: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A5D6A7',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#10b981',
    width: 12,
  },
  // Section styling
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    marginLeft: 10,
  },
  // Cards
  cardList: {
    paddingVertical: 10,
    paddingBottom: 16,
  },
  card: {
    width: width * 0.8,
    maxWidth: 380,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2C3E50',
  },
  cardText: {
    fontSize: 14,
    color: '#546E7A',
    lineHeight: 20,
    marginBottom: 12,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  featureTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  learnMoreButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
  learnMoreText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fff',
  },
  // YouTube Videos Section
  videoList: {
    paddingVertical: 10,
  },
  videoCard: {
    width: width * 0.8,
    maxWidth: 380,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
  },
  playButton: {
    position: 'absolute',
    top: '25%',
    left: '45%',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContent: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2C3E50',
  },
  videoChannel: {
    fontSize: 14,
    color: '#7F8C8D',
  }
});

export default EducationHubScreen;