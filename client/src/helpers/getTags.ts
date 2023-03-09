import { HASH, REG_EXP } from '../constants/tags';
import { getTextItems } from './getTextItems';

export const getTags = (text: string): string[] => {
  const items: string[] = getTextItems(text);
  const tags: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i].trim();
    if (item.includes(HASH)) {
      if (item.startsWith(HASH) && item.match(REG_EXP)) {
        tags.push(item.slice(1));
      }
      // if (item.startsWith(HASH) && !item.match(REG_EXP)) {
      //   const symbolIndex = findIndex(item, REG_EXP);
      //   tags.push(item.slice(1, symbolIndex));
      // }
      // if (!item.startsWith(HASH) && item.match(REG_EXP)) {
      //   const index = findIndex(item) + 1;
      //   tags.push(item.slice(index));
      // }
      // if (!item.startsWith(HASH) && !item.match(REG_EXP)) {
      //   const tagIndex = findIndex(item) + 1;
      //   const symbolIndex = findIndex(item, REG_EXP);
      //   tags.push(item.slice(tagIndex, symbolIndex));
      // }
    }
  }
  return Array.from(new Set(tags));
};
