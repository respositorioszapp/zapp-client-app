import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowProductsPage } from './show-products.page';

describe('ShowProductsPage', () => {
  let component: ShowProductsPage;
  let fixture: ComponentFixture<ShowProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
