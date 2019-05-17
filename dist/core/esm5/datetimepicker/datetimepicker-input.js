/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { DOWN_ARROW } from "@angular/cdk/keycodes";
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { MAT_INPUT_VALUE_ACCESSOR } from "@angular/material";
import { MatFormField } from "@angular/material/form-field";
import { Subscription } from "rxjs";
import { DatetimeAdapter } from "../adapter/datetime-adapter";
import { MAT_DATETIME_FORMATS } from "../adapter/datetime-formats";
import { MatDatetimepicker } from "./datetimepicker";
import { createMissingDateImplError } from "./datetimepicker-errors";
import { MatDatetimepickerFilterType } from "./datetimepicker-filtertype";
// tslint:disable no-use-before-declare
/** @type {?} */
export var MAT_DATETIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MatDatetimepickerInput; })),
    multi: true
};
/** @type {?} */
export var MAT_DATETIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MatDatetimepickerInput; })),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
var /**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
MatDatetimepickerInputEvent = /** @class */ (function () {
    function MatDatetimepickerInputEvent(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return MatDatetimepickerInputEvent;
}());
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
export { MatDatetimepickerInputEvent };
if (false) {
    /**
     * The new value for the target datepicker input.
     * @type {?}
     */
    MatDatetimepickerInputEvent.prototype.value;
    /** @type {?} */
    MatDatetimepickerInputEvent.prototype.target;
    /** @type {?} */
    MatDatetimepickerInputEvent.prototype.targetElement;
}
/**
 * Directive used to connect an input to a MatDatepicker.
 * @template D
 */
var MatDatetimepickerInput = /** @class */ (function () {
    function MatDatetimepickerInput(_elementRef, _dateAdapter, _dateFormats, _formField) {
        var _this = this;
        this._elementRef = _elementRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this._disabledChange = new EventEmitter();
        this._onTouched = (/**
         * @return {?}
         */
        function () {
        });
        this._cvaOnChange = (/**
         * @return {?}
         */
        function () {
        });
        this._validatorOnChange = (/**
         * @return {?}
         */
        function () {
        });
        this._datepickerSubscription = Subscription.EMPTY;
        this._localeSubscription = Subscription.EMPTY;
        /**
         * The form control validator for whether the input parses.
         */
        this._parseValidator = (/**
         * @return {?}
         */
        function () {
            return _this._lastValueValid ?
                null : { "matDatepickerParse": { "text": _this._elementRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this._minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this._dateAdapter.compareDatetime(_this.min, controlValue) <= 0) ?
                null : { "matDatepickerMin": { "min": _this.min, "actual": controlValue } };
        });
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this._dateAdapter.compareDatetime(_this.max, controlValue) >= 0) ?
                null : { "matDatepickerMax": { "max": _this.max, "actual": controlValue } };
        });
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this._dateFilter || !controlValue || _this._dateFilter(controlValue, MatDatetimepickerFilterType.DATE) ?
                null : { "matDatepickerFilter": true };
        });
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
        /**
         * Whether the last value set on the input was valid.
         */
        this._lastValueValid = false;
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        // Update the displayed date when the locale changes.
        this._localeSubscription = _dateAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.value = _this.value;
        }));
    }
    Object.defineProperty(MatDatetimepickerInput.prototype, "matDatetimepicker", {
        /** The datepicker that this input is associated with. */
        set: /**
         * The datepicker that this input is associated with.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.registerDatepicker(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerDatepicker = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    };
    Object.defineProperty(MatDatetimepickerInput.prototype, "matDatepickerFilter", {
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateFilter = filter;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "value", {
        /** The value of the input. */
        get: /**
         * The value of the input.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            value = this._dateAdapter.deserialize(value);
            this._lastValueValid = !value || this._dateAdapter.isValid(value);
            value = this._dateAdapter.getValidDateOrNull(value);
            /** @type {?} */
            var oldDate = this.value;
            this._value = value;
            this._formatValue(value);
            // use timeout to ensure the datetimepicker is instantiated and we get the correct format
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (!_this._dateAdapter.sameDatetime(oldDate, value)) {
                    _this._valueChange.emit(value);
                }
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    MatDatetimepickerInput.prototype.getDisplayFormat = /**
     * @private
     * @return {?}
     */
    function () {
        switch (this._datepicker.type) {
            case "date":
                return this._dateFormats.display.dateInput;
            case "datetime":
                return this._dateFormats.display.datetimeInput;
            case "time":
                return this._dateFormats.display.timeInput;
            case "month":
                return this._dateFormats.display.monthInput;
        }
    };
    /**
     * @private
     * @return {?}
     */
    MatDatetimepickerInput.prototype.getParseFormat = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parseFormat;
        switch (this._datepicker.type) {
            case "date":
                parseFormat = this._dateFormats.parse.dateInput;
                break;
            case "datetime":
                parseFormat = this._dateFormats.parse.datetimeInput;
                break;
            case "time":
                parseFormat = this._dateFormats.parse.timeInput;
                break;
            case "month":
                parseFormat = this._dateFormats.parse.monthInput;
                break;
        }
        if (!parseFormat) {
            parseFormat = this._dateFormats.parse.dateInput;
        }
        return parseFormat;
    };
    Object.defineProperty(MatDatetimepickerInput.prototype, "min", {
        /** The minimum valid date. */
        get: /**
         * The minimum valid date.
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: /**
         * The maximum valid date.
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "disabled", {
        /** Whether the datepicker-input is disabled. */
        get: /**
         * Whether the datepicker-input is disabled.
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this._disabledChange.emit(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._datepicker) {
            // tslint:disable-next-line deprecation
            this._datepickerSubscription = this._datepicker.selectedChanged.subscribe((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                _this.value = selected;
                _this._cvaOnChange(selected);
                _this._onTouched();
                _this.dateInput.emit(new MatDatetimepickerInputEvent(_this, _this._elementRef.nativeElement));
                _this.dateChange.emit(new MatDatetimepickerInputEvent(_this, _this._elementRef.nativeElement));
            }));
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._validatorOnChange = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MatDatetimepickerInput.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    MatDatetimepickerInput.prototype.getConnectedOverlayOrigin = /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    function () {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} disabled
     * @return {?}
     */
    MatDatetimepickerInput.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} disabled
     * @return {?}
     */
    function (disabled) {
        this.disabled = disabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var date = this._dateAdapter.parse(value, this.getParseFormat());
        this._lastValueValid = !date || this._dateAdapter.isValid(date);
        date = this._dateAdapter.getValidDateOrNull(date);
        this._value = date;
        this._cvaOnChange(date);
        this._valueChange.emit(date);
        this.dateInput.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onChange = /**
     * @return {?}
     */
    function () {
        this.dateChange.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /** Handles blur events on the input. */
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onBlur = /**
     * Handles blur events on the input.
     * @return {?}
     */
    function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    };
    /** Formats a value and sets it on the input element. */
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype._formatValue = /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._elementRef.nativeElement.value =
            value ? this._dateAdapter.format(value, this.getDisplayFormat()) : "";
    };
    MatDatetimepickerInput.decorators = [
        { type: Directive, args: [{
                    selector: "input[matDatetimepicker]",
                    providers: [
                        MAT_DATETIMEPICKER_VALUE_ACCESSOR,
                        MAT_DATETIMEPICKER_VALIDATORS,
                        { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatetimepickerInput },
                    ],
                    host: {
                        "[attr.aria-haspopup]": "true",
                        "[attr.aria-owns]": "(_datepicker?.opened && _datepicker.id) || null",
                        "[attr.min]": "min ? _dateAdapter.toIso8601(min) : null",
                        "[attr.max]": "max ? _dateAdapter.toIso8601(max) : null",
                        "[disabled]": "disabled",
                        "(focus)": "_datepicker._handleFocus()",
                        "(input)": "_onInput($event.target.value)",
                        "(change)": "_onChange()",
                        "(blur)": "_onBlur()",
                        "(keydown)": "_onKeydown($event)"
                    },
                    exportAs: "matDatepickerInput"
                },] }
    ];
    /** @nocollapse */
    MatDatetimepickerInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DatetimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] },
        { type: MatFormField, decorators: [{ type: Optional }] }
    ]; };
    MatDatetimepickerInput.propDecorators = {
        matDatetimepicker: [{ type: Input }],
        matDatepickerFilter: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        disabled: [{ type: Input }],
        dateChange: [{ type: Output }],
        dateInput: [{ type: Output }]
    };
    return MatDatetimepickerInput;
}());
export { MatDatetimepickerInput };
if (false) {
    /** @type {?} */
    MatDatetimepickerInput.prototype._datepicker;
    /** @type {?} */
    MatDatetimepickerInput.prototype._dateFilter;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._value;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._min;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._max;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._disabled;
    /**
     * Emits when a `change` event is fired on this `<input>`.
     * @type {?}
     */
    MatDatetimepickerInput.prototype.dateChange;
    /**
     * Emits when an `input` event is fired on this `<input>`.
     * @type {?}
     */
    MatDatetimepickerInput.prototype.dateInput;
    /**
     * Emits when the value changes (either due to user input or programmatic change).
     * @type {?}
     */
    MatDatetimepickerInput.prototype._valueChange;
    /**
     * Emits when the disabled state has changed
     * @type {?}
     */
    MatDatetimepickerInput.prototype._disabledChange;
    /** @type {?} */
    MatDatetimepickerInput.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._cvaOnChange;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._validatorOnChange;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._datepickerSubscription;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._localeSubscription;
    /**
     * The form control validator for whether the input parses.
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._parseValidator;
    /**
     * The form control validator for the min date.
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._filterValidator;
    /**
     * The combined form control validator for this input.
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._validator;
    /**
     * Whether the last value set on the input was valid.
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._lastValueValid;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._elementRef;
    /** @type {?} */
    MatDatetimepickerInput.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._dateFormats;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerInput.prototype._formField;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWVwaWNrZXItaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUvIiwic291cmNlcyI6WyJkYXRldGltZXBpY2tlci9kYXRldGltZXBpY2tlci1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBSWpCLFVBQVUsRUFDWCxNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsb0JBQW9CLEVBRXJCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7OztBQUkxRSxNQUFNLEtBQU8saUNBQWlDLEdBQVE7SUFDcEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixF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Ozs7SUFHekUsOENBQTRDOzs7OztJQUc1QyxpREFBOEM7O0lBRTlDLDRDQUNDOzs7OztJQUVELDhDQUNDOzs7OztJQUVELG9EQUNDOzs7OztJQUVELHlEQUFxRDs7Ozs7SUFFckQscURBQWlEOzs7Ozs7SUFHakQsaURBR0M7Ozs7OztJQUdELCtDQUtDOzs7Ozs7SUFHRCwrQ0FLQzs7Ozs7O0lBR0Qsa0RBSUM7Ozs7OztJQUdELDRDQUUyRjs7Ozs7O0lBRzNGLGlEQUFnQzs7Ozs7SUFFcEIsNkNBQStCOztJQUMvQiw4Q0FBbUQ7Ozs7O0lBQ25ELDhDQUFrRjs7Ozs7SUFDbEYsNENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9jb2VyY2lvblwiO1xuaW1wb3J0IHsgRE9XTl9BUlJPVyB9IGZyb20gXCJAYW5ndWxhci9jZGsva2V5Y29kZXNcIjtcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3IsXG4gIFZhbGlkYXRvckZuLFxuICBWYWxpZGF0b3JzXG59IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTUFUX0lOUFVUX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGQgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IERhdGV0aW1lQWRhcHRlciB9IGZyb20gXCIuLi9hZGFwdGVyL2RhdGV0aW1lLWFkYXB0ZXJcIjtcbmltcG9ydCB7XG4gIE1BVF9EQVRFVElNRV9GT1JNQVRTLFxuICBNYXREYXRldGltZUZvcm1hdHNcbn0gZnJvbSBcIi4uL2FkYXB0ZXIvZGF0ZXRpbWUtZm9ybWF0c1wiO1xuaW1wb3J0IHsgTWF0RGF0ZXRpbWVwaWNrZXIgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlclwiO1xuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlci1lcnJvcnNcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyRmlsdGVyVHlwZSB9IGZyb20gXCIuL2RhdGV0aW1lcGlja2VyLWZpbHRlcnR5cGVcIjtcblxuLy8gdHNsaW50OmRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWNsYXJlXG5cbmV4cG9ydCBjb25zdCBNQVRfREFURVRJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdERhdGV0aW1lcGlja2VySW5wdXQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFVElNRVBJQ0tFUl9WQUxJREFUT1JTOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdERhdGV0aW1lcGlja2VySW5wdXQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBbiBldmVudCB1c2VkIGZvciBkYXRlcGlja2VyIGlucHV0IGFuZCBjaGFuZ2UgZXZlbnRzLiBXZSBkb24ndCBhbHdheXMgaGF2ZSBhY2Nlc3MgdG8gYSBuYXRpdmVcbiAqIGlucHV0IG9yIGNoYW5nZSBldmVudCBiZWNhdXNlIHRoZSBldmVudCBtYXkgaGF2ZSBiZWVuIHRyaWdnZXJlZCBieSB0aGUgdXNlciBjbGlja2luZyBvbiB0aGVcbiAqIGNhbGVuZGFyIHBvcHVwLiBGb3IgY29uc2lzdGVuY3ksIHdlIGFsd2F5cyB1c2UgTWF0RGF0ZXBpY2tlcklucHV0RXZlbnQgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1hdERhdGV0aW1lcGlja2VySW5wdXRFdmVudDxEPiB7XG4gIC8qKiBUaGUgbmV3IHZhbHVlIGZvciB0aGUgdGFyZ2V0IGRhdGVwaWNrZXIgaW5wdXQuICovXG4gIHZhbHVlOiBEIHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFyZ2V0OiBNYXREYXRldGltZXBpY2tlcklucHV0PEQ+LCBwdWJsaWMgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy50YXJnZXQudmFsdWU7XG4gIH1cbn1cblxuLyoqIERpcmVjdGl2ZSB1c2VkIHRvIGNvbm5lY3QgYW4gaW5wdXQgdG8gYSBNYXREYXRlcGlja2VyLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcImlucHV0W21hdERhdGV0aW1lcGlja2VyXVwiLFxuICBwcm92aWRlcnM6IFtcbiAgICBNQVRfREFURVRJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsXG4gICAgTUFUX0RBVEVUSU1FUElDS0VSX1ZBTElEQVRPUlMsXG4gICAge3Byb3ZpZGU6IE1BVF9JTlBVVF9WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IE1hdERhdGV0aW1lcGlja2VySW5wdXR9LFxuICBdLFxuICBob3N0OiB7XG4gICAgXCJbYXR0ci5hcmlhLWhhc3BvcHVwXVwiOiBcInRydWVcIixcbiAgICBcIlthdHRyLmFyaWEtb3duc11cIjogXCIoX2RhdGVwaWNrZXI/Lm9wZW5lZCAmJiBfZGF0ZXBpY2tlci5pZCkgfHwgbnVsbFwiLFxuICAgIFwiW2F0dHIubWluXVwiOiBcIm1pbiA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEobWluKSA6IG51bGxcIixcbiAgICBcIlthdHRyLm1heF1cIjogXCJtYXggPyBfZGF0ZUFkYXB0ZXIudG9Jc284NjAxKG1heCkgOiBudWxsXCIsXG4gICAgXCJbZGlzYWJsZWRdXCI6IFwiZGlzYWJsZWRcIixcbiAgICBcIihmb2N1cylcIjogXCJfZGF0ZXBpY2tlci5faGFuZGxlRm9jdXMoKVwiLFxuICAgIFwiKGlucHV0KVwiOiBcIl9vbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpXCIsXG4gICAgXCIoY2hhbmdlKVwiOiBcIl9vbkNoYW5nZSgpXCIsXG4gICAgXCIoYmx1cilcIjogXCJfb25CbHVyKClcIixcbiAgICBcIihrZXlkb3duKVwiOiBcIl9vbktleWRvd24oJGV2ZW50KVwiXG4gIH0sXG4gIGV4cG9ydEFzOiBcIm1hdERhdGVwaWNrZXJJbnB1dFwiXG59KVxuZXhwb3J0IGNsYXNzIE1hdERhdGV0aW1lcGlja2VySW5wdXQ8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LFxuICBWYWxpZGF0b3Ige1xuICAvKiogVGhlIGRhdGVwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgQElucHV0KClcbiAgc2V0IG1hdERhdGV0aW1lcGlja2VyKHZhbHVlOiBNYXREYXRldGltZXBpY2tlcjxEPikge1xuICAgIHRoaXMucmVnaXN0ZXJEYXRlcGlja2VyKHZhbHVlKTtcbiAgfVxuXG4gIF9kYXRlcGlja2VyOiBNYXREYXRldGltZXBpY2tlcjxEPjtcblxuICBwcml2YXRlIHJlZ2lzdGVyRGF0ZXBpY2tlcih2YWx1ZTogTWF0RGF0ZXRpbWVwaWNrZXI8RD4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXIgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXIuX3JlZ2lzdGVySW5wdXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgc2V0IG1hdERhdGVwaWNrZXJGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogRCB8IG51bGwsIHR5cGU6IE1hdERhdGV0aW1lcGlja2VyRmlsdGVyVHlwZSkgPT4gYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgdGhpcy5fdmFsaWRhdG9yT25DaGFuZ2UoKTtcbiAgfVxuXG4gIF9kYXRlRmlsdGVyOiAoZGF0ZTogRCB8IG51bGwsIHR5cGU6IE1hdERhdGV0aW1lcGlja2VyRmlsdGVyVHlwZSkgPT4gYm9vbGVhbjtcblxuICAvKiogVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdmFsdWUgPSB0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgdGhpcy5fbGFzdFZhbHVlVmFsaWQgPSAhdmFsdWUgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZCh2YWx1ZSk7XG4gICAgdmFsdWUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodmFsdWUpO1xuICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fZm9ybWF0VmFsdWUodmFsdWUpO1xuXG4gICAgLy8gdXNlIHRpbWVvdXQgdG8gZW5zdXJlIHRoZSBkYXRldGltZXBpY2tlciBpcyBpbnN0YW50aWF0ZWQgYW5kIHdlIGdldCB0aGUgY29ycmVjdCBmb3JtYXRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIuc2FtZURhdGV0aW1lKG9sZERhdGUsIHZhbHVlKSkge1xuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGlzcGxheUZvcm1hdCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX2RhdGVwaWNrZXIudHlwZSkge1xuICAgICAgY2FzZSBcImRhdGVcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkuZGF0ZUlucHV0O1xuICAgICAgY2FzZSBcImRhdGV0aW1lXCI6XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5LmRhdGV0aW1lSW5wdXQ7XG4gICAgICBjYXNlIFwidGltZVwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS50aW1lSW5wdXQ7XG4gICAgICBjYXNlIFwibW9udGhcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhJbnB1dDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFBhcnNlRm9ybWF0KCkge1xuICAgIGxldCBwYXJzZUZvcm1hdDtcblxuICAgIHN3aXRjaCAodGhpcy5fZGF0ZXBpY2tlci50eXBlKSB7XG4gICAgICBjYXNlIFwiZGF0ZVwiOlxuICAgICAgICBwYXJzZUZvcm1hdCA9IHRoaXMuX2RhdGVGb3JtYXRzLnBhcnNlLmRhdGVJbnB1dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGF0ZXRpbWVcIjpcbiAgICAgICAgcGFyc2VGb3JtYXQgPSB0aGlzLl9kYXRlRm9ybWF0cy5wYXJzZS5kYXRldGltZUlucHV0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ0aW1lXCI6XG4gICAgICAgIHBhcnNlRm9ybWF0ID0gdGhpcy5fZGF0ZUZvcm1hdHMucGFyc2UudGltZUlucHV0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJtb250aFwiOlxuICAgICAgICBwYXJzZUZvcm1hdCA9IHRoaXMuX2RhdGVGb3JtYXRzLnBhcnNlLm1vbnRoSW5wdXQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIXBhcnNlRm9ybWF0KSB7XG4gICAgICBwYXJzZUZvcm1hdCA9IHRoaXMuX2RhdGVGb3JtYXRzLnBhcnNlLmRhdGVJbnB1dDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VGb3JtYXQ7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZTogRCB8IG51bGw7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBtaW4oKTogRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW47XG4gIH1cblxuICBzZXQgbWluKHZhbHVlOiBEIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xuICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9taW46IEQgfCBudWxsO1xuXG4gIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWF4KCk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG5cbiAgc2V0IG1heCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9tYXggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF4OiBEIHwgbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlci1pbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG5cbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5fZGlzYWJsZWRDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIEVtaXRzIHdoZW4gYSBgY2hhbmdlYCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cbiAgQE91dHB1dCgpIGRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1hdERhdGV0aW1lcGlja2VySW5wdXRFdmVudDxEPj4oKTtcblxuICAvKiogRW1pdHMgd2hlbiBhbiBgaW5wdXRgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xuICBAT3V0cHV0KCkgZGF0ZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXREYXRldGltZXBpY2tlcklucHV0RXZlbnQ8RD4+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgKGVpdGhlciBkdWUgdG8gdXNlciBpbnB1dCBvciBwcm9ncmFtbWF0aWMgY2hhbmdlKS4gKi9cbiAgX3ZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEIHwgbnVsbD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgaGFzIGNoYW5nZWQgKi9cbiAgX2Rpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7XG4gIH1cblxuICBwcml2YXRlIF9jdmFPbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0b3JPbkNoYW5nZSA9ICgpID0+IHtcbiAgfVxuXG4gIHByaXZhdGUgX2RhdGVwaWNrZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfbG9jYWxlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3Igd2hldGhlciB0aGUgaW5wdXQgcGFyc2VzLiAqL1xuICBwcml2YXRlIF9wYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgIHJldHVybiB0aGlzLl9sYXN0VmFsdWVWYWxpZCA/XG4gICAgICBudWxsIDoge1wibWF0RGF0ZXBpY2tlclBhcnNlXCI6IHtcInRleHRcIjogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlfX07XG4gIH1cblxuICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cbiAgcHJpdmF0ZSBfbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcbiAgICByZXR1cm4gKCF0aGlzLm1pbiB8fCAhY29udHJvbFZhbHVlIHx8XG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZXRpbWUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZSkgPD0gMCkgP1xuICAgICAgbnVsbCA6IHtcIm1hdERhdGVwaWNrZXJNaW5cIjoge1wibWluXCI6IHRoaXMubWluLCBcImFjdHVhbFwiOiBjb250cm9sVmFsdWV9fTtcbiAgfVxuXG4gIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1heCBkYXRlLiAqL1xuICBwcml2YXRlIF9tYXhWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xuICAgIHJldHVybiAoIXRoaXMubWF4IHx8ICFjb250cm9sVmFsdWUgfHxcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRldGltZSh0aGlzLm1heCwgY29udHJvbFZhbHVlKSA+PSAwKSA/XG4gICAgICBudWxsIDoge1wibWF0RGF0ZXBpY2tlck1heFwiOiB7XCJtYXhcIjogdGhpcy5tYXgsIFwiYWN0dWFsXCI6IGNvbnRyb2xWYWx1ZX19O1xuICB9XG5cbiAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXG4gIHByaXZhdGUgX2ZpbHRlclZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XG4gICAgcmV0dXJuICF0aGlzLl9kYXRlRmlsdGVyIHx8ICFjb250cm9sVmFsdWUgfHwgdGhpcy5fZGF0ZUZpbHRlcihjb250cm9sVmFsdWUsIE1hdERhdGV0aW1lcGlja2VyRmlsdGVyVHlwZS5EQVRFKSA/XG4gICAgICBudWxsIDoge1wibWF0RGF0ZXBpY2tlckZpbHRlclwiOiB0cnVlfTtcbiAgfVxuXG4gIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGwgPVxuICAgIFZhbGlkYXRvcnMuY29tcG9zZShcbiAgICAgIFt0aGlzLl9wYXJzZVZhbGlkYXRvciwgdGhpcy5fbWluVmFsaWRhdG9yLCB0aGlzLl9tYXhWYWxpZGF0b3IsIHRoaXMuX2ZpbHRlclZhbGlkYXRvcl0pO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBsYXN0IHZhbHVlIHNldCBvbiB0aGUgaW5wdXQgd2FzIHZhbGlkLiAqL1xuICBwcml2YXRlIF9sYXN0VmFsdWVWYWxpZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfZGF0ZUFkYXB0ZXI6IERhdGV0aW1lQWRhcHRlcjxEPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURVRJTUVfRk9STUFUUykgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGV0aW1lRm9ybWF0cyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZm9ybUZpZWxkOiBNYXRGb3JtRmllbGQpIHtcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcihcIkRhdGV0aW1lQWRhcHRlclwiKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoXCJNQVRfREFURVRJTUVfRk9STUFUU1wiKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGRpc3BsYXllZCBkYXRlIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLlxuICAgIHRoaXMuX2xvY2FsZVN1YnNjcmlwdGlvbiA9IF9kYXRlQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5fZGF0ZXBpY2tlcikge1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uXG4gICAgICB0aGlzLl9kYXRlcGlja2VyU3Vic2NyaXB0aW9uID0gdGhpcy5fZGF0ZXBpY2tlci5zZWxlY3RlZENoYW5nZWQuc3Vic2NyaWJlKChzZWxlY3RlZDogRCkgPT4ge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZDtcbiAgICAgICAgICB0aGlzLl9jdmFPbkNoYW5nZShzZWxlY3RlZCk7XG4gICAgICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgICAgICAgdGhpcy5kYXRlSW5wdXQuZW1pdChuZXcgTWF0RGF0ZXRpbWVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICAgICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNYXREYXRldGltZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2RhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9sb2NhbGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWx1ZUNoYW5nZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Rpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsaWRhdG9yT25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yID8gdGhpcy5fdmFsaWRhdG9yKGMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBlbGVtZW50IHRoYXQgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNvbm5lY3RlZCB0by5cbiAgICogQHJldHVybiBUaGUgZWxlbWVudCB0byBjb25uZWN0IHRoZSBwb3B1cCB0by5cbiAgICovXG4gIGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW4oKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1GaWVsZCA/IHRoaXMuX2Zvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgOiB0aGlzLl9lbGVtZW50UmVmO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3NvclxuICB3cml0ZVZhbHVlKHZhbHVlOiBEKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3NvclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2N2YU9uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cblxuICBfb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICB0aGlzLl9kYXRlcGlja2VyLm9wZW4oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgX29uSW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgIGxldCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIucGFyc2UodmFsdWUsIHRoaXMuZ2V0UGFyc2VGb3JtYXQoKSk7XG4gICAgdGhpcy5fbGFzdFZhbHVlVmFsaWQgPSAhZGF0ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5pc1ZhbGlkKGRhdGUpO1xuICAgIGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwoZGF0ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSBkYXRlO1xuICAgIHRoaXMuX2N2YU9uQ2hhbmdlKGRhdGUpO1xuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgdGhpcy5kYXRlSW5wdXQuZW1pdChuZXcgTWF0RGF0ZXRpbWVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xuICB9XG5cbiAgX29uQ2hhbmdlKCkge1xuICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNYXREYXRldGltZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBibHVyIGV2ZW50cyBvbiB0aGUgaW5wdXQuICovXG4gIF9vbkJsdXIoKSB7XG4gICAgLy8gUmVmb3JtYXQgdGhlIGlucHV0IG9ubHkgaWYgd2UgaGF2ZSBhIHZhbGlkIHZhbHVlLlxuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLl9mb3JtYXRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gICAvKiogRm9ybWF0cyBhIHZhbHVlIGFuZCBzZXRzIGl0IG9uIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICAgcHJpdmF0ZSBfZm9ybWF0VmFsdWUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9XG4gICAgICAgdmFsdWUgPyB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMuZ2V0RGlzcGxheUZvcm1hdCgpKSA6IFwiXCI7XG4gICB9XG59XG4iXX0=