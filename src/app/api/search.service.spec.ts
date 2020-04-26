import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('書籍検索APIをCallし応答を受け取れることを確認', () => {
    const service: SearchService = TestBed.get(SearchService);
    service.searchBookInfo(1, 'カルマート').subscribe(book => {
      // hitCountが1件以上であることを確認
      expect(book.hitCount).toBeGreaterThan(1);
      // itemsの件数が1件以上であることを確認
      expect(book.items.length).toBeGreaterThan(1);
      // nextPageUriがnullでないことを確認
      expect(book.nextPageUri).not.toBeNull();
      // nextPageUriが空文字でないことを確認
      expect(book.nextPageUri).not.toEqual('');
    });
  });

  it('書籍詳細検索APIをCallし応答を受け取れることを確認', () => {
    const service: SearchService = TestBed.get(SearchService);
    service.searchDetailsBook('1234567890123').subscribe(bookDetails => {
      // 著者名がnull出ないことを確認
      expect(bookDetails.authors).not.toBeNull();
      // 概要が空文字でないことを確認
      expect(bookDetails.description).not.toEqual('');
      // 画像Uriがnullでないことを確認。
      expect(bookDetails.imageUri).not.toBeNull();
      // 発行年月日がnullでないことを確認。
      expect(bookDetails.publishedDate).not.toBeNull();
      // タイトルが空文字でないことを確認。
      expect(bookDetails.title).not.toEqual('');
    });
  });
});
