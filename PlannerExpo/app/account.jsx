import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>👤</Text>
          <Text style={styles.placeholderTitle}>User Profile</Text>
          <Text style={styles.placeholderSubtitle}>
            Coming soon - manage your account settings and preferences
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5', // Light Green Background
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 24, // Page title size
    fontWeight: '700', // Bold weight from tone board
    marginBottom: 24,
    color: '#2E7D32', // Primary Accent color
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White Card Background
    borderRadius: 12, // Standard border radius
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDE5DD', // Soft Green Border
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 18, // Section title size
    fontWeight: '600', // Semibold weight
    color: '#2E7D32', // Primary Accent color
    marginBottom: 12,
  },
  placeholderSubtitle: {
    fontSize: 14, // Body text size
    color: '#6B7280', // Muted Gray text
    textAlign: 'center',
    lineHeight: 20,
  },
});