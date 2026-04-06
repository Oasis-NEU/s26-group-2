import { useCallback, useState } from 'react';
import { useFocusEffect, router } from 'expo-router';
import {
  Alert,
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
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import {
  BellIcon,
  GamesIcon,
  MeditateIcon,
  ResourcesIcon,
  HeartIcon,
  MOOD_ICONS,
} from '../../components/serenity-icons';
import { Fonts } from '../../constants/theme';

export const MOODS = [
  { label: 'Great' },
  { label: 'Good' },
  { label: 'Okay' },
  { label: 'Low' },
  { label: 'Awful' },
];

const CATEGORIES = [
  { Icon: GamesIcon, label: 'Games' },
  { Icon: MeditateIcon, label: 'Meditate' },
  { Icon: ResourcesIcon, label: 'Resources' },
];

const ARTICLES = [
  {
    tag: 'Games & Cognition',
    title: 'How Tetris Helps in Times of Distress',
    subtitle: 'Research shows Tetris can reduce intrusive thoughts and PTSD symptoms.',
    Icon: GamesIcon,
    url: 'https://www.psychologytoday.com/us/blog/what-mentally-strong-people-dont-do/202502/how-tetris-might-help-prevent-ptsd',
    bg: '#EBF3FB',
    accent: '#1A5276',
    iconBg: '#D6EAF8',
  },
  {
    tag: 'Mindfulness',
    title: 'The Science of Meditation',
    subtitle: 'Evidence-based techniques to reduce stress and improve focus.',
    Icon: MeditateIcon,
    url: 'https://www.healthline.com/nutrition/12-benefits-of-meditation',
    bg: '#EAF4F4',
    accent: '#117A65',
    iconBg: '#D0EAE7',
  },
  {
    tag: 'Mental Health',
    title: 'Additional Resources',
    subtitle: 'Vetted tools, hotlines, and guides for your mental health journey.',
    Icon: HeartIcon,
    url: 'https://www.healthline.com/health/mental-health-resources#emergency-help',
    bg: '#F0EBF8',
    accent: '#6C3483',
    iconBg: '#E3D0F0',
  },
];

const MOOD_SELECTED_COLOR = '#2E86C1';
const MOOD_DEFAULT_COLOR = '#C0D4E4';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [pendingMood, setPendingMood] = useState<number | null>(null);
  const [usernameHeader, setUsernameHeader] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      const fetchUsername = async () => {
        await supabase.auth.refreshSession();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setUsernameHeader(user.user_metadata?.username || user.email);
      };
      fetchUsername();
    }, [])
  );

  const handleMoodPress = (index: number) => {
    setPendingMood(index);
    setJournalText('');
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (pendingMood === null) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { Alert.alert('Not logged in', 'No user found'); return; }

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const moodEmojis = ['😄', '😊', '😐', '😟', '😢'];

    const { error } = await supabase
      .from('journal_entries')
      .upsert(
        {
          user_id: user.id,
          entry_date: today,
          mood_index: pendingMood,
          mood_emoji: moodEmojis[pendingMood],
          journal_text: journalText,
        },
        { onConflict: 'user_id,entry_date' }
      );

    if (error) { Alert.alert('Save failed', error.message); return; }
    Alert.alert('Saved', `Mood logged for ${today}`);
    setSelectedMood(pendingMood);
    setModalVisible(false);
  };

  const handleClose = () => { setModalVisible(false); setPendingMood(null); };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={handleClose}>
        <Pressable style={styles.overlay} onPress={handleClose}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              {pendingMood !== null && (() => {
                const MoodIcon = MOOD_ICONS[pendingMood];
                return (
                  <View style={styles.modalIconWrap}>
                    <MoodIcon size={52} color={MOOD_SELECTED_COLOR} strokeWidth={1.3} />
                  </View>
                );
              })()}
              <Text style={styles.modalTitle}>
                {pendingMood !== null ? MOODS[pendingMood].label : ''}
              </Text>
              <Text style={styles.modalSubtitle}>Want to share what&apos;s on your mind?</Text>
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
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleClose}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#C8E3F5', '#DCF0F8', '#F0F5FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerEyebrow}>Good morning</Text>
              <Text style={styles.headerTitle}>{usernameHeader || 'Serenity'}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <BellIcon size={18} color="#2E7D8C" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.moodCard}>
          <Text style={styles.moodTitle}>How are you feeling today?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((mood, i) => {
              const MoodIcon = MOOD_ICONS[i];
              const isSelected = selectedMood === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.moodButton, isSelected && styles.moodButtonSelected]}
                  onPress={() => handleMoodPress(i)}
                >
                  <MoodIcon size={34} color={isSelected ? MOOD_SELECTED_COLOR : MOOD_DEFAULT_COLOR} strokeWidth={1.4} />
                  <Text style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}>{mood.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionHeading}>Explore</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={styles.categoryCard}
              onPress={() => {
                if (cat.label === 'Games') router.push('/explore');
                if (cat.label === 'Resources') router.push('/resources');
              }}
            >
              <View style={styles.categoryIconWrap}>
                <cat.Icon size={26} color="#2E7D8C" strokeWidth={1.5} />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

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
            <View style={[styles.articleIconWrap, { backgroundColor: a.iconBg }]}>
              <a.Icon size={28} color={a.accent} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F5FA' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  gradientHeader: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 26, marginBottom: -8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerEyebrow: { fontSize: 11, color: '#4A8FB5', fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3, fontFamily: Fonts.bodySemiBold },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#0F2D45', letterSpacing: -0.5, fontFamily: Fonts.heading },
  iconButton: { backgroundColor: 'rgba(255,255,255,0.82)', borderRadius: 12, padding: 10, borderWidth: 0.5, borderColor: 'rgba(74,143,181,0.25)' },
  moodCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginHorizontal: 22, marginTop: 18, marginBottom: 26, borderWidth: 0.5, borderColor: '#D4E8F5', shadowColor: '#1A5276', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  moodTitle: { fontSize: 14, fontWeight: '600', color: '#1A3A52', marginBottom: 18, letterSpacing: 0.1, fontFamily: Fonts.bodySemiBold },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodButton: { alignItems: 'center', paddingVertical: 8, paddingHorizontal: 4, borderRadius: 14, borderWidth: 1.5, borderColor: 'transparent', minWidth: 52 },
  moodButtonSelected: { backgroundColor: '#EBF3FB', borderColor: '#2E86C1' },
  moodLabel: { fontSize: 10, color: '#B8CDD9', marginTop: 5, fontWeight: '500', fontFamily: Fonts.bodyMedium },
  moodLabelSelected: { color: '#2E86C1' },
  sectionHeading: { fontSize: 16, fontWeight: '700', color: '#0F2D45', marginBottom: 14, paddingHorizontal: 22, fontFamily: Fonts.heading },
  categoryRow: { flexDirection: 'row', marginHorizontal: 22, marginBottom: 28, gap: 12 },
  categoryCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 18, alignItems: 'center', borderWidth: 0.5, borderColor: '#D4E8F5', shadowColor: '#1A5276', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  categoryIconWrap: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#EAF4F4', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  categoryLabel: { fontSize: 11, color: '#2E7D8C', fontWeight: '600', letterSpacing: 0.2, fontFamily: Fonts.bodySemiBold },
  articleCard: { borderRadius: 20, padding: 18, marginHorizontal: 22, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.04)' },
  articleLeft: { flex: 1, paddingRight: 12 },
  articleTag: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 8 },
  articleTagText: { fontSize: 9, color: '#fff', fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', fontFamily: Fonts.bodySemiBold },
  articleTitle: { fontSize: 14, fontWeight: '700', marginBottom: 5, lineHeight: 20, fontFamily: Fonts.heading },
  articleSubtitle: { fontSize: 12, color: '#5A7080', lineHeight: 17, marginBottom: 10, fontFamily: Fonts.body },
  readMoreRow: { flexDirection: 'row', alignItems: 'center' },
  readMore: { fontSize: 12, fontWeight: '600', fontFamily: Fonts.bodySemiBold },
  readMoreArrow: { fontSize: 13, fontWeight: '600' },
  articleIconWrap: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  overlay: { flex: 1, backgroundColor: 'rgba(200,227,245,0.88)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 28, padding: 28, width: '100%', alignItems: 'center', borderWidth: 0.5, borderColor: '#C8DDE6', shadowColor: '#1A5276', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 10 },
  modalIconWrap: { marginBottom: 8 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0F2D45', marginBottom: 4, fontFamily: Fonts.heading },
  modalSubtitle: { fontSize: 13, color: '#7F8C8D', marginBottom: 18, textAlign: 'center', fontFamily: Fonts.body },
  modalInput: { width: '100%', minHeight: 120, backgroundColor: '#EBF5FB', borderRadius: 14, padding: 14, fontSize: 14, color: '#2C3E50', borderWidth: 1, borderColor: '#AED6F1', textAlignVertical: 'top', fontFamily: Fonts.body },
  buttonRow: { flexDirection: 'row', marginTop: 18, gap: 12, width: '100%' },
  modalButton: { flex: 1, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  cancelButton: { backgroundColor: '#EBF5FB', borderWidth: 1, borderColor: '#AED6F1' },
  cancelButtonText: { color: '#5B7FA5', fontWeight: '600', fontSize: 15, fontFamily: Fonts.bodySemiBold },
  saveButton: { backgroundColor: '#2E86C1' },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 15, fontFamily: Fonts.bodySemiBold },
});