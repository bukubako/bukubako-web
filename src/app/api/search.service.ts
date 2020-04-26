import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { String } from 'typescript-string-operations';
import { BookDetails } from '../model/book-details';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  /**
   * 書籍検索
   * @param page ペース数
   * @param q 検索文字
   */
  searchBookInfo(page: number, q: string): Observable<Book> {
    return this.http.get<Book>(String.Format(environment.searchBookInfoUrl, page, q));
  }

  /**
   * 書籍詳細検索
   * @param uri URI
   */
  searchDetailsBook(uri: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(uri);
  }
}
