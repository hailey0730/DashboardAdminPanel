import { Routes } from '@angular/router';

import { FallbackComponent } from './fallback.component';

export const FallbackRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'fallback',
            component: FallbackComponent
        }]
    }
];
