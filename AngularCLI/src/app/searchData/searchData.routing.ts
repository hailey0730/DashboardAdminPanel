import { Routes } from '@angular/router';

import { SearchDataComponent } from './searchData.component';

export const SearchDataRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'searchData',
            component: SearchDataComponent
        }]
    }
];
