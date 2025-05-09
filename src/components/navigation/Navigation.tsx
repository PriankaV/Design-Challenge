import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

const Navigation = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
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
  );
};

export default Navigation;

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
    }
    });