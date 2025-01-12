import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustreviewComponent } from './custreview.component';

describe('CustreviewComponent', () => {
  let component: CustreviewComponent;
  let fixture: ComponentFixture<CustreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
