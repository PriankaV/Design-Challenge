import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [emailPreferences, setEmailPreferences] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Logic to save the updated settings
    console.log({
      profilePicture,
      username,
      password,
      location,
      emailPreferences,
      dietaryRestrictions,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to select a profile picture</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter your location"
      />

      <Text style={styles.label}>Email Preferences</Text>
      <TextInput
        style={styles.input}
        value={emailPreferences}
        onChangeText={setEmailPreferences}
        placeholder="Enter your email preferences"
      />

      <Text style={styles.label}>Dietary Restrictions</Text>
      <TextInput
        style={styles.input}
        value={dietaryRestrictions}
        onChangeText={setDietaryRestrictions}
        placeholder="Enter your dietary restrictions"
      />

      <Button title="Save Settings" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    color: 'gray',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default SettingsScreen;