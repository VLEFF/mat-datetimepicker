import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { FuseConfirmDialogComponent } from './confirm-dialog.component';
export class FuseConfirmDialogModule {
}
FuseConfirmDialogModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseConfirmDialogComponent
                ],
                imports: [
                    MatDialogModule,
                    MatButtonModule
                ],
                entryComponents: [
                    FuseConfirmDialogComponent
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXJFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBY3hFLE1BQU0sT0FBTyx1QkFBdUI7OztZQVpuQyxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGVBQWU7b0JBQ2YsZUFBZTtpQkFDbEI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLDBCQUEwQjtpQkFDN0I7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRnVzZUNvbmZpcm1EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZ1c2VDb25maXJtRGlhbG9nQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgRnVzZUNvbmZpcm1EaWFsb2dDb21wb25lbnRcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGdXNlQ29uZmlybURpYWxvZ01vZHVsZVxue1xufVxuIl19