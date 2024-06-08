import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFilterInputComponent } from './character-filter-input.component';

describe('CharacterFilterInputComponent', () => {
  let component: CharacterFilterInputComponent;
  let fixture: ComponentFixture<CharacterFilterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFilterInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterFilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
