import {Component, inject} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {UtilsService} from "./core/services/utils.service";
import {SlideMenuComponent} from "./components/slide-menu/slide-menu.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, SlideMenuComponent],
})
export class AppComponent {
  private utilsService = inject(UtilsService);
  constructor() {
    this.utilsService.registerIcons();
  }
}
