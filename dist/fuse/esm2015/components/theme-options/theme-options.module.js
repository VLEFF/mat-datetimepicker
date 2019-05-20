import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { FuseDirectivesModule } from '../../directives/directives';
import { FuseMaterialColorPickerModule } from '../material-color-picker/material-color-picker.module';
import { FuseSidebarModule } from '../sidebar/sidebar.module';
import { FuseThemeOptionsComponent } from './theme-options.component';
export class FuseThemeOptionsModule {
}
FuseThemeOptionsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseThemeOptionsComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatOptionModule,
                    MatRadioModule,
                    MatSelectModule,
                    MatSlideToggleModule,
                    FuseDirectivesModule,
                    FuseMaterialColorPickerModule,
                    FuseSidebarModule
                ],
                exports: [
                    FuseThemeOptionsComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtb3B0aW9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RoZW1lLW9wdGlvbnMvdGhlbWUtb3B0aW9ucy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFDSCxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUNsSyxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25FLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBK0J0RSxNQUFNLE9BQU8sc0JBQXNCOzs7WUE3QmxDLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YseUJBQXlCO2lCQUM1QjtnQkFDRCxPQUFPLEVBQU87b0JBQ1YsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtvQkFFbkIsZ0JBQWdCO29CQUVoQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixjQUFjO29CQUNkLGVBQWU7b0JBQ2Ysb0JBQW9CO29CQUVwQixvQkFBb0I7b0JBQ3BCLDZCQUE2QjtvQkFDN0IsaUJBQWlCO2lCQUNwQjtnQkFDRCxPQUFPLEVBQU87b0JBQ1YseUJBQXlCO2lCQUM1QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGUsIE1hdEZvcm1GaWVsZE1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRSYWRpb01vZHVsZSwgTWF0U2VsZWN0TW9kdWxlLCBNYXRTbGlkZVRvZ2dsZU1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbmltcG9ydCB7IEZ1c2VEaXJlY3RpdmVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9kaXJlY3RpdmVzJztcbmltcG9ydCB7IEZ1c2VNYXRlcmlhbENvbG9yUGlja2VyTW9kdWxlIH0gZnJvbSAnLi4vbWF0ZXJpYWwtY29sb3ItcGlja2VyL21hdGVyaWFsLWNvbG9yLXBpY2tlci5tb2R1bGUnO1xuaW1wb3J0IHsgRnVzZVNpZGViYXJNb2R1bGUgfSBmcm9tICcuLi9zaWRlYmFyL3NpZGViYXIubW9kdWxlJztcblxuaW1wb3J0IHsgRnVzZVRoZW1lT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vdGhlbWUtb3B0aW9ucy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGdXNlVGhlbWVPcHRpb25zQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzICAgICA6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgICAgICBGbGV4TGF5b3V0TW9kdWxlLFxuXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0T3B0aW9uTW9kdWxlLFxuICAgICAgICBNYXRSYWRpb01vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcblxuICAgICAgICBGdXNlRGlyZWN0aXZlc01vZHVsZSxcbiAgICAgICAgRnVzZU1hdGVyaWFsQ29sb3JQaWNrZXJNb2R1bGUsXG4gICAgICAgIEZ1c2VTaWRlYmFyTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgRnVzZVRoZW1lT3B0aW9uc0NvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRnVzZVRoZW1lT3B0aW9uc01vZHVsZVxue1xufVxuIl19