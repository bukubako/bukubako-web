import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.page.html',
  styleUrls: ['./scan-modal.page.scss'],
})
export class ScanModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }


  /**
   * 解析成功時処理
   * @param evt 解析結果
   */
  async scanSuccessHandler(result: string) {
    console.log(result);
    if (result === null || result === undefined) {
      return;
    }
    await this.modalController.dismiss(result);
  }

  /**
   * モーダル閉じる処理
   */
  async close() {
    await this.modalController.dismiss();
  }
}
