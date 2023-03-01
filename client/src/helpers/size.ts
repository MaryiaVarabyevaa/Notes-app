
interface ISize {
    width: string;
    height: string;
}

export const size = (width: string, height: string): ISize => {
  return { width, height };
};