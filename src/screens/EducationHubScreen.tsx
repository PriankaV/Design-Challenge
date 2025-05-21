import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  AccessibilityInfo,
  Image,
  TextInput,
  FlatList,
  Platform
} from 'react-native';
import Navigation from '../components/navigation/Navigation';
import {
  Utensils, PiggyBank, Droplet, Recycle, Info, Video, Play, ShoppingBag, Search, 
  ChevronRight, X, TrendingUp, Star
} from 'lucide-react';
import { ImageBackground } from 'react-native';
import styles from '../styles/EducationHub';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

const renderIcon = (iconName, size, color) => {
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
    case 'trending-up':
      return <TrendingUp size={size} color={color} />;
    case 'search':
      return <Search size={size} color={color} />;
    case 'x':
      return <X size={size} color={color} />;
    case 'chevron-right':
      return <ChevronRight size={size} color={color} />;
    case 'star':
      return <Star size={size} color={color} />;
    default:
      return <Info size={size} color={color} />;
  }
};

export interface ContentItem {
  title: string;
  description: string;
  videoLink?: string;
  extraInfo?: string;
  thumbnail?: string;
}

export interface Category {
  title: string;
  icon: string;
  color: string;
  data: ContentItem[];
}

interface YoutubeVideo {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  link: string;
}

