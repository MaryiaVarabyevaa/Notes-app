export const getDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}.${month > 9? month : `0${month}` }.${day > 9? day : `0${day}`}`;
};