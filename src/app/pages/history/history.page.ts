import {Component, inject} from '@angular/core';
import {HistoryItem} from "../../core/interfaces/history-item.interface";
import {HistoryService} from "../../core/services/history.service";
import {MODULES_HISTORY} from "./history.index";
import {UtilsService} from "../../core/services/utils.service";

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

  constructor() {
    this.historyService.getHistoryBehaviorSubject().subscribe(history => {
      this.history = history;
    });
  }

  deleteItem(id: string) {
    this.history = this.history.filter(item => item.id !== id);
    this.historyService.saveHistory(this.history);
    this.utilsService.showToast('Búsqueda eliminada correctamente', 'success');
  }
}
