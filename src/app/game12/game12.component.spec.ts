import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Game12Component } from './game12.component';

describe('Game12Component', () => {
  let component: Game12Component;
  let fixture: ComponentFixture<Game12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Game12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Game12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
