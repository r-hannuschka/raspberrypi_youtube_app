import { Routes } from '@angular/router';
import {
    DashboardComponent,
    PlayerComponent,
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
    path: 'player',
    component: PlayerComponent
}, {
    path: '',
    component: DashboardComponent
}];
