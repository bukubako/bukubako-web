import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanModalPage } from './scan-modal.page';

describe('ScanModalPage', () => {
  let component: ScanModalPage;
  let fixture: ComponentFixture<ScanModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});