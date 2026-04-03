import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  Alert,
  KeyboardAvoidingView,
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
import { supabase } from '../../lib/supabase';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const DEFAULT_EMOJI = '⬜';

type JournalEntry = {
  emoji: string;
  text: string;
  date: string;
} | null;

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [weekMoods, setWeekMoods] = useState<JournalEntry[]>(Array(7).fill(null));
  const [viewEntry, setViewEntry] = useState<JournalEntry>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        setUsername(user.user_metadata?.username || '');
      }
    };
    fetchUser();
  }, []);

  // Load this week's journal entries from Supabase
  useFocusEffect(
  useCallback(() => {
    const loadWeekEntries = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date();
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - today.getDay());

      const weekDates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      });

      const { data, error } = await supabase
        .from('journal_entries')
        .select('entry_date, mood_emoji, journal_text')
        .eq('user_id', user.id)
        .in('entry_date', weekDates);

      const mapped: JournalEntry[] = weekDates.map(date => {
        const found = data?.find(e => e.entry_date === date);
        return found
          ? { emoji: found.mood_emoji, text: found.journal_text || '', date }
          : null;
      });

      setWeekMoods(mapped);
    };

    loadWeekEntries();
  }, [])
);

  const handleDayPress = (entry: JournalEntry) => {
    if (!entry) return;
    setViewEntry(entry);
    setViewModalVisible(true);
  };

  const handleSaveUsername = async () => {
  if (!draftName.trim() || draftName.length < 3) {
    Alert.alert('Invalid username', 'Username must be at least 3 characters.');
    return;
  }

  // 1. Update auth metadata
  const { error: authError } = await supabase.auth.updateUser({
    data: { username: draftName },
  });
  if (authError) {
    Alert.alert('Error', authError.message);
    return;
  }

  // 2. Update profiles table directly
  const { data: { user } } = await supabase.auth.getUser();
  const { error: dbError } = await supabase
    .from('profiles')
    .update({ username: draftName, updated_at: new Date().toISOString(), email: email })
    .eq('id', user?.id);
  if (dbError) {
    Alert.alert('Error', dbError.message);
    return;
  }
  //update username and email to journal entries database
  const { error: journalError } = await supabase
    .from('journal_entries')
    .update({ username: draftName, email: email })
    .eq('user_id', user!.id);
  if (journalError) { Alert.alert('Error', journalError.message); return; }

  setUsername(draftName);
  setEditModalVisible(false);
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/loginPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ── Edit Username Modal ── */}
      <Modal transparent animationType="fade" visible={editModalVisible}>
        <Pressable style={styles.overlay} onPress={() => setEditModalVisible(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              <Text style={styles.modalTitle}>Edit Username</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new username"
                placeholderTextColor="#AABBD0"
                value={draftName}
                onChangeText={setDraftName}
                autoFocus
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveUsername}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      {/* ── View Journal Entry Modal ── */}
      <Modal transparent animationType="fade" visible={viewModalVisible}>
        <Pressable style={styles.overlay} onPress={() => setViewModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setViewModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.viewEmoji}>{viewEntry?.emoji}</Text>
            <Text style={styles.viewDate}>{viewEntry?.date}</Text>
            <Text style={styles.modalTitle}>Journal Entry</Text>
            <View style={styles.viewTextBox}>
              <Text style={styles.viewText}>
                {viewEntry?.text?.trim() ? viewEntry.text : '(No notes written for this day)'}
              </Text>
            </View>
          </Pressable>
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
            <Text style={styles.headerEyebrow}>Welcome!</Text>
            <Text style={styles.headerTitle}>{username || email || 'Profile'}</Text>
          </View>
          <TouchableOpacity style={styles.gearButton}>
            <Text style={{ fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Profile Picture */}
        <TouchableOpacity style={styles.ppf} />

        {/* Personal Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Personal Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📧 Email</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{email || '—'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Username</Text>
            <Text style={styles.infoValue}>{username || 'Not set'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => { setDraftName(username); setEditModalVisible(true); }}
            >
              <Text style={styles.actionButtonText}>✏️ Edit Username</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Journal This Week */}
        <View style={styles.journalCard}>
          <Text style={styles.sectionTitle}>Journal — This Week</Text>
          <View style={styles.journalTracker}>
            {DAYS.map((day, i) => {
              const entry = weekMoods[i];
              const isToday = i === new Date().getDay();
              const hasEntry = entry !== null;
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => handleDayPress(entry)}
                  activeOpacity={hasEntry ? 0.7 : 1}
                >
                  <View style={[
                    styles.week,
                    isToday && styles.weekToday,
                    hasEntry && styles.weekHasEntry,
                  ]}>
                    <Text style={styles.moodEmoji}>
                      {entry ? entry.emoji : DEFAULT_EMOJI}
                    </Text>
                    <Text style={[styles.weekText, isToday && styles.weekTextToday]}>
                      {day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.journalHint}>Tap a day to read your journal ✨</Text>
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── All styles in ONE StyleSheet.create at the bottom ──
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingTop: 20, paddingBottom: 16,
  },
  headerEyebrow: {
    fontSize: 13, color: '#7FB3D3', fontWeight: '500',
    letterSpacing: 0.5, textTransform: 'uppercase',
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#1A3A52', letterSpacing: -0.5 },
  gearButton: {
    backgroundColor: '#fff', borderRadius: 12, padding: 10,
    shadowColor: '#1A5276', shadowOpacity: 0.08, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  divider: { height: 1, backgroundColor: '#DDE8F0', marginBottom: 20 },

  ppf: {
    backgroundColor: 'rgb(71, 74, 74)',
    marginBottom: 24, alignSelf: 'center',
    height: 100, width: 100,
    borderColor: '#dcdcdc', borderWidth: 4, borderRadius: 50,
  },

  // Info Card
  infoCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20,
    shadowColor: '#1A5276', shadowOpacity: 0.07, shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  infoCardTitle: { fontSize: 16, fontWeight: '700', color: '#1A3A52', marginBottom: 16 },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
  },
  infoLabel: { fontSize: 14, color: '#7FB3D3', fontWeight: '600' },
  infoValue: { fontSize: 14, color: '#1A3A52', fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
  infoDivider: { height: 1, backgroundColor: '#EBF3FB' },
  actionRow: { flexDirection: 'row', marginTop: 16 },
  actionButton: {
    flex: 1, backgroundColor: '#EBF3FB', paddingVertical: 10,
    borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#AED6F1',
  },
  actionButtonText: { color: '#2E86C1', fontWeight: '600', fontSize: 13 },

  // Journal Card
  journalCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20,
    shadowColor: '#1A5276', shadowOpacity: 0.07, shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A3A52', marginBottom: 16 },
  journalTracker: { flexDirection: 'row', justifyContent: 'space-between' },
  week: {
    alignItems: 'center', backgroundColor: '#F0F5FA',
    borderRadius: 50, paddingVertical: 10, paddingHorizontal: 6, width: 42,
  },
  weekToday: { backgroundColor: '#EBF3FB', borderWidth: 1.5, borderColor: '#2E86C1' },
  weekHasEntry: { backgroundColor: '#EBF3FB', borderWidth: 1, borderColor: '#AED6F1' },
  moodEmoji: { fontSize: 22, marginBottom: 4 },
  weekText: { fontSize: 9, fontWeight: '600', color: '#A0B4C5' },
  weekTextToday: { color: '#2E86C1' },
  journalHint: {
    fontSize: 11, color: '#A0B4C5', textAlign: 'center',
    marginTop: 12, fontStyle: 'italic',
  },

  // Logout
  logoutButton: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    alignItems: 'center', borderWidth: 1, borderColor: '#FADBD8',
  },
  logoutText: { color: '#E74C3C', fontWeight: '600', fontSize: 15 },

  // Modals
  overlay: {
    flex: 1, backgroundColor: 'rgba(232,241,248,0.92)',
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#fff', borderRadius: 24, padding: 24,
    width: '100%', alignItems: 'center',
    shadowColor: '#1A5276', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 16, elevation: 8,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1A3A52', marginBottom: 16 },
  modalInput: {
    width: 180, backgroundColor: '#EBF5FB', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#2C3E50',
    borderWidth: 1, borderColor: '#AED6F1', marginBottom: 4,
  },
  buttonRow: { flexDirection: 'row', marginTop: 18, gap: 12, width: '100%' },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  cancelButton: { backgroundColor: '#EBF5FB', borderWidth: 1, borderColor: '#AED6F1' },
  cancelButtonText: { color: '#5B7FA5', fontWeight: '600', fontSize: 15 },
  saveButton: { backgroundColor: '#2E86C1' },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },

  // Journal View Modal
  closeButton: { position: 'absolute', top: 14, right: 16, padding: 6 },
  closeButtonText: { fontSize: 18, color: '#A0B4C5', fontWeight: '600' },
  viewEmoji: { fontSize: 48, marginBottom: 6, marginTop: 8 },
  viewDate: {
    fontSize: 12, color: '#A0B4C5', fontWeight: '500',
    marginBottom: 12, letterSpacing: 0.5,
  },
  viewTextBox: {
    width: '100%', backgroundColor: '#EBF5FB', borderRadius: 12,
    padding: 16, marginTop: 12, borderWidth: 1,
    borderColor: '#AED6F1', minHeight: 100,
  },
  viewText: { fontSize: 14, color: '#2C3E50', lineHeight: 22 },
});