import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatTooltipModule } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { FuseShortcutsComponent } from './shortcuts.component';
var FuseShortcutsModule = /** @class */ (function () {
    function FuseShortcutsModule() {
    }
    FuseShortcutsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseShortcutsComponent
                    ],
                    imports: [
                        CommonModule,
                        RouterModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatDividerModule,
                        MatFormFieldModule,
                        MatIconModule,
                        MatInputModule,
                        MatMenuModule,
                        MatListModule,
                        MatTooltipModule
                    ],
                    exports: [
                        FuseShortcutsComponent
                    ],
                    providers: [
                        CookieService
                    ]
                },] }
    ];
    return FuseShortcutsModule;
}());
export { FuseShortcutsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2hvcnRjdXRzL3Nob3J0Y3V0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekssT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9EO0lBQUE7SUE0QkEsQ0FBQzs7Z0JBNUJBLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1Ysc0JBQXNCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQU87d0JBQ1YsWUFBWTt3QkFDWixZQUFZO3dCQUVaLGdCQUFnQjt3QkFFaEIsZUFBZTt3QkFDZixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsYUFBYTt3QkFDYixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixnQkFBZ0I7cUJBQ25CO29CQUNELE9BQU8sRUFBTzt3QkFDVixzQkFBc0I7cUJBQ3pCO29CQUNELFNBQVMsRUFBSzt3QkFDVixhQUFhO3FCQUNoQjtpQkFDSjs7SUFHRCwwQkFBQztDQUFBLEFBNUJELElBNEJDO1NBRlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZSwgTWF0Rm9ybUZpZWxkTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0TWVudU1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuXG5pbXBvcnQgeyBGdXNlU2hvcnRjdXRzQ29tcG9uZW50IH0gZnJvbSAnLi9zaG9ydGN1dHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRnVzZVNob3J0Y3V0c0NvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXG5cbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzICAgICA6IFtcbiAgICAgICAgRnVzZVNob3J0Y3V0c0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzICAgOiBbXG4gICAgICAgIENvb2tpZVNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VTaG9ydGN1dHNNb2R1bGVcbntcbn1cbiJdfQ==