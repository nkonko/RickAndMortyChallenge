import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = new WebSocket('wss://ws.postman-echo.com/raw');

    this.socket.onopen = (event) => {
      console.log('WebSocket connection established.');
      this.sendMessage({ message: 'Hello there!' });
    };

    this.socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  public sendMessage(message: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not open.');
    }
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
