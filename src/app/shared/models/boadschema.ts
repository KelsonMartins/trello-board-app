export interface BoardSchema {
    id: number;
    title: string;
    lists: TaskSchema[];
}
export interface TaskSchema {
    id: string;
    title: string;
    description?: string;
    status: Status;
    comments?: CommentSchema[];
}

export interface CommentSchema {
    date: Date;
    text: string;
}

export enum Status {
    ToDo = 'To Do',
    Doing = 'Doing',
    Done = 'Done'
}
