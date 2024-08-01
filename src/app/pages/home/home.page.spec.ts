import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomePage } from './home.page';
import { DishService } from '@services/dish.service';
import { UtilsService } from '@services/utils.service';
import { HistoryService } from '@services/history.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MODULES_HOME } from './home.index';
import { FormsModule } from '@angular/forms';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mealServiceMock: any;
  let utilsServiceMock: any;
  let historyServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    mealServiceMock = {
      fetchMealCategories: jasmine.createSpy('fetchMealCategories').and.returnValue(of({ categories: [] })),
      fetchMealByCategory: jasmine.createSpy('fetchMealByCategory').and.returnValue(of({ meals: [] })),
      fetchMealByName: jasmine.createSpy('fetchMealByName').and.returnValue(of({ meals: [] }))
    };

    utilsServiceMock = {
      showLoading: jasmine.createSpy('showLoading'),
      hideLoading: jasmine.createSpy('hideLoading'),
      showToast: jasmine.createSpy('showToast'),
      generateRandomId: jasmine.createSpy('generateRandomId').and.returnValue('randomId')
    };

    historyServiceMock = {
      getHistory: jasmine.createSpy('getHistory').and.returnValue([]),
      saveHistory: jasmine.createSpy('saveHistory')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    activatedRouteMock = {
      queryParams: of({ search: 'testSearch' })
    };

    await TestBed.configureTestingModule({
      imports: [HomePage, ...MODULES_HOME, FormsModule],
      providers: [
        { provide: DishService, useValue: mealServiceMock },
        { provide: UtilsService, useValue: utilsServiceMock },
        { provide: HistoryService, useValue: historyServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories on init', () => {
    expect(mealServiceMock.fetchMealCategories).toHaveBeenCalled();
    expect(utilsServiceMock.showLoading).toHaveBeenCalledWith('Cargando información necesaria...');
    expect(utilsServiceMock.hideLoading).toHaveBeenCalled();
    expect(component.categoriesOptions).toEqual([]);
  });

  it('should handle search query parameter', () => {
    expect(component.nameToSearch).toBe('testSearch');
    expect(mealServiceMock.fetchMealByName).toHaveBeenCalledWith('testSearch');
  });

  it('should search meals by category', () => {
    component.searchMealByCategory('testCategory');
    expect(mealServiceMock.fetchMealByCategory).toHaveBeenCalledWith('testCategory');
    expect(component.showSkeletonLoading).toBeFalse();
    expect(component.mealsArr).toEqual([]);
  });

  it('should search meals by name', () => {
    component.searchMealByName('testName');
    expect(mealServiceMock.fetchMealByName).toHaveBeenCalledWith('testName');
    expect(component.showSkeletonLoading).toBeFalse();
    expect(component.mealsArr).toEqual([]);
  });

  it('should handle category select change', () => {
    component.onSelectChange({ detail: { value: 'testCategory' } });
    expect(component.categorySelected).toBe('testCategory');
    expect(component.nameToSearch).toBe('');
  });

  it('should handle name input change', () => {
    component.nameInputChange();
    expect(component.categorySelected).toBe('');
  });

  it('should handle search button click', () => {
    spyOn(component, 'searchMealByCategory');
    spyOn(component, 'searchMealByName');
    component.categorySelected = 'testCategory';
    component.onClick();
    expect(component.searchMealByCategory).toHaveBeenCalledWith('testCategory');

    component.categorySelected = '';
    component.nameToSearch = 'testName';
    component.onClick();
    expect(component.searchMealByName).toHaveBeenCalledWith('testName');
    expect(historyServiceMock.saveHistory).toHaveBeenCalled();
    expect(utilsServiceMock.showToast).not.toHaveBeenCalled();
  });

  it('should handle empty search fields on button click', () => {
    spyOn(component, 'areFieldsEmpty').and.returnValue(true);
    component.onClick();
    expect(utilsServiceMock.showToast).toHaveBeenCalledWith('Por favor, ingrese un nombre o seleccione una categoría', 'warning');
  });

  it('should reset search', () => {
    component.resetSearch();
    expect(component.nameToSearch).toBe('');
    expect(component.categorySelected).toBe('');
    expect(component.mealsArr).toEqual([]);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to dish detail', () => {
    component.actionClick({ idMeal: '1' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dish-detail/1']);
  });

  it('should save to history', () => {
    component.saveToHistory('testValue');
    expect(historyServiceMock.saveHistory).toHaveBeenCalled();
    expect(component.history.length).toBe(1);
    expect(component.history[0].value).toBe('testValue');
  });
});
