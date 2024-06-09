import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSocketViewComponent } from './web-socket-view.component';

describe('WebSocketViewComponent', () => {
  let component: WebSocketViewComponent;
  let fixture: ComponentFixture<WebSocketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSocketViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebSocketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
