import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { HabitsGrid } from '../components/HabitsGrid';
import { RunningTodoList } from '../components/RunningTodoList';
import { TodaysTasks } from '../components/TodaysTasks';

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        
        <View style={styles.mainLayout}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Today's Tasks Box */}
            <TodaysTasks />
            
            {/* Habits Grid */}
            <HabitsGrid />
          </View>
          
          {/* Right Column - Running Todo List */}
          <View style={styles.rightColumn}>
            <RunningTodoList />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5', // Base Background with green tint
  },
  content: {
    padding: 24, // 1.5rem
  },
  title: {
    fontSize: 24, // Page Title size (22-24px)
    fontWeight: '700', // Bold and confident
    marginBottom: 24, // 1.5rem vertical spacing
    color: '#1E4620', // Page Title color (dark green)
  },
  mainLayout: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    flex: 2,
    gap: 20,
  },
  rightColumn: {
    flex: 1,
  },
});
