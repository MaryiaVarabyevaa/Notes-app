interface IFlex {
    display: string;
    flexDirection: string;
    justifyContent: string;
    alignItems?: string;
}

export const flex = ( flexDirection: string, justifyContent: string, alignItems?: string): IFlex => {
  const flexObj: IFlex = { display: 'flex', flexDirection, justifyContent };
  return alignItems? { ...flexObj, alignItems } : flexObj;
};