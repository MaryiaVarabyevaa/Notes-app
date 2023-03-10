import { getTextItems } from './getTextItems';

export const editText = (text: string, tag: string): string => {
  const textItems = getTextItems(text);
  const newText = textItems.map((item: string) => {
    console.log(item.includes(tag));
    if (item.includes('#') && item.includes(tag)) {
      return item.replace(/#/g, '');
    }
    return item;
  });
  return newText.join(' ');
};
