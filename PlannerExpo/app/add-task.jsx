import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleTask, deleteTask } from '../state/tasksSlice';
import { TaskRow } from '../components/TaskRow';

const PRIORITIES = ['High', 'Medium', 'Low'];
const CATEGORIES = ['School', 'Work', 'Personal', 'Other'];

export default function AddTaskScreen() {
  const dispatch = useDispatch();
  const allItems = useSelector(state => state.tasks.items);
  
  // Get 5 most recently added tasks, with completed items at bottom
  const recentItems = allItems
    .slice()
    .sort((a, b) => {
      // Sort completed tasks to bottom, then by creation date
      if (a.status === 'done' && b.status !== 'done') return 1;
      if (b.status === 'done' && a.status !== 'done') return -1;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    })
    .slice(0, 5);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [hours, setHours] = useState('');
  const [category, setCategory] = useState('School');
  const [dueDate, setDueDate] = useState('');

  const isValid = useMemo(() => title.trim().length > 0 && Number(hours) >= 0, [title, hours]);

  const onAdd = () => {
    if (!isValid) return;
    dispatch(addTask({ title, priority, hours, category, dueDate: dueDate || null }));
    setTitle(''); setHours(''); setPriority('Medium'); setCategory('School'); setDueDate('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add Task</Text>
        
        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Task Name */}
          <View style={styles.field}>
            <Text style={styles.label}>Task name</Text>
            <TextInput
              style={styles.input}
              placeholder="Add your next task here"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Category and Priority Row */}
          <View style={styles.row}>
            <View style={[styles.field, styles.flex1]}>
              <Text style={styles.label}>Category</Text>
              <ChipGroup options={CATEGORIES} value={category} onChange={setCategory} />
            </View>
            <View style={[styles.field, styles.flex1]}>
              <Text style={styles.label}>Priority</Text>
              <ChipGroup options={PRIORITIES} value={priority} onChange={setPriority} />
            </View>
          </View>

          {/* Hours and Due Date Row */}
          <View style={styles.row}>
            <View style={[styles.field, styles.flex1]}>
              <Text style={styles.label}>Hours</Text>
              <TextInput
                style={styles.input}
                placeholder="Estimate time in hours"
                placeholderTextColor="#999"
                value={hours}
                keyboardType="numeric"
                onChangeText={setHours}
              />
            </View>
            <View style={[styles.field, styles.flex1]}>
              <Text style={styles.label}>Due date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/DD"
                placeholderTextColor="#999"
                value={dueDate}
                onChangeText={setDueDate}
              />
            </View>
          </View>

          {/* Add Task Button - Smaller and Centered */}
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, !isValid && styles.buttonDisabled]} 
              disabled={!isValid} 
              onPress={onAdd}
            >
              <Text style={styles.buttonText}>Add Task</Text>
            </Pressable>
          </View>
        </View>

        {/* Recently Added Tasks List */}
        <View style={styles.recentTasksSection}>
          <Text style={styles.sectionTitle}>Task List - Recently Added</Text>
          <View style={styles.tasksList}>
            {recentItems.length === 0 ? (
              <Text style={styles.empty}>No tasks yet—add your first!</Text>
            ) : (
              recentItems.map(item => (
                <TaskRow
                  key={item.id}
                  task={item}
                  onToggle={() => dispatch(toggleTask(item.id))}
                  onDelete={() => dispatch(deleteTask(item.id))}
                />
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ChipGroup({ options, value, onChange }) {
  return (
    <View style={styles.chipsRow}>
      {options.map(opt => {
        const active = opt === value;
        return (
          <Pressable key={opt} onPress={() => onChange(opt)} style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
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
  formSection: {
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
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13, // Meta Info size
    fontWeight: '600',
    marginBottom: 6,
    color: '#6B7280', // Muted Text / Secondary
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDE5DD', // Border / Divider color
    borderRadius: 8, // Button rounded corners
    padding: 12,
    fontSize: 15, // Task Title size
    backgroundColor: '#FFFFFF',
    color: '#1E293B', // Main Text color
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: '#DDE5DD', // Border / Divider color
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#2E7D32', // Primary Accent color
    borderColor: '#2E7D32',
  },
  chipText: {
    fontSize: 13, // Meta Info size
    color: '#6B7280', // Muted Text / Secondary
  },
  chipTextActive: {
    color: '#FFFFFF', // White text on active
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2E7D32', // Primary Accent color
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8, // Button rounded corners
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonDisabled: {
    backgroundColor: '#A5B5A8', // Disabled color from tone board
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600', // Semibold weight from tone board
  },
  recentTasksSection: {
    backgroundColor: '#fff',
    borderRadius: 16, // More rounded
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, // Softer shadow
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50', // Green accent strip
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#2E7D32', // Darker green
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#E8F5E9',
  },
  tasksList: {
    maxHeight: 300,
  },
  empty: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },

});
