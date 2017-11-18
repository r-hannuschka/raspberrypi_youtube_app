import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { YoutubeModule } from './module/youtube/youtube.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { routes } from './api/data/routes';
import { menuItems } from './api/data/menu-items';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    YoutubeModule,
    RouterModule.forRoot( routes )
  ],
  providers: [
    { provide: 'MenuItems', useValue: menuItems }
  ],
  entryComponents: [ DashboardComponent ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
