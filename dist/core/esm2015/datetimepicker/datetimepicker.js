/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directionality } from "@angular/cdk/bidi";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ESCAPE } from "@angular/cdk/keycodes";
import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { MAT_DATEPICKER_SCROLL_STRATEGY } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { Subject, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { DatetimeAdapter } from "../adapter/datetime-adapter";
import { MatDatetimepickerCalendar } from "./calendar";
import { createMissingDateImplError } from "./datetimepicker-errors";
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
let datetimepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
export class MatDatetimepickerContent {
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._calendar._focusActiveCell();
    }
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    _handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === ESCAPE) {
            this.datetimepicker.close();
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
MatDatetimepickerContent.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-content",
                template: "<mat-datetimepicker-calendar class=\"mat-typography\" cdkTrapFocus\n              [id]=\"datetimepicker.id\"\n              [attr.mode]=\"datetimepicker.mode\"\n              [startView]=\"datetimepicker.startView\"\n              [type]=\"datetimepicker.type\"\n              [timeInterval]=\"datetimepicker.timeInterval\"\n              [minDate]=\"datetimepicker._minDate\"\n              [maxDate]=\"datetimepicker._maxDate\"\n              [dateFilter]=\"datetimepicker._dateFilter\"\n              [selected]=\"datetimepicker._selected\"\n              [startAt]=\"datetimepicker.startAt\"\n              (selectedChange)=\"datetimepicker._select($event)\"\n              (_userSelection)=\"datetimepicker.close()\">\n</mat-datetimepicker-calendar>\n",
                host: {
                    "class": "mat-datetimepicker-content",
                    "[class.mat-datetimepicker-content-touch]": "datetimepicker?.touchUi",
                    "(keydown)": "_handleKeydown($event)"
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-datetimepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;background-color:#fff;border-radius:2px;overflow:hidden}.mat-datetimepicker-calendar{width:296px;height:405px}.mat-datetimepicker-calendar[mode=landscape]{width:446px;height:328px}@media (min-width:480px){.mat-datetimepicker-calendar[mode=auto]{width:446px;height:328px}}.mat-datetimepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}.mat-datetimepicker-dialog .mat-dialog-container{padding:0}"]
            }] }
];
MatDatetimepickerContent.propDecorators = {
    _calendar: [{ type: ViewChild, args: [MatDatetimepickerCalendar,] }]
};
if (false) {
    /** @type {?} */
    MatDatetimepickerContent.prototype.datetimepicker;
    /** @type {?} */
    MatDatetimepickerContent.prototype._calendar;
}
/**
 * @template D
 */
