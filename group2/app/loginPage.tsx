import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, KeyboardAvoidingView, Platform, Alert, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import { LotusIcon } from '../components/serenity-icons';

type Mode = 'login' | 'signup';

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) { Alert.alert('Missing fields', 'Please enter your email and password.'); return; }
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (email.length < 3) { Alert.alert('Invalid Email', 'Please enter a valid email address'); return; }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        router.replace('./(main)/index');
        const { error: authError } = await supabase.auth.updateUser({ data: { email } });
        if (authError) { Alert.alert('Error', authError.message); return; }
        const { data: { user } } = await supabase.auth.getUser();
        const { error: dbError } = await supabase.from('profiles').update({ updated_at: new Date().toISOString(), email }).eq('id', user?.id);
        if (dbError) { Alert.alert('Error', dbError.message); return; }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace('./(main)/index');
      }
    } catch (err: any) {
      Alert.alert('Oops', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) { Alert.alert('Enter your email first.'); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Sent', 'Password reset email has been sent!');
  };

  const switchLabel = mode === 'login' 
  ? "Don't have an account? Sign Up" 
  : "Already have an account? Sign In";

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#B8D9F0', '#CCE9F7', '#E8F4FB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.topSection}>
          <View style={styles.brandIconWrap}>
            <LotusIcon size={32} color="#2E7D8C" strokeWidth={1.4} />
          </View>
          <Text style={styles.appLabel}>WELCOME TO</Text>
          <Text style={styles.appName}>Serenity</Text>
          <Text style={styles.appTagline}>Your mental wellness companion</Text>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.tabRow}>
            <TouchableOpacity style={[styles.tab, mode === 'login' && styles.tabActive]} onPress={() => setMode('login')}>
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, mode === 'signup' && styles.tabActive]} onPress={() => setMode('signup')}>
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.cardTitle}>{mode === 'login' ? 'Welcome back 👋' : 'Create your account'}</Text>
          <Text style={styles.cardSubtitle}>{mode === 'login' ? 'Sign in to continue your wellness journey' : 'Start your mental wellness journey today'}</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor="#A0B4BE" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#A0B4BE" secureTextEntry value={password} onChangeText={setPassword} />
          {mode === 'login' && (
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotWrap}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleAuth} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{mode === 'login' ? 'Sign In' : 'Create Account'}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            <Text style={styles.switchText}>{switchLabel}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Take a breath. You&apos;re in the right place.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF2F5' },
  scroll: { flexGrow: 1 },
  topSection: { alignItems: 'center', paddingTop: 72, paddingBottom: 52, paddingHorizontal: 24 },
  brandIconWrap: { width: 64, height: 64, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.78)', alignItems: 'center', justifyContent: 'center', marginBottom: 18, borderWidth: 0.5, borderColor: 'rgba(46,125,140,0.2)' },
  appLabel: { fontSize: 10, letterSpacing: 2.5, color: '#4AA8B8', fontWeight: '600', marginBottom: 6 },
  appName: { fontSize: 40, fontWeight: '700', color: '#0F2D45', letterSpacing: -1, marginBottom: 8 },
  appTagline: { fontSize: 14, color: '#4A7080', letterSpacing: 0.2 },
  card: { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, flex: 1, padding: 28, marginTop: -24, borderWidth: 0.5, borderColor: '#C8DDE6', shadowColor: '#1A5276', shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: -4 }, elevation: 6 },
  tabRow: { flexDirection: 'row', backgroundColor: '#EAF2F5', borderRadius: 14, padding: 4, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 11, alignItems: 'center' },
  tabActive: { backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#C8DDE6', shadowColor: '#1A5276', shadowOpacity: 0.07, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tabText: { fontSize: 14, fontWeight: '500', color: '#7A9BAA' },
  tabTextActive: { color: '#2E7D8C', fontWeight: '700' },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#0F2D45', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#6A8A96', marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '600', color: '#0F2D45', marginBottom: 7, letterSpacing: 0.3 },
  input: { backgroundColor: '#EAF2F5', borderRadius: 14, padding: 14, fontSize: 15, color: '#0F2D45', marginBottom: 16, borderWidth: 0.5, borderColor: '#C8DDE6' },
  forgotWrap: { alignItems: 'flex-end', marginTop: -8, marginBottom: 20 },
  forgot: { fontSize: 13, color: '#4AA8B8', fontWeight: '500' },
  button: { backgroundColor: '#2E7D8C', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 18, shadowColor: '#2E7D8C', shadowOpacity: 0.28, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 5 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },
  switchText: { color: '#4AA8B8', fontSize: 13, textAlign: 'center', fontWeight: '500' },
  footer: { textAlign: 'center', color: '#7A9BAA', fontSize: 13, padding: 24 },
});