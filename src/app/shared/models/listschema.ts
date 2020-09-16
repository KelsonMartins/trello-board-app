import { CardSchema } from './cardschema';

export interface ListSchema {
    name: string;
    cards: CardSchema[];
}
