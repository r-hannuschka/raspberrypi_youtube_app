import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { FilterService } from './provider/filter.service';

@NgModule({
    declarations: [SelectFilterComponent, FilterPanelComponent],
    exports: [FilterPanelComponent],
    imports: [BrowserModule, CommonModule],
    providers: [FilterService]
})
export class FilterModule { }