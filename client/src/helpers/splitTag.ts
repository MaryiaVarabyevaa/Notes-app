import { findIndex } from './findIndex';

const REG_EXP: RegExp = /^[a-zA-Z0-9#_-]+$/;
const HASH: string = '#';

export const splitTag = (word: string): string[] => {
  if (word.startsWith(HASH) && word.match(REG_EXP)) {
    return [word + ' '];
  }
  if (word.startsWith(HASH) && !word.match(REG_EXP)) {
    const symbolIndex = findIndex(word, REG_EXP);
    return [word.slice(0, symbolIndex), word.slice(symbolIndex) + ' '];
  }
  if (!word.startsWith(HASH) && word.match(REG_EXP)) {
    const index = findIndex(word);
    return [word.slice(0, index), word.slice(index) + ' '];
  }
  if (!word.startsWith(HASH) && !word.match(REG_EXP)) {
    const tagIndex = findIndex(word);
    const symbolIndex = findIndex(word, REG_EXP);
    return [word.slice(0, tagIndex), word.slice(tagIndex, symbolIndex), word.slice(symbolIndex) + ' '];
  }
  return [];
};