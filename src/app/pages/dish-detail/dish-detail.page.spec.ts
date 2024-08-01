import {TestBed, ComponentFixture} from '@angular/core/testing';
import {DishDetailPage} from './dish-detail.page';
import {DishService} from '@services/dish.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {of} from 'rxjs';
import {MODULES_DISH_DETAIL} from './dish-detail.index';
import {IonIcon} from '@ionic/angular/standalone';

describe('DishDetailPage', () => {
  let component: DishDetailPage;
  let fixture: ComponentFixture<DishDetailPage>;
  let dishServiceMock: any;
  let activatedRouteMock: any;
  let sanitizerMock: any;

  beforeEach(async () => {
    dishServiceMock = {
      fetchDishDetailById: jasmine.createSpy('fetchDishDetailById').and.returnValue(of({
        meals: [{
          strYoutube: 'https://www.youtube.com/watch?v=test'
        }]
      }))
    };

    activatedRouteMock = {
      params: of({id: '1'})
    };

    sanitizerMock = {
      bypassSecurityTrustResourceUrl: jasmine.createSpy('bypassSecurityTrustResourceUrl').and.returnValue('safeUrl')
    };

    await TestBed.configureTestingModule({
      imports: [DishDetailPage, ...MODULES_DISH_DETAIL, IonIcon],
      providers: [
        {provide: DishService, useValue: dishServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: DomSanitizer, useValue: sanitizerMock}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dish detail on init', () => {
    expect(dishServiceMock.fetchDishDetailById).toHaveBeenCalledWith('1');
    expect(component.dish.strYoutube).toBe('https://www.youtube.com/watch?v=test');
    expect(sanitizerMock.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('https://www.youtube.com/embed/test');
    expect(component.recipeUrlVideo).toBe('safeUrl');
  });

  it('should toggle expand', () => {
    expect(component.isExpanded).toBeFalse();
    component.toggleExpand();
    expect(component.isExpanded).toBeTrue();
    component.toggleExpand();
    expect(component.isExpanded).toBeFalse();
  });
});
