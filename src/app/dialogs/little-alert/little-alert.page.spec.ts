import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LittleAlertPage } from './little-alert.page';

describe('LittleAlertPage', () => {
  let component: LittleAlertPage;
  let fixture: ComponentFixture<LittleAlertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LittleAlertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LittleAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
