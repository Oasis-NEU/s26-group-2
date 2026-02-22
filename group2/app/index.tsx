import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const MOODS = [
  { emoji: '😄', label: 'I am feeling good' },
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😟', label: 'Bad' },
  { emoji: '😢', label: 'Awful' },
];

const CATEGORIES = [
  { emoji: '🎮', label: 'Games', color: '#D5E8D0' },
  { emoji: '🧘', label: 'Meditations', color: '#D5E8D0' },
  { emoji: '📚', label: 'Resources', color: '#D5E8D0' },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>WELCOME TO SERENITY !</Text>
          <TouchableOpacity style={styles.bellButton}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Checker */}
        <View style={styles.moodCard}>
          <Text style={styles.moodTitle}>HOW ARE YOU FEELING TODAY ?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === index && styles.moodButtonSelected,
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Cards */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <View style={styles.categoryIconContainer}>
                <Text style={{ fontSize: 36 }}>{cat.emoji}</Text>
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mindfulness Section */}
        <Text style={styles.sectionText}>
          Learn More About The Benefits of Tetris In Times of Distress
        </Text>

        <View style={styles.mindfulnessCard}>
          <View style={styles.mindfulnessContent}>
            <Text style={styles.mindfulnessTitle}>
              Learn More About The Benefits of Tetris in Times of Distress
            </Text>
            <Text style={styles.mindfulnessSubtitle}>
              And play it here!
            </Text>
            <TouchableOpacity style={styles.articleButton}>
              <Text style={styles.articleButtonText}>Learn more!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardImage}>
            <Text style={{ fontSize: 44 }}>🧠</Text>
          </View>
        </View>

        {/* Mental Health Check */}
        <Text style={styles.sectionText}>
          Learn about the benefits of Meditation
        </Text>

        <View style={styles.mindfulnessCard}>
          <View style={styles.mindfulnessContent}>
            <Text style={styles.mindfulnessTitle}>
              Learn about mindfullness and meditation techniques 
            </Text>
            <Text style={styles.mindfulnessSubtitle}>
              And begin your practice here!
            </Text>
            <TouchableOpacity style={styles.articleButton}>
              <Text style={styles.articleButtonText}>Learn more!</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardImage}>
            <Text style={{ fontSize: 44 }}>🧠</Text>
          </View>
        </View>

        {/* Sleep Meditation */}
        <Text style={styles.sectionText}>
          Additional Resources for your mental health journey
        </Text>

        <View style={styles.sleepCard}>
          <View style={styles.sleepContent}>
            <Text style={styles.sleepTitle}>
              Read About More Resources Here For Your Mental Health Journey
            </Text>
          </View>
          <View style={styles.sleepRight}>
            <Text style={{ fontSize: 50 }}>🕐</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶ Putar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabIcon, activeTab === 'home' && styles.tabIconActive]}>
            🏠
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.tabIcon, activeTab === 'search' && styles.tabIconActive]}>
            🔍
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={[styles.tabIcon, activeTab === 'chat' && styles.tabIconActive]}>
            💬
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>
            👤
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A5276',
    letterSpacing: 0.5,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Georgia'
  },
  bellButton: {
    padding: 4,
  },

  // Mood Card
  moodCard: {
    backgroundColor: '#D4E6F1',
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  moodTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64735b',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  moodButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  moodButtonSelected: {
    backgroundColor: '#D48263',
    borderColor: '#D48263',
  },
  moodEmoji: {
    fontSize: 40,
  },

  // Categories
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  categoryCard: {
    alignItems: 'center',
    width: '30%',
  },
  categoryIconContainer: {
    backgroundColor: '#EBF5FB',
    borderRadius: 16,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Section Text
  sectionText: {
    fontSize: 13,
    color: '#5B7FA5',
    marginTop: 24,
    marginBottom: 12,
    fontWeight: '500',
  },

  // Mindfulness Card
  mindfulnessCard: {
    backgroundColor: '#FDEEF4',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mindfulnessContent: {
    flex: 1,
  },
  mindfulnessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DB7093',
  },
  mindfulnessSubtitle: {
    fontSize: 14,
    color: '#DB7093',
    marginTop: 4,
  },
  articleButton: {
    backgroundColor: '#DB7093',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  articleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  cardImage: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Mental Health Card
  mentalHealthCard: {
    backgroundColor: '#FEF5E7',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mentalHealthContent: {
    flex: 1,
  },
  mentalHealthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  testButton: {
    backgroundColor: '#7CB342',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Sleep Card
  sleepCard: {
    backgroundColor: '#F5EEF8',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sleepContent: {
    flex: 1,
  },
  sleepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  sleepRight: {
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#C62828',
    fontWeight: '600',
    fontSize: 13,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabIcon: {
    fontSize: 26,
    opacity: 0.4,
  },
  tabIconActive: {
    opacity: 1,
  },
});