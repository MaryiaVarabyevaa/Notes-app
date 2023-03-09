import { INote, INoteCreate } from '../types/note';
import { ITagsUpdate } from '../types/tag';
import { $host } from './index';


export const getNotes = async (tag: string): Promise<INote[]> => {
  const { data } = await $host.get('notes', { params: { tag } });
  return data;
};

export const getUniqueTags = async (): Promise<string[]> => {
  const { data } = await $host.get('notes/tags');
  return data;
};

export const addNote = async (note: INoteCreate): Promise<INote> => {
  const { data } = await $host.post('notes/create', note);
  return data;
};

export const updateQueueNumber = async (notes: INote[]): Promise<void> => {
  const { data } = await $host.put('notes/update-order', notes);
};

export const updateNoteInfo = async (note: INote): Promise<void> => {
  const { data } = await $host.put('notes/update', note);
};

export const updateTags = async (note: ITagsUpdate): Promise<void> => {
  const { data } = await $host.put('notes/update-tags', note);
};

export const deleteNote = async (id: number): Promise<boolean> => {
  const { data } = await $host.delete('notes/delete', { data: { id } });
  return data;
};
