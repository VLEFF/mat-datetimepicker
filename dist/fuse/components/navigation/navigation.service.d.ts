import { Observable, Subject } from 'rxjs';
import { FuseNavigationItem } from '../../types';
export declare class FuseNavigationService {
    onItemCollapsed: Subject<any>;
    onItemCollapseToggled: Subject<any>;
    private _onNavigationChanged;
    private _onNavigationRegistered;
    private _onNavigationUnregistered;
    private _onNavigationItemAdded;
    private _onNavigationItemUpdated;
    private _onNavigationItemRemoved;
    private _currentNavigationKey;
    private _registry;
    /**
     * Constructor
     */
    constructor();
    /**
     * Get onNavigationChanged
     *
     * @returns {Observable<any>}
     */
    readonly onNavigationChanged: Observable<any>;
    /**
     * Get onNavigationRegistered
     *
     * @returns {Observable<any>}
     */
    readonly onNavigationRegistered: Observable<any>;
    /**
     * Get onNavigationUnregistered
     *
     * @returns {Observable<any>}
     */
    readonly onNavigationUnregistered: Observable<any>;
    /**
     * Get onNavigationItemAdded
     *
     * @returns {Observable<any>}
     */
    readonly onNavigationItemAdded: Observable<any>;
    /**
     * Get onNavigationItemUpdated
     *
     * @returns {Observable<any>}
     */
    readonly onNavigationItemUpdated: Observable<any>;
    /**
     * Get onNavigationItemRemoved
     *
     * @returns {Observable<any>}
     */
    readonly onNavigationItemRemoved: Observable<any>;
    /**
     * Register the given navigation
     * with the given key
     *
     * @param key
     * @param navigation
     */
    register(key: any, navigation: any): void;
    /**
     * Unregister the navigation from the registry
     * @param key
     */
    unregister(key: any): void;
    /**
     * Get navigation from registry by key
     *
     * @param key
     * @returns {any}
     */
    getNavigation(key: any): any;
    /**
     * Get flattened navigation array
     *
     * @param navigation
     * @param flatNavigation
     * @returns {any[]}
     */
    getFlatNavigation(navigation: any, flatNavigation?: FuseNavigationItem[]): any;
    /**
     * Get the current navigation
     *
     * @returns {any}
     */
    getCurrentNavigation(): any;
    /**
     * Set the navigation with the key
     * as the current navigation
     *
     * @param key
     */
    setCurrentNavigation(key: any): void;
    /**
     * Get navigation item by id from the
     * current navigation
     *
     * @param id
     * @param {any} navigation
     * @returns {any | boolean}
     */
    getNavigationItem(id: any, navigation?: any): any | boolean;
    /**
     * Get the parent of the navigation item
     * with the id
     *
     * @param id
     * @param {any} navigation
     * @param parent
     */
    getNavigationItemParent(id: any, navigation?: any, parent?: any): any;
    /**
     * Add a navigation item to the specified location
     *
     * @param item
     * @param id
     */
    addNavigationItem(item: any, id: any): void;
    /**
     * Update navigation item with the given id
     *
     * @param id
     * @param properties
     */
    updateNavigationItem(id: any, properties: any): void;
    /**
     * Remove navigation item with the given id
     *
     * @param id
     */
    removeNavigationItem(id: any): void;
}
