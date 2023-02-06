import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
	completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todoApi',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[todoIndex] = action.payload;
    },
  },
});

export const { addTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
