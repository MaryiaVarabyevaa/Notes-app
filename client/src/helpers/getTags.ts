export const getTags = (text: string): string[] => {
  const arr: string[] = text.split(' ');
  const tags: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes('#')) {
      tags.push(arr[i]);
    }
  }
  return tags;
};