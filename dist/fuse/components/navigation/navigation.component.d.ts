import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FuseNavigationService } from './navigation.service';
export declare class FuseNavigationComponent implements OnInit {
    private _changeDetectorRef;
    private _fuseNavigationService;
    layout: string;
    navigation: any;
    private _unsubscribeAll;
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
}
