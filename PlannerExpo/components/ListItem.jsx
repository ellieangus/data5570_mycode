import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListItem = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return '#4CAF50'; // Green - Low priority
      case 2: return '#FF9800'; // Orange - Medium priority  
      case 3: return '#F44336'; // Red - High priority
      default: return '#9E9E9E'; // Gray - Default
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'school': return '#2196F3'; // Blue
      case 'work': return '#9C27B0'; // Purple
      case 'personal': return '#4CAF50'; // Green
      case 'other': return '#607D8B'; // Blue Gray
      default: return '#9E9E9E'; // Gray
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.taskName}>{task.name}</Text>
        <View 
          style={[
            styles.priorityBadge, 
            { backgroundColor: getPriorityColor(task.priority) }
          ]}
        >
          <Text style={styles.priorityText}>P{task.priority}</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View 
          style={[
            styles.categoryBadge, 
            { backgroundColor: getCategoryColor(task.category) }
          ]}
        >
          <Text style={styles.categoryText}>{task.category.toUpperCase()}</Text>
        </View>
        
        {task.estimatedTime && (
          <Text style={styles.detailText}>
            ⏱️ {task.estimatedTime}h
          </Text>
        )}
        
        {task.dueDate && (
          <Text style={styles.detailText}>
            📅 {task.dueDate}
          </Text>
        )}
      </View>
      
      <Text style={styles.createdAt}>
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 30,
    alignItems: 'center',
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default ListItem;