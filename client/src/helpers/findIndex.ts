export const findIndex = (elem: string, regExp?: RegExp): number => {
  let index: number;
  if (regExp) {
    index = elem.split('')
      .findIndex((item) => !item.match(regExp));
  } else {
    index = elem.split('')
      .findIndex((item) => item === '#');
  }
  return index;
};