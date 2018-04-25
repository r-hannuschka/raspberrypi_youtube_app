import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SocketManager} from './provider/socket.provider';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SocketModule {

  public static forRoot(config): ModuleWithProviders {
    return {
      ngModule: SocketModule,
      providers: [
        { provide: 'SocketConfig', useValue: config },
        SocketManager
      ]
    };
  }
}
