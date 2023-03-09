import { combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { noteReducer } from './noteReducer';
import { tagsReducer } from './tagsReducer';

const rootReducer = combineReducers({
  noteReducer: noteReducer,
  tagsReducer: tagsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());