import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketnavComponent } from './ticketnav.component';

describe('TicketnavComponent', () => {
  let component: TicketnavComponent;
  let fixture: ComponentFixture<TicketnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
