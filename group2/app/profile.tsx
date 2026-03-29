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
            <View style={styles.basicInfoCard}>
              <TouchableOpacity style={styles.ppfButton}>
                <View style={styles.ppf}>
              </View>
              </TouchableOpacity>
              <Text style={styles.basicInfoText}>{username}</Text>
            </View>

            <TouchableOpacity style={styles.settingButton}>
              <View style={styles.setting}>
              <Text style={styles.text}>setting</Text>
            </View>
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
                <Text style={styles.text}>Log out/ log In</Text>
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
    backgroundColor: '#E8F1F8',
  },
  basicInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4E6F1',
    height: 100,
    width: 'auto',
    padding: 24,
    borderWidth: 1,
    borderColor: '#e6eaed',
    borderRadius: 22,
    },
  basicInfoText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#5B7FA5',
    right: -50
  },
  ppf: {
    backgroundColor: 'rgb(54, 52, 53)',
    height: 65,
    width: 65,
    borderRadius: 50,
  },
  ppfButton: {padding: 1},
  setting: {
    backgroundColor: '#D4E6F1',
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
    backgroundColor: '#D4E6F1',
    height: 160,
    width: 'auto',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e6eaed',
    borderRadius: 22,
  },
  journalTracker: {
    flexDirection: 'row',
    backgroundColor: '#D4E6F1',
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
    backgroundColor: '#D4E6F1',
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
