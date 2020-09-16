import { ListSchema } from './listschema';

export interface BoardSchema {
    id: number;
    title: string;
    lists: ListSchema[];
}
