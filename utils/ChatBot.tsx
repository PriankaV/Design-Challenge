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
    bottom: 30,
    right: 30,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 9999,
    elevation: 9999,
  },
  bubbleText: { fontSize: 24 },
  chatContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 320,
    maxHeight: 420,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 10,
    elevation: 9999,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  closeButton: { alignSelf: 'flex-end', padding: 4 },
  closeText: { fontSize: 20 },
  messages: {
    flex: 1,
    marginVertical: 10,
    maxHeight: 260,
  },
  bot: {
    color: '#2e7d32',
    marginVertical: 2,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 8,
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '85%',
  },
  user: {
    color: '#1565c0',
    alignSelf: 'flex-end',
    marginVertical: 2,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 8,
    flexWrap: 'wrap',
    maxWidth: '85%',
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    marginRight: 8,
    minHeight: 36,
    maxHeight: 80,
    backgroundColor: '#fafafa',
    textAlignVertical: 'top',
  },
  send: { padding: 6 },
});
