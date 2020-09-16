export interface CardSchema {
    id?: string;
    description: string;
    comments?: Comment[];
}

export interface Comment {
    date?: Date;
    text: string;
}
