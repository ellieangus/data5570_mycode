import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';

const NAVIGATION_ITEMS = [
  { name: 'index', icon: '🏠', label: 'Home' },
  { name: 'add-task', icon: '➕', label: 'Add Task' },
  { name: 'checklist', icon: '✓', label: 'Checklist' },
  { name: 'calendar', icon: '📅', label: 'Calendar' },
  { name: 'account', icon: '👤', label: 'Account' },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleNavigation = (routeName) => {
    if (routeName === 'index') {
      router.push('/');
    } else {
      router.push(`/${routeName}`);
    }
  };

  const renderNavItem = (item) => {
    const isActive = pathname === `/${item.name}` || (pathname === '/' && item.name === 'index');
    
    return (
      <TouchableOpacity 
        key={item.name}
        style={styles.navItem}
        onPress={() => handleNavigation(item.name)}
      >
        <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
          <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
            {item.icon}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.navContainer}>
        {NAVIGATION_ITEMS.slice(0, 4).map(renderNavItem)}
      </View>
      <View style={styles.accountContainer}>
        {renderNavItem(NAVIGATION_ITEMS[4])}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 60,
    backgroundColor: '#F4F7F5', // Base Background with green tint
    borderRightWidth: 1,
    borderRightColor: '#DDE5DD', // Border / Divider color
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  navContainer: {
    // Container for main navigation items
  },
  accountContainer: {
    // Container for account item at bottom
  },
  navItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  iconContainerActive: {
    backgroundColor: '#E6F2EA', // Light Accent surface color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // Softer shadow
    shadowRadius: 2,
    elevation: 1,
  },
  navIcon: {
    fontSize: 24,
    color: '#8FA59A', // Inactive icon color from tone board
  },
  navIconActive: {
    color: '#2E7D32', // Primary Accent color
  },
});