import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { queryLlama } from './queryLlama'; // adjust path if needed

const ChatBot = ({ visible = false }: { visible?: boolean }) => {
  const [minimized, setMinimized] = useState(!visible);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about nutrition.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userInput }]);
    setInput('');
    setLoading(true);

    try {
      const botResponse = await queryLlama(userInput);
      setMessages((prev) => [...prev, { from: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Sorry, I had trouble answering that.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (minimized) {
    return (
      <TouchableOpacity style={styles.bubble} onPress={() => setMinimized(false)}>
        <Text style={styles.bubbleText}>💬</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.chatContainer}>
      <TouchableOpacity onPress={() => setMinimized(true)} style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
      <ScrollView style={styles.messages}>
        {messages.map((msg, i) => (
          <Text key={i} style={msg.from === 'bot' ? styles.bot : styles.user}>
            {msg.text}
          </Text>
        ))}
        {loading && <ActivityIndicator size="small" color="#999" />}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask a question..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.send}>
          <Text>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  bubbleText: { fontSize: 24 },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    maxHeight: '50%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    elevation: 10,
  },
  closeButton: { alignSelf: 'flex-end' },
  closeText: { fontSize: 20 },
  messages: { marginVertical: 10 },
  bot: { color: '#2e7d32', marginVertical: 2 },
  user: { color: '#1565c0', alignSelf: 'flex-end', marginVertical: 2 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    marginRight: 8,
  },
  send: { padding: 6 },
});
