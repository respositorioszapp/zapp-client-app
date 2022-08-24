import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectClientCityPage } from './select-client-city.page';

describe('SelectClientCityPage', () => {
  let component: SelectClientCityPage;
  let fixture: ComponentFixture<SelectClientCityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClientCityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectClientCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
