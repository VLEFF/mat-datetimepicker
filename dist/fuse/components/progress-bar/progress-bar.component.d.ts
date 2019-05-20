import { OnDestroy, OnInit } from '@angular/core';
import { FuseProgressBarService } from './progress-bar.service';
export declare class FuseProgressBarComponent implements OnInit, OnDestroy {
    private _fuseProgressBarService;
    bufferValue: number;
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value: number;
    visible: boolean;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {FuseProgressBarService} _fuseProgressBarService
     */
    constructor(_fuseProgressBarService: FuseProgressBarService);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
}
