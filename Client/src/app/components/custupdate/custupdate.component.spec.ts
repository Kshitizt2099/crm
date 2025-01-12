import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustupdateComponent } from './custupdate.component';

describe('CustupdateComponent', () => {
  let component: CustupdateComponent;
  let fixture: ComponentFixture<CustupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
