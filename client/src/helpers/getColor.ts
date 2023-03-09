import { colors } from '../constants/colors';

export const getColor = (color: string): string => {
  if (color === '') return colors[0];
  let index = colors.indexOf(color);
  index = index === colors.length - 1 || index === -1? 0 : index + 1;
  return colors[index];
};