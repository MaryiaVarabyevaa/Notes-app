import { getTextItems } from './getTextItems';
import { findIndex } from './findIndex';

const REG_EXP: RegExp = /^[a-zA-Z0-9#]+$/;
const HASH: string = '#';

export const getTags = (text: string): string[] => {
  const items: string[] = getTextItems(text);
  const tags: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i].trim();
    if (item.includes('#')) {
      if (item.startsWith(HASH) && item.match(REG_EXP)) {
        tags.push(item);
      }
      if (item.startsWith(HASH) && !item.match(REG_EXP)) {
        const symbolIndex = findIndex(item, REG_EXP);
        tags.push(item.slice(0, symbolIndex));
      }
      if (!item.startsWith(HASH) && item.match(REG_EXP)) {
        const index = findIndex(item);
        tags.push(item.slice(index));
      }
      if (!item.startsWith(HASH) && !item.match(REG_EXP)) {
        const tagIndex = findIndex(item);
        const symbolIndex = findIndex(item, REG_EXP);
        tags.push(item.slice(tagIndex, symbolIndex));
      }
    }
  }
  // console.log(tags);
  // console.log(Array.from(new Set(tags)))

  return Array.from(new Set(tags));
};
