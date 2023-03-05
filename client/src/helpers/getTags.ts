export const getTags = (text: string): string[] => {
  const arr: string[] = text.split(' ');
  const tags = new Set<string>();;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('#')) {
      tags.add(arr[i].replace(/#/gi, ''));
    }
  }
  return Array.from(tags);
};
