import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { YoutubeModule } from './module/youtube/youtube.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    YoutubeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
