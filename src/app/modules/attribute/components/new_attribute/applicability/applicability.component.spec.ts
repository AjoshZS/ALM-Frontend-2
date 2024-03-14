import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicabilityComponent } from './applicability.component';

describe('ApplicabilityComponent', () => {
  let component: ApplicabilityComponent;
  let fixture: ComponentFixture<ApplicabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
