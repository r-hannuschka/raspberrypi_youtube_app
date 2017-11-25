import { Routes } from '@angular/router';
import {
    DashboardComponent,
    YoutubePageComponent,
    VideoComponent
} from '../../components';

export const routes: Routes = [{
    path: 'youtube',
    component: YoutubePageComponent
}, {
    path: 'video',
    component: VideoComponent,
}, {
    path: '',
    component: DashboardComponent
}];
