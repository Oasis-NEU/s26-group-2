import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MOODS = [
  { emoji: '😄', label: 'Great' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😟', label: 'Low' },
  { emoji: '😢', label: 'Awful' },
];

const CATEGORIES = [
  { emoji: '🎮', label: 'Games' },
  { emoji: '🧘', label: 'Meditate' },
  { emoji: '📚', label: 'Resources' },
];

const ARTICLES = [
  {
    tag: 'Games & Cognition',
    title: 'How Tetris Helps in Times of Distress',
    subtitle: 'Research shows Tetris can reduce intrusive thoughts and PTSD symptoms.',
    emoji: '🧩',
    url: 'https://www.psychologytoday.com/us/blog/what-mentally-strong-people-dont-do/202502/how-tetris-might-help-prevent-ptsd',
    bg: '#EBF3FB',
    accent: '#1A5276',
  },
  {
    tag: 'Mindfulness',
    title: 'The Science of Meditation',
    subtitle: 'Evidence-based techniques to reduce stress and improve focus.',
    emoji: '🧘',
    url: 'https://www.healthline.com/nutrition/12-benefits-of-meditation',
    bg: '#EAF4F4',
    accent: '#117A65',
  },
  {
    tag: 'Mental Health',
    title: 'Additional Resources',
    subtitle: 'Vetted tools, hotlines, and guides for your mental health journey.',
    emoji: '💙',
    url: 'https://www.healthline.com/health/mental-health-resources#emergency-help',
    bg: '#F0EBF8',
    accent: '#6C3483',
  },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [pendingMood, setPendingMood] = useState<number | null>(null);

  const handleMoodPress = (index: number) => {
    setPendingMood(index);
    setJournalText('');
    setModalVisible(true);
  };

  const handleSave = () => {
    if (pendingMood !== null) setSelectedMood(pendingMood);
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
    setPendingMood(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Mood Journal Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <Pressable style={styles.overlay} onPress={handleClose}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              {pendingMood !== null && (
                <Text style={styles.modalEmoji}>{MOODS[pendingMood].emoji}</Text>
              )}
              <Text style={styles.modalTitle}>
                {pendingMood !== null ? MOODS[pendingMood].label : ''}
              </Text>
              <Text style={styles.modalSubtitle}>Want to share what's on your mind?</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Write your thoughts here..."
                placeholderTextColor="#AABBD0"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={journalText}
                onChangeText={setJournalText}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>Good morning</Text>
            <Text style={styles.headerTitle}>Serenity</Text>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Mood Checker */}
        <View style={styles.moodCard}>
          <Text style={styles.moodTitle}>How are you feeling today?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((mood, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.moodButton, selectedMood === i && styles.moodButtonSelected]}
                onPress={() => handleMoodPress(i)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[styles.moodLabel, selectedMood === i && styles.moodLabelSelected]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionHeading}>Explore</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={styles.categoryCard}
              onPress={() => cat.label === 'Games' && router.push('/explore')}
            >
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Articles */}
        <Text style={styles.sectionHeading}>Learn & Grow</Text>
        {ARTICLES.map((a, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.articleCard, { backgroundColor: a.bg }]}
            onPress={() => Linking.openURL(a.url)}
            activeOpacity={0.85}
          >
            <View style={styles.articleLeft}>
              <View style={[styles.articleTag, { backgroundColor: a.accent }]}>
                <Text style={styles.articleTagText}>{a.tag}</Text>
              </View>
              <Text style={[styles.articleTitle, { color: a.accent }]}>{a.title}</Text>
              <Text style={styles.articleSubtitle}>{a.subtitle}</Text>
              <View style={styles.readMoreRow}>
                <Text style={[styles.readMore, { color: a.accent }]}>Read more</Text>
                <Text style={[styles.readMoreArrow, { color: a.accent }]}> →</Text>
              </View>
            </View>
            <Text style={styles.articleEmoji}>{a.emoji}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingBottom: 24 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerEyebrow: {
    fontSize: 13,
    color: '#7FB3D3',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A3A52',
    letterSpacing: -0.5,
  },
  bellButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#1A5276',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  divider: { height: 1, backgroundColor: '#DDE8F0', marginBottom: 20 },

  moodCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#1A5276',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  moodTitle: { fontSize: 15, fontWeight: '600', color: '#1A3A52', marginBottom: 16 },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    minWidth: 54,
  },
  moodButtonSelected: { backgroundColor: '#EBF3FB', borderColor: '#2E86C1' },
  moodEmoji: { fontSize: 30 },
  moodLabel: { fontSize: 11, color: '#A0B4C5', marginTop: 4, fontWeight: '500' },
  moodLabelSelected: { color: '#2E86C1' },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(232, 241, 248, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#1A5276',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  modalEmoji: { fontSize: 50, marginBottom: 6 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#1A3A52', marginBottom: 4 },
  modalSubtitle: { fontSize: 13, color: '#7F8C8D', marginBottom: 16, textAlign: 'center' },
  modalInput: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#EBF5FB',
    borderRadius: 12,
    padding: 14,
    fontSize: 13,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#AED6F1',
  },
  buttonRow: { flexDirection: 'row', marginTop: 18, gap: 12, width: '100%' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  cancelButton: { backgroundColor: '#EBF5FB', borderWidth: 1, borderColor: '#AED6F1' },
  cancelButtonText: { color: '#5B7FA5', fontWeight: '600', fontSize: 15 },
  saveButton: { backgroundColor: '#2E86C1' },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },

  sectionHeading: { fontSize: 17, fontWeight: '700', color: '#1A3A52', marginBottom: 14 },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#1A5276',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  categoryEmoji: { fontSize: 28 },
  categoryLabel: { fontSize: 12, color: '#4A6FA5', fontWeight: '600', marginTop: 8 },

  articleCard: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleLeft: { flex: 1, paddingRight: 12 },
  articleTag: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  articleTagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  articleTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6, lineHeight: 22 },
  articleSubtitle: { fontSize: 13, color: '#5A7080', lineHeight: 18, marginBottom: 12 },
  readMoreRow: { flexDirection: 'row', alignItems: 'center' },
  readMore: { fontSize: 13, fontWeight: '600' },
  readMoreArrow: { fontSize: 14, fontWeight: '600' },
  articleEmoji: { fontSize: 44 },
});