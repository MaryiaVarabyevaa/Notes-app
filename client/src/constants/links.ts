import { ILink } from '../types/navBar';
import { MAIN_ROUTE, NOTES_ROUTE } from './routes';

export const links: ILink[] = [
  {
    text: 'Home',
    link: MAIN_ROUTE,
  },
  {
    text: 'Notes',
    link: NOTES_ROUTE,
  },
];