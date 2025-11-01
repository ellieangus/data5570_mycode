import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTask } from '../state/tasksSlice';

export function TodaysTasks() {
  const dispatch = useDispatch();
  
  // Get today's date in MM/DD format to match tasks
  const today = new Date();
  const todayString = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
  
  const tasks = useSelector(state => 
    state.tasks.items.filter(task => task.dueDate === todayString)
  );
  
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'done');

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Pressable 
        style={[styles.checkbox, item.status === 'done' && styles.checkboxDone]}
        onPress={() => dispatch(toggleTask(item.id))}
      >
        <Text style={styles.checkboxText}>
          {item.status === 'done' ? '✓' : ''}
        </Text>
      </Pressable>
      <Text style={[
        styles.taskText,
        item.status === 'done' && styles.taskTextDone
      ]}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
      
      {pendingTasks.length === 0 && completedTasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks for today</Text>
      ) : (
        <View>
          {/* Pending Tasks */}
          {pendingTasks.map(task => (
            <View key={task.id}>
              {renderTask({ item: task })}
            </View>
          ))}
          
          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <View>
              {pendingTasks.length > 0 && <View style={styles.separator} />}
              {completedTasks.map(task => (
                <View key={task.id}>
                  {renderTask({ item: task })}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Card Background
    borderRadius: 12, // Universal border radius
    padding: 20, // 1.25rem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, // Consistent soft shadow
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#DDE5DD', // Border / Divider color
    marginBottom: 24, // 1.5rem vertical spacing
  },
  title: {
    fontSize: 18, // Section Title size
    fontWeight: '600', // Section title weight
    marginBottom: 16,
    color: '#2E7D32', // Primary Accent color
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 22, // Consistent icon size (20-22px)
    height: 22,
    borderWidth: 1.5,
    borderColor: '#8FA59A', // Unchecked circle outline
    borderRadius: 11, // Circular
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#2E7D32', // Primary Accent fill
    borderColor: '#2E7D32',
  },
  checkboxText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 15, // Task Title size (15-16px)
    color: '#1E293B', // Main Text color
    flex: 1,
    fontWeight: '500', // Medium weight for readability
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
    color: '#6B7280', // Muted Text / Secondary
  },
  separator: {
    height: 1,
    backgroundColor: '#DDE5DD', // Border / Divider color
    marginVertical: 8,
  },
  emptyText: {
    fontSize: 13, // Placeholder Text size
    color: '#9CA3AF', // Placeholder text color
    textAlign: 'center',
    paddingVertical: 20,
  },
});