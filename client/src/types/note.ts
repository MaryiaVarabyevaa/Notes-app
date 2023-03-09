import { Dispatch, SetStateAction } from 'react';

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

export interface INoteComponent extends INote {
    editedItem: HTMLElement | null;
    headerValue: string;
    contextMenuShown: boolean;
    setHeaderValue: Dispatch<SetStateAction<string>>;
    textValue: string;
    setTextValue: Dispatch<SetStateAction<string>>;
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

export interface IRootState {
    tagsReducer: any;
    noteReducer: any;
}