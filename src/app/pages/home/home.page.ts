import { Component } from '@angular/core';
import { SearchService } from '../../api/search.service';
import { Item } from '../../model/item';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private items: Item[];

  private page: number;

  private searchValue: string;

  private nextPageUri: string;

  private readyScan: boolean;

  private hasPermission: boolean;

  /**
   * コンストラクタ
   * @param searchService 検索サービス
   * @param router ルーター
   */
  constructor(private searchService: SearchService,
              private router: Router,
              private alertController: AlertController) {
    this.items = [];
  }

  /**
   * 本検索結果取得
   * @param event イベント
   */
  getItems(event: any) {
    this.searchValue = event.target.value;
    this.items = [];
    this.page = 10;
    this.searchService.searchBookInfo(this.page, this.searchValue)
    .subscribe(book => {
      this.items = book.items;
      this.nextPageUri = book.nextPageUri;
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
  doRefresh(event: any) {
    this.searchService.searchNextBookInfo(this.nextPageUri)
    .subscribe(book => {
      book.items.forEach(item => {
        this.items.push(item);
      });
      this.nextPageUri = book.nextPageUri;
      event.target.complete();
    });
  }

  /**
   * 解析実行
   * @param event イベント
   */
  executeScan(event: any) {
    this.readyScan = true;
  }

  /**
   * 解析成功時処理
   * @param evt 解析結果
   */
  async scanSuccessHandler(evt: any) {
    if (this.readyScan) {
      const alert = await this.alertController.create({
        header: 'ISBN取得結果',
        subHeader: '取得結果の加工等はしていない。',
        message: evt,
        buttons: ['OK']
      });
      alert.present();
    }
    this.readyScan = false;
  }
}
