import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  type: 'hotline' | 'website' | 'app' | 'nonprofit';
  contact?: string;
  url?: string;
  emoji: string;
  color: string;
  accentColor: string;
};

const RESOURCES: ResourceItem[] = [
  {
    id: '1',
    title: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support 24/7. Call or text 988 for immediate help.',
    type: 'hotline',
    contact: '988',
    emoji: '💙',
    color: '#F0EBF8',
    accentColor: '#6C3483',
  },
  {
    id: '2',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741. Free, confidential crisis support available 24/7.',
    type: 'hotline',
    contact: 'Text HOME to 741741',
    emoji: '💬',
    color: '#E8F8F5',
    accentColor: '#117A65',
  },
  {
    id: '4',
    title: 'NAMI Helpline',
    description: 'Information and referrals for mental health support. Call Mon-Fri, 10am-10pm ET.',
    type: 'hotline',
    contact: '1-800-950-NAMI',
    url: 'https://www.nami.org',
    emoji: '🤝',
    color: '#EBF3FB',
    accentColor: '#1A5276',
  },
  {
    id: '5',
    title: 'Psychology Today Therapist Finder',
    description: 'Find licensed therapists, psychiatrists, and counselors in your area.',
    type: 'website',
    url: 'https://www.psychologytoday.com/us/basics/therapy',
    emoji: '👨‍⚕️',
    color: '#F9E79F',
    accentColor: '#7D6608',
  },
  {
    id: '8',
    title: 'Headspace',
    description: 'Meditation and mindfulness app with resources for anxiety, stress, and sleep.',
    type: 'app',
    url: 'https://www.headspace.com',
    emoji: '🧘',
    color: '#E8DAEF',
    accentColor: '#512E5F',
  },
  {
    id: '9',
    title: 'NAMI Support Groups',
    description: 'Free peer support groups for people with mental health conditions and family members.',
    type: 'nonprofit',
    url: 'https://www.nami.org/Support-Education',
    emoji: '🪑',
    color: '#FCF3CF',
    accentColor: '#7D6608',
  },
  {
    id: '10',
    title: 'The Trevor Project',
    description: 'Crisis support for LGBTQ+ youth. Call, text, or chat 24/7.',
    type: 'nonprofit',
    contact: '1-866-488-7386',
    url: 'https://www.thetrevorproject.org',
    emoji: '🌈',
    color: '#F4ECF7',
    accentColor: '#6C3483',
  },
  {
    id: '11',
    title: 'Crisis.org',
    description: 'Find crisis centers, support groups, and mental health resources near you.',
    type: 'website',
    url: 'https://www.crisis.org',
    emoji: '📍',
    color: '#EDEAE6',
    accentColor: '#52524F',
  },
  {
    id: '12',
    title: 'International Association for Suicide Prevention',
    description: 'Crisis lines and emotional support services available worldwide.',
    type: 'nonprofit',
    url: 'https://www.iasp.info/resources/Crisis_Centres/',
    emoji: '🌍',
    color: '#D5F4E6',
    accentColor: '#0B5345',
  },
];

export default function ResourcesScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCall = (contact: string) => {
    const phoneNumber = contact.replace(/\D/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleText = (contact: string) => {
    if (contact.includes('741741')) {
      Linking.openURL('sms:741741?body=HOME');
    }
  };

  const handleWebsite = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resources & Support</Text>
          <Text style={styles.headerSubtitle}>
            Access help and support whenever you need it
          </Text>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>In Crisis?</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={[styles.quickAction, styles.callAction]}
              onPress={() => handleCall('988')}
            >
              <Text style={styles.quickActionEmoji}>☎️</Text>
              <Text style={styles.quickActionLabel}>Call 988</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickAction, styles.textAction]}
              onPress={() => handleText('741741')}
            >
              <Text style={styles.quickActionEmoji}>💬</Text>
              <Text style={styles.quickActionLabel}>Text 741741</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resources List */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Resources by Type</Text>

          {RESOURCES.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              style={[styles.resourceCard, { backgroundColor: resource.color }]}
              onPress={() => toggleExpand(resource.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.resourceEmoji}>{resource.emoji}</Text>
                  <View style={styles.cardTitleArea}>
                    <Text style={[styles.resourceTitle, { color: resource.accentColor }]}>
                      {resource.title}
                    </Text>
                    <View style={[styles.resourceBadge, { backgroundColor: resource.accentColor }]}>
                      <Text style={styles.resourceBadgeText}>
                        {resource.type === 'hotline' ? '📞' : resource.type === 'website' ? '🌐' : resource.type === 'app' ? '📱' : '🤝'}
                        {' '}
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>

                {expandedId === resource.id && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.resourceDescription}>{resource.description}</Text>

                    <View style={styles.actionButtons}>
                      {resource.contact && resource.type === 'hotline' && (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: resource.accentColor }]}
                          onPress={() => handleCall(resource.contact!)}
                        >
                          <Text style={styles.actionButtonText}>☎️ Call Now</Text>
                        </TouchableOpacity>
                      )}
                      {resource.contact && resource.type === 'hotline' && resource.contact.includes('741741') && (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: resource.accentColor }]}
                          onPress={() => handleText(resource.contact!)}
                        >
                          <Text style={styles.actionButtonText}>💬 Text Now</Text>
                        </TouchableOpacity>
                      )}
                      {resource.url && (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: resource.accentColor }]}
                          onPress={() => handleWebsite(resource.url)}
                        >
                          <Text style={styles.actionButtonText}>🔗 Learn More</Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {resource.contact && !resource.contact.includes('741741') && (
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Contact:</Text>
                        <Text style={[styles.contactValue, { color: resource.accentColor }]}>
                          {resource.contact}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>

              {expandedId === resource.id && (
                <Text style={styles.expandIndicator}>▲</Text>
              )}
              {expandedId !== resource.id && (
                <Text style={styles.expandIndicator}>▼</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerSection}>
          <Text style={styles.disclaimerTitle}>Important Note</Text>
          <Text style={styles.disclaimerText}>
            If you are in immediate danger, always call emergency services (911 in the US) or go to your nearest emergency room. These resources are here to support you, but professional emergency services should be contacted in life-threatening situations.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  header: {
    paddingVertical: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A3A52',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#7FB3D3',
    fontWeight: '500',
    lineHeight: 22,
  },

  infoSection: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A3A52',
    marginBottom: 14,
  },

  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  quickAction: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5276',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  callAction: {
    backgroundColor: '#EBF3FB',
  },

  textAction: {
    backgroundColor: '#E8F8F5',
  },

  quickActionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },

  quickActionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A3A52',
  },

  resourcesSection: {
    marginBottom: 24,
  },

  resourceCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#1A5276',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  cardContent: {
    padding: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  resourceEmoji: {
    fontSize: 32,
    marginTop: 4,
  },

  cardTitleArea: {
    flex: 1,
  },

  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },

  resourceBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  resourceBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },

  resourceDescription: {
    fontSize: 13,
    color: '#4A6F8A',
    lineHeight: 20,
    marginBottom: 14,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },

  actionButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 4,
  },

  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

  contactInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  contactLabel: {
    fontSize: 11,
    color: '#7FB3D3',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  contactValue: {
    fontSize: 14,
    fontWeight: '700',
  },

  expandIndicator: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    paddingBottom: 8,
  },

  disclaimerSection: {
    backgroundColor: '#FEF5E7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
    marginTop: 16,
  },

  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7D6608',
    marginBottom: 8,
  },

  disclaimerText: {
    fontSize: 12,
    color: '#9A7E3E',
    lineHeight: 18,
  },
});
