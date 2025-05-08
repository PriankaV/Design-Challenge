import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';

const initialPosts = [
  {
    id: '1',
    user: 'Alice',
    request: 'Looking for 2 eggs',
    offer: 'Can share some flour',
  },
  {
    id: '2',
    user: 'Bob',
    request: 'Need some sugar',
    offer: 'Have extra milk to share',
  },
];

const CommunityScreen = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newRequest, setNewRequest] = useState('');
  const [newOffer, setNewOffer] = useState('');

  const addPost = () => {
    if (newRequest && newOffer) {
      const newPost = {
        id: (posts.length + 1).toString(),
        user: 'You',
        request: newRequest,
        offer: newOffer,
      };
      setPosts([newPost, ...posts]);
      setNewRequest('');
      setNewOffer('');
    }
  };

  const renderPost = ({ item }: { item: typeof initialPosts[0] }) => (
    <View style={styles.postCard}>
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.text}>Request: {item.request}</Text>
      <Text style={styles.text}>Offer: {item.offer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Forum</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What are you looking for?"
          value={newRequest}
          onChangeText={setNewRequest}
        />
        <TextInput
          style={styles.input}
          placeholder="What can you offer?"
          value={newOffer}
          onChangeText={setNewOffer}
        />
        <Button title="Post" onPress={addPost} />
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default CommunityScreen;