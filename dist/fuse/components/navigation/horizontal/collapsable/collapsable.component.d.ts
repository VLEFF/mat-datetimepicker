import { OnDestroy, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../services/config.service';
export declare class FuseNavHorizontalCollapsableComponent implements OnInit, OnDestroy {
    private _fuseConfigService;
    fuseConfig: any;
    isOpen: boolean;
    classes: string;
    item: any;
    private _unsubscribeAll;
    constructor(_fuseConfigService: FuseConfigService);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Open
     */
    open(): void;
    /**
     * Close
     */
    close(): void;
}
