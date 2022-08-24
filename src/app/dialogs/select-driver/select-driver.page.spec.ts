import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectDriverPage } from './select-driver.page';

describe('SelectDriverPage', () => {
  let component: SelectDriverPage;
  let fixture: ComponentFixture<SelectDriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDriverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
