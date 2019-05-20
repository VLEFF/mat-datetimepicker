import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatListModule } from '@angular/material';
import { FuseDemoContentComponent } from './demo-content/demo-content.component';
import { FuseDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';
export class FuseDemoModule {
}
FuseDemoModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseDemoContentComponent,
                    FuseDemoSidebarComponent
                ],
                imports: [
                    RouterModule,
                    MatDividerModule,
                    MatListModule
                ],
                exports: [
                    FuseDemoContentComponent,
                    FuseDemoSidebarComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RlbW8vZGVtby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXBFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBa0JqRixNQUFNLE9BQU8sY0FBYzs7O1lBaEIxQixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHdCQUF3QjtvQkFDeEIsd0JBQXdCO2lCQUMzQjtnQkFDRCxPQUFPLEVBQU87b0JBQ1YsWUFBWTtvQkFFWixnQkFBZ0I7b0JBQ2hCLGFBQWE7aUJBQ2hCO2dCQUNELE9BQU8sRUFBTztvQkFDVix3QkFBd0I7b0JBQ3hCLHdCQUF3QjtpQkFDM0I7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBNYXREaXZpZGVyTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBGdXNlRGVtb0NvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2RlbW8tY29udGVudC9kZW1vLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEZ1c2VEZW1vU2lkZWJhckNvbXBvbmVudCB9IGZyb20gJy4vZGVtby1zaWRlYmFyL2RlbW8tc2lkZWJhci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGdXNlRGVtb0NvbnRlbnRDb21wb25lbnQsXG4gICAgICAgIEZ1c2VEZW1vU2lkZWJhckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcblxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgRnVzZURlbW9Db250ZW50Q29tcG9uZW50LFxuICAgICAgICBGdXNlRGVtb1NpZGViYXJDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VEZW1vTW9kdWxlXG57XG59XG4iXX0=