import { HASH } from '../constants/tags';

export const getTextItems = (text: string): string[] => {
  if (!text) return [];
  const textItems: string[] = text.split(' ');
  const items: string[] = [];
  let item: string = '';

  for (let i = 0; i < textItems.length; i++) {
    const elem = textItems[i];
    if (elem.includes(HASH)) {
      const newItem: string[] = item === ''? [elem] : [item.trim(), elem];
      items.push(...newItem);
      if (item !== '') item = '';
    }
    else {
      item = `${item}${elem} `;
    }

    if (i === textItems.length - 1 && item !== '') {
      items.push(item.trim());
    }
  }
  return items;
};