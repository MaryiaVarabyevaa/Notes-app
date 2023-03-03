import { Dispatch, SetStateAction } from 'react';

export interface INoteCreate {
    queueNumber: number;
    color: string;
    date: string;
}

export interface INote extends INoteCreate{
    id: number;
    header: string;
    text: string;
    tags: string[];
}

export interface INoteComponent extends INote {
    editedItem: HTMLDivElement | null;
    editedNoteId: number | null;
    headerValue: string;
    setHeaderValue: Dispatch<SetStateAction<string>>;
    textValue: string;
    setTextValue: Dispatch<SetStateAction<string>>;
}