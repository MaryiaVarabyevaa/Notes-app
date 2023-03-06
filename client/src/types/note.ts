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
    editedItem: HTMLElement | null;
    editedNoteId: number | null;
    headerValue: string;
    contextMenuShown: boolean;
    setHeaderValue: Dispatch<SetStateAction<string>>;
    textValue: string;
    setTextValue: Dispatch<SetStateAction<string>>;
    notes: INote[];
    setNotes: Dispatch<SetStateAction<INote[]>>;
}

export interface ITagsUpdate {
    id: number;
    text: string;
    tags: string[];
    date: string;
}