import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.page.html',
  styleUrls: ['./scan-modal.page.scss'],
})
export class ScanModalPage implements OnInit {

  private result: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }


  /**
   * 解析成功時処理
   * @param evt 解析結果
   */
  async scanSuccessHandler(evt: any) {
    console.log(evt);
    this.result = evt;
  }

  camerasFoundHandler(evt: any) {
    console.log('camerasFoundHandler');
    console.log(evt);
  }

  onTorchCompatible(event: any) {
    console.log('onTorchCompatible');
    console.log(event);
  }

  close() {
    this.modalController.dismiss();
  }
}
