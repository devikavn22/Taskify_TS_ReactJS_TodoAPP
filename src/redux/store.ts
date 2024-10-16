
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { saveState, loadState } from './localStorage';

// Load the persisted state from localStorage
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState,
});


store.subscribe(() => {
    saveState(store.getState().todos.todos); // Ensure we save only the array of todos
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
