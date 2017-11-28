import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';

import { SearchDataComponent } from './searchData.component';
import { SearchDataRoutes } from './searchData.routing';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SearchDataRoutes),
        FormsModule,
        MdModule,
        MyDateRangePickerModule
    ],
    declarations: [SearchDataComponent]
})

export class SearchDataModule { }
