import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask, updateTask, removeTask } from '../state/tasksSlice';
import { HabitsGrid } from '../components/HabitsGrid';
import { RunningTodoList } from '../components/RunningTodoList';
import { TaskRow } from '../components/TaskRow';

export default function ChecklistScreen() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);
  
  // Get tasks by day for the next 7 days
  const getTasksForNextDays = () => {
    const today = new Date();
    const nextDays = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
      
      const dayTasks = tasks
        .filter(task => {
          const dueDate = task.dueDate || task.due_date; // Handle both field names
          return dueDate === dateString;
        })
        .sort((a, b) => {
          // Sort completed tasks to bottom, then by priority
          if (a.status === 'done' && b.status !== 'done') return 1;
          if (b.status === 'done' && a.status !== 'done') return -1;
          const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
      
      nextDays.push({
        date: dateString,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tasks: dayTasks
      });
    }
    
    return nextDays;
  };

  const weeklySchedule = getTasksForNextDays();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Checklist</Text>
        
        {/* Habits Grid at the top */}
        <View style={styles.habitsSection}>
          <HabitsGrid />
        </View>

        {/* Main Content - Tasks by Day (left 2/3) and Running Todo (right 1/3) */}
        <View style={styles.mainContent}>
          {/* Tasks by Day - Left 2/3 */}
          <View style={styles.tasksSection}>
            <Text style={styles.sectionTitle}>Next 7 Days</Text>
            {weeklySchedule.map((day, index) => (
              <View key={day.date} style={styles.daySection}>
                <Text style={styles.dayHeader}>
                  {index === 0 ? 'Today' : day.dayName} - {day.fullDate}
                </Text>
                <View style={styles.dayTasks}>
                  {day.tasks.length === 0 ? (
                    <Text style={styles.noTasks}>No tasks scheduled</Text>
                  ) : (
                    day.tasks.map(task => (
                      <TaskRow
                        key={task.id}
                        task={task}
                        onToggle={async () => {
                          const updatedTask = { ...task, status: task.status === 'done' ? 'pending' : 'done' };
                          try {
                            await dispatch(updateTask({ id: task.id, ...updatedTask }));
                          } catch (error) {
                            console.error('Error updating task:', error);
                            dispatch(toggleTask(task.id)); // Fallback to local
                          }
                        }}
                        onDelete={async () => {
                          try {
                            await dispatch(removeTask(task.id));
                          } catch (error) {
                            console.error('Error deleting task:', error);
                            dispatch(deleteTask(task.id)); // Fallback to local
                          }
                        }}
                      />
                    ))
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Running Todo List - Right 1/3 */}
          <View style={styles.todoSection}>
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
    backgroundColor: '#F4F7F5', // Light Green Background
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24, // Page title size
    fontWeight: '700', // Bold weight from tone board
    marginBottom: 24,
    color: '#2E7D32', // Primary Accent color
  },
  habitsSection: {
    marginBottom: 24,
  },
  mainContent: {
    flexDirection: 'row',
    gap: 20,
    minHeight: 500,
  },
  tasksSection: {
    flex: 2,
    backgroundColor: '#FFFFFF', // White Card Background
    borderRadius: 12, // Standard border radius
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDE5DD', // Soft Green Border
  },
  todoSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18, // Section title size
    fontWeight: '600', // Semibold weight
    marginBottom: 16,
    color: '#2E7D32', // Primary Accent color
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#DDE5DD',
  },
  daySection: {
    marginBottom: 20,
  },
  dayHeader: {
    fontSize: 16, // Subheading size
    fontWeight: '600', // Semibold weight
    marginBottom: 12,
    color: '#2E7D32', // Primary Accent color
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDE5DD', // Soft Green Border
  },
  dayTasks: {
    paddingLeft: 8,
  },
  noTasks: {
    fontSize: 14, // Body text size
    color: '#6B7280', // Muted Gray text
    fontStyle: 'italic',
    paddingVertical: 8,
  },
});