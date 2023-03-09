import { ITagAction, ITagState, TagActionTypes } from '../types/tag';
import { INoteAction, NoteActionTypes } from '../types/note';


const defaultState: ITagState = {
  tags: [],
  currentTag: '',
};

export const tagsReducer = (state = defaultState, action: any): ITagState => {
  switch (action.type) {
  case TagActionTypes.ADD_TAG:
    localStorage.setItem('tags', JSON.stringify([...state.tags, action.payload]));
    return { ...state, tags: [...state.tags, action.payload] };
  case TagActionTypes.SET_TAGS:
    localStorage.setItem('tags', JSON.stringify([action.payload]));
    return { ...state, tags: action.payload };
  case TagActionTypes.SET_CURRENT_TAG:
    localStorage.setItem('currentTag', action.payload);
    return { ...state, currentTag: action.payload };
  case TagActionTypes.RESTORE_FROM_STORAGE:
    const tags = JSON.parse(localStorage.getItem('tags') as string);
    return { ...state, tags: tags? tags : [] };
  default:
    return { ...state };
  }
};

export const addTagAction = (payload: string): ITagAction => {
  return {
    type: TagActionTypes.ADD_TAG,
    payload: payload,
  };
};

export const setTagsAction = (payload: any): ITagAction => {
  return {
    type: TagActionTypes.SET_TAGS,
    payload: payload,
  };
};

export const setCurrentTagAction = (payload: string): ITagAction => {
  return {
    type: TagActionTypes.SET_CURRENT_TAG,
    payload: payload,
  };
};