import { Component, Output, Input } from '@angular/core';
import { SearchService } from '../../api/search.service';
import { Item } from '../../model/item';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private items: Item[];

  private page = 30;

  /**
   * コンストラクタ
   * @param searchService 検索サービス
   * @param router ルーター
   */
  constructor(private searchService: SearchService, private router: Router) {
    this.items = [];
  }

  /**
   * 本検索結果取得
   * @param event イベント
   */
  getItems(event: any) {
    this.items = [];
    this.page = 30;
    this.searchService.searchBookInfo(this.page, event.target.value)
    .subscribe(book => {
      this.items = book.items;
    });
  }

  /**
   * 書籍詳細画面へ遷移
   * @param event イベント
   * @param index インデックス
   */
  toBookDetailsPage(event: any, index: number) {
    this.router.navigate(['/book-details', {detailUri: this.items[index].detailUri}]);
  }

  /**
   * スクロール開始時に検索APIをCallし、リストを更新
   * @param event イベント
   */
  onScrollEvent(event: any) {
    this.page += 10;
    this.searchService.searchBookInfo(this.page, event.target.value)
    .subscribe(book => {
      book.items.forEach(item => {
        this.items.push(item);
      });
    });
  }
}
