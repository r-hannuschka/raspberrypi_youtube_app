import { Routes } from '@angular/router';
import { MainComponent as YoutubeMain } from '../../module/youtube';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

export const routes: Routes = [{
    path: 'youtube',
    component: YoutubeMain
}, {
    path: '',
    component: DashboardComponent
}];
