import { INote } from '../types/note';
import { ICloneArray } from '../types/cloneArray';

export const cloneArray = (notes: INote[], id: number): ICloneArray => {
  const index: number = notes.findIndex((note) => note.id === id);
  const copiedNotes: INote[] = notes.slice();
  return { index, copiedNotes };
};