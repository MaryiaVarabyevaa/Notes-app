
const colors = ['#FFAFA3', '#80CAFF', '#FFD966', '#85E0A3', '#D9B8FF', '#FFC470'];

export const getColor = (color: string): string => {
  let index = colors.indexOf(color);
  index = index === colors.length - 1 || index === -1? 0 : index + 1;
  return colors[index];
};