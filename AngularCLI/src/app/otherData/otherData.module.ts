import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';

import { OtherDataComponent } from './otherData.component';
import { OtherDataRoutes } from './otherData.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OtherDataRoutes),
        FormsModule,
        MdModule
    ],
    declarations: [OtherDataComponent]
})

export class OtherDataModule { }
