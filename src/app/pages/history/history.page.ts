import {Component, inject} from '@angular/core';
import {HistoryItem} from "@interfaces/history-item.interface";
import {HistoryService} from "@services/history.service";
import {MODULES_HISTORY} from "./history.index";
import {UtilsService} from "@services/utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [MODULES_HISTORY]
})
export class HistoryPage {
  private historyService = inject(HistoryService);
  private utilsService = inject(UtilsService);

  history: HistoryItem[] = [];

  constructor(private router: Router) {
    this.historyService.getHistoryBehaviorSubject().subscribe(history => {
      this.history = history;
    });
  }

  deleteItem(id: string) {
    this.history = this.history.filter(item => item.id !== id);
    this.historyService.saveHistory(this.history);
    this.utilsService.showToast('Búsqueda eliminada correctamente', 'success');
  }

  redirectToHomeAndExecuteSearch(search: string) {
    this.router.navigate(['/home'], {queryParams: {search}});
  }

  deleteAllItems() {
    this.history = [];
    this.historyService.saveHistory(this.history);
    this.utilsService.showToast('Historial eliminado correctamente', 'success');
  }
}
