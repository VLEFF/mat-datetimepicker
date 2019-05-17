/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 * @type {?}
 */
export var fadeInContent = trigger("fadeInContent", [
    state("showing", style({ opacity: 1 })),
    transition("void => showing", [
        style({ opacity: 0 }),
        animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);
/** @type {?} */
export var slideCalendar = trigger("slideCalendar", [
    transition("* => left", [
        animate(180, keyframes([
            style({ transform: "translateX(100%)", offset: 0.5 }),
            style({ transform: "translateX(-100%)", offset: 0.51 }),
            style({ transform: "translateX(0)", offset: 1 })
        ]))
    ]),
    transition("* => right", [
        animate(180, keyframes([
            style({ transform: "translateX(-100%)", offset: 0.5 }),
            style({ transform: "translateX(100%)", offset: 0.51 }),
            style({ transform: "translateX(0)", offset: 1 })
        ]))
    ])
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWVwaWNrZXItYW5pbWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZS8iLCJzb3VyY2VzIjpbImRhdGV0aW1lcGlja2VyL2RhdGV0aW1lcGlja2VyLWFuaW1hdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxPQUFPLEVBRVAsU0FBUyxFQUNULEtBQUssRUFDTCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUixNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBTzdCLE1BQU0sS0FBTyxhQUFhLEdBQTZCLE9BQU8sQ0FBQyxlQUFlLEVBQUU7SUFDOUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNyQyxVQUFVLENBQUMsaUJBQWlCLEVBQUU7UUFDNUIsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQztLQUN4RCxDQUFDO0NBQ0gsQ0FBQzs7QUFFRixNQUFNLEtBQU8sYUFBYSxHQUE2QixPQUFPLENBQUMsZUFBZSxFQUFFO0lBQzlFLFVBQVUsQ0FBQyxXQUFXLEVBQUU7UUFDdEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7WUFDckIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztZQUNuRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO1lBQ3JELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDO1NBQy9DLENBQUMsQ0FBQztLQUNKLENBQUM7SUFDRixVQUFVLENBQUMsWUFBWSxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7WUFDcEQsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztZQUNwRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDSixDQUFDO0NBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAga2V5ZnJhbWVzLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcblxuLyoqXG4gKiBUaGlzIGFuaW1hdGlvbiBmYWRlcyBpbiB0aGUgYmFja2dyb3VuZCBjb2xvciBhbmQgdGV4dCBjb250ZW50IG9mIHRoZVxuICogc2VsZWN0J3Mgb3B0aW9ucy4gSXQgaXMgdGltZSBkZWxheWVkIHRvIG9jY3VyIDEwMG1zIGFmdGVyIHRoZSBvdmVybGF5XG4gKiBwYW5lbCBoYXMgdHJhbnNmb3JtZWQgaW4uXG4gKi9cbmV4cG9ydCBjb25zdCBmYWRlSW5Db250ZW50OiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSB0cmlnZ2VyKFwiZmFkZUluQ29udGVudFwiLCBbXG4gIHN0YXRlKFwic2hvd2luZ1wiLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcbiAgdHJhbnNpdGlvbihcInZvaWQgPT4gc2hvd2luZ1wiLCBbXG4gICAgc3R5bGUoe29wYWNpdHk6IDB9KSxcbiAgICBhbmltYXRlKGAxNTBtcyAxMDBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKWApXG4gIF0pXG5dKTtcblxuZXhwb3J0IGNvbnN0IHNsaWRlQ2FsZW5kYXI6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IHRyaWdnZXIoXCJzbGlkZUNhbGVuZGFyXCIsIFtcbiAgdHJhbnNpdGlvbihcIiogPT4gbGVmdFwiLCBbXG4gICAgYW5pbWF0ZSgxODAsIGtleWZyYW1lcyhbXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiBcInRyYW5zbGF0ZVgoMTAwJSlcIiwgb2Zmc2V0OiAwLjV9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06IFwidHJhbnNsYXRlWCgtMTAwJSlcIiwgb2Zmc2V0OiAwLjUxfSksXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiBcInRyYW5zbGF0ZVgoMClcIiwgb2Zmc2V0OiAxfSlcbiAgICBdKSlcbiAgXSksXG4gIHRyYW5zaXRpb24oXCIqID0+IHJpZ2h0XCIsIFtcbiAgICBhbmltYXRlKDE4MCwga2V5ZnJhbWVzKFtcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06IFwidHJhbnNsYXRlWCgtMTAwJSlcIiwgb2Zmc2V0OiAwLjV9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06IFwidHJhbnNsYXRlWCgxMDAlKVwiLCBvZmZzZXQ6IDAuNTF9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06IFwidHJhbnNsYXRlWCgwKVwiLCBvZmZzZXQ6IDF9KVxuICAgIF0pKVxuICBdKVxuXSk7XG4iXX0=