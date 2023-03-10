import { HASH, REG_EXP } from '../constants/tags';
import { getTextItems } from './getTextItems';

export const getTags = (text: string): string[] => {
  const items: string[] = getTextItems(text);
  const tags: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i].trim();
    if (item.startsWith(HASH) && item.match(REG_EXP)) {
      tags.push(item.slice(1));
    }
    if (item.startsWith(HASH) && !item.match(REG_EXP)) {
      const index = item.split('').findIndex((char) => !char.match(REG_EXP));
      tags.push(item.slice(1, index));
    }
  }
  return Array.from(new Set(tags));
};
