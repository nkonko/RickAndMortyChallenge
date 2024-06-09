import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-web-socket-view',
  standalone: true,
  imports: [],
  templateUrl: './web-socket-view.component.html',
  styleUrl: './web-socket-view.component.scss'
})
export class WebSocketViewComponent implements OnInit, OnDestroy {
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.websocketService.close();
  }

}
