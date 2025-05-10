import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

type NavigationProps = {
  children?: React.ReactNode;
};

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>
            🍽️ <Text style={{ fontWeight: 'bold' }}>BudgetBites</Text>
          </Text>
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.link}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
              <Text style={styles.link}>Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Education Hub')}>
              <Text style={styles.link}>Education Hub</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Community')}>
              <Text style={styles.link}>Community</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <Text style={styles.icon}>♡</Text>
            <Text style={styles.icon}>🔍</Text>
            <Text style={styles.icon}>👤</Text>
          </View>
        </View>
        <View style={styles.webContent}>
          {children}
        </View>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>
          🍽️ <Text style={{ fontWeight: 'bold' }}>BudgetBites</Text>
        </Text>
        <View style={styles.icons}>
          <Text style={styles.icon}>♡</Text>
          <Text style={styles.icon}>🔍</Text>
          <Text style={styles.icon}>👤</Text>
        </View>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
          <Text style={styles.link}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Education Hub')}>
          <Text style={styles.link}>Education Hub</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <Text style={styles.link}>Community</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  webContent: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fafafa',
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
  topBar: {
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomBar: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    marginTop: 60, // Adjust based on your topBar height
    marginBottom: 60, // Adjust based on your bottomBar height
  },
});