import { OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfigService } from '../../services/config.service';
import { FuseNavigationService } from '../navigation/navigation.service';
import { FuseSidebarService } from '../sidebar/sidebar.service';
export declare class FuseThemeOptionsComponent implements OnInit, OnDestroy {
    private document;
    private _formBuilder;
    private _fuseConfigService;
    private _fuseNavigationService;
    private _fuseSidebarService;
    private _renderer;
    fuseConfig: any;
    form: FormGroup;
    barClosed: boolean;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FormBuilder} _formBuilder
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Renderer2} _renderer
     */
    constructor(document: any, _formBuilder: FormBuilder, _fuseConfigService: FuseConfigService, _fuseNavigationService: FuseNavigationService, _fuseSidebarService: FuseSidebarService, _renderer: Renderer2);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    private _resetFormValues;
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key: any): void;
}
