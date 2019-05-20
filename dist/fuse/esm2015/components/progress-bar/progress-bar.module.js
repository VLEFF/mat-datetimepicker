import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { FuseProgressBarComponent } from './progress-bar.component';
export class FuseProgressBarModule {
}
FuseProgressBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseProgressBarComponent
                ],
                imports: [
                    CommonModule,
                    RouterModule,
                    MatButtonModule,
                    MatIconModule,
                    MatProgressBarModule
                ],
                exports: [
                    FuseProgressBarComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFrQnBFLE1BQU0sT0FBTyxxQkFBcUI7OztZQWhCakMsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVix3QkFBd0I7aUJBQzNCO2dCQUNELE9BQU8sRUFBTztvQkFDVixZQUFZO29CQUNaLFlBQVk7b0JBRVosZUFBZTtvQkFDZixhQUFhO29CQUNiLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFPO29CQUNWLHdCQUF3QjtpQkFDM0I7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRnVzZVByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9ncmVzcy1iYXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRnVzZVByb2dyZXNzQmFyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzICAgICA6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG5cbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0cyAgICAgOiBbXG4gICAgICAgIEZ1c2VQcm9ncmVzc0JhckNvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRnVzZVByb2dyZXNzQmFyTW9kdWxlXG57XG59XG4iXX0=