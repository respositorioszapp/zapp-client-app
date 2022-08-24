import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportTypePage } from './transport-type.page';

describe('TransportTypePage', () => {
  let component: TransportTypePage;
  let fixture: ComponentFixture<TransportTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
