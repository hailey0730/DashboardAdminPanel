import { Routes } from '@angular/router';

import { OtherDataComponent } from './otherData.component';

export const OtherDataRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'otherData',
            component: OtherDataComponent
        }]
    }
];
