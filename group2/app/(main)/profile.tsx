import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import 'react-native-reanimated/lib/typescript/Animated';
import { SafeAreaView } from 'react-native-safe-area-context';
import index from './index';

export default function ProfileScreen() {
  const [ username, setUsername] = useState<string>('UserName');
  const [ MOODS, setMOODS] = useState<string>('😊');
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
              <View>
                <Text style={styles.headerEyebrow}>Welcome!</Text>
                <Text style={styles.headerTitle}>{username}</Text>
              </View>
              <TouchableOpacity style={styles.bellButton}>
                <Text style={{ fontSize: 20 }}>⚙️</Text>
              </TouchableOpacity>
            </View>
    
            <View style={styles.divider} />

            <TouchableOpacity style={styles.ppf}>
              <View></View>
            </TouchableOpacity>
                    
            
            <View style={styles.journalCard}>
              <Text style={styles.text}>Journal</Text>
              <View style={styles.journalTracker}>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>SUN</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>MON</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>TUE</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>WED</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>THU</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>FRI</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weekButton}>
                  <View style={styles.week}>
                    <Text style={styles.Mood}>{MOODS}</Text>
                    <Text style={styles.weekText}>SAT</Text>
                </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.MoodChart}>
              <Text style={styles.text}>Mood Analysis</Text>
            </View>
            <TouchableOpacity style={styles.logInButton}>
              <View style={styles.setting}>
                <Text style={styles.text}>Log out</Text>
              </View>
            </TouchableOpacity>
            
          </ScrollView> 
          </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
  },
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

  ppf: {
    backgroundColor: 'rgb(71, 74, 74)',
    marginBottom: 35,
    alignSelf: "center",
    height: 120,
    width: 120,
    borderColor: "#dcdcdc",
    borderWidth: 5,
    borderRadius: "100%",
    
  },
  setting: {
    backgroundColor: '#fff',
    width: 'auto',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e6eaed',
    borderRadius: 22,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5B7FA5',
    textAlign: 'left',
  },
  settingButton: {padding: 1},
  journalCard: {
    backgroundColor: '#fff',
    height: 160,
    width: 'auto',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e6eaed',
    borderRadius: 22,
  },
  journalTracker: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 110,
    width: 320,
    alignItems: 'center',
    alignContent: 'center',
  },
  week: {
    backgroundColor: 'rgb(208, 218, 221)',
    height: 90,
    width: 45,
    padding: 8,
    borderRadius: 50,
  },
  weekText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    bottom: -25,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  Mood: {
    fontSize: 27,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  weekButton: {padding: 1},
  MoodChart: {
    backgroundColor: '#fff',
    height: 180,
    width: 'auto',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e6eaed',
    borderRadius: 24,
  },
  logInButton: {padding: 1},
  journalBox: {
    backgroundColor: '#fff',
    width: 'auto',
  }
});
