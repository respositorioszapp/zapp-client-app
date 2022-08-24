import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltersSearchPage } from './filters-search.page';

describe('FiltersSearchPage', () => {
  let component: FiltersSearchPage;
  let fixture: ComponentFixture<FiltersSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
