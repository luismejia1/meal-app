import {Component, inject} from '@angular/core';
import {MODULES_HOME} from "./home.index";
import {MealService} from "../core/services/meal.service";
import {catchError, throwError} from "rxjs";
import {UtilsService} from "../core/services/utils.service";
import {Category} from "../core/interfaces/category.interface";
import {FormsModule} from "@angular/forms";
import {Meal} from "../core/interfaces/meal.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [MODULES_HOME, FormsModule],
})
export class HomePage {
  private mealService = inject(MealService);
  private utilsService = inject(UtilsService);

  categoriesOptions: Category[] = [];
  mealsArr!: Meal[];
  nameToSearch: string = '';
  categorySelected: string = '';
  showSkeletonLoading: boolean = false;

  constructor() {
    this.fetchCategoriesOptions();
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
    }
  }

  areFieldsEmpty(): boolean {
    return !this.nameToSearch && !this.categorySelected;
  }

  actionClick(item: any) {
    console.log(item);
  }
}

