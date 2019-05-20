import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FuseConfigService } from '../../services/config.service';
export declare class FuseSearchBarComponent implements OnInit, OnDestroy {
    private _fuseConfigService;
    collapsed: boolean;
    fuseConfig: any;
    input: EventEmitter<any>;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
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
     * Collapse
     */
    collapse(): void;
    /**
     * Expand
     */
    expand(): void;
    /**
     * Search
     *
     * @param event
     */
    search(event: any): void;
}
