import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '../../constants/theme';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';

// ── Inline icons ─────────────────────────────────────────────────

const PhoneIcon = ({ size = 18, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z" />
  </Svg>
);

const MessageIcon = ({ size = 18, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

const GlobeIcon = ({ size = 18, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Line x1="2" y1="12" x2="22" y2="12" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

const HotlineIcon = ({ size = 24, color = '#2E7D8C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.01z" />
  </Svg>
);

const WebsiteIcon = ({ size = 24, color = '#2E7D8C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Line x1="2" y1="12" x2="22" y2="12" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

const AppIcon = ({ size = 24, color = '#2E7D8C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="5" y="2" width="14" height="20" rx="2" />
    <Line x1="12" y1="18" x2="12" y2="18" strokeWidth={2} />
  </Svg>
);

const NonprofitIcon = ({ size = 24, color = '#2E7D8C' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

const ChevronDownIcon = ({ size = 16, color = '#A0B4C5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);

const ChevronUpIcon = ({ size = 16, color = '#A0B4C5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 15l-6-6-6 6" />
  </Svg>
);

const AlertIcon = ({ size = 18, color = '#4A8FB5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <Line x1="12" y1="9" x2="12" y2="13" />
    <Line x1="12" y1="17" x2="12.01" y2="17" />
  </Svg>
);

// ── Color palette — all drawn from the app's blue/teal family ───
// Dark navy:   #0F2D45
// Mid blue:    #1A5276
// Core blue:   #2E86C1
// Teal:        #2E7D8C
// Soft teal:   #4AA8B8
// Light blue:  #7FB3D3
// Pale blue:   #AED6F1
// Wash blue:   #D4E8F5
// Near white:  #EBF3FB

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  type: 'hotline' | 'website' | 'app' | 'nonprofit';
  contact?: string;
  url?: string;
  bg: string;
  accent: string;
};

const RESOURCES: ResourceItem[] = [
  {
    id: '1',
    title: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support 24/7. Call or text 988 for immediate help.',
    type: 'hotline',
    contact: '988',
    bg: '#EBF3FB',
    accent: '#1A5276',
  },
  {
    id: '2',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741. Free, confidential crisis support available 24/7.',
    type: 'hotline',
    contact: 'Text HOME to 741741',
    bg: '#E4F2F7',
    accent: '#2E7D8C',
  },
  {
    id: '4',
    title: 'NAMI Helpline',
    description: 'Information and referrals for mental health support. Call Mon-Fri, 10am-10pm ET.',
    type: 'hotline',
    contact: '1-800-950-NAMI',
    url: 'https://www.nami.org',
    bg: '#EBF3FB',
    accent: '#2E86C1',
  },
  {
    id: '5',
    title: 'Psychology Today Therapist Finder',
    description: 'Find licensed therapists, psychiatrists, and counselors in your area.',
    type: 'website',
    url: 'https://www.psychologytoday.com/us/basics/therapy',
    bg: '#E4F2F7',
    accent: '#2E7D8C',
  },
  {
    id: '8',
    title: 'Headspace',
    description: 'Meditation and mindfulness app with resources for anxiety, stress, and sleep.',
    type: 'app',
    url: 'https://www.headspace.com',
    bg: '#EBF3FB',
    accent: '#1A5276',
  },
  {
    id: '9',
    title: 'NAMI Support Groups',
    description: 'Free peer support groups for people with mental health conditions and family members.',
    type: 'nonprofit',
    url: 'https://www.nami.org/Support-Education',
    bg: '#E4F2F7',
    accent: '#2E7D8C',
  },
  {
    id: '10',
    title: 'The Trevor Project',
    description: 'Crisis support for LGBTQ+ youth. Call, text, or chat 24/7.',
    type: 'nonprofit',
    contact: '1-866-488-7386',
    url: 'https://www.thetrevorproject.org',
    bg: '#EBF3FB',
    accent: '#2E86C1',
  },
  {
    id: '11',
    title: 'Crisis.org',
    description: 'Find crisis centers, support groups, and mental health resources near you.',
    type: 'website',
    url: 'https://www.crisis.org',
    bg: '#E4F2F7',
    accent: '#2E7D8C',
  },
  {
    id: '12',
    title: 'International Association for Suicide Prevention',
    description: 'Crisis lines and emotional support services available worldwide.',
    type: 'nonprofit',
    url: 'https://www.iasp.info/resources/Crisis_Centres/',
    bg: '#EBF3FB',
    accent: '#1A5276',
  },
];

const TYPE_ICONS: Record<string, any> = {
  hotline: HotlineIcon,
  website: WebsiteIcon,
  app: AppIcon,
  nonprofit: NonprofitIcon,
};

const TYPE_LABELS: Record<string, string> = {
  hotline: 'Hotline',
  website: 'Website',
  app: 'App',
  nonprofit: 'Nonprofit',
};

// ── Component ────────────────────────────────────────────────────

export default function ResourcesScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCall = (contact: string) => {
    const phoneNumber = contact.replace(/\D/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleText = () => {
    Linking.openURL('sms:741741?body=HOME');
  };

  const handleWebsite = (url?: string) => {
    if (url) Linking.openURL(url);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Gradient Header ── */}
        <LinearGradient
          colors={['#C8E3F5', '#DCF0F8', '#F0F5FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <Text style={styles.headerEyebrow}>Need help?</Text>
          <Text style={styles.headerTitle}>Resources & Support</Text>
          <Text style={styles.headerSubtitle}>
            Access help and support whenever you need it
          </Text>
        </LinearGradient>

        {/* ── Crisis Quick Actions ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In Crisis?</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: '#EBF3FB' }]}
              onPress={() => handleCall('988')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIconWrap, { backgroundColor: '#1A5276' }]}>
                <PhoneIcon size={18} color="#fff" />
              </View>
              <Text style={styles.quickActionLabel}>Call 988</Text>
              <Text style={styles.quickActionSub}>Suicide & Crisis Lifeline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickAction, { backgroundColor: '#E4F2F7' }]}
              onPress={handleText}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIconWrap, { backgroundColor: '#2E7D8C' }]}>
                <MessageIcon size={18} color="#fff" />
              </View>
              <Text style={styles.quickActionLabel}>Text 741741</Text>
              <Text style={styles.quickActionSub}>Crisis Text Line</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Resources List ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Resources</Text>

          {RESOURCES.map((resource) => {
            const TypeIcon = TYPE_ICONS[resource.type];
            const isExpanded = expandedId === resource.id;
            const isTextLine = resource.contact?.includes('741741');

            return (
              <TouchableOpacity
                key={resource.id}
                style={[styles.resourceCard, { backgroundColor: resource.bg }]}
                onPress={() => toggleExpand(resource.id)}
                activeOpacity={0.75}
              >
                <View style={styles.cardRow}>
                  <View style={[styles.typeIconWrap, { backgroundColor: resource.accent + '18' }]}>
                    <TypeIcon size={22} color={resource.accent} />
                  </View>
                  <View style={styles.cardMid}>
                    <Text style={[styles.resourceTitle, { color: resource.accent }]}>
                      {resource.title}
                    </Text>
                    <View style={[styles.typeBadge, { backgroundColor: resource.accent }]}>
                      <Text style={styles.typeBadgeText}>
                        {TYPE_LABELS[resource.type]}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.chevron}>
                    {isExpanded
                      ? <ChevronUpIcon size={16} color={resource.accent} />
                      : <ChevronDownIcon size={16} color={resource.accent} />
                    }
                  </View>
                </View>

                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <View style={styles.expandDivider} />
                    <Text style={styles.resourceDescription}>{resource.description}</Text>
                    <View style={styles.actionButtons}>
                      {resource.contact && !isTextLine && (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: resource.accent }]}
                          onPress={() => handleCall(resource.contact!)}
                        >
                          <PhoneIcon size={14} color="#fff" />
                          <Text style={styles.actionButtonText}>Call Now</Text>
                        </TouchableOpacity>
                      )}
                      {isTextLine && (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: resource.accent }]}
                          onPress={handleText}
                        >
                          <MessageIcon size={14} color="#fff" />
                          <Text style={styles.actionButtonText}>Text Now</Text>
                        </TouchableOpacity>
                      )}
                      {resource.url && (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: resource.accent }]}
                          onPress={() => handleWebsite(resource.url)}
                        >
                          <GlobeIcon size={14} color="#fff" />
                          <Text style={styles.actionButtonText}>Learn More</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {resource.contact && !isTextLine && (
                      <View style={[styles.contactPill, { backgroundColor: resource.accent + '14' }]}>
                        <Text style={styles.contactLabel}>Contact</Text>
                        <Text style={[styles.contactValue, { color: resource.accent }]}>
                          {resource.contact}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Disclaimer ── */}
        <View style={styles.disclaimer}>
          <View style={styles.disclaimerHeader}>
            <AlertIcon size={16} color="#4A8FB5" />
            <Text style={styles.disclaimerTitle}>Important Note</Text>
          </View>
          <Text style={styles.disclaimerText}>
            If you are in immediate danger, always call emergency services (911 in the US) or go to your nearest emergency room. These resources are here to support you, but professional emergency services should be contacted in life-threatening situations.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F5FA' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  gradientHeader: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 28,
    marginBottom: 4,
  },
  headerEyebrow: {
    fontSize: 11,
    color: '#4A8FB5',
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: Fonts.bodySemiBold,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F2D45',
    letterSpacing: -0.5,
    marginBottom: 6,
    fontFamily: Fonts.heading,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4A7A90',
    lineHeight: 20,
    fontFamily: Fonts.body,
  },

  section: { paddingHorizontal: 22, marginBottom: 28 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F2D45',
    marginBottom: 14,
    fontFamily: Fonts.heading,
  },

  quickActionsRow: { flexDirection: 'row', gap: 12 },
  quickAction: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D4E8F5',
    shadowColor: '#1A5276',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  quickActionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2D45',
    marginBottom: 3,
    fontFamily: Fonts.bodySemiBold,
  },
  quickActionSub: {
    fontSize: 10,
    color: '#7FB3D3',
    textAlign: 'center',
    fontFamily: Fonts.body,
  },

  resourceCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#D4E8F5',
    shadowColor: '#1A5276',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardMid: { flex: 1 },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 6,
    fontFamily: Fonts.heading,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeBadgeText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: Fonts.bodySemiBold,
  },
  chevron: { paddingLeft: 4, flexShrink: 0 },

  expandedContent: { marginTop: 14 },
  expandDivider: {
    height: 0.5,
    backgroundColor: '#D4E8F5',
    marginBottom: 12,
  },
  resourceDescription: {
    fontSize: 13,
    color: '#4A6F8A',
    lineHeight: 20,
    marginBottom: 14,
    fontFamily: Fonts.body,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Fonts.bodySemiBold,
  },
  contactPill: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactLabel: {
    fontSize: 11,
    color: '#7FB3D3',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: Fonts.bodySemiBold,
  },
  contactValue: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Fonts.bodySemiBold,
  },

  disclaimer: {
    backgroundColor: '#EBF3FB',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 22,
    borderWidth: 0.5,
    borderColor: '#AED6F1',
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A5276',
    fontFamily: Fonts.bodySemiBold,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#4A7A90',
    lineHeight: 18,
    fontFamily: Fonts.body,
  },
});