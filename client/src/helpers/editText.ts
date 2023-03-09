import { getTextItems } from './getTextItems';

export const editText = (text: string, tag: string): string => {
  const textItems = getTextItems(text);
  const newText = textItems.map((item: string) => {
    if (item.includes('#') && item.replace(/#/g, '') === tag) {
      return item.replace(/#/g, '');
    }
    return item;
  });
  return newText.join(' ');
};
