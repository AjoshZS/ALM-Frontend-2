import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRulesComponent } from './field-rules.component';

describe('FieldRulesComponent', () => {
  let component: FieldRulesComponent;
  let fixture: ComponentFixture<FieldRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
