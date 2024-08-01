import {Component} from '@angular/core';
import {MENU_ITEMS} from "../../core/constants/items-menu";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu, IonMenuToggle, IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonHeader, IonToolbar, IonContent, IonItem, IonIcon, IonLabel, RouterLink, IonTitle, IonMenuToggle]
})
export class SlideMenuComponent {
  itemsMenu = MENU_ITEMS;

  constructor() {
  }

}
