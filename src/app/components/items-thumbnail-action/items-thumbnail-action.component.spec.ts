import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemsThumbnailActionComponent } from './items-thumbnail-action.component';

describe('ItemsThumbnailActionComponent', () => {
  let component: ItemsThumbnailActionComponent;
  let fixture: ComponentFixture<ItemsThumbnailActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsThumbnailActionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsThumbnailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