const categories: Category[] = [
  {
    title: 'Save Money & Food',
    icon: 'piggy-bank',
    color: '#10b981',
    data: [
      {
        title: 'Stretch Your Dollar',
        description: 'Simple tips to make your groceries last longer and feed more with less.',
        videoLink: 'https://www.youtube.com/watch?v=exB0vDYYpyw',
        thumbnail: 'https://img.youtube.com/vi/exB0vDYYpyw/hqdefault.jpg'
      },
      {
        title: 'No-Waste Cooking',
        description: 'Use vegetable scraps, bones, and leftovers to create delicious new meals.',
        videoLink: 'https://www.youtube.com/watch?v=Q9FLXvH7PLw',
        thumbnail: 'https://img.youtube.com/vi/Q9FLXvH7PLw/hqdefault.jpg'
      },
      {
        title: 'Simple Storage Hacks',
        description: 'Extend food life with everyday containers and items you already have.',
        videoLink: 'https://www.youtube.com/watch?v=_tk1whODlyA',
        thumbnail: 'https://img.youtube.com/vi/_tk1whODlyA/hqdefault.jpg'
      },
    ],
  },
  {
    title: 'Quick & Easy Meals',
    icon: 'utensils',
    color: '#f97316',
    data: [
      {
        title: '5-Ingredient Meals',
        description: 'Healthy, filling recipes using just a few affordable ingredients.',
        videoLink: 'https://www.youtube.com/watch?v=VIWfhx4DJhw',
        thumbnail: 'https://img.youtube.com/vi/VIWfhx4DJhw/hqdefault.jpg'
      },
      {
        title: 'One-Pot Wonders',
        description: 'Save time, energy, and water with complete meals in one pot.',
        videoLink: 'https://www.youtube.com/watch?v=7TM7fOWtzzk',
        thumbnail: 'https://img.youtube.com/vi/7TM7fOWtzzk/hqdefault.jpg'
      },
      {
        title: 'Pantry Meals',
        description: 'Delicious meals using only shelf-stable ingredients.',
        videoLink: 'https://www.youtube.com/watch?v=F4xdv-mSasI',
        thumbnail: 'https://img.youtube.com/vi/F4xdv-mSasI/hqdefault.jpg'
      },
    ],
  },
  {
    title: 'Water Conservation',
    icon: 'droplet',
    color: '#3b82f6',
    data: [
      {
        title: 'Daily Water Saving',
        description: 'Simple habits to reduce water usage throughout your home.',
        videoLink: 'https://www.youtube.com/watch?v=nTcFXJT0Fsc',
        thumbnail: 'https://img.youtube.com/vi/nTcFXJT0Fsc/hqdefault.jpg'
      },
      {
        title: 'Kitchen Water Hacks',
        description: 'Creative ways to reuse water from cooking and cleaning.',
        videoLink: 'https://www.youtube.com/watch?v=joVL70wtLAs',
        thumbnail: 'https://img.youtube.com/vi/joVL70wtLAs/hqdefault.jpg'
      },
      {
        title: 'Fix Leaky Faucets',
        description: 'How to identify and fix common household water leaks.',
        videoLink: 'https://www.youtube.com/watch?v=SYPFon69vKs',
        thumbnail: 'https://img.youtube.com/vi/SYPFon69vKs/hqdefault.jpg'
      },
    ],
  },
  {
    title: 'Waste Reduction',
    icon: 'recycle',
    color: '#6b7280',
    data: [
      {
        title: 'Composting Basics',
        description: 'Turn food scraps into garden gold with simple composting.',
        videoLink: 'https://www.youtube.com/watch?v=6Ti5g-AZiTs',
        thumbnail: 'https://img.youtube.com/vi/6Ti5g-AZiTs/hqdefault.jpg'
      },
      {
        title: 'Reuse Containers',
        description: 'Creative ways to give food packaging a second life.',
        videoLink: 'https://www.youtube.com/watch?v=0UMmG_sYKsI',
        thumbnail: 'https://img.youtube.com/vi/0UMmG_sYKsI/hqdefault.jpg'
      },
      {
        title: 'Recycle Right',
        description: 'Common mistakes when recycling and how to avoid them.',
        videoLink: 'https://www.youtube.com/watch?v=8MjH6zJbDds',
        thumbnail: 'https://img.youtube.com/vi/8MjH6zJbDds/hqdefault.jpg'
      },
    ],
  },
  {
    title: 'Smart Shopping',
    icon: 'shopping-bag',
    color: '#8b5cf6',
    data: [
      {
        title: 'Budget Shopping',
        description: 'Strategic approaches to grocery shopping on a budget.',
        videoLink: 'https://www.youtube.com/watch?v=R1jaSf2vkH8',
        thumbnail: 'https://img.youtube.com/vi/R1jaSf2vkH8/hqdefault.jpg'
      },
      {
        title: 'Seasonal Buying Guide',
        description: 'Save by knowing when produce is in season and cheapest.',
        videoLink: 'https://www.youtube.com/watch?v=8dwcfew8XoY',
        thumbnail: 'https://img.youtube.com/vi/8dwcfew8XoY/hqdefault.jpg'
      },
      {
        title: 'Bulk Buying Tips',
        description: 'When bulk buying saves money and when it creates waste.',
        videoLink: 'https://www.youtube.com/watch?v=czcbYXLhC_A',
        thumbnail: 'https://img.youtube.com/vi/czcbYXLhC_A/hqdefault.jpg'
      },
    ],
  },
  {
    title: 'Eating Healthy',
    icon: 'utensils',
    color: '#f59e0b',
    data: [
      {
        title: 'Understanding Macros',
        description: 'Learn the basics of protein, carbs, and fats.',
        videoLink: 'https://www.youtube.com/watch?v=QEMbT4C-5IM',
        thumbnail: 'https://img.youtube.com/vi/QEMbT4C-5IM/hqdefault.jpg'
      },
      {
        title: 'Balanced Plates',
        description: 'How to build nutritious meals for energy and health.',
        videoLink: 'https://www.youtube.com/watch?v=LYBOmHSTriY',
        thumbnail: 'https://img.youtube.com/vi/LYBOmHSTriY/hqdefault.jpg'
      },
      {
        title: 'Healthy Snacking',
        description: 'Smart snack choices to fuel your day.',
        videoLink: 'https://www.youtube.com/watch?v=5LmkBHWtcbQ',
        thumbnail: 'https://img.youtube.com/vi/5LmkBHWtcbQ/hqdefault.jpg'
      },
    ],
  },
];

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

const funFacts = [
  { id: '1', fact: 'Did you know? Nearly 1/3 of all food produced globally is wasted each year.' },
  { id: '2', fact: 'Storing potatoes and onions separately makes them both last longer!' },
  { id: '3', fact: 'Freezing leftover bread slices can extend their life by up to 3 months.' },
  { id: '4', fact: 'Banana peels can be used to polish shoes or as garden fertilizer!' },
  { id: '5', fact: 'A family of four can save about $1,500 per year by reducing their food waste.' },
];

