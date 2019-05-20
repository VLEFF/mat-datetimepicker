import { OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseMatSidenavHelperService } from '../fuse-mat-sidenav/fuse-mat-sidenav.service';
export declare class FuseMatSidenavHelperDirective implements OnInit, OnDestroy {
    private _fuseMatchMediaService;
    private _fuseMatSidenavHelperService;
    private _matSidenav;
    private _mediaObserver;
    isLockedOpen: boolean;
    fuseMatSidenavHelper: string;
    matIsLockedOpen: string;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    constructor(_fuseMatchMediaService: FuseMatchMediaService, _fuseMatSidenavHelperService: FuseMatSidenavHelperService, _matSidenav: MatSidenav, _mediaObserver: MediaObserver);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
}
export declare class FuseMatSidenavTogglerDirective {
    private _fuseMatSidenavHelperService;
    fuseMatSidenavToggler: string;
    /**
     * Constructor
     *
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     */
    constructor(_fuseMatSidenavHelperService: FuseMatSidenavHelperService);
    /**
     * On click
     */
    onClick(): void;
}
