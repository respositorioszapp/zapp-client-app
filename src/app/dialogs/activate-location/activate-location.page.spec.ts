import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivateLocationPage } from './activate-location.page';

describe('ActivateLocationPage', () => {
  let component: ActivateLocationPage;
  let fixture: ComponentFixture<ActivateLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
