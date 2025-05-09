import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Navigation from '../components/navigation/Navigation';

const initialPosts = [
  { id: '1', user: 'Alice', request: 'Looking for 2 eggs', offer: 'Can share some flour' },
  { id: '2', user: 'Bob', request: 'Need some sugar', offer: 'Have extra milk to share' },
];

const CommunityScreen = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newRequest, setNewRequest] = useState('');
  const [newOffer, setNewOffer] = useState('');
  const [mode, setMode] = useState<'ask' | 'offer' | 'both'>('both');

  const addPost = () => {
    const hasRequest = mode === 'ask' || mode === 'both';
    const hasOffer = mode === 'offer' || mode === 'both';

    if ((hasRequest && !newRequest.trim()) || (hasOffer && !newOffer.trim())) {
      Alert.alert('Missing Info', 'Please fill out all required fields for your selected mode.');
      return;
    }

    const newPost = {
      id: (posts.length + 1).toString(),
      user: 'You',
      request: hasRequest ? newRequest : '',
      offer: hasOffer ? newOffer : '',
    };

    setPosts([newPost, ...posts]);
    setNewRequest('');
    setNewOffer('');
  };

  const renderPost = ({ item }: { item: typeof initialPosts[0] }) => (
    <View style={styles.postCard}>
      <Text style={styles.user}>{item.user}</Text>
      {item.request ? <Text style={styles.text}>🛒 Request: {item.request}</Text> : null}
      {item.offer ? <Text style={styles.text}>🎁 Offer: {item.offer}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navigation>
      <View style={styles.container}>
        <Text style={styles.header}>🤝 Community Forum</Text>

        <View style={styles.segmentedControl}>
          {['ask', 'offer', 'both'].map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.segmentButton, mode === m && styles.activeSegment]}
              onPress={() => setMode(m as 'ask' | 'offer' | 'both')}
            >
              <Text style={[styles.segmentText, mode === m && styles.activeSegmentText]}>
                {m === 'ask' ? 'Ask' : m === 'offer' ? 'Offer' : 'Ask & Offer'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          {(mode === 'ask' || mode === 'both') && (
            <TextInput
              style={styles.input}
              placeholder="What are you looking for?"
              value={newRequest}
              onChangeText={setNewRequest}
            />
          )}
          {(mode === 'offer' || mode === 'both') && (
            <TextInput
              style={styles.input}
              placeholder="What can you offer?"
              value={newOffer}
              onChangeText={setNewOffer}
            />
          )}
          <TouchableOpacity style={styles.postButton} onPress={addPost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
      </Navigation>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2c3e50',
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  segmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  activeSegment: {
    backgroundColor: '#2ecc71',
  },
  segmentText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeSegmentText: {
    color: '#fff',
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#34495e',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
});

export default CommunityScreen;
