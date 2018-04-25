import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from '@app-module/pagination';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { TruncateModule } from 'ng2-truncate';

import { VideoApiProvider } from './provider/video-api.provider';
import { ListComponent } from './components/list/list.component';
import { VideoCardComponent } from './components/video-card/video-card.component';

@NgModule({
    declarations: [
        ListComponent,
        VideoCardComponent
    ],
    imports: [
        CommonModule,
        PaginationModule,
        TruncateModule
    ],
    exports: [
        ListComponent
    ]
})
export class VideoModule {

    public static forRoot(config): ModuleWithProviders {
        return {
            ngModule: VideoModule,
            providers: [
                { provide: 'VideoConfig', useValue: config },
                VideoApiProvider
            ]
        };
    }
}
