import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { SettingsIcon, EditIcon, EmailIcon, UserIcon, CloseIcon, MOOD_ICONS } from '../../components/serenity-icons';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const EMOJI_TO_INDEX: Record<string, number> = {
  '😄': 0, '😊': 1, '😐': 2, '😟': 3, '😢': 4,
};

type JournalEntry = { emoji: string; moodIndex: number; text: string; date: string; } | null;

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [weekMoods, setWeekMoods] = useState<JournalEntry[]>(Array(7).fill(null));
  const [viewEntry, setViewEntry] = useState<JournalEntry>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) { setEmail(user.email || ''); setUsername(user.user_metadata?.username || ''); }
    };
    fetchUser();
  }, []);

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
        const { data } = await supabase
          .from('journal_entries')
          .select('entry_date, mood_emoji, mood_index, journal_text')
          .eq('user_id', user.id)
          .in('entry_date', weekDates);
        const mapped: JournalEntry[] = weekDates.map(date => {
          const found = data?.find(e => e.entry_date === date);
          return found ? { emoji: found.mood_emoji, moodIndex: found.mood_index ?? EMOJI_TO_INDEX[found.mood_emoji] ?? 2, text: found.journal_text || '', date } : null;
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
    if (!draftName.trim() || draftName.length < 3) { Alert.alert('Invalid username', 'Username must be at least 3 characters.'); return; }
    const { error: authError } = await supabase.auth.updateUser({ data: { username: draftName } });
    if (authError) { Alert.alert('Error', authError.message); return; }
    const { data: { user } } = await supabase.auth.getUser();
    const { error: dbError } = await supabase.from('profiles').update({ username: draftName, updated_at: new Date().toISOString(), email }).eq('id', user?.id);
    if (dbError) { Alert.alert('Error', dbError.message); return; }
    const { error: journalError } = await supabase.from('journal_entries').update({ username: draftName, email }).eq('user_id', user!.id);
    if (journalError) { Alert.alert('Error', journalError.message); return; }
    setUsername(draftName);
    setEditModalVisible(false);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); router.replace('/loginPage'); };

  const initials = (username || email || 'U').slice(0, 2).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Modal transparent animationType="fade" visible={editModalVisible}>
        <Pressable style={styles.overlay} onPress={() => setEditModalVisible(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              <Text style={styles.modalTitle}>Edit Username</Text>
              <TextInput style={styles.modalInput} placeholder="Enter new username" placeholderTextColor="#AABBD0" value={draftName} onChangeText={setDraftName} autoFocus />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveUsername}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      <Modal transparent animationType="fade" visible={viewModalVisible}>
        <Pressable style={styles.overlay} onPress={() => setViewModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setViewModalVisible(false)}>
              <CloseIcon size={18} color="#A0B4C5" strokeWidth={2} />
            </TouchableOpacity>
            {viewEntry && (() => {
              const MoodIcon = MOOD_ICONS[viewEntry.moodIndex];
              return <View style={styles.viewIconWrap}><MoodIcon size={52} color="#2E86C1" strokeWidth={1.3} /></View>;
            })()}
            <Text style={styles.viewDate}>{viewEntry?.date}</Text>
            <Text style={styles.modalTitle}>Journal Entry</Text>
            <View style={styles.viewTextBox}>
              <Text style={styles.viewText}>{viewEntry?.text?.trim() ? viewEntry.text : '(No notes written for this day)'}</Text>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#C8E3F5', '#DCF0F8', '#F0F5FA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientHeader}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerEyebrow}>Welcome!</Text>
              <Text style={styles.headerTitle}>{username || email || 'Profile'}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <SettingsIcon size={18} color="#2E7D8C" strokeWidth={1.8} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Personal Info</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoLabelWrap}><EmailIcon size={13} color="#7FB3D3" /><Text style={styles.infoLabel}>Email</Text></View>
            <Text style={styles.infoValue} numberOfLines={1}>{email || '—'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <View style={styles.infoLabelWrap}><UserIcon size={13} color="#7FB3D3" /><Text style={styles.infoLabel}>Username</Text></View>
            <Text style={styles.infoValue}>{username || 'Not set'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <TouchableOpacity style={styles.actionButton} onPress={() => { setDraftName(username); setEditModalVisible(true); }}>
            <EditIcon size={14} color="#2E86C1" strokeWidth={1.8} />
            <Text style={styles.actionButtonText}>Edit Username</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.journalCard}>
          <Text style={styles.sectionTitle}>Journal — This Week</Text>
          <View style={styles.journalTracker}>
            {DAYS.map((day, i) => {
              const entry = weekMoods[i];
              const isToday = i === new Date().getDay();
              const hasEntry = entry !== null;
              const MoodIcon = hasEntry ? MOOD_ICONS[entry!.moodIndex] : null;
              return (
                <TouchableOpacity key={day} onPress={() => handleDayPress(entry)} activeOpacity={hasEntry ? 0.7 : 1}>
                  <View style={[styles.dayCell, isToday && styles.dayCellToday, hasEntry && styles.dayCellFilled]}>
                    {MoodIcon
                      ? <MoodIcon size={22} color={isToday ? '#2E86C1' : '#7FB3D3'} strokeWidth={1.4} />
                      : <View style={styles.emptyDot} />}
                    <Text style={[styles.dayText, isToday && styles.dayTextToday]}>{day}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.journalHint}>Tap a day to read your journal ✦</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
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
  headerEyebrow: { fontSize: 11, color: '#4A8FB5', fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#0F2D45', letterSpacing: -0.5 },
  iconButton: { backgroundColor: 'rgba(255,255,255,0.82)', borderRadius: 12, padding: 10, borderWidth: 0.5, borderColor: 'rgba(74,143,181,0.25)' },
  avatarCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#2E86C1', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 20, borderWidth: 3, borderColor: 'rgba(255,255,255,0.85)', shadowColor: '#1A5276', shadowOpacity: 0.18, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 5 },
  avatarInitials: { fontSize: 30, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  infoCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginHorizontal: 22, marginBottom: 16, borderWidth: 0.5, borderColor: '#D4E8F5', shadowColor: '#1A5276', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  infoCardTitle: { fontSize: 15, fontWeight: '700', color: '#0F2D45', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11 },
  infoLabelWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoLabel: { fontSize: 13, color: '#7FB3D3', fontWeight: '600' },
  infoValue: { fontSize: 13, color: '#0F2D45', fontWeight: '500', maxWidth: '58%', textAlign: 'right' },
  infoDivider: { height: 0.5, backgroundColor: '#EBF3FB' },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, backgroundColor: '#EBF3FB', paddingVertical: 11, borderRadius: 12, borderWidth: 0.5, borderColor: '#AED6F1' },
  actionButtonText: { color: '#2E86C1', fontWeight: '600', fontSize: 13 },
  journalCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginHorizontal: 22, marginBottom: 16, borderWidth: 0.5, borderColor: '#D4E8F5', shadowColor: '#1A5276', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F2D45', marginBottom: 16 },
  journalTracker: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCell: { alignItems: 'center', backgroundColor: '#F0F5FA', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 4, width: 40 },
  dayCellToday: { backgroundColor: '#EBF3FB', borderWidth: 1.5, borderColor: '#2E86C1' },
  dayCellFilled: { backgroundColor: '#EBF3FB', borderWidth: 0.5, borderColor: '#AED6F1' },
  emptyDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#E2EEF6' },
  dayText: { fontSize: 8, fontWeight: '600', color: '#A0B4C5', marginTop: 5 },
  dayTextToday: { color: '#2E86C1' },
  journalHint: { fontSize: 11, color: '#A0B4C5', textAlign: 'center', marginTop: 14, fontStyle: 'italic' },
  logoutButton: { backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', marginHorizontal: 22, borderWidth: 0.5, borderColor: '#FADBD8' },
  logoutText: { color: '#E74C3C', fontWeight: '600', fontSize: 15 },
  overlay: { flex: 1, backgroundColor: 'rgba(200,227,245,0.88)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 28, padding: 28, width: '100%', alignItems: 'center', borderWidth: 0.5, borderColor: '#C8DDE6', shadowColor: '#1A5276', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 10 },
  closeButton: { position: 'absolute', top: 16, right: 16, padding: 4 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#0F2D45', marginBottom: 16 },
  modalInput: { width: '100%', backgroundColor: '#EBF5FB', borderRadius: 14, padding: 14, fontSize: 15, color: '#2C3E50', borderWidth: 1, borderColor: '#AED6F1', marginBottom: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 18, gap: 12, width: '100%' },
  modalButton: { flex: 1, paddingVertical: 13, borderRadius: 14, alignItems: 'center' },
  cancelButton: { backgroundColor: '#EBF5FB', borderWidth: 1, borderColor: '#AED6F1' },
  cancelButtonText: { color: '#5B7FA5', fontWeight: '600', fontSize: 15 },
  saveButton: { backgroundColor: '#2E86C1' },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  viewIconWrap: { marginBottom: 6, marginTop: 8 },
  viewDate: { fontSize: 11, color: '#A0B4C5', fontWeight: '500', marginBottom: 12, letterSpacing: 0.5 },
  viewTextBox: { width: '100%', backgroundColor: '#EBF5FB', borderRadius: 14, padding: 16, marginTop: 12, borderWidth: 0.5, borderColor: '#AED6F1', minHeight: 100 },
  viewText: { fontSize: 14, color: '#2C3E50', lineHeight: 22 },
});