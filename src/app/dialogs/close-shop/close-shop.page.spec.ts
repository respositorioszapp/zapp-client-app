import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CloseShopPage } from './close-shop.page';

describe('CloseShopPage', () => {
  let component: CloseShopPage;
  let fixture: ComponentFixture<CloseShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CloseShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
