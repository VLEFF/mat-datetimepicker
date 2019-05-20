import { MatSidenav } from '@angular/material';
export declare class FuseMatSidenavHelperService {
    sidenavInstances: MatSidenav[];
    /**
     * Constructor
     */
    constructor();
    /**
     * Set sidenav
     *
     * @param id
     * @param instance
     */
    setSidenav(id: any, instance: any): void;
    /**
     * Get sidenav
     *
     * @param id
     * @returns {any}
     */
    getSidenav(id: any): any;
}
