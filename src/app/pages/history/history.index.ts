import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonCardContent,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOption,
  IonItemOptions
} from "@ionic/angular/standalone";
import {HeaderComponent} from "../../components/header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ItemsThumbnailActionComponent} from "../../components/items-thumbnail-action/items-thumbnail-action.component";
import {ItemSkeletonComponent} from "../../components/item-skeleton/item-skeleton.component";

export const MODULES_HISTORY = [
  IonContent,
  HeaderComponent,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  ReactiveFormsModule,
  IonCardContent,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption,
  IonList,
  IonItem,
  ItemsThumbnailActionComponent,
  ItemSkeletonComponent,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
]
