import {Component, inject} from '@angular/core';
import {MODULES_HOME} from "./home.index";
import {DishService} from "../../core/services/dish.service";
import {catchError, throwError} from "rxjs";
import {UtilsService} from "../../core/services/utils.service";
import {Category} from "../../core/interfaces/category.interface";
import {FormsModule} from "@angular/forms";
import {Meal} from "../../core/interfaces/meal.interface";
import {Router} from "@angular/router";
import {HistoryService} from "../../core/services/history.service";
import {HistoryItem} from "../../core/interfaces/history-item.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [MODULES_HOME, FormsModule],
})
export class HomePage {
  private mealService = inject(DishService);
  private utilsService = inject(UtilsService);
  private historyService = inject(HistoryService);

  categoriesOptions: Category[] = [];
  mealsArr!: Meal[];
  nameToSearch: string = '';
  categorySelected: string = '';
  showSkeletonLoading: boolean = false;
  history: HistoryItem[] = [];

  constructor(private router: Router) {
    this.fetchCategoriesOptions();
    this.history = this.historyService.getHistory() || [];
  }

  fetchCategoriesOptions() {
    this.utilsService.showLoading('Cargando información necesaria...');
    this.mealService.fetchMealCategories().pipe(
      catchError((error) => {
        return throwError(() => {
          this.utilsService.showToast('No se pudieron obtener las categorías', 'danger');
          console.log(error);
          this.utilsService.hideLoading();
        });
      })
    ).subscribe((response: any) => {
      this.utilsService.hideLoading();
      this.categoriesOptions = response.categories;
    });
  }

  searchMealByCategory(category: string) {
    this.showSkeletonLoading = true;
    this.mealService.fetchMealByCategory(category).pipe(
      catchError((error) => {
        return throwError(() => {
          this.showSkeletonLoading = false;
          console.log(error);
          this.utilsService.showToast('No se pudieron obtener las comidas', 'danger');
        });
      })
    ).subscribe((response: any) => {
      this.showSkeletonLoading = false;
      this.mealsArr = response.meals;
      console.log(this.mealsArr);
    });
  }

  searchMealByName(name: string) {
    this.showSkeletonLoading = true;
    this.mealService.fetchMealByName(name).pipe(
      catchError((error) => {
        return throwError(() => {
          this.showSkeletonLoading = false;
          console.log(error);
          this.utilsService.showToast('No se pudieron obtener las comidas', 'danger');
        });
      })
    ).subscribe((response: any) => {
      this.showSkeletonLoading = false;
      this.mealsArr = response.meals || [];
    });
  }

  onSelectChange(event: any) {
    this.nameToSearch = '';
    this.categorySelected = event.detail.value;

  }

  nameInputChange() {
    this.categorySelected = '';
  }

  onClick() {
    if (this.areFieldsEmpty()) {
      this.utilsService.showToast('Por favor, ingrese un nombre o seleccione una categoría', 'warning');
      return;
    }
    if (this.categorySelected !== '') {
      this.nameToSearch = '';
      this.searchMealByCategory(this.categorySelected);
    } else {
      this.searchMealByName(this.nameToSearch);
      this.saveToHistory(this.nameToSearch)
    }
  }

  areFieldsEmpty(): boolean {
    return !this.nameToSearch && !this.categorySelected;
  }

  actionClick(item: any) {
    this.router.navigate([`/dish-detail/${item.idMeal}`]);
  }

  saveToHistory(value: any) {
    const item = {
      id: this.utilsService.generateRandomId(),
      value: value,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    this.history.push(item);
    this.historyService.saveHistory(this.history);
  }

}