const EducationHubScreen = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      setIsScreenReaderEnabled(screenReaderEnabled);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentFactIndex((prevIndex) => (prevIndex === funFacts.length - 1 ? 0 : prevIndex + 1));
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredCategories = () => {
    const lowerSearch = searchQuery.toLowerCase();

    const visible = categories.filter(category => {
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

    if (!searchQuery.trim()) return visible;

    return visible
      .map(category => ({
        ...category,
        data: category.data.filter(item =>
          item.title.toLowerCase().includes(lowerSearch) ||
          item.description.toLowerCase().includes(lowerSearch)
        )
      }))
      .filter(category => category.data.length > 0);
  };

  const renderVideoCard = ({ item }) => (
    <TouchableOpacity 
      onPress={() => Linking.openURL(item.link)}
      style={styles.videoCard}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          accessibilityLabel={`Thumbnail for ${item.title}`}
        />
        <View style={styles.thumbnailOverlay}>
          <View style={styles.playButton}>
            {renderIcon('play', 24, '#fff')}
          </View>
        </View>
      </View>
      <View style={styles.videoCardContent}>
        <View style={styles.videoCardHeader}>
          <Text style={styles.videoCardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.videoCardDescription}>{item.channel}</Text>
        <View style={styles.videoCardStats}>
          {renderIcon('video', 14, '#6b7280')}
          <Text style={styles.videoCardStatsText}>YouTube</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryTab = (value, label, iconName) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        activeTab === value ? styles.categoryTabActive : styles.categoryTabInactive
      ]}
      onPress={() => setActiveTab(value)}
      accessibilityRole="tab"
      accessibilityState={{ selected: activeTab === value }}
    >
      {renderIcon(iconName, 16, activeTab === value ? '#047857' : '#6b7280')}
      <Text 
        style={[
          styles.categoryTabText,
          activeTab === value ? styles.categoryTabTextActive : styles.categoryTabTextInactive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderCategoryCard = ({ item, section }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => {
        if (item.videoLink) {
          if (Platform.OS === 'web') {
            window.open(item.videoLink, '_blank');
          } else {
            Linking.openURL(item.videoLink);
          }
        }
      }}
      accessibilityRole="button"
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        
        {item.videoLink && (
          <View style={styles.trendingTag}>
            {renderIcon('video', 12, '#dc2626')}
            <Text style={styles.trendingTagText}>Video Tutorial</Text>
          </View>
        )}
        
        <View 
          style={[
            styles.learnButton,
            { backgroundColor: section.color }
          ]}
        >
          <Text style={styles.learnButtonText}>Learn More</Text>
          {renderIcon('chevron-right', 16, '#fff')}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navigation>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <ImageBackground
              source={require('../../assets/images/edu-background.svg')}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.heroOverlay}>
                <View style={styles.heroContent}>
                  <Text style={styles.heroTitle}>Food & Resource Savings Guide</Text>
                  <Text style={styles.heroSubtitle}>
                    Simple, practical ways to reduce waste, save money, and make the most of what you have
                  </Text>
                  
                  {/* Search Bar */}
                  <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                      {renderIcon('search', 20, '#6b7280')}
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search tips..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        accessibilityLabel="Search for tips"
                      />
                      {searchQuery.length > 0 && (
                        <TouchableOpacity 
                          style={styles.clearButton}
                          onPress={() => setSearchQuery('')}
                        >
                          {renderIcon('x', 16, '#6b7280')}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          
          {/* Category Navigation */}
          <View style={[styles.categoryNav, styles.stickyHeader]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {renderCategoryTab('all', 'All Tips', 'info')}
              {renderCategoryTab('food', 'Food', 'utensils')}
              {renderCategoryTab('water', 'Water', 'droplet')}
              {renderCategoryTab('waste', 'Waste', 'recycle')}
              {renderCategoryTab('shopping', 'Shopping', 'shopping-bag')}
            </ScrollView>
          </View>

          {/* Filtered Categories */}
          {getFilteredCategories().map((section) => (
            <View key={section.title} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIcon, { backgroundColor: `${section.color}20` }]}>
                    {renderIcon(section.icon, 18, section.color)}
                  </View>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View All</Text>
                  {renderIcon('chevron-right', 16, '#10b981')}
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {section.data.map((item) => (
                  <TouchableOpacity
                    key={item.title}
                    style={styles.categoryCard}
                    onPress={() => {
                      if (item.videoLink) {
                        if (Platform.OS === 'web') {
                          window.open(item.videoLink, '_blank');
                        } else {
                          Linking.openURL(item.videoLink);
                        }
                      }
                    }}
                  >
                    <View style={styles.cardContent}>
                      <Text style={styles.categoryCardTitle}>{item.title}</Text>
                      <Text style={styles.cardDescription}>{item.description}</Text>
                      
                      {item.videoLink && (
                        <View style={styles.trendingTag}>
                          {renderIcon('video', 12, '#dc2626')}
                          <Text style={styles.trendingTagText}>Video Tutorial</Text>
                        </View>
                      )}
                      
                      <View style={[styles.learnButton, { backgroundColor: section.color }]}>
                        <Text style={styles.learnButtonText}>Learn More</Text>
                        {renderIcon('chevron-right', 16, '#fff')}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}

          {/* Facts Card */}
          <View style={styles.factsContainer}>
            <View style={styles.factsCard}>
              <View style={styles.factsHeader}>
                <View style={[styles.factsIconContainer, { backgroundColor: '#dbeafe' }]}>
                  {renderIcon('info', 18, '#3b82f6')}
                </View>
                <Text style={styles.factsTitle}>Did You Know?</Text>
              </View>
              <Animated.View style={[styles.factsContent, { opacity: fadeAnim }]}>
                <Text style={styles.factText}>{funFacts[currentFactIndex].fact}</Text>
              </Animated.View>
              <View style={styles.factsDots}>
                {funFacts.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.factDot,
                      currentFactIndex === index ? styles.factDotActive : {}
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
          
          {/* Trending Now Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.trendingHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: '#fee2e2' }]}>
                  {renderIcon('trending-up', 18, '#ef4444')}
                </View>
                <Text style={styles.sectionTitle}>Related videos</Text>
              </View>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                {renderIcon('chevron-right', 16, '#10b981')}
              </TouchableOpacity>
            </View>
            
            {/* Video Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {youtubeVideos.map((video) => (
                <View key={video.id} style={styles.videoCard}>
                  <View style={styles.thumbnailContainer}>
                    <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                    <View style={styles.thumbnailOverlay}></View>
                  </View>
                  <View style={styles.videoCardContent}>
                    <View style={styles.videoCardHeader}>
                      <Text style={styles.videoCardTitle}>{video.title}</Text>
                    </View>
                    <Text style={styles.videoCardDescription}>{video.channel}</Text>
                    <View style={styles.videoCardStats}>
                      {renderIcon('video', 14, '#6b7280')}
                      <Text style={styles.videoCardStatsText}>YouTube</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Quick Tips Grid */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.tipsHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: '#f1f5f9' }]}>
                  {renderIcon('star', 18, '#64748b')}
                </View>
                <Text style={styles.sectionTitle}>Quick Tips</Text>
              </View>
            </View>
            
            <View style={styles.tipsGrid}>
              <View style={styles.tipCard}>
                <View style={[styles.tipCategoryBadge, { backgroundColor: '#ecfdf5' }]}>
                  <Text style={[styles.tipCategoryText, { color: '#10b981' }]}>Food</Text>
                </View>
                <Text style={styles.tipText}>Store herbs like fresh flowers in water to keep them fresh longer</Text>
              </View>
              
              <View style={styles.tipCard}>
                <View style={[styles.tipCategoryBadge, { backgroundColor: '#eff6ff' }]}>
                  <Text style={[styles.tipCategoryText, { color: '#3b82f6' }]}>Water</Text>
                </View>
                <Text style={styles.tipText}>Place a filled water bottle in your toilet tank to reduce water usage</Text>
              </View>
              
              <View style={styles.tipCard}>
                <View style={[styles.tipCategoryBadge, { backgroundColor: '#f1f5f9' }]}>
                  <Text style={[styles.tipCategoryText, { color: '#6b7280' }]}>Waste</Text>
                </View>
                <Text style={styles.tipText}>Use cloth napkins instead of paper to reduce household waste</Text>
              </View>
              
              <View style={styles.tipCard}>
                <View style={[styles.tipCategoryBadge, { backgroundColor: '#f3e8ff' }]}>
                  <Text style={[styles.tipCategoryText, { color: '#8b5cf6' }]}>Shopping</Text>
                </View>
                <Text style={styles.tipText}>Make a shopping list before going to the store to avoid impulse buys</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Navigation>
    </SafeAreaView>
  );
};

export default EducationHubScreen;