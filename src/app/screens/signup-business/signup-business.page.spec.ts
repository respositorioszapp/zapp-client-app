import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupBusinessPage } from './signup-business.page';

describe('SignupBusinessPage', () => {
  let component: SignupBusinessPage;
  let fixture: ComponentFixture<SignupBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
