import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DummyCreateOrderPage } from './dummy-create-order.page';

describe('DummyCreateOrderPage', () => {
  let component: DummyCreateOrderPage;
  let fixture: ComponentFixture<DummyCreateOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyCreateOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DummyCreateOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
