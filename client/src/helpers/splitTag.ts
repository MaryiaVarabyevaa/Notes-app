import { HASH, REG_EXP } from '../constants/tags';

export const splitTag = (tag: string): string[] => {
  if (tag.startsWith(HASH) && tag.match(REG_EXP)) {
    return [tag + ' '];
  }
  if (tag.startsWith(HASH) && !tag.match(REG_EXP)) {
    const index = tag.split('').findIndex((char) => !char.match(REG_EXP));
    return [tag.slice(0, index), tag.slice(index) + ' '];
  }
  return [];
};