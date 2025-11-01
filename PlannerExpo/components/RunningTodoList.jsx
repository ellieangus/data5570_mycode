import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTask, deleteTask } from '../state/tasksSlice';
import { TaskRow } from './TaskRow';

export function RunningTodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => 
    state.tasks.items
      .filter(task => !task.dueDate) // No due date
      .sort((a, b) => {
        // Sort completed tasks to bottom, then by priority
        if (a.status === 'done' && b.status !== 'done') return 1;
        if (b.status === 'done' && a.status !== 'done') return -1;
        const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
  );

  const renderTask = ({ item }) => (
    <TaskRow
      task={item}
      onToggle={() => dispatch(toggleTask(item.id))}
      onDelete={() => dispatch(deleteTask(item.id))}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Running To-Do</Text>
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks without due dates</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Card Background
    borderRadius: 12, // Universal border radius
    padding: 20, // 1.25rem
    height: '100%',
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

  emptyText: {
    fontSize: 13, // Placeholder Text size
    color: '#9CA3AF', // Placeholder text color
    textAlign: 'center',
    marginTop: 20,
  },
});