import { HASH, REG_EXP } from '../constants/tags';

export const getTextItems = (text: string): string[] => {
  if (!text) return [];
  const textItems: string[] = text.split(' ');
  const items: string[] = [];
  let item: string = '';

  for (let i = 0; i < textItems.length; i++) {
    const elem = textItems[i];
    if (elem.startsWith(HASH)) {
      // if (!elem.match(REG_EXP)) {
      //   const a = item.split('');
      //   const b = a.findIndex((char) => !char.match(REG_EXP));
      //   const index = elem.split('').findIndex((char) => !char.match(REG_EXP));
      //   const newItem: string[] = item === ''? [elem.slice(0, index)] : [item.trim(), elem.slice(0, index)];
      //   items.push(...newItem, elem.slice(index));
      // } else {
      //   const newItem: string[] = item === ''? [elem] : [item.trim(), elem];
      //   items.push(...newItem);
      // }
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