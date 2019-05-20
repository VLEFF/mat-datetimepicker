import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseNavigationItem } from '../../../../types';
import { FuseNavigationService } from '../../navigation.service';
export declare class FuseNavVerticalCollapsableComponent implements OnInit, OnDestroy {
    private _changeDetectorRef;
    private _fuseNavigationService;
    private _router;
    item: FuseNavigationItem;
    classes: string;
    isOpen: boolean;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {Router} _router
     */
    constructor(_changeDetectorRef: ChangeDetectorRef, _fuseNavigationService: FuseNavigationService, _router: Router);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpen(ev: any): void;
    /**
     * Expand the collapsable navigation
     */
    expand(): void;
    /**
     * Collapse the collapsable navigation
     */
    collapse(): void;
    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    isChildrenOf(parent: any, item: any): boolean;
    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    isUrlInChildren(parent: any, url: any): boolean;
}
