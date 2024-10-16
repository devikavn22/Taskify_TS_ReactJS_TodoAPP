import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Todo{
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState{
    todos: Todo[];
}

const initialState:TodoState={
    todos: [],
}

const todoSlice=createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo:(state, action:PayloadAction<string>)=>{
          console.log('state.todos before:', state.todos); 
            const newTodo:Todo={
                id: Date.now(),
                title: action.payload,
                completed: false
            }
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
              todo.completed = !todo.completed;
            }
          },
          deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
          },
          updateTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            if (todo) {
              todo.title = action.payload.title;
            }
          },
    },
});


export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;