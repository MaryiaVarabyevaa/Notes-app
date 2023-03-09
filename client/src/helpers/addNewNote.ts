import { INote } from '../types/note';
import { addNote } from '../http/noteAPI';
import { getDate } from './getDate';
import { getColor } from './getColor';

export const addNewNote = async (notes: INote[]) => {
  const date = getDate();
  const queueNumber = notes.length === 0? 1 : notes?.at(-1)?.queueNumber as number + 1;
  const color = notes.length === 0? '' : notes?.at(-1)?.color as string;
  const newNote = await addNote({
    queueNumber,
    date,
    color: getColor(color),
  });
  return newNote;
};