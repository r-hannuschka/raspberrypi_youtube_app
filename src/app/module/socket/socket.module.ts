import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SocketManager} from './provider/socket.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [SocketManager]
})
export class SocketModule { }
