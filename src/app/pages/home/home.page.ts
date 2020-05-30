import { Component } from '@angular/core';
import { SearchService } from '../../api/search.service';
import { Item } from '../../model/item';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ScanModalPage } from '../modal/scan-modal/scan-modal.page';

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

  /**
   * コンストラクタ
   * @param searchService 検索サービス
   * @param router ルーター
   */
  constructor(private searchService: SearchService,
              private router: Router,
              private modalController: ModalController,
              private toastController: ToastController) {
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
    this.searchService.searchNextBookInfo(this.nextPageUri).subscribe(book => {
      book.items.forEach(item => {
        this.items.push(item);
      });
      this.nextPageUri = book.nextPageUri;
      event.target.complete();
    });
  }

  /**
   * カメラボタン押下時の処理
   * @param event イベント
   */
  async startScan(event: any) {

    // 解析画面へ遷移
    const page = await this.modalController.create({
      component: ScanModalPage,
      cssClass: 'scan-modal-css',
    });
    await page.present();
    const { data }  = await page.onDidDismiss();

    // 解析結果をtoast
    const toast = await this.toastController.create({
      message: data,
      duration: 2000
    });
    toast.present();

    // 取得したISBNを使用して書籍情報を取得
    this.searchService.searchBookInfoByIsbn(data).subscribe(book => {
      console.log(book);
      this.items = book.items;
      this.nextPageUri = book.nextPageUri;
    });
  }
}
