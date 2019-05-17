/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from "@angular/cdk/a11y";
import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatDialogModule, MatIconModule } from "@angular/material";
import { MatDatetimepickerCalendar } from "./calendar";
import { MatDatetimepickerCalendarBody } from "./calendar-body";
import { MatDatetimepickerClock } from "./clock";
import { MatDatetimepicker, MatDatetimepickerContent } from "./datetimepicker";
import { MatDatetimepickerInput } from "./datetimepicker-input";
import { MatDatetimepickerToggle } from "./datetimepicker-toggle";
import { MatDatetimepickerMonthView } from "./month-view";
import { MatDatetimepickerYearView } from "./year-view";
var MatDatetimepickerModule = /** @class */ (function () {
    function MatDatetimepickerModule() {
    }
    MatDatetimepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        MatDialogModule,
                        MatIconModule,
                        OverlayModule,
                        A11yModule
                    ],
                    entryComponents: [
                        MatDatetimepickerContent
                    ],
                    declarations: [
                        MatDatetimepickerCalendar,
                        MatDatetimepickerCalendarBody,
                        MatDatetimepickerClock,
                        MatDatetimepicker,
                        MatDatetimepickerToggle,
                        MatDatetimepickerInput,
                        MatDatetimepickerContent,
                        MatDatetimepickerMonthView,
                        MatDatetimepickerYearView
                    ],
                    exports: [
                        MatDatetimepickerCalendar,
                        MatDatetimepickerCalendarBody,
                        MatDatetimepickerClock,
                        MatDatetimepicker,
                        MatDatetimepickerToggle,
                        MatDatetimepickerInput,
                        MatDatetimepickerContent,
                        MatDatetimepickerMonthView,
                        MatDatetimepickerYearView
                    ]
                },] }
    ];
    return MatDatetimepickerModule;
}());
export { MatDatetimepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWVwaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hdC1kYXRldGltZXBpY2tlci9jb3JlLyIsInNvdXJjZXMiOlsiZGF0ZXRpbWVwaWNrZXIvZGF0ZXRpbWVwaWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGFBQWEsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN2RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDekIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhEO0lBQUE7SUFvQ0EsQ0FBQzs7Z0JBcENBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixhQUFhO3dCQUNiLFVBQVU7cUJBQ1g7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLHdCQUF3QjtxQkFDekI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHlCQUF5Qjt3QkFDekIsNkJBQTZCO3dCQUM3QixzQkFBc0I7d0JBQ3RCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3dCQUN2QixzQkFBc0I7d0JBQ3RCLHdCQUF3Qjt3QkFDeEIsMEJBQTBCO3dCQUMxQix5QkFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx5QkFBeUI7d0JBQ3pCLDZCQUE2Qjt3QkFDN0Isc0JBQXNCO3dCQUN0QixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7d0JBQ3hCLDBCQUEwQjt3QkFDMUIseUJBQXlCO3FCQUMxQjtpQkFDRjs7SUFFRCw4QkFBQztDQUFBLEFBcENELElBb0NDO1NBRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jZGsvYTExeVwiO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jZGsvb3ZlcmxheVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXREaWFsb2dNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGVcbn0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyIH0gZnJvbSBcIi4vY2FsZW5kYXJcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyQ2FsZW5kYXJCb2R5IH0gZnJvbSBcIi4vY2FsZW5kYXItYm9keVwiO1xuaW1wb3J0IHsgTWF0RGF0ZXRpbWVwaWNrZXJDbG9jayB9IGZyb20gXCIuL2Nsb2NrXCI7XG5pbXBvcnQge1xuICBNYXREYXRldGltZXBpY2tlcixcbiAgTWF0RGF0ZXRpbWVwaWNrZXJDb250ZW50XG59IGZyb20gXCIuL2RhdGV0aW1lcGlja2VyXCI7XG5pbXBvcnQgeyBNYXREYXRldGltZXBpY2tlcklucHV0IH0gZnJvbSBcIi4vZGF0ZXRpbWVwaWNrZXItaW5wdXRcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyVG9nZ2xlIH0gZnJvbSBcIi4vZGF0ZXRpbWVwaWNrZXItdG9nZ2xlXCI7XG5pbXBvcnQgeyBNYXREYXRldGltZXBpY2tlck1vbnRoVmlldyB9IGZyb20gXCIuL21vbnRoLXZpZXdcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyWWVhclZpZXcgfSBmcm9tIFwiLi95ZWFyLXZpZXdcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBBMTF5TW9kdWxlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIE1hdERhdGV0aW1lcGlja2VyQ29udGVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyLFxuICAgIE1hdERhdGV0aW1lcGlja2VyQ2FsZW5kYXJCb2R5LFxuICAgIE1hdERhdGV0aW1lcGlja2VyQ2xvY2ssXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXIsXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXJUb2dnbGUsXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXJJbnB1dCxcbiAgICBNYXREYXRldGltZXBpY2tlckNvbnRlbnQsXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXJNb250aFZpZXcsXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXJZZWFyVmlld1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXJDYWxlbmRhcixcbiAgICBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyQm9keSxcbiAgICBNYXREYXRldGltZXBpY2tlckNsb2NrLFxuICAgIE1hdERhdGV0aW1lcGlja2VyLFxuICAgIE1hdERhdGV0aW1lcGlja2VyVG9nZ2xlLFxuICAgIE1hdERhdGV0aW1lcGlja2VySW5wdXQsXG4gICAgTWF0RGF0ZXRpbWVwaWNrZXJDb250ZW50LFxuICAgIE1hdERhdGV0aW1lcGlja2VyTW9udGhWaWV3LFxuICAgIE1hdERhdGV0aW1lcGlja2VyWWVhclZpZXdcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXREYXRldGltZXBpY2tlck1vZHVsZSB7XG59XG4iXX0=