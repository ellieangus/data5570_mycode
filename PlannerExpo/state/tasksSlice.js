import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [], // {id, title, priority, minutes, category, status, dueDate?}
  habits: [
    // simple starter habit data for the weekly grid
    // { id: 'h1', name: 'Climb', checks: {Mon:false,Tue:false,Wed:false,Thu:false,Fri:false,Sat:false,Sun:false} }
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
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

    // --- Habits (super light MVP)
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
  }
});

export const { addTask, toggleTask, deleteTask, addHabit, toggleHabitCheck } = tasksSlice.actions;
export default tasksSlice.reducer;
