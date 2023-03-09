import { Dispatch, SetStateAction } from 'react';
import { INote } from './note';

export interface INoteProp extends INote {
    editedItem: HTMLElement | null;
    headerValue: string;
    contextMenuShown: boolean;
    setHeaderValue: Dispatch<SetStateAction<string>>;
    textValue: string;
    setTextValue: Dispatch<SetStateAction<string>>;
}