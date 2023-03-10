import { IFont } from '../types/font';

export const font = ( fontWeight: string, fontSize: string, lineHeight: string, letterSpacing: string, color: string, fontFamily?: string ): IFont => {
  const fontObj: IFont = { fontWeight, fontSize, lineHeight, letterSpacing, color };
  return fontFamily? { ...fontObj, fontFamily } : fontObj;
};