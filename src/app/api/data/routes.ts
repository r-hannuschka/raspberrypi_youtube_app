import { Routes } from '@angular/router';
import { YoutubePageComponent } from '../../components/youtube-page/youtube-page.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

export const routes: Routes = [{
    path: 'youtube',
    component: YoutubePageComponent
}, {
    path: '',
    component: DashboardComponent
}];
