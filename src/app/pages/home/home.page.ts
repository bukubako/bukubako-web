import { Component } from '@angular/core';
import { SearchService } from '../../api/search.service';
import { Item } from '../../model/item';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private items: Item[];

  private page = 10;

  constructor(private searchService: SearchService) {
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
    this.searchService.searchBookInfo(this.page, event.target.value)
    .subscribe(book => {
      console.log(book);
      this.items = book.items;
    });
  }
}
