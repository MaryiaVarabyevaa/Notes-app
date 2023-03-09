export interface IContextMenu {
    x: number;
    y: number;
    id: number | null;
    closeContextMenu: () => void;
    updateNote: (newColor?: string) => Promise<void>;
}

export interface IInitialContextMenu {
    show: boolean;
    x: number;
    y: number;
}