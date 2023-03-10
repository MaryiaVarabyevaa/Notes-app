import {
  IAddNoteAction,
  INote,
  INoteState, IRestoreFromStorageAction,
  ISetEditedNoteIdAction,
  ISetNotesAction, IUpdateNoteAction, IUpdateNotesAction,
  NoteActionTypes,
} from '../types/note';
import { cloneArray } from '../helpers/cloneArray';

const defaultState: INoteState = {
  notes: [],
  isAdded: false,
  editedNoteId: null,
};

export const noteReducer = (state = defaultState, action: any): INoteState => {
  switch (action.type) {
  case NoteActionTypes.SET_NOTES:
    localStorage.setItem('notes', JSON.stringify([action.payload]));
    return { ...state, notes: action.payload };
  case NoteActionTypes.UPDATE_NOTES_LIST:
    localStorage.setItem('notes', JSON.stringify([action.payload]));
    return { ...state, notes: action.payload };
  case NoteActionTypes.ADD_NOTE:
    localStorage.setItem('notes', JSON.stringify([ ...state.notes, action.payload]));
    localStorage.setItem('isAdded', `${!state.isAdded}`);
    localStorage.setItem('editedNoteId', action.payload.id);
    return {
      ...state,
      notes: [ ...state.notes, action.payload],
      isAdded: !state.isAdded,
      editedNoteId: action.payload.id,
    };
  case NoteActionTypes.SET_EDITED_NOTE_ID:
    localStorage.setItem('editedNoteId', action.payload);
    return { ...state, editedNoteId: action.payload };
  case NoteActionTypes.UPDATE_NOTE:
    const updatedId = action.payload.id as number;
    const { index, copiedNotes: copiedState } = cloneArray(state.notes, updatedId);
    copiedState[index] = action.payload;
    localStorage.setItem('notes', JSON.stringify(copiedState));
    return { ...state, notes: copiedState };
  case NoteActionTypes.RESTORE_FROM_STORAGE:
    const notes = JSON.parse(localStorage.getItem('notes') as string);
    const isAdded = localStorage.getItem('isAdded') === 'true'? true : false;
    const editedNoteId = localStorage.getItem('editedNoteId');
    return {
      ...state,
      notes: notes? notes : [],
      isAdded,
      editedNoteId: editedNoteId === 'null'? null : Number(editedNoteId),
    };
  default:
    return { ...state };
  }
};

export const addNoteAction = (payload: INote): IAddNoteAction => {
  return {
    type: NoteActionTypes.ADD_NOTE,
    payload: payload,
  };
};

export const setNotesAction = (payload: INote[]):ISetNotesAction => {
  return {
    type: NoteActionTypes.SET_NOTES,
    payload: payload,
  };
};

export const setEditedNoteIdAction = (payload: number | null): ISetEditedNoteIdAction => {
  return {
    type: NoteActionTypes.SET_EDITED_NOTE_ID,
    payload: payload,
  };
};

export const updateNotesAction = (payload: INote[]): IUpdateNotesAction => {
  return {
    type: NoteActionTypes.UPDATE_NOTES_LIST,
    payload: payload,
  };
};

export const updateNoteAction = (payload: INote): IUpdateNoteAction => {
  return {
    type: NoteActionTypes.UPDATE_NOTE,
    payload: payload,
  };
};

export const restoreFromStorageAction = (): IRestoreFromStorageAction => {
  return {
    type: NoteActionTypes.RESTORE_FROM_STORAGE,
  };
};
