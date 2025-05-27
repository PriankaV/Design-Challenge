import { ChevronRight, Droplet, Info, PiggyBank, Play, Recycle, Search, ShoppingBag, Star, TrendingUp, Utensils, Video, X } from 'lucide-react';
import React, { useState } from 'react';
import { ImageBackground, Linking, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
import Navigation from '../components/navigation/Navigation';
import styles from '../styles/EducationHub';
import ChatBot from '../utils/ChatBot';

const renderIcon = (iconName: string, size: string | number | undefined, color: string | undefined) => {
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
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Navigation>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
        {/* Full-Width Hero Banner */}
        <ImageBackground
          source={require('../assets/images/edu-background.svg')}
          style={styles.heroBackgroundFullWidth}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Food & Resource Savings Guide</Text>
            <Text style={styles.heroSubtitle}>
              Simple, practical ways to reduce waste, save money, and make the most of what you have
            </Text>
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
                  <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
                    {renderIcon('x', 16, '#6b7280')}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
        {/* Categories as Cards */}
        <View style={styles.categoryContainer}>
          {categories.map((category) => {
            // Filter tips by search query
            const filteredTips = category.data.filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Skip category if no tips match
            if (filteredTips.length === 0) return null;

            return (
              <View key={category.title} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                    {renderIcon(category.icon, 18, category.color)}
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                </View>
                {filteredTips.map((item) => (
                  <TouchableOpacity
                    key={item.title}
                    style={styles.tipCard}
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.tipText}>{item.title}</Text>
                      {item.videoLink && (
                        <Video size={14} color="#FF0000" style={{ marginLeft: 6 }} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Footer />
      <ChatBot visible={false} />
    </Navigation>
  );
};

export default EducationHubScreen;