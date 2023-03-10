import { Dispatch, SetStateAction } from 'react';
import {restoreFromStorageAction, setEditedNoteIdAction, setNotesAction, updateNotesAction} from "../store/noteReducer";

export interface INoteCreate {
    queueNumber: number;
    color: string;
    date: string;
}

export interface INote extends INoteCreate{
    id: number;
    header: string;
    text: string;
    tags: string[];
}


export interface INoteState {
    notes: INote[];
    isAdded: boolean;
    editedNoteId: number | null;
}

export enum NoteActionTypes {
    ADD_NOTE='ADD_NOTE',
    SET_NOTES='SET_NOTES',
    SET_EDITED_NOTE_ID='SET_EDITED_NOTE_ID',
    UPDATE_NOTES_LIST='UPDATE_NOTES_LIST',
    UPDATE_NOTE='UPDATE_NOTE',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}

export interface INoteAction {
    type: string;
    payload: INote[];
}

// export interface INotesAction {
//     type: string;
//     payload: INote[];
// }

export interface IAddNoteAction {
    type: NoteActionTypes.ADD_NOTE;
    payload: INote;
}

export interface ISetNotesAction {
    type: NoteActionTypes.SET_NOTES;
    payload: INote[];
}

export interface ISetEditedNoteIdAction {
    type: NoteActionTypes.SET_EDITED_NOTE_ID;
    payload: number;
}

export interface IUpdateNotesAction {
    type: NoteActionTypes.UPDATE_NOTES_LIST;
    payload: INote[];
}

export interface IUpdateNoteAction {
    type: NoteActionTypes.UPDATE_NOTE;
    payload: INote;
}

export interface IRestoreFromStorageAction {
    type: NoteActionTypes.RESTORE_FROM_STORAGE;
}

export interface IRootState {
    tagsReducer: any;
    noteReducer: any;
}