export class MatDatetimepicker {
    /**
     * @param {?} _dialog
     * @param {?} _overlay
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} _scrollStrategy
     * @param {?} _dateAdapter
     * @param {?} _dir
     * @param {?} _document
     */
    constructor(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
        this._dialog = _dialog;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._document = _document;
        /**
         * The view that the calendar should start in.
         */
        this.startView = "month";
        this.mode = "auto";
        this.timeInterval = 1;
        this._type = "date";
        this._touchUi = false;
        /**
         * Emits new selected date when selected date changes.
         * @deprecated Switch to the `dateChange` and `dateInput` binding on the input element.
         */
        this.selectedChanged = new EventEmitter();
        /**
         * Emits when the datepicker has been opened.
         */
        // tslint:disable-next-line:no-output-rename
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        // tslint:disable-next-line:no-output-rename
        this.closedStream = new EventEmitter();
        /**
         * Whether the calendar is open.
         */
        this.opened = false;
        /**
         * The id for the datepicker calendar.
         */
        this.id = `mat-datetimepicker-${datetimepickerUid++}`;
        this._validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this._focusedElementBeforeOpen = null;
        this._inputSubscription = Subscription.EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new Subject();
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DateAdapter");
        }
    }
    /**
     * The date to open the calendar to initially.
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set startAt(date) {
        this._startAt = this._dateAdapter.getValidDateOrNull(date);
    }
    /**
     * @return {?}
     */
    get openOnFocus() { return this._openOnFocus; }
    /**
     * @param {?} value
     * @return {?}
     */
    set openOnFocus(value) { this._openOnFocus = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    _handleFocus() {
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value || "date";
    }
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     * @return {?}
     */
    get touchUi() {
        return this._touchUi;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set touchUi(value) {
        this._touchUi = coerceBooleanProperty(value);
    }
    /**
     * Whether the datepicker pop-up should be disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this._datepickerInput ?
            this._datepickerInput.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._disabledChange.next(newValue);
        }
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get _selected() {
        return this._validSelected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _selected(value) {
        this._validSelected = value;
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get _minDate() {
        return this._datepickerInput && this._datepickerInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get _maxDate() {
        return this._datepickerInput && this._datepickerInput.max;
    }
    /**
     * @return {?}
     */
    get _dateFilter() {
        return this._datepickerInput && this._datepickerInput._dateFilter;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    _select(date) {
        /** @type {?} */
        const oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDatetime(oldValue, this._selected)) {
            // tslint:disable-next-line deprecation
            this.selectedChanged.emit(date);
        }
    }
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    _registerInput(input) {
        if (this._datepickerInput) {
            throw Error("A MatDatepicker can only be associated with a single input.");
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            (value) => this._selected = value));
    }
    /**
     * Open the calendar.
     * @return {?}
     */
    open() {
        if (this.opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error("Attempted to open an MatDatepicker with no associated input.");
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
        this.openedStream.emit();
    }
    /**
     * Close the calendar.
     * @return {?}
     */
    close() {
        if (!this.opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef) {
            this._dialogRef.close();
            this._dialogRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        /** @type {?} */
        const completeClose = (/**
         * @return {?}
         */
        () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this.opened) {
                this.opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        });
        if (this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === "function") {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Open the calendar as a dialog.
     * @private
     * @return {?}
     */
    _openAsDialog() {
        this._dialogRef = this._dialog.open(MatDatetimepickerContent, {
            direction: this._dir ? this._dir.value : "ltr",
            viewContainerRef: this._viewContainerRef,
            panelClass: "mat-datetimepicker-dialog"
        });
        this._dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => this.close()));
        this._dialogRef.componentInstance.datetimepicker = this;
    }
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    _openAsPopup() {
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(MatDatetimepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            /** @type {?} */
            const componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datetimepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.asObservable().pipe(first()).subscribe((/**
             * @return {?}
             */
            () => {
                this._popupRef.updatePosition();
            }));
        }
        this._popupRef.backdropClick().subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    _createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: "mat-overlay-transparent-backdrop",
            direction: this._dir ? this._dir.value : "ltr",
            scrollStrategy: this._scrollStrategy(),
            panelClass: "mat-datetimepicker-popup"
        });
        this._popupRef = this._overlay.create(overlayConfig);
    }
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    _createPopupPositionStrategy() {
        return this._overlay.position()
            .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn(".mat-datetimepicker-content")
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
            {
                originX: "start",
                originY: "bottom",
                overlayX: "start",
                overlayY: "top"
            },
            {
                originX: "start",
                originY: "top",
                overlayX: "start",
                overlayY: "bottom"
            },
            {
                originX: "end",
                originY: "bottom",
                overlayX: "end",
                overlayY: "top"
            },
            {
                originX: "end",
                originY: "top",
                overlayX: "end",
                overlayY: "bottom"
            }
        ]);
    }
}
MatDatetimepicker.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker",
                exportAs: "matDatetimepicker",
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatDatetimepicker.ctorParameters = () => [
    { type: MatDialog },
    { type: Overlay },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] }] },
    { type: DatetimeAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
MatDatetimepicker.propDecorators = {
    startAt: [{ type: Input }],
    startView: [{ type: Input }],
    mode: [{ type: Input }],
    timeInterval: [{ type: Input }],
    openOnFocus: [{ type: Input }],
    type: [{ type: Input }],
    touchUi: [{ type: Input }],
    disabled: [{ type: Input }],
    selectedChanged: [{ type: Output }],
    panelClass: [{ type: Input }],
    openedStream: [{ type: Output, args: ["opened",] }],
    closedStream: [{ type: Output, args: ["closed",] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._startAt;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    MatDatetimepicker.prototype.startView;
    /** @type {?} */
    MatDatetimepicker.prototype.mode;
    /** @type {?} */
    MatDatetimepicker.prototype.timeInterval;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._openOnFocus;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._type;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._touchUi;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._disabled;
    /**
     * Emits new selected date when selected date changes.
     * @deprecated Switch to the `dateChange` and `dateInput` binding on the input element.
     * @type {?}
     */
    MatDatetimepicker.prototype.selectedChanged;
    /**
     * Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`.
     * @type {?}
     */
    MatDatetimepicker.prototype.panelClass;
    /**
     * Emits when the datepicker has been opened.
     * @type {?}
     */
    MatDatetimepicker.prototype.openedStream;
    /**
     * Emits when the datepicker has been closed.
     * @type {?}
     */
    MatDatetimepicker.prototype.closedStream;
    /**
     * Whether the calendar is open.
     * @type {?}
     */
    MatDatetimepicker.prototype.opened;
    /**
     * The id for the datepicker calendar.
     * @type {?}
     */
    MatDatetimepicker.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._validSelected;
    /**
     * A reference to the overlay when the calendar is opened as a popup.
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._popupRef;
    /**
     * A reference to the dialog when the calendar is opened as a dialog.
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._dialogRef;
    /**
     * A portal containing the calendar for this datepicker.
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._calendarPortal;
    /**
     * The element that was focused before the datepicker was opened.
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._focusedElementBeforeOpen;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._inputSubscription;
    /**
     * The input element this datepicker is associated with.
     * @type {?}
     */
    MatDatetimepicker.prototype._datepickerInput;
    /**
     * Emits when the datepicker is disabled.
     * @type {?}
     */
    MatDatetimepicker.prototype._disabledChange;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepicker.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWVwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUvIiwic291cmNlcyI6WyJkYXRldGltZXBpY2tlci9kYXRldGltZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsT0FBTyxFQUNQLGFBQWEsRUFHZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUNMLFNBQVMsRUFFVixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztJQUtq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QXdDOzs7Ozs7SUFpQnhDLHNDQUE4Qjs7Ozs7O0lBRzlCLHVDQUE2Qzs7Ozs7O0lBRzdDLDRDQUFzRTs7Ozs7O0lBR3RFLHNEQUE2RDs7Ozs7SUFFN0QsK0NBQWdEOzs7OztJQUdoRCw2Q0FBNEM7Ozs7O0lBRzVDLDRDQUF5Qzs7Ozs7SUFFN0Isb0NBQTBCOzs7OztJQUMxQixxQ0FBeUI7Ozs7O0lBQ3pCLG9DQUF1Qjs7Ozs7SUFDdkIsOENBQTJDOzs7OztJQUMzQyw0Q0FBK0Q7Ozs7O0lBQy9ELHlDQUFvRDs7Ozs7SUFDcEQsaUNBQXdDOzs7OztJQUN4QyxzQ0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gXCJAYW5ndWxhci9jZGsvYmlkaVwiO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9jb2VyY2lvblwiO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9rZXljb2Rlc1wiO1xuaW1wb3J0IHtcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgUG9zaXRpb25TdHJhdGVneVxufSBmcm9tIFwiQGFuZ3VsYXIvY2RrL292ZXJsYXlcIjtcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gXCJAYW5ndWxhci9jZGsvcG9ydGFsXCI7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQge1xuICBNYXREaWFsb2csXG4gIE1hdERpYWxvZ1JlZlxufSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nXCI7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IERhdGV0aW1lQWRhcHRlciB9IGZyb20gXCIuLi9hZGFwdGVyL2RhdGV0aW1lLWFkYXB0ZXJcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyQ2FsZW5kYXIgfSBmcm9tIFwiLi9jYWxlbmRhclwiO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlci1lcnJvcnNcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyRmlsdGVyVHlwZSB9IGZyb20gXCIuL2RhdGV0aW1lcGlja2VyLWZpbHRlcnR5cGVcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VySW5wdXQgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlci1pbnB1dFwiO1xuXG4vKiogVXNlZCB0byBnZW5lcmF0ZSBhIHVuaXF1ZSBJRCBmb3IgZWFjaCBkYXRlcGlja2VyIGluc3RhbmNlLiAqL1xubGV0IGRhdGV0aW1lcGlja2VyVWlkID0gMDtcblxuLyoqXG4gKiBDb21wb25lbnQgdXNlZCBhcyB0aGUgY29udGVudCBmb3IgdGhlIGRhdGVwaWNrZXIgZGlhbG9nIGFuZCBwb3B1cC4gV2UgdXNlIHRoaXMgaW5zdGVhZCBvZiB1c2luZ1xuICogTWF0Q2FsZW5kYXIgZGlyZWN0bHkgYXMgdGhlIGNvbnRlbnQgc28gd2UgY2FuIGNvbnRyb2wgdGhlIGluaXRpYWwgZm9jdXMuIFRoaXMgYWxzbyBnaXZlcyB1cyBhXG4gKiBwbGFjZSB0byBwdXQgYWRkaXRpb25hbCBmZWF0dXJlcyBvZiB0aGUgcG9wdXAgdGhhdCBhcmUgbm90IHBhcnQgb2YgdGhlIGNhbGVuZGFyIGl0c2VsZiBpbiB0aGVcbiAqIGZ1dHVyZS4gKGUuZy4gY29uZmlybWF0aW9uIGJ1dHRvbnMpLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibWF0LWRhdGV0aW1lcGlja2VyLWNvbnRlbnRcIixcbiAgdGVtcGxhdGVVcmw6IFwiZGF0ZXRpbWVwaWNrZXItY29udGVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiZGF0ZXRpbWVwaWNrZXItY29udGVudC5zY3NzXCJdLFxuICBob3N0OiB7XG4gICAgXCJjbGFzc1wiOiBcIm1hdC1kYXRldGltZXBpY2tlci1jb250ZW50XCIsXG4gICAgXCJbY2xhc3MubWF0LWRhdGV0aW1lcGlja2VyLWNvbnRlbnQtdG91Y2hdXCI6IFwiZGF0ZXRpbWVwaWNrZXI/LnRvdWNoVWlcIixcbiAgICBcIihrZXlkb3duKVwiOiBcIl9oYW5kbGVLZXlkb3duKCRldmVudClcIlxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXREYXRldGltZXBpY2tlckNvbnRlbnQ8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgZGF0ZXRpbWVwaWNrZXI6IE1hdERhdGV0aW1lcGlja2VyPEQ+O1xuXG4gIEBWaWV3Q2hpbGQoTWF0RGF0ZXRpbWVwaWNrZXJDYWxlbmRhcikgX2NhbGVuZGFyOiBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyPEQ+O1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl9jYWxlbmRhci5fZm9jdXNBY3RpdmVDZWxsKCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBrZXlkb3duIGV2ZW50IG9uIGRhdGVwaWNrZXIgY29udGVudC5cbiAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudC5cbiAgICovXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xuICAgICAgdGhpcy5kYXRldGltZXBpY2tlci5jbG9zZSgpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibWF0LWRhdGV0aW1lcGlja2VyXCIsXG4gIGV4cG9ydEFzOiBcIm1hdERhdGV0aW1lcGlja2VyXCIsXG4gIHRlbXBsYXRlOiBcIlwiLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXRpbWVwaWNrZXI8RD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XG4gICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XG4gICAgLy8gc2VsZWN0ZWQgdmFsdWUgaXMuXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQgfHwgKHRoaXMuX2RhdGVwaWNrZXJJbnB1dCA/IHRoaXMuX2RhdGVwaWNrZXJJbnB1dC52YWx1ZSA6IG51bGwpO1xuICB9XG5cbiAgc2V0IHN0YXJ0QXQoZGF0ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKGRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XG5cbiAgLyoqIFRoZSB2aWV3IHRoYXQgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBpbi4gKi9cbiAgQElucHV0KCkgc3RhcnRWaWV3OiBcImNsb2NrXCIgfCBcIm1vbnRoXCIgfCBcInllYXJcIiA9IFwibW9udGhcIjtcbiAgQElucHV0KCkgbW9kZTogXCJhdXRvXCIgfCBcInBvcnRyYWl0XCIgfCBcImxhbmRzY2FwZVwiID0gXCJhdXRvXCI7XG4gIEBJbnB1dCgpIHRpbWVJbnRlcnZhbDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoKVxuICBnZXQgb3Blbk9uRm9jdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuT25Gb2N1czsgfVxuICBzZXQgb3Blbk9uRm9jdXModmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fb3Blbk9uRm9jdXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIHByaXZhdGUgX29wZW5PbkZvY3VzOiBib29sZWFuO1xuXG4gIF9oYW5kbGVGb2N1cygpIHtcbiAgICBpZiAoIXRoaXMub3BlbmVkICYmIHRoaXMub3Blbk9uRm9jdXMpIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgc2V0IHR5cGUodmFsdWU6IFwiZGF0ZVwiIHwgXCJ0aW1lXCIgfCBcIm1vbnRoXCIgfCBcImRhdGV0aW1lXCIpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWUgfHwgXCJkYXRlXCI7XG4gIH1cblxuICBwcml2YXRlIF90eXBlOiBcImRhdGVcIiB8IFwidGltZVwiIHwgXCJtb250aFwiIHwgXCJkYXRldGltZVwiID0gXCJkYXRlXCI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIFVJIGlzIGluIHRvdWNoIG1vZGUuIEluIHRvdWNoIG1vZGUgdGhlIGNhbGVuZGFyIG9wZW5zIGluIGEgZGlhbG9nIHJhdGhlclxuICAgKiB0aGFuIGEgcG9wdXAgYW5kIGVsZW1lbnRzIGhhdmUgbW9yZSBwYWRkaW5nIHRvIGFsbG93IGZvciBiaWdnZXIgdG91Y2ggdGFyZ2V0cy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCB0b3VjaFVpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90b3VjaFVpO1xuICB9XG5cbiAgc2V0IHRvdWNoVWkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90b3VjaFVpID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoVWkgPSBmYWxzZTtcblxuICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlciBwb3AtdXAgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0ZXBpY2tlcklucHV0ID9cbiAgICAgIHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5kaXNhYmxlZCA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fZGlzYWJsZWRDaGFuZ2UubmV4dChuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVtaXRzIG5ldyBzZWxlY3RlZCBkYXRlIHdoZW4gc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLlxuICAgKiBAZGVwcmVjYXRlZCBTd2l0Y2ggdG8gdGhlIGBkYXRlQ2hhbmdlYCBhbmQgYGRhdGVJbnB1dGAgYmluZGluZyBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBkYXRlIHBpY2tlciBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cbiAgQElucHV0KCkgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LXJlbmFtZVxuICBAT3V0cHV0KFwib3BlbmVkXCIpIG9wZW5lZFN0cmVhbTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGhhcyBiZWVuIGNsb3NlZC4gKi9cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW91dHB1dC1yZW5hbWVcbiAgQE91dHB1dChcImNsb3NlZFwiKSBjbG9zZWRTdHJlYW06IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cbiAgb3BlbmVkID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBpZCBmb3IgdGhlIGRhdGVwaWNrZXIgY2FsZW5kYXIuICovXG4gIGlkID0gYG1hdC1kYXRldGltZXBpY2tlci0ke2RhdGV0aW1lcGlja2VyVWlkKyt9YDtcblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBnZXQgX3NlbGVjdGVkKCk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRTZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBfc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdGhpcy5fdmFsaWRTZWxlY3RlZCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRTZWxlY3RlZDogRCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gIGdldCBfbWluRGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVwaWNrZXJJbnB1dCAmJiB0aGlzLl9kYXRlcGlja2VySW5wdXQubWluO1xuICB9XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgZ2V0IF9tYXhEYXRlKCk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZXBpY2tlcklucHV0ICYmIHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5tYXg7XG4gIH1cblxuICBnZXQgX2RhdGVGaWx0ZXIoKTogKGRhdGU6IEQgfCBudWxsLCB0eXBlOiBNYXREYXRldGltZXBpY2tlckZpbHRlclR5cGUpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5fZGF0ZXBpY2tlcklucHV0Ll9kYXRlRmlsdGVyO1xuICB9XG5cbiAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBvdmVybGF5IHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZCBhcyBhIHBvcHVwLiAqL1xuICBwcml2YXRlIF9wb3B1cFJlZjogT3ZlcmxheVJlZjtcblxuICAvKiogQSByZWZlcmVuY2UgdG8gdGhlIGRpYWxvZyB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQgYXMgYSBkaWFsb2cuICovXG4gIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPGFueT4gfCBudWxsO1xuXG4gIC8qKiBBIHBvcnRhbCBjb250YWluaW5nIHRoZSBjYWxlbmRhciBmb3IgdGhpcyBkYXRlcGlja2VyLiAqL1xuICBwcml2YXRlIF9jYWxlbmRhclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1hdERhdGV0aW1lcGlja2VyQ29udGVudDxEPj47XG5cbiAgLyoqIFRoZSBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBkYXRlcGlja2VyIHdhcyBvcGVuZWQuICovXG4gIHByaXZhdGUgX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF9pbnB1dFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogVGhlIGlucHV0IGVsZW1lbnQgdGhpcyBkYXRlcGlja2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgX2RhdGVwaWNrZXJJbnB1dDogTWF0RGF0ZXRpbWVwaWNrZXJJbnB1dDxEPjtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBkaXNhYmxlZC4gKi9cbiAgX2Rpc2FibGVkQ2hhbmdlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZKSBwcml2YXRlIF9zY3JvbGxTdHJhdGVneSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGF0ZUFkYXB0ZXI6IERhdGV0aW1lQWRhcHRlcjxEPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge1xuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKFwiRGF0ZUFkYXB0ZXJcIik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuX2lucHV0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcblxuICAgIGlmICh0aGlzLl9wb3B1cFJlZikge1xuICAgICAgdGhpcy5fcG9wdXBSZWYuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBnaXZlbiBkYXRlICovXG4gIF9zZWxlY3QoZGF0ZTogRCk6IHZvaWQge1xuICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBkYXRlO1xuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIuc2FtZURhdGV0aW1lKG9sZFZhbHVlLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvblxuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZWQuZW1pdChkYXRlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gaW5wdXQgd2l0aCB0aGlzIGRhdGVwaWNrZXIuXG4gICAqIEBwYXJhbSBpbnB1dCBUaGUgZGF0ZXBpY2tlciBpbnB1dCB0byByZWdpc3RlciB3aXRoIHRoaXMgZGF0ZXBpY2tlci5cbiAgICovXG4gIF9yZWdpc3RlcklucHV0KGlucHV0OiBNYXREYXRldGltZXBpY2tlcklucHV0PEQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGVwaWNrZXJJbnB1dCkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJBIE1hdERhdGVwaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LlwiKTtcbiAgICB9XG4gICAgdGhpcy5fZGF0ZXBpY2tlcklucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5faW5wdXRTdWJzY3JpcHRpb24gPVxuICAgICAgdGhpcy5fZGF0ZXBpY2tlcklucHV0Ll92YWx1ZUNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBEIHwgbnVsbCkgPT4gdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZSk7XG4gIH1cblxuICAvKiogT3BlbiB0aGUgY2FsZW5kYXIuICovXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3BlbmVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9kYXRlcGlja2VySW5wdXQpIHtcbiAgICAgIHRocm93IEVycm9yKFwiQXR0ZW1wdGVkIHRvIG9wZW4gYW4gTWF0RGF0ZXBpY2tlciB3aXRoIG5vIGFzc29jaWF0ZWQgaW5wdXQuXCIpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZG9jdW1lbnQpIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy50b3VjaFVpID8gdGhpcy5fb3BlbkFzRGlhbG9nKCkgOiB0aGlzLl9vcGVuQXNQb3B1cCgpO1xuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICB0aGlzLm9wZW5lZFN0cmVhbS5lbWl0KCk7XG4gIH1cblxuICAvKiogQ2xvc2UgdGhlIGNhbGVuZGFyLiAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3BlbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9wb3B1cFJlZiAmJiB0aGlzLl9wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9wb3B1cFJlZi5kZXRhY2goKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY2FsZW5kYXJQb3J0YWwgJiYgdGhpcy5fY2FsZW5kYXJQb3J0YWwuaXNBdHRhY2hlZCkge1xuICAgICAgdGhpcy5fY2FsZW5kYXJQb3J0YWwuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcGxldGVDbG9zZSA9ICgpID0+IHtcbiAgICAgIC8vIFRoZSBgX29wZW5lZGAgY291bGQndmUgYmVlbiByZXNldCBhbHJlYWR5IGlmXG4gICAgICAvLyB3ZSBnb3QgdHdvIGV2ZW50cyBpbiBxdWljayBzdWNjZXNzaW9uLlxuICAgICAgaWYgKHRoaXMub3BlbmVkKSB7XG4gICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VkU3RyZWFtLmVtaXQoKTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiAmJlxuICAgICAgdHlwZW9mIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyBCZWNhdXNlIElFIG1vdmVzIGZvY3VzIGFzeW5jaHJvbm91c2x5LCB3ZSBjYW4ndCBjb3VudCBvbiBpdCBiZWluZyByZXN0b3JlZCBiZWZvcmUgd2UndmVcbiAgICAgIC8vIG1hcmtlZCB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQuIElmIHRoZSBldmVudCBmaXJlcyBvdXQgb2Ygc2VxdWVuY2UgYW5kIHRoZSBlbGVtZW50IHRoYXRcbiAgICAgIC8vIHdlJ3JlIHJlZm9jdXNpbmcgb3BlbnMgdGhlIGRhdGVwaWNrZXIgb24gZm9jdXMsIHRoZSB1c2VyIGNvdWxkIGJlIHN0dWNrIHdpdGggbm90IGJlaW5nXG4gICAgICAvLyBhYmxlIHRvIGNsb3NlIHRoZSBjYWxlbmRhciBhdCBhbGwuIFdlIHdvcmsgYXJvdW5kIGl0IGJ5IG1ha2luZyB0aGUgbG9naWMsIHRoYXQgbWFya3NcbiAgICAgIC8vIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZCwgYXN5bmMgYXMgd2VsbC5cbiAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3Blbi5mb2N1cygpO1xuICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGVDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBjYWxlbmRhciBhcyBhIGRpYWxvZy4gKi9cbiAgcHJpdmF0ZSBfb3BlbkFzRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuX2RpYWxvZ1JlZiA9IHRoaXMuX2RpYWxvZy5vcGVuKE1hdERhdGV0aW1lcGlja2VyQ29udGVudCwge1xuICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiBcImx0clwiLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmlld0NvbnRhaW5lclJlZixcbiAgICAgIHBhbmVsQ2xhc3M6IFwibWF0LWRhdGV0aW1lcGlja2VyLWRpYWxvZ1wiXG4gICAgfSk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmRhdGV0aW1lcGlja2VyID0gdGhpcztcbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBjYWxlbmRhciBhcyBhIHBvcHVwLiAqL1xuICBwcml2YXRlIF9vcGVuQXNQb3B1cCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NhbGVuZGFyUG9ydGFsKSB7XG4gICAgICB0aGlzLl9jYWxlbmRhclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8TWF0RGF0ZXRpbWVwaWNrZXJDb250ZW50PEQ+PihNYXREYXRldGltZXBpY2tlckNvbnRlbnQsIHRoaXMuX3ZpZXdDb250YWluZXJSZWYpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fcG9wdXBSZWYpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZVBvcHVwKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxNYXREYXRldGltZXBpY2tlckNvbnRlbnQ8RD4+ID1cbiAgICAgICAgdGhpcy5fcG9wdXBSZWYuYXR0YWNoKHRoaXMuX2NhbGVuZGFyUG9ydGFsKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5kYXRldGltZXBpY2tlciA9IHRoaXM7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb25jZSB0aGUgY2FsZW5kYXIgaGFzIHJlbmRlcmVkLlxuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fcG9wdXBSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX3BvcHVwUmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIHBvcHVwLiAqL1xuICBwcml2YXRlIF9jcmVhdGVQb3B1cCgpOiB2b2lkIHtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IFwibWF0LW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3BcIixcbiAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyID8gdGhpcy5fZGlyLnZhbHVlIDogXCJsdHJcIixcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgcGFuZWxDbGFzczogXCJtYXQtZGF0ZXRpbWVwaWNrZXItcG9wdXBcIlxuICAgIH0pO1xuXG4gICAgdGhpcy5fcG9wdXBSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIHBvcHVwIFBvc2l0aW9uU3RyYXRlZ3kuICovXG4gIHByaXZhdGUgX2NyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kYXRlcGlja2VySW5wdXQuZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpKVxuICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbihcIi5tYXQtZGF0ZXRpbWVwaWNrZXItY29udGVudFwiKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKDgpXG4gICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6IFwic3RhcnRcIixcbiAgICAgICAgICBvcmlnaW5ZOiBcImJvdHRvbVwiLFxuICAgICAgICAgIG92ZXJsYXlYOiBcInN0YXJ0XCIsXG4gICAgICAgICAgb3ZlcmxheVk6IFwidG9wXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6IFwic3RhcnRcIixcbiAgICAgICAgICBvcmlnaW5ZOiBcInRvcFwiLFxuICAgICAgICAgIG92ZXJsYXlYOiBcInN0YXJ0XCIsXG4gICAgICAgICAgb3ZlcmxheVk6IFwiYm90dG9tXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6IFwiZW5kXCIsXG4gICAgICAgICAgb3JpZ2luWTogXCJib3R0b21cIixcbiAgICAgICAgICBvdmVybGF5WDogXCJlbmRcIixcbiAgICAgICAgICBvdmVybGF5WTogXCJ0b3BcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogXCJlbmRcIixcbiAgICAgICAgICBvcmlnaW5ZOiBcInRvcFwiLFxuICAgICAgICAgIG92ZXJsYXlYOiBcImVuZFwiLFxuICAgICAgICAgIG92ZXJsYXlZOiBcImJvdHRvbVwiXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICB9XG59XG4iXX0=