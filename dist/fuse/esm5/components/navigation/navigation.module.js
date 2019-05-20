import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseNavigationComponent } from './navigation.component';
import { FuseNavVerticalItemComponent } from './vertical/item/item.component';
import { FuseNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { FuseNavVerticalGroupComponent } from './vertical/group/group.component';
import { FuseNavHorizontalItemComponent } from './horizontal/item/item.component';
import { FuseNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
var FuseNavigationModule = /** @class */ (function () {
    function FuseNavigationModule() {
    }
    FuseNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        MatIconModule,
                        MatRippleModule,
                        TranslateModule.forChild()
                    ],
                    exports: [
                        FuseNavigationComponent
                    ],
                    declarations: [
                        FuseNavigationComponent,
                        FuseNavVerticalGroupComponent,
                        FuseNavVerticalItemComponent,
                        FuseNavVerticalCollapsableComponent,
                        FuseNavHorizontalItemComponent,
                        FuseNavHorizontalCollapsableComponent
                    ]
                },] }
    ];
    return FuseNavigationModule;
}());
export { FuseNavigationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25HLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRXZHO0lBQUE7SUF3QkEsQ0FBQzs7Z0JBeEJBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQU87d0JBQ1YsWUFBWTt3QkFDWixZQUFZO3dCQUVaLGFBQWE7d0JBQ2IsZUFBZTt3QkFFZixlQUFlLENBQUMsUUFBUSxFQUFFO3FCQUM3QjtvQkFDRCxPQUFPLEVBQU87d0JBQ1YsdUJBQXVCO3FCQUMxQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1YsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLDRCQUE0Qjt3QkFDNUIsbUNBQW1DO3dCQUNuQyw4QkFBOEI7d0JBQzlCLHFDQUFxQztxQkFDeEM7aUJBQ0o7O0lBR0QsMkJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQUZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7IEZ1c2VOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdXNlTmF2VmVydGljYWxJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC9pdGVtL2l0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IEZ1c2VOYXZWZXJ0aWNhbENvbGxhcHNhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi92ZXJ0aWNhbC9jb2xsYXBzYWJsZS9jb2xsYXBzYWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRnVzZU5hdlZlcnRpY2FsR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL3ZlcnRpY2FsL2dyb3VwL2dyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdXNlTmF2SG9yaXpvbnRhbEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2hvcml6b250YWwvaXRlbS9pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGdXNlTmF2SG9yaXpvbnRhbENvbGxhcHNhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9ob3Jpem9udGFsL2NvbGxhcHNhYmxlL2NvbGxhcHNhYmxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0cyAgICAgOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdFJpcHBsZU1vZHVsZSxcblxuICAgICAgICBUcmFuc2xhdGVNb2R1bGUuZm9yQ2hpbGQoKVxuICAgIF0sXG4gICAgZXhwb3J0cyAgICAgOiBbXG4gICAgICAgIEZ1c2VOYXZpZ2F0aW9uQ29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRnVzZU5hdmlnYXRpb25Db21wb25lbnQsXG4gICAgICAgIEZ1c2VOYXZWZXJ0aWNhbEdyb3VwQ29tcG9uZW50LFxuICAgICAgICBGdXNlTmF2VmVydGljYWxJdGVtQ29tcG9uZW50LFxuICAgICAgICBGdXNlTmF2VmVydGljYWxDb2xsYXBzYWJsZUNvbXBvbmVudCxcbiAgICAgICAgRnVzZU5hdkhvcml6b250YWxJdGVtQ29tcG9uZW50LFxuICAgICAgICBGdXNlTmF2SG9yaXpvbnRhbENvbGxhcHNhYmxlQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlTmF2aWdhdGlvbk1vZHVsZVxue1xufVxuIl19