import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FuseNavigationItem } from '../../../../types';
import { FuseNavigationService } from '../../navigation.service';
export declare class FuseNavVerticalItemComponent implements OnInit, OnDestroy {
    private _changeDetectorRef;
    private _fuseNavigationService;
    classes: string;
    item: FuseNavigationItem;
    private _unsubscribeAll;
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(_changeDetectorRef: ChangeDetectorRef, _fuseNavigationService: FuseNavigationService);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
}
