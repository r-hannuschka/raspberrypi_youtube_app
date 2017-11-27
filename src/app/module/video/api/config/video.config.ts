import { API } from './api';
import { IVideoListConfig } from './video-list.config';

export interface IVideoConfig {

    api: API;

    list: IVideoListConfig;
}
