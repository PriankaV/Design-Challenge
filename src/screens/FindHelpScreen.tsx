import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, AccessibilityInfo, Linking } from 'react-native';
import { MapPin, Briefcase, Home, Book, Apple, ChevronRight, ExternalLink, Users, Phone, Star, Info, FileText } from 'lucide-react';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/Footer';

const FindHelpScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Check if screen reader is enabled
  useEffect(() => {
    const checkScreenReader = async () => {
      const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
    };
    
    checkScreenReader();
    
    // Listen for screen reader changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (enabled) => {
      }
    );
    
    return () => {
      subscription.remove();
    };
  }, []);

  const handleResourcePress = (url) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  // Resource categories
  const resourceCategories = [
    { id: 'all', label: 'All Resources' },
    { id: 'food', label: 'Food Assistance' },
    { id: 'housing', label: 'Housing' },
    { id: 'financial', label: 'Financial Aid' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' }
  ];

  // Federal resources
  const federalResources = [
    { 
      id: 'snap',
      title: 'SNAP Benefits (Food Stamps)', 
      description: 'Supplemental Nutrition Assistance Program provides nutrition benefits to supplement food budget', 
      url: 'https://www.fns.usda.gov/snap/recipient/eligibility', 
      icon: 'Apple',
      category: 'food'
    },
    { 
      id: 'wic',
      title: 'WIC Program', 
      description: 'Special nutrition program for Women, Infants, and Children', 
      url: 'https://www.fns.usda.gov/wic', 
      icon: 'Users',
      category: 'food'
    },
    { 
      id: 'medicaid',
      title: 'Medicaid', 
      description: 'Health coverage for eligible low-income adults and children', 
      url: 'https://www.medicaid.gov/about-us/contact-us/index.html', 
      icon: 'Star',
      category: 'healthcare'
    },
    { 
      id: 'hud',
      title: 'HUD Housing Assistance', 
      description: 'Federal housing vouchers and public housing programs', 
      url: 'https://www.hud.gov/topics/rental_assistance', 
      icon: 'Home',
      category: 'housing'
    },
    { 
      id: 'liheap',
      title: 'LIHEAP', 
      description: 'Low Income Home Energy Assistance Program', 
      url: 'https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap', 
      icon: 'Home',
      category: 'housing'
    },
    { 
      id: 'eitc',
      title: 'Earned Income Tax Credit', 
      description: 'Tax benefits for working individuals with low to moderate income', 
      url: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc', 
      icon: 'FileText',
      category: 'financial'
    },
    { 
      id: 'tanf',
      title: 'TANF', 
      description: 'Temporary Assistance for Needy Families provides financial assistance', 
      url: 'https://www.acf.hhs.gov/ofa/programs/temporary-assistance-needy-families-tanf', 
      icon: 'Briefcase',
      category: 'financial'
    },
    { 
      id: 'pell',
      title: 'Federal Pell Grants', 
      description: 'Educational grants for undergraduate students with financial need', 
      url: 'https://studentaid.gov/understand-aid/types/grants/pell', 
      icon: 'Book',
      category: 'education'
    }
  ];

  // Nonprofit resources
  const nonprofitResources = [
    { 
      id: 'feeding',
      title: 'Feeding America', 
      description: 'Nationwide network of food banks', 
      url: 'https://www.feedingamerica.org/find-your-local-foodbank', 
      icon: 'Apple',
      category: 'food'
    },
    { 
      id: 'pantries',
      title: 'FoodPantries.org', 
      description: 'Directory of local food pantries', 
      url: 'https://www.foodpantries.org/', 
      icon: 'MapPin',
      category: 'food'
    },
    { 
      id: 'habitat',
      title: 'Habitat for Humanity', 
      description: 'Building and improving homes for families in need', 
      url: 'https://www.habitat.org/housing-help', 
      icon: 'Home',
      category: 'housing'
    },
    { 
      id: 'salvation',
      title: 'Salvation Army', 
      description: 'Emergency financial assistance and services', 
      url: 'https://www.salvationarmyusa.org/usn/plugins/gdosCenterSearch?mode=query_2&lat=0&lng=0&code=&query=&limit=20', 
      icon: 'Info',
      category: 'financial'
    },
    { 
      id: 'unitedway',
      title: 'United Way 211', 
      description: 'Phone service connecting people to essential resources', 
      url: 'https://www.211.org/', 
      icon: 'Phone',
      category: 'all'
    }
  ];

  // Filter resources based on active tab
  const filteredResources = [...federalResources, ...nonprofitResources].filter(resource => 
    activeTab === 'all' || resource.category === activeTab
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryTab, activeTab === item.id && styles.categoryTabActive]}
      onPress={() => setActiveTab(item.id)}
      accessibilityLabel={`${item.label} category tab`}
      accessibilityRole="tab"
      accessibilityState={{ selected: activeTab === item.id }}
    >
      <Text style={[styles.categoryTabText, activeTab === item.id && styles.categoryTabTextActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderResourceItem = ({ item }) => {
    // Determine which icon component to use
    let IconComponent;
    switch(item.icon) {
      case 'Apple': IconComponent = Apple; break;
      case 'Users': IconComponent = Users; break;
      case 'Star': IconComponent = Star; break;
      case 'Home': IconComponent = Home; break;
      case 'Briefcase': IconComponent = Briefcase; break;
      case 'Book': IconComponent = Book; break;
      case 'MapPin': IconComponent = MapPin; break;
      case 'Phone': IconComponent = Phone; break;
      case 'FileText': IconComponent = FileText; break;
      case 'Info': IconComponent = Info; break;
      default: IconComponent = Info;
    }
    
    return (
      <TouchableOpacity
        style={styles.resourceItem}
        onPress={() => handleResourcePress(item.url)}
        accessibilityLabel={`${item.title}. ${item.description}`}
        accessibilityRole="link"
        accessibilityHint="Opens external website for more information"
      >
        <View style={styles.resourceIconContainer}>
          <IconComponent size={20} color="#FFFFFF" />
        </View>
        <View style={styles.resourceContent}>
          <Text style={styles.resourceTitle}>{item.title}</Text>
          <Text style={styles.resourceDescription}>{item.description}</Text>
        </View>
        <ExternalLink size={16} color="#757575" />
      </TouchableOpacity>
    );
  };

  const EmergencyCallToAction = () => (
    <TouchableOpacity
      style={styles.emergencyContainer}
      onPress={() => Linking.openURL('tel:211')}
      accessibilityLabel="In immediate need? Call 211 for emergency assistance"
      accessibilityRole="button"
    >
      <View style={styles.emergencyContent}>
        <Phone size={22} color="#D32F2F" style={styles.emergencyIcon} />
        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyTitle}>In immediate need?</Text>
          <Text style={styles.emergencyDescription}>Call 211 for emergency assistance</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#D32F2F" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Navigation>
          <View style={styles.headerContainer}>
            <Text style={styles.pageTitle}>Find Assistance</Text>
            <Text style={styles.pageSubtitle}>
              Resources to help connect you with food, housing, and financial assistance programs
            </Text>
          </View>
          
          {/* Emergency CTA */}
          <EmergencyCallToAction />
          
          {/* Category Filter */}
          <View style={styles.categoriesContainer}>
            <FlatList
              horizontal
              data={resourceCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>
          
          {/* Find Local Services Button -- navigate to food map */}
          {/* <TouchableOpacity
            style={styles.findLocalContainer}
            onPress={handleFindNearbyPress}
            accessibilityLabel="Find local services near you"
            accessibilityRole="button"
          >
            <View style={styles.findLocalButton}>
              <MapPin size={20} color="#FFFFFF" style={styles.findLocalIcon} />
              <Text style={styles.findLocalText}>Find Local Services Near You</Text>
            </View>
          </TouchableOpacity> */}

          {/* Federal Programs Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Briefcase size={18} color="#1565C0" />
              <Text style={styles.sectionTitle}>Federal & State Programs</Text>
            </View>
            <View style={styles.resourcesList}>
              <FlatList
                data={federalResources.filter(res => activeTab === 'all' || res.category === activeTab)}
                keyExtractor={(item) => item.id}
                renderItem={renderResourceItem}
                scrollEnabled={false}
                ListEmptyComponent={
                  <Text style={styles.emptyListText}>No federal programs found in this category</Text>
                }
              />
            </View>
          </View>

          {/* Nonprofit Resources Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Users size={18} color="#1565C0" />
              <Text style={styles.sectionTitle}>Nonprofit Organizations</Text>
            </View>
            <View style={styles.resourcesList}>
              <FlatList
                data={nonprofitResources.filter(res => activeTab === 'all' || res.category === activeTab)}
                keyExtractor={(item) => item.id}
                renderItem={renderResourceItem}
                scrollEnabled={false}
                ListEmptyComponent={
                  <Text style={styles.emptyListText}>No nonprofit resources found in this category</Text>
                }
              />
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              Eligibility requirements and availability may vary. Contact each organization directly for the most current information.
            </Text>
          </View>
        </Navigation>
        <Footer/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: '#1976D2',
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  // Emergency CTA
  emergencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emergencyIcon: {
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D32F2F',
    marginBottom: 2,
  },
  emergencyDescription: {
    fontSize: 13,
    color: '#616161',
  },
  // Category Tabs
  categoriesContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTabActive: {
    backgroundColor: '#1976D2',
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1976D2',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  // Find Local Button
  findLocalContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  findLocalButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  findLocalIcon: {
    marginRight: 10,
  },
  findLocalText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Section Styling
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#F5F7FA',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565C0',
    marginLeft: 8,
  },
  resourcesList: {
    overflow: 'hidden',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  resourceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
    paddingRight: 8,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
  emptyListText: {
    padding: 16,
    textAlign: 'center',
    color: '#757575',
    fontStyle: 'italic',
  },
  // Disclaimer
  disclaimerContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default FindHelpScreen;