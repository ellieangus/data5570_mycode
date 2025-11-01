import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function TaskRow({ task, onToggle, onDelete }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const deleteAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    // Animate toggle: opacity 1 → 0.5 → 1 and scale 1 → 0.98 → 1
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    onToggle();
  };

  const handleDelete = () => {
    // Animate delete: opacity 1 → 0; translateY 0 → 8
    Animated.parallel([
      Animated.timing(deleteAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete();
    });
  };

  const isDone = task.status === 'done';
  const hours = (task.minutes / 60).toFixed(1).replace(/\.0$/, ''); // Convert minutes back to hours, remove .0

  return (
    <Animated.View
      style={[
        styles.row,
        {
          opacity: Animated.multiply(fadeAnim, deleteAnim),
          transform: [
            { scale: scaleAnim },
            { translateY: translateYAnim },
          ],
        },
      ]}
    >
      <View style={styles.left}>
        <Pressable onPress={handleToggle} style={styles.checkboxBtn}>
          <Feather
            name={isDone ? 'check-circle' : 'circle'}
            size={22} // Consistent icon size
            style={[styles.iconLeft, isDone && styles.iconLeftActive]}
          />
        </Pressable>
        <View style={styles.content}>
          <Text style={[styles.title, isDone && styles.titleDone]}>
            {task.title}
          </Text>
          <Text style={styles.meta}>
            {task.category} • {task.priority} • {hours}h
          </Text>
        </View>
      </View>
      
      <Pressable onPress={handleDelete} style={styles.trashBtn}>
        <Feather name="trash-2" size={20} style={styles.trashIcon} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, // 1rem
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE5DD', // Border / Divider color
    backgroundColor: '#FFFFFF', // Card Background
    marginBottom: 12, // 0.75rem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  checkboxBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16, // Task Title size
    fontWeight: '500', // Medium weight
    color: '#1E293B', // Main Text color
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#6B7280', // Muted Text color
    opacity: 0.7,
  },
  meta: {
    fontSize: 13, // Meta Info size
    color: '#6B7280', // Muted Text / Secondary
    marginTop: 2,
  },
  iconLeft: {
    color: '#8FA59A', // Unchecked circle outline
  },
  iconLeftActive: {
    color: '#2E7D32', // Primary Accent - checked fill
  },
  trashBtn: {
    padding: 6,
    borderRadius: 8,
  },
  trashIcon: {
    color: '#C37A7A', // Default trash color
  },
});