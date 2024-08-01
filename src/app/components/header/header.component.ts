import {Component, Input} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon, IonButton, IonButtons, IonMenuToggle
} from '@ionic/angular/standalone';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, IonButtons, IonMenuToggle],
})
export class HeaderComponent  {
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;

  constructor(private menuController: MenuController) {
  }




  toggleMenu() {
    this.menuController.toggle().then();
  }

}
