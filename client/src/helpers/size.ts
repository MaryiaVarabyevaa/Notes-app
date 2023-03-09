import { ISize } from '../types/size';

export const size = (width: string, height: string): ISize => {
  return { width, height };
};