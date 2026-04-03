import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

type Mode = 'login' | 'signup';

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!email || email.length < 3) {
          Alert.alert('Invalid Email', "Please enters a valid email address");
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password },);
        if (error) throw error;
        router.replace('./(main)/index')
        // Alert.alert('Almost there! 🌿', 'Check your email to confirm your account.');
        // 1. Update auth metadata
          const { error: authError } = await supabase.auth.updateUser({
            data: { email: email },
          });
          if (authError) {
            Alert.alert('Error', authError.message);
            return;
          }

          // 2. Update profiles table directly
          const { data: { user } } = await supabase.auth.getUser();
          const { error: dbError } = await supabase
            .from('profiles')
            .update({ updated_at: new Date().toISOString(), email: email })
            .eq('id', user?.id);
          if (dbError) {
            Alert.alert('Error', dbError.message);
            return;
          }
      } 
      else {
        const { error } = await supabase.auth.signInWithPassword({ email, password },);
        if (error) throw error;
        router.replace('./(main)/index');
      }
    } 
    catch (err: any) {
      Alert.alert('Oops', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Enter your email first.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Sent 🌿', 'Password reset email has been sent!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appLabel}>WELCOME TO</Text>
          <Text style={styles.appName}>Serenity</Text>
          <Text style={styles.appTagline}>Your mental wellness companion 🌿</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Tab Toggle */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, mode === 'login' && styles.tabActive]}
              onPress={() => setMode('login')}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => setMode('signup')}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.cardTitle}>
            {mode === 'login' ? 'Welcome back 👋' : 'Create your account'}
          </Text>
          <Text style={styles.cardSubtitle}>
            {mode === 'login'
              ? 'Sign in to continue your wellness journey'
              : 'Start your mental wellness journey today'}
          </Text>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#aab8c2"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#aab8c2"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          {mode === 'login' && (
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotWrap}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Switch Mode */}
          <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            <Text style={styles.switchText}>
              {mode === 'login'
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Take a breath. You're in the right place. 🌸
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const TEAL = '#2E7D8C';
const LIGHT_TEAL = '#4AA8B8';
const BG = '#EAF2F5';
const CARD_BG = '#FFFFFF';
const TEXT_DARK = '#1C3A4A';
const TEXT_MID = '#5A7A8A';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appLabel: {
    fontSize: 12,
    letterSpacing: 2,
    color: LIGHT_TEAL,
    fontWeight: '600',
    marginBottom: 4,
  },
  appName: {
    fontSize: 38,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 14,
    color: TEXT_MID,
  },

  // Card
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    backgroundColor: BG,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: CARD_BG,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_MID,
  },
  tabTextActive: {
    color: TEAL,
    fontWeight: '700',
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: TEXT_MID,
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    marginBottom: 6,
  },
  input: {
    backgroundColor: BG,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: TEXT_DARK,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D6E8EE',
  },

  forgotWrap: { alignItems: 'flex-end', marginTop: -8, marginBottom: 20 },
  forgot: { fontSize: 13, color: LIGHT_TEAL, fontWeight: '500' },

  button: {
    backgroundColor: TEAL,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: TEAL,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  switchText: {
    color: LIGHT_TEAL,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },

  footer: {
    textAlign: 'center',
    color: TEXT_MID,
    fontSize: 13,
    marginTop: 28,
  },
});