import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedInfoComponent } from './completed-info.component';

describe('CompletedInfoComponent', () => {
  let component: CompletedInfoComponent;
  let fixture: ComponentFixture<CompletedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
