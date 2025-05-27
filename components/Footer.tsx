import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Hi
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 1,
    paddingBottom: 1,
    paddingHorizontal: 2,
    backgroundColor: '#f8efd4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 12,
    color: '#718096'
  }
});

export default Footer;