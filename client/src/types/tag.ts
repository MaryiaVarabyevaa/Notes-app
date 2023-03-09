

export interface ITagState {
    tags: string[];
    currentTag: string;
}

export interface ITagAction {
    type: string;
    payload: string;
}

export enum TagActionTypes {
    ADD_TAG='ADD_TAG',
    SET_TAGS='SET_TAGS',
    SET_CURRENT_TAG='SET_CURRENT_TAG',
    RESTORE_FROM_STORAGE='RESTORE_FROM_STORAGE',
}

export interface ITagsUpdate {
    id: number;
    text: string;
    tags: string[];
    date: string;
}
