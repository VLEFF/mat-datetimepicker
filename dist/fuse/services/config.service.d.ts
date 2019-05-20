import { InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Observable } from 'rxjs';
export declare const FUSE_CONFIG: InjectionToken<{}>;
export declare class FuseConfigService {
    private _platform;
    private _router;
    private _config;
    private _configSubject;
    private readonly _defaultConfig;
    /**
     * Constructor
     *
     * @param {Platform} _platform
     * @param {Router} _router
     * @param _config
     */
    constructor(_platform: Platform, _router: Router, _config: any);
    /**
     * Set and get the config
     */
    config: any | Observable<any>;
    /**
     * Get default config
     *
     * @returns {any}
     */
    readonly defaultConfig: any;
    /**
     * Initialize
     *
     * @private
     */
    private _init;
    /**
     * Set config
     *
     * @param value
     * @param {{emitEvent: boolean}} opts
     */
    setConfig(value: any, opts?: {
        emitEvent: boolean;
    }): void;
    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    getConfig(): Observable<any>;
    /**
     * Reset to the default config
     */
    resetToDefaults(): void;
}
