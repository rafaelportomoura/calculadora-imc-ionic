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

  isFormValid() {
    return !(this.weight && this.height && this.weight > 0 && this.height > 0);
  }

  ImcDegreeCalculate(IMC: number){
    if (IMC < 18.5){
      return 'MAGREZA';
    } else if (IMC < 25){
      return 'NORMAL';
    } else if (IMC < 30) {
      return 'SOBREPESO';
    } else if (IMC < 40){
      return 'OBESIDADE';
    } else {
      return 'OBESIDADE GRAVE';
    }
  }

  onCalculate(){
    const IMC = this.weight / (this.height * this.height);
    const degree = this.ImcDegreeCalculate(IMC);
    this.showMessage(`IMC = ${IMC.toFixed(2)}   -   ${degree}`)
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
