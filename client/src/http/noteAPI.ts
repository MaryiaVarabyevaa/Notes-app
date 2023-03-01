import { INote, INoteCreate } from '../types/note';
import { $host } from './index';


export const getNotes = async (): Promise<INote[]> => {
  const { data } = await $host.get('notes');
  return data;
};

export const addNote = async (note: INoteCreate): Promise<INote> => {
  const { data } = await $host.post('notes/create', note);
  return data;
};