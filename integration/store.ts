import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../module/reducers';
import { todoApi } from '@/services/todo/todoApi';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, todoApi.middleware))
);

export default store;
