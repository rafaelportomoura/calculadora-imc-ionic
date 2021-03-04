import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  weight: number;
  height: number;
  
  constructor(private toastController: ToastController) {}

  onCalculate(){
    const IMC = this.weight / (this.height * this.height);
    this.showMessage(`IMC = ${IMC.toFixed(2)}`)
  }

  async showMessage(msg: string){
    const previousToast = await this.toastController.getTop();
    if (previousToast){
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'tertiary',
      buttons: [
        {
          icon: 'close'
        }
      ]
    });

    toast.present();
  }
}
