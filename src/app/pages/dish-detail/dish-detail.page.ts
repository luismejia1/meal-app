import {Component, inject} from '@angular/core';
import {IonIcon
} from '@ionic/angular/standalone';
import {ActivatedRoute} from "@angular/router";
import {DishService} from "../../core/services/dish.service";
import {Meal} from "../../core/interfaces/meal.interface";
import {DomSanitizer} from "@angular/platform-browser";
import {MODULES_DISH_DETAIL} from "./dish-detail.index";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.page.html',
  styleUrls: ['./dish-detail.page.scss'],
  standalone: true,
  imports: [MODULES_DISH_DETAIL, IonIcon]
})
export class DishDetailPage {
  private dishService = inject(DishService);
  idDish: string = '';
  recipeUrlVideo: any = '';
  dish!: Meal;
  isExpanded: boolean = false; // Tracks whether the instructions are expanded


  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.idDish = params.id;
      this.fetchDishDetail();
    });
  }

  fetchDishDetail() {
    this.dishService.fetchDishDetailById(this.idDish).subscribe((dish: any) => {
      this.dish = dish.meals[0];
      this.recipeUrlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.dish.strYoutube.replace('watch?v=', 'embed/'));
    });
  }


  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
