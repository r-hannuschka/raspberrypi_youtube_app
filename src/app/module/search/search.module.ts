import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SearchComponent } from './components/search/search.component';

@NgModule({
    declarations: [SearchComponent],
    exports: [SearchComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SearchModule {}
