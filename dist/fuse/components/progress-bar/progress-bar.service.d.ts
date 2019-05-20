import { Router } from '@angular/router';
import { Observable } from 'rxjs';
export declare class FuseProgressBarService {
    private _router;
    private _bufferValue;
    private _mode;
    private _value;
    private _visible;
    /**
     * Constructor
     *
     * @param {Router} _router
     */
    constructor(_router: Router);
    /**
     * Buffer value
     */
    readonly bufferValue: Observable<any>;
    setBufferValue(value: number): void;
    /**
     * Mode
     */
    readonly mode: Observable<any>;
    setMode(value: 'determinate' | 'indeterminate' | 'buffer' | 'query'): void;
    /**
     * Value
     */
    readonly value: Observable<any>;
    setValue(value: number): void;
    /**
     * Visible
     */
    readonly visible: Observable<any>;
    /**
     * Initialize
     *
     * @private
     */
    private _init;
    /**
     * Show the progress bar
     */
    show(): void;
    /**
     * Hide the progress bar
     */
    hide(): void;
}
