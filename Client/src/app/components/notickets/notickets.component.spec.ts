import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticketsComponent } from './notickets.component';

describe('NoticketsComponent', () => {
  let component: NoticketsComponent;
  let fixture: ComponentFixture<NoticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
