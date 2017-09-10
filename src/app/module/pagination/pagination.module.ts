import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageNavigationComponent, PaginationComponent } from './components';
import { PaginationService } from './providers/pagination.service';

@NgModule({
    exports: [PaginationComponent, PageNavigationComponent],
    imports: [BrowserModule],
    declarations: [PageNavigationComponent, PaginationComponent]
})
export class PaginationModule {}
