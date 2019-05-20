import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { FusePipesModule } from '../../pipes/pipes.module';
import { FuseMaterialColorPickerComponent } from './material-color-picker.component';
export class FuseMaterialColorPickerModule {
}
FuseMaterialColorPickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseMaterialColorPickerComponent
                ],
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatButtonModule,
                    MatIconModule,
                    MatMenuModule,
                    MatTooltipModule,
                    FusePipesModule
                ],
                exports: [
                    FuseMaterialColorPickerComponent
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtY29sb3ItcGlja2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWF0ZXJpYWwtY29sb3ItcGlja2VyL21hdGVyaWFsLWNvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFcEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTNELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBc0JyRixNQUFNLE9BQU8sNkJBQTZCOzs7WUFwQnpDLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsZ0NBQWdDO2lCQUNuQztnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFFWixnQkFBZ0I7b0JBRWhCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixhQUFhO29CQUNiLGdCQUFnQjtvQkFFaEIsZUFBZTtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGdDQUFnQztpQkFDbkM7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0TWVudU1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRnVzZVBpcGVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuaW1wb3J0IHsgRnVzZU1hdGVyaWFsQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL21hdGVyaWFsLWNvbG9yLXBpY2tlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGdXNlTWF0ZXJpYWxDb2xvclBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG5cbiAgICAgICAgRmxleExheW91dE1vZHVsZSxcblxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG5cbiAgICAgICAgRnVzZVBpcGVzTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZ1c2VNYXRlcmlhbENvbG9yUGlja2VyQ29tcG9uZW50XG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRnVzZU1hdGVyaWFsQ29sb3JQaWNrZXJNb2R1bGVcbntcbn1cbiJdfQ==