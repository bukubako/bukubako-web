import { Item } from './item';

export interface Book {
    hitCount: number;
    items: Item[];
    nextPageUri: string;
}
