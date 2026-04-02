import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
};

const SUGGESTED = [
  "I'm feeling anxious today",
  'Help me calm down',
  'I need to vent',
  'Give me a breathing exercise',
];

const BOT_RESPONSES: Record<string, string> = {
  default:
    "I'm here for you. 💙 Take a deep breath — you don't have to figure everything out right now. Would you like to try a calming exercise, or would you prefer to just talk?",
  anxious:
    "Anxiety can feel overwhelming, but it does pass. Try this: breathe in for 4 counts, hold for 4, and out for 6. Repeat 3 times. You're safe. 🌿",
  calm:
    "Let's slow things down together. Close your eyes if you can, take a slow breath, and notice 5 things around you. You're doing great. 🕊️",
  vent:
    "I'm listening — no judgment, no rush. Go ahead and share whatever's on your mind. 💬",
  breathing:
    "Here's a simple box breathing exercise:\n\n1️⃣ Inhale slowly for 4 counts\n2️⃣ Hold for 4 counts\n3️⃣ Exhale for 4 counts\n4️⃣ Hold for 4 counts\n\nRepeat 4 times. You've got this. 🌬️",
};

function getBotReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('anxi') || lower.includes('anxious') || lower.includes('nervous'))
    return BOT_RESPONSES.anxious;
  if (lower.includes('calm') || lower.includes('relax')) return BOT_RESPONSES.calm;
  if (lower.includes('vent') || lower.includes('talk')) return BOT_RESPONSES.vent;
  if (lower.includes('breath') || lower.includes('breathing')) return BOT_RESPONSES.breathing;
  return BOT_RESPONSES.default;
}

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Hi there 👋 I'm Seren, your mental wellness companion. How are you feeling right now?",
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      time: getTime(),
    };

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotReply(trimmed),
      sender: 'bot',
      time: getTime(),
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowBot]}>
        {!isUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>🌿</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
          <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextBot]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, isUser ? styles.timeUser : styles.timeBot]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <Text style={{ fontSize: 20 }}>🌿</Text>
          </View>
          <View>
            <Text style={styles.headerName}>Seren</Text>
            <Text style={styles.headerStatus}>● Online</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Suggestions (only show if one message exists) */}
        {messages.length === 1 && (
          <View style={styles.suggestions}>
            {SUGGESTED.map((s, i) => (
              <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => sendMessage(s)}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Share what's on your mind..."
            placeholderTextColor="#A0B4C5"
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerName: { fontSize: 17, fontWeight: '700', color: '#1A3A52' },
  headerStatus: { fontSize: 12, color: '#27AE60', fontWeight: '500', marginTop: 1 },
  divider: { height: 1, backgroundColor: '#DDE8F0', marginHorizontal: 0 },

  // Messages
  messageList: { paddingHorizontal: 16, paddingVertical: 20, gap: 16 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowBot: { justifyContent: 'flex-start' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EAF4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 16 },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: '#2E86C1',
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#1A5276',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextUser: { color: '#fff' },
  bubbleTextBot: { color: '#1A3A52' },
  timeText: { fontSize: 10, marginTop: 4 },
  timeUser: { color: 'rgba(255,255,255,0.6)', textAlign: 'right' },
  timeBot: { color: '#A0B4C5' },

  // Suggestions
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  suggestionChip: {
    backgroundColor: '#EBF3FB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#BDD5EA',
  },
  suggestionText: { fontSize: 13, color: '#2E86C1', fontWeight: '500' },

  // Input
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E4EEF5',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1A3A52',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#DDE8F0',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2E86C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: { backgroundColor: '#BDD5EA' },
  sendIcon: { color: '#fff', fontSize: 16, marginLeft: 2 },
});
