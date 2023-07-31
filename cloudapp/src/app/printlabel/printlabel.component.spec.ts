import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintlabelComponent } from './printlabel.component';

describe('PrintlabelComponent', () => {
  let component: PrintlabelComponent;
  let fixture: ComponentFixture<PrintlabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintlabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
