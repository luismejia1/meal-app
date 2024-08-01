import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader, IonItem, IonLabel, IonList, IonListHeader,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../components/header/header.component";

export const MODULES_DISH_DETAIL = [
  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonList, IonListHeader, IonLabel, IonItem, IonButton
]
