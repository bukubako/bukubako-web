import { Item } from './item';

export interface Book {
    /**
     * ヒット件数
     */
    hitCount: number;
    /**
     * 検索結果
     */
    items: Item[];
    /**
     * 次ページURI
     */
    nextPageUri: string;
}
