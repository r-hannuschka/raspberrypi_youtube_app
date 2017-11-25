import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from '../pagination/pagination.module';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { TruncateModule } from 'ng2-truncate';

import { IVideoConfig } from './api/video.config';
import { VideoApiProvider } from './provider/video-api.provider';
import { ListComponent } from './components/list/list.component';
import { VideoCardComponent } from './components/video-card/video-card.component';

@NgModule({
    declarations: [ListComponent, VideoCardComponent],
    imports: [ CommonModule, PaginationModule, TruncateModule ],
    exports: [ListComponent],
    providers: []
})
export class VideoModule {

    public static forRoot(config: IVideoConfig): ModuleWithProviders {
        return {
            ngModule: VideoModule,
            providers: [
                { provide: 'VideoConfig', useValue: config },
                VideoApiProvider
            ]
        };
    }
}
