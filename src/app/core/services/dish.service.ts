import {inject, Injectable} from '@angular/core';
import {environment as env} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private httpClient = inject(HttpClient);

  constructor() {
  }


  // s = parameter for search by name
  // c = parameter for category
  // i = parameter for id

  fetchMealCategories() {
    return this.httpClient.get(`${env.api.endpoints.categories.list}`);
  }

  fetchMealByName(name: string) {
    return this.httpClient.get(`${env.api.endpoints.meals.searchByName}?s=${name}`);
  }

  fetchMealByCategory(category: string) {
    return this.httpClient.get(`${env.api.endpoints.meals.filter}?c=${category}`);
  }

  fetchDishDetailById(id: string) {
    return this.httpClient.get(`${env.api.endpoints.meals.detail}?i=${id}`);
  }
}
