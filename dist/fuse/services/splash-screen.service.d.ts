import { AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { Router } from '@angular/router';
export declare class FuseSplashScreenService {
    private _animationBuilder;
    private _document;
    private _router;
    splashScreenEl: any;
    player: AnimationPlayer;
    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param _document
     * @param {Router} _router
     */
    constructor(_animationBuilder: AnimationBuilder, _document: any, _router: Router);
    /**
     * Initialize
     *
     * @private
     */
    private _init;
    /**
     * Show the splash screen
     */
    show(): void;
    /**
     * Hide the splash screen
     */
    hide(): void;
}
