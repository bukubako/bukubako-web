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

  constructor(private searchService: SearchService, private router: Router) {
    this.items = [];
  }

  /**
   * <dl>
   * <dt><b>メソッド概要: </b></dt>
   * <dd>本検索結果取得</dd>
   * </dl>
   *
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

  toBookDetailsPage(event: any, index: number) {
    this.router.navigate(['/book-details', {detailUri: this.items[index].detailUri}]);
  }

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
