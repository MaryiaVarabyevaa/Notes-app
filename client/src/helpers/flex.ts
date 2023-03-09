import { IFlex } from '../types/flex';


export const flex = ( flexDirection: string, justifyContent: string, alignItems?: string): IFlex => {
  const flexObj: IFlex = { display: 'flex', flexDirection, justifyContent };
  return alignItems? { ...flexObj, alignItems } : flexObj;
};