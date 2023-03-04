import { INote } from '../types/note';

interface ICloneArray {
    index: number;
    copiedNotes: INote[];
}

export const cloneArray = (notes: INote[], id: number): ICloneArray => {
  const index: number = notes.findIndex((note) => note.id === id);
  const copiedNotes: INote[] = notes.slice();
  return { index, copiedNotes };
};