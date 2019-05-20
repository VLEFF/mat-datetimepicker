import { OnDestroy, OnInit } from '@angular/core';
export declare class FuseCountdownComponent implements OnInit, OnDestroy {
    eventDate: any;
    countdown: any;
    private _unsubscribeAll;
    /**
     * Constructor
     */
    constructor();
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Converts given seconds to a remaining time
     *
     * @param seconds
     * @private
     */
    private _secondsToRemaining;
}
