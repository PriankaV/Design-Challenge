import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Animated, AccessibilityInfo, Image } from 'react-native';
import Navigation from '../components/navigation/Navigation';
import { Utensils, PiggyBank, Droplet, Recycle, Info, Video, Play, ShoppingBag } from 'lucide-react';
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
    default:
      return <Info size={size} color={color} />;
  }
};

const renderYoutubeVideo = ({ item }) => (
  <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
    <View style={styles.videoCard}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.videoThumbnail}
        accessibilityLabel={`Thumbnail for ${item.title}`}
      />
      <View style={styles.playButton}>{renderIcon('play', 20, '#fff')}</View>
      <View style={styles.videoContent}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoChannel}>{item.channel}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const renderCard = ({ item, sectionColor }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      if (item.videoLink) {
        Linking.openURL(item.videoLink).catch(err =>
          console.error("Failed to open URL:", err)
        );
      } else {
        console.warn("No videoLink found");
      }
    }}
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



const funFacts = [
  { id: '1', fact: 'Did you know? Nearly 1/3 of all food produced globally is wasted each year.' },
  { id: '2', fact: 'Storing potatoes and onions separately makes them both last longer!' },
  { id: '3', fact: 'Freezing leftover bread slices can extend their life by up to 3 months.' },
  { id: '4', fact: 'Banana peels can be used to polish shoes or as garden fertilizer!' },
  { id: '5', fact: 'A family of four can save about $1,500 per year by reducing their food waste.' },
];

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
          <View style={styles.heroWrapper}>
            <ImageBackground
              source={require('../../assets/images/img.png')}
              style={styles.heroPattern}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['transparent', '#fff']}
                style={styles.gradientOverlay}
                pointerEvents="none"
              />
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>Food & Resource Savings Guide</Text>
                <Text style={styles.heroSubtitle}>
                  Simple, practical ways to reduce waste, save money, and make the most of what you have
                </Text>
              </View>
            </ImageBackground>
          </View>

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

export default EducationHubScreen;