import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksAPI, habitsAPI } from '../services/api';

// Async thunks for API calls
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await tasksAPI.getAll();
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const newTask = await tasksAPI.create(taskData);
      return newTask;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...taskData }, { rejectWithValue }) => {
    try {
      const updatedTask = await tasksAPI.update(id, taskData);
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await tasksAPI.delete(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHabits = createAsyncThunk(
  'tasks/fetchHabits',
  async (_, { rejectWithValue }) => {
    try {
      const habits = await habitsAPI.getAll();
      return habits;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createHabit = createAsyncThunk(
  'tasks/createHabit',
  async (habitData, { rejectWithValue }) => {
    try {
      const newHabit = await habitsAPI.create(habitData);
      return newHabit;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [], // Tasks from backend
  habits: [], // Habits from backend
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Local actions for immediate UI updates
    addTask: {
      prepare: ({ title, priority, hours, category, dueDate }) => ({
        payload: {
          id: nanoid(),
          title: title.trim(),
          priority,                 // 'High' | 'Medium' | 'Low'
          minutes: Math.round((Number(hours) || 0) * 60), // store minutes internally
          category,                 // 'School' | 'Work' | 'Personal'
          status: 'pending',
          dueDate: dueDate?.trim() || null, // ISO 'YYYY-MM-DD' or null
        }
      }),
      reducer: (state, action) => { state.items.push(action.payload); }
    },
    toggleTask(state, action) {
      const t = state.items.find(x => x.id === action.payload);
      if (t) t.status = t.status === 'done' ? 'pending' : 'done';
    },
    deleteTask(state, action) {
      state.items = state.items.filter(x => x.id !== action.payload);
    },

    // Local habit actions
    addHabit(state, action) {
      const name = String(action.payload || '').trim();
      if (!name) return;
      state.habits.push({
        id: nanoid(),
        name,
        checks: { Mon:false, Tue:false, Wed:false, Thu:false, Fri:false, Sat:false, Sun:false }
      });
    },
    toggleHabitCheck(state, action) {
      const { habitId, dayKey } = action.payload; // e.g. 'Mon'
      const h = state.habits.find(h => h.id === habitId);
      if (h && h.checks.hasOwnProperty(dayKey)) {
        h.checks[dayKey] = !h.checks[dayKey];
      }
    },
    
    // Error handling
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk states
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Task
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      
      // Remove Task
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      
      // Fetch Habits
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      // Create Habit
      .addCase(createHabit.fulfilled, (state, action) => {
        state.habits.push(action.payload);
      });
  }
});

export const { addTask, toggleTask, deleteTask, addHabit, toggleHabitCheck, clearError } = tasksSlice.actions;
// fetchTasks and other async thunks are already exported where they're declared
export default tasksSlice.reducer;
