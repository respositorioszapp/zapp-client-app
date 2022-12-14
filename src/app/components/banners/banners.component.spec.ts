import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BannersComponent } from './banners.component';

describe('BannersComponent', () => {
  let component: BannersComponent;
  let fixture: ComponentFixture<BannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
