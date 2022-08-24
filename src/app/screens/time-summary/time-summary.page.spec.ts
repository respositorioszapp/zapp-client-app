import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeSummaryPage } from './time-summary.page';

describe('TimeSummaryPage', () => {
  let component: TimeSummaryPage;
  let fixture: ComponentFixture<TimeSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
