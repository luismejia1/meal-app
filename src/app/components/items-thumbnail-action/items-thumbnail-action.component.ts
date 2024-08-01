import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IonButton, IonIcon, IonImg, IonItem, IonLabel, IonThumbnail} from "@ionic/angular/standalone";

@Component({
  selector: 'app-items-thumbnail-action',
  templateUrl: './items-thumbnail-action.component.html',
  styleUrls: ['./items-thumbnail-action.component.scss'],
  standalone: true,
  imports: [IonItem, IonThumbnail, IonImg, IonLabel, IonButton, IonIcon]
})
export class ItemsThumbnailActionComponent {
  @Input() src: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() actionLabel: string = '';
  @Input() actionIcon: string = '';
  @Input() actionColor: string = 'primary';

  @Output() buttonClickEvent = new EventEmitter;

  constructor() {
  }

  onAction() {
    this.buttonClickEvent.emit();
  }

}
