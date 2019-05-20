import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseNavigationService } from '../navigation/navigation.service';
export declare class FuseShortcutsComponent implements OnInit, OnDestroy {
    private _cookieService;
    private _fuseMatchMediaService;
    private _fuseNavigationService;
    private _mediaObserver;
    private _renderer;
    shortcutItems: any[];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching: boolean;
    mobileShortcutsPanelActive: boolean;
    navigation: any;
    searchInputField: any;
    shortcutsEl: ElementRef;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {CookieService} _cookieService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    constructor(_cookieService: CookieService, _fuseMatchMediaService: FuseMatchMediaService, _fuseNavigationService: FuseNavigationService, _mediaObserver: MediaObserver, _renderer: Renderer2);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Search
     *
     * @param event
     */
    search(event: any): void;
    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    toggleShortcut(event: any, itemToToggle: any): void;
    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    isInShortcuts(navigationItem: any): any;
    /**
     * On menu open
     */
    onMenuOpen(): void;
    /**
     * Show mobile shortcuts
     */
    showMobileShortcutsPanel(): void;
    /**
     * Hide mobile shortcuts
     */
    hideMobileShortcutsPanel(): void;
}
