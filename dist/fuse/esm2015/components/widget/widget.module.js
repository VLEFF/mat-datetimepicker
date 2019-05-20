import { NgModule } from '@angular/core';
import { FuseWidgetComponent } from './widget.component';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';
export class FuseWidgetModule {
}
FuseWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FuseWidgetComponent,
                    FuseWidgetToggleDirective
                ],
                exports: [
                    FuseWidgetComponent,
                    FuseWidgetToggleDirective
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVl0RSxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFWNUIsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixtQkFBbUI7b0JBQ25CLHlCQUF5QjtpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFPO29CQUNWLG1CQUFtQjtvQkFDbkIseUJBQXlCO2lCQUM1QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnVzZVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdXNlV2lkZ2V0VG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQtdG9nZ2xlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEZ1c2VXaWRnZXRDb21wb25lbnQsXG4gICAgICAgIEZ1c2VXaWRnZXRUb2dnbGVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHMgICAgIDogW1xuICAgICAgICBGdXNlV2lkZ2V0Q29tcG9uZW50LFxuICAgICAgICBGdXNlV2lkZ2V0VG9nZ2xlRGlyZWN0aXZlXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRnVzZVdpZGdldE1vZHVsZVxue1xufVxuIl19