import { setCurrentTagAction, setTagsAction } from '../store/tagsReducer';
import { INote, NoteActionTypes } from './note';


export interface ITagState {
    tags: string[];
    currentTag: string;
}

export interface ITagAction {
    type: string;
    payload: string;
}

export enum TagActionTypes {
    SET_TAGS='SET_TAGS',
    SET_CURRENT_TAG='SET_CURRENT_TAG',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}

export interface ISetTagsAction {
    type: TagActionTypes.SET_TAGS;
    payload: string[];
}

export interface ISetCurrentTagAction {
    type: TagActionTypes.SET_CURRENT_TAG;
    payload: string;
}


export interface ITagsUpdate {
    id: number;
    text: string;
    tags: string[];
    date: string;
}
