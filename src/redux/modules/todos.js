import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// initial states
const initialState = [
  {
    id: uuidv4(),
    title: "리액트 공부하기",
    contents: "빨리빨리 암기하기",
    isDone: false,
  },
  {
    id: uuidv4(),
    title: "스프링 공부하기",
    contents: "인강 열심히 들어보기!!",
    isDone: true,
  },
  {
    id: uuidv4(),
    title: "데이트",
    contents: "홍대입구역에서 3시까지",
    isDone: false,
  },
];

// reducers
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    switchTodo: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    },
  },
});

// export
export const { addTodo, removeTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
