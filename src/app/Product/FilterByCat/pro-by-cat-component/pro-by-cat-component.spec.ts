import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProByCatComponent } from './pro-by-cat-component';

describe('ProByCatComponent', () => {
  let component: ProByCatComponent;
  let fixture: ComponentFixture<ProByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProByCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
