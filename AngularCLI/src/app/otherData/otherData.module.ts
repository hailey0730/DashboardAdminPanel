import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { SelectModule } from 'ng2-select';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule, MdInputModule, MdSelectModule } from '@angular/material';

import { OtherDataComponent } from './otherData.component';
import { OtherDataRoutes } from './otherData.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OtherDataRoutes),
        FormsModule,
        MdModule,
        MyDateRangePickerModule,
        ReactiveFormsModule,
        MaterialModule,
        MdDatepickerModule,
        MdSelectModule
    ],
    declarations: [OtherDataComponent]
})

export class OtherDataModule { }
