import { INoteState } from './note';
import { ITagState } from './tag';

export interface IRootState {
    tagsReducer: ITagState;
    noteReducer: INoteState;
}