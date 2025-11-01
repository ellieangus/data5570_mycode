import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addHabit, toggleHabitCheck } from '../state/tasksSlice';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function HabitsGrid() {
  const dispatch = useDispatch();
  const habits = useSelector(state => state.tasks.habits);
  const [newHabitName, setNewHabitName] = useState('');

  const handleAddHabit = () => {
    if (newHabitName.trim() && habits.length < 5) {
      dispatch(addHabit(newHabitName.trim()));
      setNewHabitName('');
    }
  };

  const handleToggleCheck = (habitId, dayKey) => {
    dispatch(toggleHabitCheck({ habitId, dayKey }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Habits</Text>
      
      <View style={styles.grid}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.habitNameHeader}>
            <Text style={styles.headerText}>Habit</Text>
          </View>
          {DAYS.map(day => (
            <View key={day} style={styles.dayHeader}>
              <Text style={styles.headerText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Habit Rows */}
        {habits.map(habit => (
          <View key={habit.id} style={styles.habitRow}>
            <View style={styles.habitNameCell}>
              <Text style={styles.habitName}>{habit.name}</Text>
            </View>
            {DAYS.map(day => (
              <View key={day} style={styles.dayCell}>
                <Pressable
                  style={[
                    styles.checkbox,
                    habit.checks[day] && styles.checkboxChecked
                  ]}
                  onPress={() => handleToggleCheck(habit.id, day)}
                >
                  <Text style={[
                    styles.checkboxText,
                    habit.checks[day] && styles.checkboxTextChecked
                  ]}>
                    {habit.checks[day] ? '✓' : ''}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        ))}

        {/* Add Habit Row */}
        {habits.length < 5 && (
          <View style={styles.addHabitRow}>
            <View style={styles.habitNameCell}>
              <TextInput
                style={styles.addHabitInput}
                placeholder="Add new habit..."
                placeholderTextColor="#999"
                value={newHabitName}
                onChangeText={setNewHabitName}
                onSubmitEditing={handleAddHabit}
              />
            </View>
            <View style={styles.addButtonCell}>
              <Pressable
                style={styles.addButton}
                onPress={handleAddHabit}
                disabled={!newHabitName.trim()}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Card Background
    borderRadius: 12, // Universal border radius
    padding: 20, // 1.25rem
    marginBottom: 24, // 1.5rem vertical spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, // Consistent soft shadow
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#DDE5DD', // Border / Divider color
  },
  title: {
    fontSize: 18, // Section Title size
    fontWeight: '600', // Section title weight
    marginBottom: 16,
    color: '#2E7D32', // Primary Accent color
  },
  grid: {
    borderWidth: 1,
    borderColor: '#DDE5DD', // Border / Divider color
    borderRadius: 12, // Universal border radius
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#E6F2EA', // Light Accent surface
    borderBottomWidth: 1,
    borderBottomColor: '#DDE5DD',
  },
  habitNameHeader: {
    flex: 2,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  dayHeader: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 13, // Meta Info size
    fontWeight: '600',
    color: '#6B7280', // Muted Text / Secondary
  },
  habitRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDE5DD', // Border / Divider color
    backgroundColor: '#F9FBF9', // Hover background tint
  },
  habitNameCell: {
    flex: 2,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'center',
  },
  habitName: {
    fontSize: 15, // Task Title size
    color: '#1E293B', // Main Text color
    fontWeight: '500', // Medium weight for readability
  },
  dayCell: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  checkbox: {
    width: 22, // Consistent icon size (20-22px)
    height: 22,
    borderWidth: 1.5,
    borderColor: '#8FA59A', // Unchecked circle outline
    borderRadius: 11, // Circular
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2E7D32', // Primary Accent fill
    borderColor: '#2E7D32',
  },
  checkboxText: {
    fontSize: 12,
    color: '#8FA59A', // Unchecked color
  },
  checkboxTextChecked: {
    color: 'white',
    fontWeight: 'bold',
  },
  addHabitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addHabitInput: {
    fontSize: 14,
    color: '#333',
    borderWidth: 0,
    padding: 0,
  },
  addButtonCell: {
    flex: 5,
    padding: 12,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#2E7D32', // Primary Accent color
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8, // Button rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});