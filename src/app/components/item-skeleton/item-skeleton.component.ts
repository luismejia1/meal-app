import {Component} from '@angular/core';
import {IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail} from "@ionic/angular/standalone";

@Component({
  selector: 'app-item-skeleton',
  templateUrl: './item-skeleton.component.html',
  styleUrls: ['./item-skeleton.component.scss'],
  standalone: true,
  imports: [IonList, IonListHeader, IonSkeletonText, IonItem, IonThumbnail, IonLabel]
})
export class ItemSkeletonComponent  {

  constructor() {
  }



}
