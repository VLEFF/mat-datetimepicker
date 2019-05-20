import { FuseSidebarComponent } from './sidebar.component';
export declare class FuseSidebarService {
    private _registry;
    /**
     * Constructor
     */
    constructor();
    /**
     * Add the sidebar to the registry
     *
     * @param key
     * @param sidebar
     */
    register(key: any, sidebar: any): void;
    /**
     * Remove the sidebar from the registry
     *
     * @param key
     */
    unregister(key: any): void;
    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns {FuseSidebarComponent}
     */
    getSidebar(key: any): FuseSidebarComponent;
}
