import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketManager } from './provider/socket.manager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ SocketManager ],
  declarations: []
})
export class SocketModule { }
