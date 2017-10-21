import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

@NgModule({
    exports: [ FilterPanelComponent ],
    imports: [BrowserModule, CommonModule],
    declarations: [SelectFilterComponent, FilterPanelComponent],
    entryComponents: [SelectFilterComponent]
})
export class FilterModule {}