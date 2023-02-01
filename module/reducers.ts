import { combineReducers } from 'redux';
import todoReducer from "./todo/reducer"
import { todoApi } from '@/services/todo/todoApi';

const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
  todo: todoReducer
});

export default rootReducer;