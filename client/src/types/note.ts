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