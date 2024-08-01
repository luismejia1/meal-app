import {inject, Injectable} from '@angular/core';
import {addIcons} from "ionicons";
import {
  searchOutline,
  moonOutline,
  sunnyOutline,
  chevronForwardOutline,
  menuOutline,
  homeOutline,
  timerOutline,
  arrowBackOutline,
  trashOutline
} from "ionicons/icons";
import {ToastController, LoadingController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);

  constructor() {
  }

  registerIcons() {
    addIcons({
      searchOutline, moonOutline, sunnyOutline, chevronForwardOutline, menuOutline, homeOutline, timerOutline,
      arrowBackOutline, trashOutline
    })
  }

  showLoading(message: string) {
    this.loadingCtrl.create({
      message: message,
      spinner: 'crescent',
      translucent: true,
    }).then((loading) => {
      loading.present();
    });
  }

  hideLoading() {
    this.loadingCtrl.dismiss();
  }

  showToast(message: string, color: string, duration?: number) {
    this.toastCtrl.create({
      message: message,
      color: color,
      duration: duration || 2000,
    }).then((toast) => {
      toast.present();
    });
  }

  generateRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
