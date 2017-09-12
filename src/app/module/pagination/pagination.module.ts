import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InfiniteScrollComponent, PageNavigationComponent, PaginationComponent } from './components';
import { PaginationService } from './providers/pagination.service';

@NgModule({
    exports: [ InfiniteScrollComponent, PaginationComponent, PageNavigationComponent],
    imports: [BrowserModule],
    declarations: [PageNavigationComponent, PaginationComponent, InfiniteScrollComponent]
})
export class PaginationModule {}
