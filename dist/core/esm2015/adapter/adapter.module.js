/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { MatNativeDateModule, NativeDateModule } from "@angular/material";
import { DatetimeAdapter } from "./datetime-adapter";
import { MAT_DATETIME_FORMATS } from "./datetime-formats";
import { NativeDatetimeAdapter } from "./native-datetime-adapter";
import { MAT_NATIVE_DATETIME_FORMATS } from "./native-datetime-formats";
// tslint:disable max-classes-per-file
export class NativeDatetimeModule {
}
NativeDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [
                    {
                        provide: DatetimeAdapter,
                        useClass: NativeDatetimeAdapter
                    }
                ]
            },] }
];
const ɵ0 = MAT_NATIVE_DATETIME_FORMATS;
export class MatNativeDatetimeModule {
}
MatNativeDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NativeDatetimeModule,
                    MatNativeDateModule
                ],
                providers: [{ provide: MAT_DATETIME_FORMATS, useValue: ɵ0 }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUvIiwic291cmNlcyI6WyJhZGFwdGVyL2FkYXB0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQVl4RSxNQUFNLE9BQU8sb0JBQW9COzs7WUFUaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLFFBQVEsRUFBRSxxQkFBcUI7cUJBQ2hDO2lCQUNGO2FBQ0Y7O1dBU3VELDJCQUEyQjtBQUVuRixNQUFNLE9BQU8sdUJBQXVCOzs7WUFQbkMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7b0JBQ3BCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxJQUE2QixFQUFDLENBQUM7YUFDcEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBOYXRpdmVEYXRlTW9kdWxlXG59IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgRGF0ZXRpbWVBZGFwdGVyIH0gZnJvbSBcIi4vZGF0ZXRpbWUtYWRhcHRlclwiO1xuaW1wb3J0IHsgTUFUX0RBVEVUSU1FX0ZPUk1BVFMgfSBmcm9tIFwiLi9kYXRldGltZS1mb3JtYXRzXCI7XG5pbXBvcnQgeyBOYXRpdmVEYXRldGltZUFkYXB0ZXIgfSBmcm9tIFwiLi9uYXRpdmUtZGF0ZXRpbWUtYWRhcHRlclwiO1xuaW1wb3J0IHsgTUFUX05BVElWRV9EQVRFVElNRV9GT1JNQVRTIH0gZnJvbSBcIi4vbmF0aXZlLWRhdGV0aW1lLWZvcm1hdHNcIjtcblxuLy8gdHNsaW50OmRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGVcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtOYXRpdmVEYXRlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRGF0ZXRpbWVBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE5hdGl2ZURhdGV0aW1lQWRhcHRlclxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVEYXRldGltZU1vZHVsZSB7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOYXRpdmVEYXRldGltZU1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfREFURVRJTUVfRk9STUFUUywgdXNlVmFsdWU6IE1BVF9OQVRJVkVfREFURVRJTUVfRk9STUFUU31dXG59KVxuZXhwb3J0IGNsYXNzIE1hdE5hdGl2ZURhdGV0aW1lTW9kdWxlIHtcbn1cbiJdfQ==