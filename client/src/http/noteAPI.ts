import { $host } from './index';

export const getNotes = async () => {
  const { data } = await $host.get('notes');
  return data;
};