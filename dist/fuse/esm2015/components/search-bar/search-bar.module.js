import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FuseSearchBarComponent } from './search-bar.component';
export class FuseSearchBarModule {
}
FuseSearchBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseSearchBarComponent
                ],
                imports: [
                    CommonModule,
                    RouterModule,
                    MatButtonModule,
                    MatIconModule
                ],
                exports: [
                    FuseSearchBarComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpQmhFLE1BQU0sT0FBTyxtQkFBbUI7OztZQWYvQixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLHNCQUFzQjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFPO29CQUNWLFlBQVk7b0JBQ1osWUFBWTtvQkFFWixlQUFlO29CQUNmLGFBQWE7aUJBQ2hCO2dCQUNELE9BQU8sRUFBTztvQkFDVixzQkFBc0I7aUJBQ3pCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgRnVzZVNlYXJjaEJhckNvbXBvbmVudCB9IGZyb20gJy4vc2VhcmNoLWJhci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBGdXNlU2VhcmNoQmFyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzICAgICA6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG5cbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgRnVzZVNlYXJjaEJhckNvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRnVzZVNlYXJjaEJhck1vZHVsZVxue1xufVxuIl19