import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private storageService = new StorageService();
  private historyBehaviorSubject = new BehaviorSubject<any>([]);

  constructor() {
    this.historyBehaviorSubject.next(this.getHistory());
  }

  getHistory() {
    return this.storageService.getItem('history') || [];
  }

  getHistoryBehaviorSubject() {
    return this.historyBehaviorSubject;
  }

  saveHistory(history: any) {
    this.historyBehaviorSubject.next(history);
    this.storageService.setItem('history', history);
  }
}
