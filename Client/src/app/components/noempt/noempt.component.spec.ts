import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoemptComponent } from './noempt.component';

describe('NoemptComponent', () => {
  let component: NoemptComponent;
  let fixture: ComponentFixture<NoemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoemptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
