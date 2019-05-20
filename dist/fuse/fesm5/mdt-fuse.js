import { MediaObserver as MediaObserver$1 } from '@angular/flex-layout/core';
import { Platform } from '@angular/cdk/platform';
import PerfectScrollbar from 'perfect-scrollbar';
import * as moment_ from 'moment';
import { HttpClient } from '@angular/common/http';
import { highlight, languages } from 'prismjs/prism';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import { merge, cloneDeep, isEqual, debounce } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { MediaObserver, FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenav, MatDialogRef, MatButtonModule, MatDialogModule, MatDividerModule, MatListModule, MatIconModule, MatMenuModule, MatTooltipModule, MatRippleModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, Subject, interval, merge as merge$1 } from 'rxjs';
import { __values, __spread, __assign } from 'tslib';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { sequence, trigger, animate, style, group, query, transition, animateChild, state, animation, useAnimation, stagger, AnimationBuilder } from '@angular/animations';
import { ResolveEnd, Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RouterModule } from '@angular/router';
import { filter, debounceTime, distinctUntilChanged, takeUntil, map, take } from 'rxjs/operators';
import { Inject, Injectable, InjectionToken, NgModule, Directive, ElementRef, TemplateRef, ViewContainerRef, Pipe, Component, HostBinding, Input, ChangeDetectorRef, Renderer2, HostListener, ViewEncapsulation, ContentChild, ChangeDetectionStrategy, EventEmitter, Output, ContentChildren, forwardRef, ViewChild, Optional, SkipSelf, defineInjectable, inject } from '@angular/core';

// Create the injection token for the custom settings
var FUSE_CONFIG = new InjectionToken('fuseCustomConfig');
var FuseConfigService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Platform} _platform
     * @param {Router} _router
     * @param _config
     */
    function FuseConfigService(_platform, _router, _config) {
        this._platform = _platform;
        this._router = _router;
        this._config = _config;
        // Set the default config from the user provided config (from forRoot)
        this._defaultConfig = _config;
        // Initialize the service
        this._init();
    }
    Object.defineProperty(FuseConfigService.prototype, "config", {
        get: function () {
            return this._configSubject.asObservable();
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Set and get the config
         */
        set: function (value) {
            // Get the value from the behavior subject
            var config = this._configSubject.getValue();
            // Merge the new config
            config = merge({}, config, value);
            // Notify the observers
            this._configSubject.next(config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseConfigService.prototype, "defaultConfig", {
        /**
         * Get default config
         *
         * @returns {any}
         */
        get: function () {
            return this._defaultConfig;
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FuseConfigService.prototype._init = function () {
        var _this = this;
        /**
         * Disable custom scrollbars if browser is mobile
         */
        if (this._platform.ANDROID || this._platform.IOS) {
            this._defaultConfig.customScrollbars = false;
        }
        // Set the config from the default config
        this._configSubject = new BehaviorSubject(cloneDeep(this._defaultConfig));
        // Reload the default layout config on every RoutesRecognized event
        // if the current layout config is different from the default one
        this._router.events
            .pipe(filter(function (event) { return event instanceof ResolveEnd; }))
            .subscribe(function () {
            if (!isEqual(_this._configSubject.getValue().layout, _this._defaultConfig.layout)) {
                // Clone the current config
                var config = cloneDeep(_this._configSubject.getValue());
                // Reset the layout from the default config
                config.layout = cloneDeep(_this._defaultConfig.layout);
                // Set the config
                _this._configSubject.next(config);
            }
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set config
     *
     * @param value
     * @param {{emitEvent: boolean}} opts
     */
    FuseConfigService.prototype.setConfig = function (value, opts) {
        if (opts === void 0) { opts = { emitEvent: true }; }
        // Get the value from the behavior subject
        var config = this._configSubject.getValue();
        // Merge the new config
        config = merge({}, config, value);
        // If emitEvent option is true...
        if (opts.emitEvent === true) {
            // Notify the observers
            this._configSubject.next(config);
        }
    };
    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    FuseConfigService.prototype.getConfig = function () {
        return this._configSubject.asObservable();
    };
    /**
     * Reset to the default config
     */
    FuseConfigService.prototype.resetToDefaults = function () {
        // Set the config from the default config
        this._configSubject.next(cloneDeep(this._defaultConfig));
    };
    FuseConfigService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseConfigService.ctorParameters = function () { return [
        { type: Platform },
        { type: Router },
        { type: undefined, decorators: [{ type: Inject, args: [FUSE_CONFIG,] }] }
    ]; };
    FuseConfigService.ngInjectableDef = defineInjectable({ factory: function FuseConfigService_Factory() { return new FuseConfigService(inject(Platform), inject(Router), inject(FUSE_CONFIG)); }, token: FuseConfigService, providedIn: "root" });
    return FuseConfigService;
}());

var FuseModule = /** @class */ (function () {
    function FuseModule(parentModule) {
        if (parentModule) {
            throw new Error('FuseModule is already loaded. Import it in the AppModule only!');
        }
    }
    FuseModule.forRoot = function (config) {
        return {
            ngModule: FuseModule,
            providers: [
                {
                    provide: FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    };
    FuseModule.decorators = [
        { type: NgModule }
    ];
    /** @nocollapse */
    FuseModule.ctorParameters = function () { return [
        { type: FuseModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    return FuseModule;
}());

var FuseIfOnDomDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {TemplateRef<any>} _templateRef
     * @param {ViewContainerRef} _viewContainerRef
     */
    function FuseIfOnDomDirective(_elementRef, _templateRef, _viewContainerRef) {
        this._elementRef = _elementRef;
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
        // Set the defaults
        this.isCreated = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After content checked
     */
    FuseIfOnDomDirective.prototype.ngAfterContentChecked = function () {
        var _this = this;
        if (document.body.contains(this._elementRef.nativeElement) && !this.isCreated) {
            setTimeout(function () {
                _this._viewContainerRef.createEmbeddedView(_this._templateRef);
            }, 300);
            this.isCreated = true;
        }
        else if (this.isCreated && !document.body.contains(this._elementRef.nativeElement)) {
            this._viewContainerRef.clear();
            this.isCreated = false;
        }
    };
    FuseIfOnDomDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fuseIfOnDom]'
                },] }
    ];
    /** @nocollapse */
    FuseIfOnDomDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    return FuseIfOnDomDirective;
}());

var FuseMatchMediaService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {MediaObserver} _mediaObserver
     */
    function FuseMatchMediaService(_mediaObserver) {
        this._mediaObserver = _mediaObserver;
        this.onMediaChange = new BehaviorSubject('');
        // Set the defaults
        this.activeMediaQuery = '';
        // Initialize
        this._init();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FuseMatchMediaService.prototype._init = function () {
        var _this = this;
        this._mediaObserver.media$
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(function (change) {
            if (_this.activeMediaQuery !== change.mqAlias) {
                _this.activeMediaQuery = change.mqAlias;
                _this.onMediaChange.next(change.mqAlias);
            }
        });
    };
    FuseMatchMediaService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseMatchMediaService.ctorParameters = function () { return [
        { type: MediaObserver }
    ]; };
    FuseMatchMediaService.ngInjectableDef = defineInjectable({ factory: function FuseMatchMediaService_Factory() { return new FuseMatchMediaService(inject(MediaObserver$1)); }, token: FuseMatchMediaService, providedIn: "root" });
    return FuseMatchMediaService;
}());

var FuseInnerScrollDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {FuseMatchMediaService} _fuseMediaMatchService
     * @param {Renderer2} _renderer
     */
    function FuseInnerScrollDirective(_elementRef, _fuseMediaMatchService, _renderer) {
        this._elementRef = _elementRef;
        this._fuseMediaMatchService = _fuseMediaMatchService;
        this._renderer = _renderer;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseInnerScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Get the parent
        this._parent = this._renderer.parentNode(this._elementRef.nativeElement);
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Get the grand parent
        this._grandParent = this._renderer.parentNode(this._parent);
        // Register to the media query changes
        this._fuseMediaMatchService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (alias) {
            if (alias === 'xs') {
                _this._removeClass();
            }
            else {
                _this._addClass();
            }
        });
    };
    /**
     * On destroy
     */
    FuseInnerScrollDirective.prototype.ngOnDestroy = function () {
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Remove the class
        this._removeClass();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Add the class name
     *
     * @private
     */
    FuseInnerScrollDirective.prototype._addClass = function () {
        // Add the inner-scroll class
        this._renderer.addClass(this._grandParent, 'inner-scroll');
    };
    /**
     * Remove the class name
     * @private
     */
    FuseInnerScrollDirective.prototype._removeClass = function () {
        // Remove the inner-scroll class
        this._renderer.removeClass(this._grandParent, 'inner-scroll');
    };
    FuseInnerScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '.inner-scroll'
                },] }
    ];
    /** @nocollapse */
    FuseInnerScrollDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FuseMatchMediaService },
        { type: Renderer2 }
    ]; };
    return FuseInnerScrollDirective;
}());

var FusePerfectScrollbarDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {Platform} _platform
     * @param {Router} _router
     */
    function FusePerfectScrollbarDirective(elementRef, _fuseConfigService, _platform, _router) {
        this.elementRef = elementRef;
        this._fuseConfigService = _fuseConfigService;
        this._platform = _platform;
        this._router = _router;
        // Set the defaults
        this.isInitialized = false;
        this.isMobile = false;
        // Set the private defaults
        this._enabled = false;
        this._debouncedUpdate = debounce(this.update, 150);
        this._options = {
            updateOnRouteChange: false
        };
        this._unsubscribeAll = new Subject();
    }
    Object.defineProperty(FusePerfectScrollbarDirective.prototype, "fusePerfectScrollbarOptions", {
        get: function () {
            // Return the options
            return this._options;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Perfect Scrollbar options
         *
         * @param value
         */
        set: function (value) {
            // Merge the options
            this._options = merge({}, this._options, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FusePerfectScrollbarDirective.prototype, "enabled", {
        get: function () {
            // Return the enabled status
            return this._enabled;
        },
        /**
         * Is enabled
         *
         * @param {boolean | ""} value
         */
        set: function (value) {
            // If nothing is provided with the directive (empty string),
            // we will take that as a true
            if (value === '') {
                value = true;
            }
            // Return, if both values are the same
            if (this.enabled === value) {
                return;
            }
            // Store the value
            this._enabled = value;
            // If enabled...
            if (this.enabled) {
                // Init the directive
                this._init();
            }
            else {
                // Otherwise destroy it
                this._destroy();
            }
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After view init
     */
    FusePerfectScrollbarDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Check if scrollbars enabled or not from the main config
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (settings) {
            _this.enabled = settings.customScrollbars;
        });
        // Scroll to the top on every route change
        if (this.fusePerfectScrollbarOptions.updateOnRouteChange) {
            this._router.events
                .pipe(takeUntil(this._unsubscribeAll), filter(function (event) { return event instanceof NavigationEnd; }))
                .subscribe(function () {
                setTimeout(function () {
                    _this.scrollToTop();
                    _this.update();
                }, 0);
            });
        }
    };
    /**
     * On destroy
     */
    FusePerfectScrollbarDirective.prototype.ngOnDestroy = function () {
        this._destroy();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FusePerfectScrollbarDirective.prototype._init = function () {
        // Return, if already initialized
        if (this.isInitialized) {
            return;
        }
        // Check if is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.isMobile = true;
        }
        // Return if it's mobile
        if (this.isMobile) {
            // Return...
            return;
        }
        // Set as initialized
        this.isInitialized = true;
        // Initialize the perfect-scrollbar
        this.ps = new PerfectScrollbar(this.elementRef.nativeElement, __assign({}, this.fusePerfectScrollbarOptions));
        // Unbind 'keydown' events of PerfectScrollbar since it causes an extremely
        // high CPU usage on Angular Material inputs.
        // Loop through all the event elements of this PerfectScrollbar instance
        this.ps.event.eventElements.forEach(function (eventElement) {
            // If we hit to the element with a 'keydown' event...
            if (typeof eventElement.handlers['keydown'] !== 'undefined') {
                // Unbind it
                eventElement.element.removeEventListener('keydown', eventElement.handlers['keydown'][0]);
            }
        });
    };
    /**
     * Destroy
     *
     * @private
     */
    FusePerfectScrollbarDirective.prototype._destroy = function () {
        if (!this.isInitialized || !this.ps) {
            return;
        }
        // Destroy the perfect-scrollbar
        this.ps.destroy();
        // Clean up
        this.ps = null;
        this.isInitialized = false;
    };
    /**
     * Update scrollbars on window resize
     *
     * @private
     */
    FusePerfectScrollbarDirective.prototype._updateOnResize = function () {
        this._debouncedUpdate();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Document click
     *
     * @param {Event} event
     */
    FusePerfectScrollbarDirective.prototype.documentClick = function (event) {
        if (!this.isInitialized || !this.ps) {
            return;
        }
        // Update the scrollbar on document click..
        // This isn't the most elegant solution but there is no other way
        // of knowing when the contents of the scrollable container changes.
        // Therefore, we update scrollbars on every document click.
        this.ps.update();
    };
    /**
     * Update the scrollbar
     */
    FusePerfectScrollbarDirective.prototype.update = function () {
        if (!this.isInitialized) {
            return;
        }
        // Update the perfect-scrollbar
        this.ps.update();
    };
    /**
     * Destroy the scrollbar
     */
    FusePerfectScrollbarDirective.prototype.destroy = function () {
        this.ngOnDestroy();
    };
    /**
     * Scroll to X
     *
     * @param {number} x
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToX = function (x, speed) {
        this.animateScrolling('scrollLeft', x, speed);
    };
    /**
     * Scroll to Y
     *
     * @param {number} y
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToY = function (y, speed) {
        this.animateScrolling('scrollTop', y, speed);
    };
    /**
     * Scroll to top
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToTop = function (offset, speed) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    };
    /**
     * Scroll to left
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToLeft = function (offset, speed) {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    };
    /**
     * Scroll to right
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToRight = function (offset, speed) {
        var width = this.elementRef.nativeElement.scrollWidth;
        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    };
    /**
     * Scroll to bottom
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToBottom = function (offset, speed) {
        var height = this.elementRef.nativeElement.scrollHeight;
        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    };
    /**
     * Animate scrolling
     *
     * @param {string} target
     * @param {number} value
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.animateScrolling = function (target, value, speed) {
        var _this = this;
        if (!speed) {
            this.elementRef.nativeElement[target] = value;
            // PS has weird event sending order, this is a workaround for that
            this.update();
            this.update();
        }
        else if (value !== this.elementRef.nativeElement[target]) {
            var newValue_1 = 0;
            var scrollCount_1 = 0;
            var oldTimestamp_1 = performance.now();
            var oldValue_1 = this.elementRef.nativeElement[target];
            var cosParameter_1 = (oldValue_1 - value) / 2;
            var step_1 = function (newTimestamp) {
                scrollCount_1 += Math.PI / (speed / (newTimestamp - oldTimestamp_1));
                newValue_1 = Math.round(value + cosParameter_1 + cosParameter_1 * Math.cos(scrollCount_1));
                // Only continue animation if scroll position has not changed
                if (_this.elementRef.nativeElement[target] === oldValue_1) {
                    if (scrollCount_1 >= Math.PI) {
                        _this.elementRef.nativeElement[target] = value;
                        // PS has weird event sending order, this is a workaround for that
                        _this.update();
                        _this.update();
                    }
                    else {
                        _this.elementRef.nativeElement[target] = oldValue_1 = newValue_1;
                        oldTimestamp_1 = newTimestamp;
                        window.requestAnimationFrame(step_1);
                    }
                }
            };
            window.requestAnimationFrame(step_1);
        }
    };
    FusePerfectScrollbarDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fusePerfectScrollbar]'
                },] }
    ];
    /** @nocollapse */
    FusePerfectScrollbarDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FuseConfigService },
        { type: Platform },
        { type: Router }
    ]; };
    FusePerfectScrollbarDirective.propDecorators = {
        fusePerfectScrollbarOptions: [{ type: Input }],
        enabled: [{ type: Input, args: ['fusePerfectScrollbar',] }],
        _updateOnResize: [{ type: HostListener, args: ['window:resize',] }],
        documentClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return FusePerfectScrollbarDirective;
}());

var FuseMatSidenavHelperService = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseMatSidenavHelperService() {
        this.sidenavInstances = [];
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set sidenav
     *
     * @param id
     * @param instance
     */
    FuseMatSidenavHelperService.prototype.setSidenav = function (id, instance) {
        this.sidenavInstances[id] = instance;
    };
    /**
     * Get sidenav
     *
     * @param id
     * @returns {any}
     */
    FuseMatSidenavHelperService.prototype.getSidenav = function (id) {
        return this.sidenavInstances[id];
    };
    FuseMatSidenavHelperService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseMatSidenavHelperService.ctorParameters = function () { return []; };
    FuseMatSidenavHelperService.ngInjectableDef = defineInjectable({ factory: function FuseMatSidenavHelperService_Factory() { return new FuseMatSidenavHelperService(); }, token: FuseMatSidenavHelperService, providedIn: "root" });
    return FuseMatSidenavHelperService;
}());

var FuseMatSidenavHelperDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    function FuseMatSidenavHelperDirective(_fuseMatchMediaService, _fuseMatSidenavHelperService, _matSidenav, _mediaObserver) {
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseMatSidenavHelperService = _fuseMatSidenavHelperService;
        this._matSidenav = _matSidenav;
        this._mediaObserver = _mediaObserver;
        // Set the defaults
        this.isLockedOpen = true;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseMatSidenavHelperDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Register the sidenav to the service
        this._fuseMatSidenavHelperService.setSidenav(this.fuseMatSidenavHelper, this._matSidenav);
        if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            if (_this._mediaObserver.isActive(_this.matIsLockedOpen)) {
                _this.isLockedOpen = true;
                _this._matSidenav.mode = 'side';
                _this._matSidenav.toggle(true);
            }
            else {
                _this.isLockedOpen = false;
                _this._matSidenav.mode = 'over';
                _this._matSidenav.toggle(false);
            }
        });
    };
    /**
     * On destroy
     */
    FuseMatSidenavHelperDirective.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    FuseMatSidenavHelperDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fuseMatSidenavHelper]'
                },] }
    ];
    /** @nocollapse */
    FuseMatSidenavHelperDirective.ctorParameters = function () { return [
        { type: FuseMatchMediaService },
        { type: FuseMatSidenavHelperService },
        { type: MatSidenav },
        { type: MediaObserver }
    ]; };
    FuseMatSidenavHelperDirective.propDecorators = {
        isLockedOpen: [{ type: HostBinding, args: ['class.mat-is-locked-open',] }],
        fuseMatSidenavHelper: [{ type: Input }],
        matIsLockedOpen: [{ type: Input }]
    };
    return FuseMatSidenavHelperDirective;
}());
var FuseMatSidenavTogglerDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     */
    function FuseMatSidenavTogglerDirective(_fuseMatSidenavHelperService) {
        this._fuseMatSidenavHelperService = _fuseMatSidenavHelperService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * On click
     */
    FuseMatSidenavTogglerDirective.prototype.onClick = function () {
        this._fuseMatSidenavHelperService.getSidenav(this.fuseMatSidenavToggler).toggle();
    };
    FuseMatSidenavTogglerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fuseMatSidenavToggler]'
                },] }
    ];
    /** @nocollapse */
    FuseMatSidenavTogglerDirective.ctorParameters = function () { return [
        { type: FuseMatSidenavHelperService }
    ]; };
    FuseMatSidenavTogglerDirective.propDecorators = {
        fuseMatSidenavToggler: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return FuseMatSidenavTogglerDirective;
}());

var FuseDirectivesModule = /** @class */ (function () {
    function FuseDirectivesModule() {
    }
    FuseDirectivesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseIfOnDomDirective,
                        FuseInnerScrollDirective,
                        FuseMatSidenavHelperDirective,
                        FuseMatSidenavTogglerDirective,
                        FusePerfectScrollbarDirective
                    ],
                    imports: [],
                    exports: [
                        FuseIfOnDomDirective,
                        FuseInnerScrollDirective,
                        FuseMatSidenavHelperDirective,
                        FuseMatSidenavTogglerDirective,
                        FusePerfectScrollbarDirective
                    ]
                },] }
    ];
    return FuseDirectivesModule;
}());

var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    /**
     * Transform
     *
     * @param value
     * @param {string[]} args
     * @returns {any}
     */
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = []; }
        var keys = [];
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                keys.push({
                    key: key,
                    value: value[key]
                });
            }
        }
        return keys;
    };
    KeysPipe.decorators = [
        { type: Pipe, args: [{ name: 'keys' },] }
    ];
    return KeysPipe;
}());

var GetByIdPipe = /** @class */ (function () {
    function GetByIdPipe() {
    }
    /**
     * Transform
     *
     * @param {any[]} value
     * @param {number} id
     * @param {string} property
     * @returns {any}
     */
    GetByIdPipe.prototype.transform = function (value, id, property) {
        var foundItem = value.find(function (item) {
            if (item.id !== undefined) {
                return item.id === id;
            }
            return false;
        });
        if (foundItem) {
            return foundItem[property];
        }
    };
    GetByIdPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'getById',
                    pure: false
                },] }
    ];
    return GetByIdPipe;
}());

var HtmlToPlaintextPipe = /** @class */ (function () {
    function HtmlToPlaintextPipe() {
    }
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    HtmlToPlaintextPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = []; }
        return value ? String(value).replace(/<[^>]+>/gm, '') : '';
    };
    HtmlToPlaintextPipe.decorators = [
        { type: Pipe, args: [{ name: 'htmlToPlaintext' },] }
    ];
    return HtmlToPlaintextPipe;
}());

var FuseUtils = /** @class */ (function () {
    function FuseUtils() {
    }
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    FuseUtils.filterArrayByString = function (mainArr, searchText) {
        var _this = this;
        if (searchText === '') {
            return mainArr;
        }
        searchText = searchText.toLowerCase();
        return mainArr.filter(function (itemObj) {
            return _this.searchInObj(itemObj, searchText);
        });
    };
    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    FuseUtils.searchInObj = function (itemObj, searchText) {
        for (var prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }
            var value = itemObj[prop];
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }
            else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }
            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    };
    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    FuseUtils.searchInArray = function (arr, searchText) {
        var e_1, _a;
        try {
            for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                var value = arr_1_1.value;
                if (typeof value === 'string') {
                    if (this.searchInString(value, searchText)) {
                        return true;
                    }
                }
                if (typeof value === 'object') {
                    if (this.searchInObj(value, searchText)) {
                        return true;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    FuseUtils.searchInString = function (value, searchText) {
        return value.toLowerCase().includes(searchText);
    };
    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    FuseUtils.generateGUID = function () {
        function S4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return S4() + S4();
    };
    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    FuseUtils.toggleInArray = function (item, array) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
        else {
            array.splice(array.indexOf(item), 1);
        }
    };
    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    FuseUtils.handleize = function (text) {
        return text.toString().toLowerCase();
    };
    return FuseUtils;
}());

var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    /**
     * Transform
     *
     * @param {any[]} mainArr
     * @param {string} searchText
     * @param {string} property
     * @returns {any}
     */
    FilterPipe.prototype.transform = function (mainArr, searchText, property) {
        return FuseUtils.filterArrayByString(mainArr, searchText);
    };
    FilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'filter' },] }
    ];
    return FilterPipe;
}());

var CamelCaseToDashPipe = /** @class */ (function () {
    function CamelCaseToDashPipe() {
    }
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    CamelCaseToDashPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = []; }
        return value ? String(value).replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); }) : '';
    };
    CamelCaseToDashPipe.decorators = [
        { type: Pipe, args: [{ name: 'camelCaseToDash' },] }
    ];
    return CamelCaseToDashPipe;
}());

var FusePipesModule = /** @class */ (function () {
    function FusePipesModule() {
    }
    FusePipesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        KeysPipe,
                        GetByIdPipe,
                        HtmlToPlaintextPipe,
                        FilterPipe,
                        CamelCaseToDashPipe
                    ],
                    imports: [],
                    exports: [
                        KeysPipe,
                        GetByIdPipe,
                        HtmlToPlaintextPipe,
                        FilterPipe,
                        CamelCaseToDashPipe
                    ]
                },] }
    ];
    return FusePipesModule;
}());

var FuseSharedModule = /** @class */ (function () {
    function FuseSharedModule() {
    }
    FuseSharedModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        FuseDirectivesModule,
                        FusePipesModule
                    ],
                    exports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        FuseDirectivesModule,
                        FusePipesModule
                    ]
                },] }
    ];
    return FuseSharedModule;
}());

var customAnimation = animation([
    style({
        opacity: '{{opacity}}',
        transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
], {
    params: {
        duration: '200ms',
        delay: '0ms',
        opacity: '0',
        scale: '1',
        x: '0',
        y: '0',
        z: '0'
    }
});
var fuseAnimations = [
    trigger('animate', [transition('void => *', [useAnimation(customAnimation)])]),
    trigger('animateStagger', [
        state('50', style('*')),
        state('100', style('*')),
        state('200', style('*')),
        transition('void => 50', query('@*', [
            stagger('50ms', [
                animateChild()
            ])
        ], { optional: true })),
        transition('void => 100', query('@*', [
            stagger('100ms', [
                animateChild()
            ])
        ], { optional: true })),
        transition('void => 200', query('@*', [
            stagger('200ms', [
                animateChild()
            ])
        ], { optional: true }))
    ]),
    trigger('fadeInOut', [
        state('0', style({
            display: 'none',
            opacity: 0
        })),
        state('1', style({
            display: 'block',
            opacity: 1
        })),
        transition('1 => 0', animate('300ms ease-out')),
        transition('0 => 1', animate('300ms ease-in'))
    ]),
    trigger('slideInOut', [
        state('0', style({
            height: '0px',
            display: 'none'
        })),
        state('1', style({
            height: '*',
            display: 'block'
        })),
        transition('1 => 0', animate('300ms ease-out')),
        transition('0 => 1', animate('300ms ease-in'))
    ]),
    trigger('slideIn', [
        transition('void => left', [
            style({
                transform: 'translateX(100%)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(0)'
            }))
        ]),
        transition('left => void', [
            style({
                transform: 'translateX(0)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(-100%)'
            }))
        ]),
        transition('void => right', [
            style({
                transform: 'translateX(-100%)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(0)'
            }))
        ]),
        transition('right => void', [
            style({
                transform: 'translateX(0)'
            }),
            animate('300ms ease-in', style({
                transform: 'translateX(100%)'
            }))
        ]),
    ]),
    trigger('slideInLeft', [
        state('void', style({
            transform: 'translateX(-100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateX(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('slideInRight', [
        state('void', style({
            transform: 'translateX(100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateX(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('slideInTop', [
        state('void', style({
            transform: 'translateY(-100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateY(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('slideInBottom', [
        state('void', style({
            transform: 'translateY(100%)',
            display: 'none'
        })),
        state('*', style({
            transform: 'translateY(0)',
            display: 'flex'
        })),
        transition('void => *', animate('300ms')),
        transition('* => void', animate('300ms'))
    ]),
    trigger('expandCollapse', [
        state('void', style({
            height: '0px'
        })),
        state('*', style({
            height: '*'
        })),
        transition('void => *', animate('300ms ease-out')),
        transition('* => void', animate('300ms ease-in'))
    ]),
    // -----------------------------------------------------------------------------------------------------
    // @ Router animations
    // -----------------------------------------------------------------------------------------------------
    trigger('routerTransitionLeft', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateX(100%)',
                    opacity: 0
                })
            ], { optional: true }),
            sequence([
                group([
                    query('content > :leave', [
                        style({
                            transform: 'translateX(0)',
                            opacity: 1
                        }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(-100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    query('content > :enter', [
                        style({ transform: 'translateX(100%)' }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                query('content > :leave', animateChild(), { optional: true }),
                query('content > :enter', animateChild(), { optional: true })
            ])
        ])
    ]),
    trigger('routerTransitionRight', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateX(-100%)',
                    opacity: 0
                })
            ], { optional: true }),
            sequence([
                group([
                    query('content > :leave', [
                        style({
                            transform: 'translateX(0)',
                            opacity: 1
                        }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    query('content > :enter', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateX(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                query('content > :leave', animateChild(), { optional: true }),
                query('content > :enter', animateChild(), { optional: true })
            ])
        ])
    ]),
    trigger('routerTransitionUp', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateY(100%)',
                    opacity: 0
                })
            ], { optional: true }),
            group([
                query('content > :leave', [
                    style({
                        transform: 'translateY(0)',
                        opacity: 1
                    }),
                    animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                        transform: 'translateY(-100%)',
                        opacity: 0
                    }))
                ], { optional: true }),
                query('content > :enter', [
                    style({ transform: 'translateY(100%)' }),
                    animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                        transform: 'translateY(0%)',
                        opacity: 1
                    }))
                ], { optional: true })
            ]),
            query('content > :leave', animateChild(), { optional: true }),
            query('content > :enter', animateChild(), { optional: true })
        ])
    ]),
    trigger('routerTransitionDown', [
        transition('* => *', [
            query('content > :enter, content > :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    transform: 'translateY(-100%)',
                    opacity: 0
                })
            ], { optional: true }),
            sequence([
                group([
                    query('content > :leave', [
                        style({
                            transform: 'translateY(0)',
                            opacity: 1
                        }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateY(100%)',
                            opacity: 0
                        }))
                    ], { optional: true }),
                    query('content > :enter', [
                        style({ transform: 'translateY(-100%)' }),
                        animate('600ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                            transform: 'translateY(0%)',
                            opacity: 1
                        }))
                    ], { optional: true })
                ]),
                query('content > :leave', animateChild(), { optional: true }),
                query('content > :enter', animateChild(), { optional: true })
            ])
        ])
    ]),
    trigger('routerTransitionFade', [
        transition('* => *', group([
            query('content > :enter, content > :leave ', [
                style({
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                })
            ], { optional: true }),
            query('content > :enter', [
                style({
                    opacity: 0
                })
            ], { optional: true }),
            query('content > :leave', [
                style({
                    opacity: 1
                }),
                animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    opacity: 0
                }))
            ], { optional: true }),
            query('content > :enter', [
                style({
                    opacity: 0
                }),
                animate('300ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    opacity: 1
                }))
            ], { optional: true }),
            query('content > :enter', animateChild(), { optional: true }),
            query('content > :leave', animateChild(), { optional: true })
        ]))
    ])
];

var FuseConfirmDialogComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
    function FuseConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    FuseConfirmDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-confirm-dialog',
                    template: "<h1 matDialogTitle>Confirm</h1>\n<div mat-dialog-content>{{confirmMessage}}</div>\n<div mat-dialog-actions class=\"pt-24\">\n    <button mat-raised-button class=\"mat-accent mr-16\" (click)=\"dialogRef.close(true)\">Confirm</button>\n    <button mat-button (click)=\"dialogRef.close(false)\">Cancel</button>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseConfirmDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return FuseConfirmDialogComponent;
}());

var FuseConfirmDialogModule = /** @class */ (function () {
    function FuseConfirmDialogModule() {
    }
    FuseConfirmDialogModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseConfirmDialogComponent
                    ],
                    imports: [
                        MatDialogModule,
                        MatButtonModule
                    ],
                    entryComponents: [
                        FuseConfirmDialogComponent
                    ],
                },] }
    ];
    return FuseConfirmDialogModule;
}());

var moment = moment_;
var FuseCountdownComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseCountdownComponent() {
        // Set the defaults
        this.countdown = {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        };
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseCountdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currDate = moment();
        var eventDate = moment(this.eventDate);
        // Get the difference in between the current date and event date in seconds
        var diff = eventDate.diff(currDate, 'seconds');
        // Calculate the remaining time for the first time so there will be no
        // delay on the countdown
        this.countdown = this._secondsToRemaining(diff);
        // Create a subscribable interval
        var countDown = interval(1000)
            .pipe(map(function (value) {
            return diff = diff - 1;
        }), map(function (value) {
            return _this._secondsToRemaining(value);
        }));
        // Subscribe to the countdown interval
        countDown
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            _this.countdown = value;
        });
    };
    /**
     * On destroy
     */
    FuseCountdownComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Converts given seconds to a remaining time
     *
     * @param seconds
     * @private
     */
    FuseCountdownComponent.prototype._secondsToRemaining = function (seconds) {
        var timeLeft = moment.duration(seconds, 'seconds');
        return {
            days: timeLeft.asDays().toFixed(0),
            hours: timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
        };
    };
    FuseCountdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-countdown',
                    template: "<div class=\"fuse-countdown\">\n\n    <div class=\"time days\">\n        <div class=\"value\">\n            {{countdown.days}}\n        </div>\n        <div class=\"title\">\n            days\n        </div>\n    </div>\n\n    <div class=\"time hours\">\n        <div class=\"value\">\n            {{countdown.hours}}\n        </div>\n        <div class=\"title\">\n            hours\n        </div>\n    </div>\n\n    <div class=\"time minutes\">\n        <div class=\"value\">\n            {{countdown.minutes}}\n        </div>\n        <div class=\"title\">\n            minutes\n        </div>\n    </div>\n\n    <div class=\"time seconds\">\n        <div class=\"value\">\n            {{countdown.seconds}}\n        </div>\n        <div class=\"title\">\n            seconds\n        </div>\n    </div>\n\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-countdown{display:flex;flex-direction:row;align-items:center;justify-content:center}fuse-countdown .fuse-countdown{display:flex;flex-direction:row;align-items:center;justify-content:center;text-align:center}fuse-countdown .fuse-countdown .time{display:flex;flex-direction:column;padding:0 12px}fuse-countdown .fuse-countdown .time .value{font-size:34px;line-height:34px;padding-bottom:8px}fuse-countdown .fuse-countdown .time .title{color:rgba(0,0,0,.54)}"]
                }] }
    ];
    /** @nocollapse */
    FuseCountdownComponent.ctorParameters = function () { return []; };
    FuseCountdownComponent.propDecorators = {
        eventDate: [{ type: Input, args: ['eventDate',] }]
    };
    return FuseCountdownComponent;
}());

var FuseCountdownModule = /** @class */ (function () {
    function FuseCountdownModule() {
    }
    FuseCountdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseCountdownComponent
                    ],
                    exports: [
                        FuseCountdownComponent
                    ],
                },] }
    ];
    return FuseCountdownModule;
}());

var FuseDemoContentComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseDemoContentComponent() {
    }
    FuseDemoContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-demo-content',
                    template: "<!-- DEMO CONTENT -->\n<div class=\"demo-content line-height-1.75\">\n\n    <h1 class=\"m-0\">Early Sunrise in Winter</h1>\n    <h4 class=\"mt-0 secondary-text\">Demo Content</h4>\n\n    <p>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tortor nibh, convallis sed purus nec,\n        auctor venenatis nisl. Suspendisse potenti. Nullam sagittis nulla in diam finibus, sed pharetra velit\n        vestibulum. Suspendisse euismod in urna eu posuere.\n    </p>\n\n    <blockquote class=\"my-24\">\n        <p>\n            Nunc vel lacinia lorem. Nullam tincidunt sed purus eu placerat. Donec id dictum erat. Etiam enim ex, dapibus\n            et tortor id, posuere pretium est. Maecenas fringilla ipsum vitae neque elementum, at eleifend ante\n            sollicitudin. Donec viverra augue dolor, a venenatis tellus consectetur sit amet.\n        </p>\n        <footer>\n            John Doe\n        </footer>\n    </blockquote>\n\n    <p>\n        Ut ornare sit amet velit vel congue. Ut nec tristique eros. Lorem ipsum dolor sit amet, consectetur\n        <b>adipiscing elit</b>. Vivamus sed lorem quis nibh porta iaculis. Vestibulum ut eleifend ante, at semper mi.\n        Nam imperdiet est nisi, quis hendrerit tellus convallis et. Morbi in luctus neque. Curabitur elementum ut est et\n        gravida. In hac habitasse platea dictumst. In et placerat eros, eu tempor turpis. Curabitur ac felis finibus,\n        elementum lectus vitae, venenatis est. Integer mollis nisl a eros scelerisque varius. Etiam venenatis lectus vel\n        erat condimentum tristique vel vel mi. Nulla id euismod mi, et mollis tellus.\n    </p>\n\n    <p>\n        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti\n        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur vitae sagittis odio.\n        Suspendisse ullamcorper nunc non pellentesque laoreet. Curabitur eu tortor id quam pretium mattis. Proin ut quam\n        velit.\n    </p>\n\n    <img class=\"mt-24 w-100-p\" src=\"assets/images/demo-content/morain-lake.jpg\" style=\"max-width: 640px\">\n\n    <p class=\"mt-8 mb-24 secondary-text\">\n        <em>Nullam tincidunt sed purus eu placerat. Donec id dictum erat. Etiam enim ex, dapibus et tortor id.</em>\n    </p>\n\n    <p>\n        Quisque sit amet risus enim. Aliquam sit amet interdum justo, at ultricies sapien. Suspendisse et semper urna,\n        in gravida eros. Quisque id nibh iaculis, euismod urna sed, egestas nisi. Donec eros metus, congue a imperdiet\n        feugiat, sagittis nec ipsum. Quisque dapibus mollis felis non tristique.\n    </p>\n\n    <p>\n        Ut auctor, metus sed dapibus tempus, urna diam auctor odio, in malesuada odio risus vitae nisi. Etiam blandit\n        ante urna, vitae placerat massa mollis in. Duis nec urna ac purus semper dictum ut eget justo. Aenean non\n        sagittis augue. Sed venenatis rhoncus enim eget ornare. <a href=\"#\">Donec viverra sed felis at venenatis.</a>\n        Mauris aliquam fringilla nulla, sit amet congue felis dignissim at.\n    </p>\n\n    <ul>\n        <li>Orci varius</li>\n        <li>Magnis dis</li>\n        <li>Conubia nostra</li>\n        <li>Semper urna</li>\n        <li>Donec viverra</li>\n    </ul>\n\n    <p>\n        Quisque accumsan augue tempor ante mollis, sed placerat diam porttitor. Vestibulum dignissim sem vel velit\n        eleifend, non pellentesque quam convallis. Pellentesque est dolor, dignissim ac tortor tristique, hendrerit\n        iaculis metus. Praesent pulvinar quam eu leo consectetur faucibus. Vestibulum purus diam, gravida sagittis\n        feugiat sit amet, tincidunt in ligula. Sed semper vestibulum magna. Lorem ipsum dolor sit amet, consectetur\n        adipiscing elit. Suspendisse tortor nibh, convallis sed purus nec, auctor venenatis nisl. Suspendisse potenti.\n    </p>\n\n    <p>\n        Nullam sagittis nulla in diam finibus, sed pharetra velit vestibulum. Suspendisse euismod in urna eu posuere.\n        Etiam blandit nunc arcu, et consectetur orci blandit a. Aliquam condimentum pharetra quam at ultricies. Nunc vel\n        lacinia lorem. Nullam tincidunt sed purus eu placerat. Donec id dictum erat. Etiam enim ex, dapibus et tortor\n        id, posuere pretium est. Maecenas fringilla ipsum vitae neque elementum, at eleifend ante sollicitudin. Donec\n        viverra augue dolor, a venenatis tellus consectetur sit amet.\n    </p>\n</div>\n<!-- / DEMO CONTENT -->\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseDemoContentComponent.ctorParameters = function () { return []; };
    return FuseDemoContentComponent;
}());

var FuseDemoSidebarComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseDemoSidebarComponent() {
    }
    FuseDemoSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-demo-sidebar',
                    template: "<div class=\"demo-sidebar\">\n    <mat-list>\n        <h3 matSubheader>Sidebar Demo</h3>\n\n        <mat-list-item>\n            <span>Sidebar Item 1</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 2</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 3</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 4</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 5</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 6</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 7</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 8</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 9</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 10</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 11</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 12</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 13</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 14</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 15</span>\n        </mat-list-item>\n\n        <mat-divider></mat-divider>\n\n        <mat-list-item>\n            <span>Sidebar Item 16</span>\n        </mat-list-item>\n\n    </mat-list>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseDemoSidebarComponent.ctorParameters = function () { return []; };
    return FuseDemoSidebarComponent;
}());

var FuseDemoModule = /** @class */ (function () {
    function FuseDemoModule() {
    }
    FuseDemoModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseDemoContentComponent,
                        FuseDemoSidebarComponent
                    ],
                    imports: [
                        RouterModule,
                        MatDividerModule,
                        MatListModule
                    ],
                    exports: [
                        FuseDemoContentComponent,
                        FuseDemoSidebarComponent
                    ]
                },] }
    ];
    return FuseDemoModule;
}());

var FuseHighlightComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {HttpClient} _httpClient
     */
    function FuseHighlightComponent(_elementRef, _httpClient) {
        this._elementRef = _elementRef;
        this._httpClient = _httpClient;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseHighlightComponent.prototype.ngOnInit = function () {
        var _this = this;
        // If there is no language defined, return...
        if (!this.lang) {
            return;
        }
        // If the path is defined...
        if (this.path) {
            // Get the source
            this._httpClient.get(this.path, { responseType: 'text' })
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(function (response) {
                // Highlight it
                _this.highlight(response);
            });
        }
        // If the path is not defined and the source element exists...
        if (!this.path && this.source) {
            // Highlight it
            this.highlight(this.source.nativeElement.value);
        }
    };
    /**
     * On destroy
     */
    FuseHighlightComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Highlight the given source code
     *
     * @param sourceCode
     */
    FuseHighlightComponent.prototype.highlight = function (sourceCode) {
        // Split the source into lines
        var sourceLines = sourceCode.split('\n');
        // Remove the first and the last line of the source
        // code if they are blank lines. This way, the html
        // can be formatted properly while using fuse-highlight
        // component
        if (!sourceLines[0].trim()) {
            sourceLines.shift();
        }
        if (!sourceLines[sourceLines.length - 1].trim()) {
            sourceLines.pop();
        }
        // Find the first non-whitespace char index in
        // the first line of the source code
        var indexOfFirstChar = sourceLines[0].search(/\S|$/);
        // Generate the trimmed source
        var source = '';
        // Iterate through all the lines
        sourceLines.forEach(function (line, index) {
            // Trim the beginning white space depending on the index
            // and concat the source code
            source = source + line.substr(indexOfFirstChar, line.length);
            // If it's not the last line...
            if (index !== sourceLines.length - 1) {
                // Add a line break at the end
                source = source + '\n';
            }
        });
        // Generate the highlighted code
        var highlightedCode = highlight(source, languages[this.lang]);
        // Replace the innerHTML of the component with the highlighted code
        this._elementRef.nativeElement.innerHTML =
            '<pre><code class="highlight language-' + this.lang + '">' + highlightedCode + '</code></pre>';
    };
    FuseHighlightComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-highlight',
                    template: '',
                    styles: [":host{display:block;width:100%;padding:8px;background:#263238;cursor:text;overflow:auto;-webkit-overflow-scrolling:touch}"]
                }] }
    ];
    /** @nocollapse */
    FuseHighlightComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: HttpClient }
    ]; };
    FuseHighlightComponent.propDecorators = {
        source: [{ type: ContentChild, args: ['source',] }],
        lang: [{ type: Input, args: ['lang',] }],
        path: [{ type: Input, args: ['path',] }]
    };
    return FuseHighlightComponent;
}());

var FuseHighlightModule = /** @class */ (function () {
    function FuseHighlightModule() {
    }
    FuseHighlightModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseHighlightComponent
                    ],
                    exports: [
                        FuseHighlightComponent
                    ],
                },] }
    ];
    return FuseHighlightModule;
}());

var black87 = 'rgba(black, 0.87)';
var white87 = 'rgba(white, 0.87)';
var matColors = {
    'red': {
        50: '#ffebee',
        100: '#ffcdd2',
        200: '#ef9a9a',
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
        A100: '#ff8a80',
        A200: '#ff5252',
        A400: '#ff1744',
        A700: '#d50000',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: white87,
            900: white87,
            A100: black87,
            A200: 'white',
            A400: 'white',
            A700: 'white'
        }
    },
    'pink': {
        50: '#fce4ec',
        100: '#f8bbd0',
        200: '#f48fb1',
        300: '#f06292',
        400: '#ec407a',
        500: '#e91e63',
        600: '#d81b60',
        700: '#c2185b',
        800: '#ad1457',
        900: '#880e4f',
        A100: '#ff80ab',
        A200: '#ff4081',
        A400: '#f50057',
        A700: '#c51162',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: 'white',
            A400: 'white',
            A700: 'white'
        }
    },
    'purple': {
        50: '#f3e5f5',
        100: '#e1bee7',
        200: '#ce93d8',
        300: '#ba68c8',
        400: '#ab47bc',
        500: '#9c27b0',
        600: '#8e24aa',
        700: '#7b1fa2',
        800: '#6a1b9a',
        900: '#4a148c',
        A100: '#ea80fc',
        A200: '#e040fb',
        A400: '#d500f9',
        A700: '#aa00ff',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: 'white',
            400: 'white',
            500: white87,
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: 'white',
            A400: 'white',
            A700: 'white'
        }
    },
    'deep-purple': {
        50: '#ede7f6',
        100: '#d1c4e9',
        200: '#b39ddb',
        300: '#9575cd',
        400: '#7e57c2',
        500: '#673ab7',
        600: '#5e35b1',
        700: '#512da8',
        800: '#4527a0',
        900: '#311b92',
        A100: '#b388ff',
        A200: '#7c4dff',
        A400: '#651fff',
        A700: '#6200ea',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: 'white',
            400: 'white',
            500: white87,
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: 'white',
            A400: white87,
            A700: white87
        }
    },
    'indigo': {
        50: '#e8eaf6',
        100: '#c5cae9',
        200: '#9fa8da',
        300: '#7986cb',
        400: '#5c6bc0',
        500: '#3f51b5',
        600: '#3949ab',
        700: '#303f9f',
        800: '#283593',
        900: '#1a237e',
        A100: '#8c9eff',
        A200: '#536dfe',
        A400: '#3d5afe',
        A700: '#304ffe',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: 'white',
            400: 'white',
            500: white87,
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: 'white',
            A400: 'white',
            A700: white87
        }
    },
    'blue': {
        50: '#e3f2fd',
        100: '#bbdefb',
        200: '#90caf9',
        300: '#64b5f6',
        400: '#42a5f5',
        500: '#2196f3',
        600: '#1e88e5',
        700: '#1976d2',
        800: '#1565c0',
        900: '#0d47a1',
        A100: '#82b1ff',
        A200: '#448aff',
        A400: '#2979ff',
        A700: '#2962ff',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: white87,
            900: white87,
            A100: black87,
            A200: 'white',
            A400: 'white',
            A700: 'white'
        }
    },
    'light-blue': {
        50: '#e1f5fe',
        100: '#b3e5fc',
        200: '#81d4fa',
        300: '#4fc3f7',
        400: '#29b6f6',
        500: '#03a9f4',
        600: '#039be5',
        700: '#0288d1',
        800: '#0277bd',
        900: '#01579b',
        A100: '#80d8ff',
        A200: '#40c4ff',
        A400: '#00b0ff',
        A700: '#0091ea',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: 'white',
            900: white87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: 'white'
        }
    },
    'cyan': {
        50: '#e0f7fa',
        100: '#b2ebf2',
        200: '#80deea',
        300: '#4dd0e1',
        400: '#26c6da',
        500: '#00bcd4',
        600: '#00acc1',
        700: '#0097a7',
        800: '#00838f',
        900: '#006064',
        A100: '#84ffff',
        A200: '#18ffff',
        A400: '#00e5ff',
        A700: '#00b8d4',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: 'white',
            900: white87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'teal': {
        50: '#e0f2f1',
        100: '#b2dfdb',
        200: '#80cbc4',
        300: '#4db6ac',
        400: '#26a69a',
        500: '#009688',
        600: '#00897b',
        700: '#00796b',
        800: '#00695c',
        900: '#004d40',
        A100: '#a7ffeb',
        A200: '#64ffda',
        A400: '#1de9b6',
        A700: '#00bfa5',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: white87,
            900: white87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'green': {
        50: '#e8f5e9',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20',
        A100: '#b9f6ca',
        A200: '#69f0ae',
        A400: '#00e676',
        A700: '#00c853',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: white87,
            900: white87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'light-green': {
        50: '#f1f8e9',
        100: '#dcedc8',
        200: '#c5e1a5',
        300: '#aed581',
        400: '#9ccc65',
        500: '#8bc34a',
        600: '#7cb342',
        700: '#689f38',
        800: '#558b2f',
        900: '#33691e',
        A100: '#ccff90',
        A200: '#b2ff59',
        A400: '#76ff03',
        A700: '#64dd17',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: black87,
            600: black87,
            700: black87,
            800: 'white',
            900: 'white',
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'lime': {
        50: '#f9fbe7',
        100: '#f0f4c3',
        200: '#e6ee9c',
        300: '#dce775',
        400: '#d4e157',
        500: '#cddc39',
        600: '#c0ca33',
        700: '#afb42b',
        800: '#9e9d24',
        900: '#827717',
        A100: '#f4ff81',
        A200: '#eeff41',
        A400: '#c6ff00',
        A700: '#aeea00',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: black87,
            600: black87,
            700: black87,
            800: black87,
            900: 'white',
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'yellow': {
        50: '#fffde7',
        100: '#fff9c4',
        200: '#fff59d',
        300: '#fff176',
        400: '#ffee58',
        500: '#ffeb3b',
        600: '#fdd835',
        700: '#fbc02d',
        800: '#f9a825',
        900: '#f57f17',
        A100: '#ffff8d',
        A200: '#ffff00',
        A400: '#ffea00',
        A700: '#ffd600',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: black87,
            600: black87,
            700: black87,
            800: black87,
            900: black87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'amber': {
        50: '#fff8e1',
        100: '#ffecb3',
        200: '#ffe082',
        300: '#ffd54f',
        400: '#ffca28',
        500: '#ffc107',
        600: '#ffb300',
        700: '#ffa000',
        800: '#ff8f00',
        900: '#ff6f00',
        A100: '#ffe57f',
        A200: '#ffd740',
        A400: '#ffc400',
        A700: '#ffab00',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: black87,
            600: black87,
            700: black87,
            800: black87,
            900: black87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: black87
        }
    },
    'orange': {
        50: '#fff3e0',
        100: '#ffe0b2',
        200: '#ffcc80',
        300: '#ffb74d',
        400: '#ffa726',
        500: '#ff9800',
        600: '#fb8c00',
        700: '#f57c00',
        800: '#ef6c00',
        900: '#e65100',
        A100: '#ffd180',
        A200: '#ffab40',
        A400: '#ff9100',
        A700: '#ff6d00',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: black87,
            600: black87,
            700: black87,
            800: 'white',
            900: 'white',
            A100: black87,
            A200: black87,
            A400: black87,
            A700: 'black'
        }
    },
    'deep-orange': {
        50: '#fbe9e7',
        100: '#ffccbc',
        200: '#ffab91',
        300: '#ff8a65',
        400: '#ff7043',
        500: '#ff5722',
        600: '#f4511e',
        700: '#e64a19',
        800: '#d84315',
        900: '#bf360c',
        A100: '#ff9e80',
        A200: '#ff6e40',
        A400: '#ff3d00',
        A700: '#dd2c00',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: 'white',
            600: 'white',
            700: 'white',
            800: 'white',
            900: 'white',
            A100: black87,
            A200: black87,
            A400: 'white',
            A700: 'white'
        }
    },
    'brown': {
        50: '#efebe9',
        100: '#d7ccc8',
        200: '#bcaaa4',
        300: '#a1887f',
        400: '#8d6e63',
        500: '#795548',
        600: '#6d4c41',
        700: '#5d4037',
        800: '#4e342e',
        900: '#3e2723',
        A100: '#d7ccc8',
        A200: '#bcaaa4',
        A400: '#8d6e63',
        A700: '#5d4037',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: 'white',
            400: 'white',
            500: white87,
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: black87,
            A400: 'white',
            A700: white87
        }
    },
    'grey': {
        0: '#ffffff',
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        1000: '#000000',
        A100: '#ffffff',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161',
        contrast: {
            0: black87,
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: black87,
            500: black87,
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            1000: white87,
            A100: black87,
            A200: black87,
            A400: black87,
            A700: white87
        }
    },
    'blue-grey': {
        50: '#eceff1',
        100: '#cfd8dc',
        200: '#b0bec5',
        300: '#90a4ae',
        400: '#78909c',
        500: '#607d8b',
        600: '#546e7a',
        700: '#455a64',
        800: '#37474f',
        900: '#263238',
        A100: '#cfd8dc',
        A200: '#b0bec5',
        A400: '#78909c',
        A700: '#455a64',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: black87,
            400: 'white',
            500: 'white',
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: black87,
            A400: 'white',
            A700: white87
        }
    },
    'fuse-navy': {
        50: '#ECECEE',
        100: '#C5C6CB',
        200: '#9EA1A9',
        300: '#7D818C',
        400: '#5C616F',
        500: '#3C4252',
        600: '#353A48',
        700: '#2D323E',
        800: '#262933',
        900: '#1E2129',
        A100: '#C5C6CB',
        A200: '#9EA1A9',
        A400: '#5C616F',
        A700: '#2D323E',
        contrast: {
            50: black87,
            100: black87,
            200: black87,
            300: 'white',
            400: 'white',
            500: white87,
            600: white87,
            700: white87,
            800: white87,
            900: white87,
            A100: black87,
            A200: white87,
            A400: white87,
            A700: white87
        }
    },
    'fuse-white': {
        500: 'white',
        contrast: {
            500: black87
        }
    },
    'fuse-black': {
        500: 'black',
        contrast: {
            500: 'white'
        }
    }
};
// tslint:disable-next-line
var matPresetColors = [
    '#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#fce4ec', '#f8bbd0',
    '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8',
    '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7',
    '#5e35b1', '#512da8', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#e8eaf6', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f',
    '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1',
    '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff',
    '#00b0ff', '#0091ea', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4',
    '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#e8f5e9', '#c8e6c9',
    '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581',
    '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39',
    '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d',
    '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00',
    '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40',
    '#ff9100', '#ff6d00', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00',
    '#efebe9', '#d7ccc8', '#bcaaa4', '#a1887f', '#8d6e63', '#795548', '#6d4c41', '#5d4037', '#4e342e', '#3e2723', '#d7ccc8', '#bcaaa4', '#8d6e63', '#5d4037', '#fafafa', '#f5f5f5',
    '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121', '#ffffff', '#eeeeee', '#bdbdbd', '#616161', '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae',
    '#78909c', '#607d8b', '#546e7a', '#455a64', '#37474f', '#263238', '#cfd8dc', '#b0bec5', '#78909c', '#455a64'
];
/**
 // Color palettes from the Material Design spec.
 // See https://www.google.com/design/spec/style/color.html
 */
// @dynamic
var MatColors = /** @class */ (function () {
    function MatColors() {
    }
    MatColors.getColor = function (colorName) {
        if (matColors[colorName]) {
            return matColors[colorName];
        }
        return false;
    };
    MatColors.all = matColors;
    MatColors.presets = matPresetColors;
    return MatColors;
}());

var FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return FuseMaterialColorPickerComponent; }),
    multi: true
};
var FuseMaterialColorPickerComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseMaterialColorPickerComponent() {
        // Set the defaults
        this.colorChanged = new EventEmitter();
        this.colors = MatColors.all;
        this.hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
        this.selectedHue = '500';
        this.view = 'palettes';
        // Set the private defaults
        this._color = '';
        this._modelChange = function () {
        };
        this._modelTouched = function () {
        };
    }
    Object.defineProperty(FuseMaterialColorPickerComponent.prototype, "color", {
        get: function () {
            return this._color;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Selected class
         *
         * @param value
         */
        set: function (value) {
            if (!value || value === '' || this._color === value) {
                return;
            }
            // Split the color value (red-400, blue-500, fuse-navy-700 etc.)
            var colorParts = value.split('-');
            // Take the very last part as the selected hue value
            this.selectedHue = colorParts[colorParts.length - 1];
            // Remove the last part
            colorParts.pop();
            // Rejoin the remaining parts as the selected palette name
            this.selectedPalette = colorParts.join('-');
            // Store the color value
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Control Value Accessor implementation
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register on change function
     *
     * @param fn
     */
    FuseMaterialColorPickerComponent.prototype.registerOnChange = function (fn) {
        this._modelChange = fn;
    };
    /**
     * Register on touched function
     *
     * @param fn
     */
    FuseMaterialColorPickerComponent.prototype.registerOnTouched = function (fn) {
        this._modelTouched = fn;
    };
    /**
     * Write value to the view from model
     *
     * @param color
     */
    FuseMaterialColorPickerComponent.prototype.writeValue = function (color) {
        // Return if null
        if (!color) {
            return;
        }
        // Set the color
        this.color = color;
        // Update the selected color
        this.updateSelectedColor();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Select palette
     *
     * @param event
     * @param palette
     */
    FuseMaterialColorPickerComponent.prototype.selectPalette = function (event, palette) {
        // Stop propagation
        event.stopPropagation();
        // Go to 'hues' view
        this.view = 'hues';
        // Update the selected palette
        this.selectedPalette = palette;
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Select hue
     *
     * @param event
     * @param hue
     */
    FuseMaterialColorPickerComponent.prototype.selectHue = function (event, hue) {
        // Stop propagation
        event.stopPropagation();
        // Update the selected huse
        this.selectedHue = hue;
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Remove color
     *
     * @param event
     */
    FuseMaterialColorPickerComponent.prototype.removeColor = function (event) {
        // Stop propagation
        event.stopPropagation();
        // Return to the 'palettes' view
        this.view = 'palettes';
        // Clear the selected palette and hue
        this.selectedPalette = '';
        this.selectedHue = '';
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Update selected color
     */
    FuseMaterialColorPickerComponent.prototype.updateSelectedColor = function () {
        if (this.selectedColor && this.selectedColor.palette === this.selectedPalette && this.selectedColor.hue === this.selectedHue) {
            return;
        }
        // Set the selected color object
        this.selectedColor = {
            palette: this.selectedPalette,
            hue: this.selectedHue,
            class: this.selectedPalette + '-' + this.selectedHue,
            bg: this.selectedPalette === '' ? '' : MatColors.getColor(this.selectedPalette)[this.selectedHue],
            fg: this.selectedPalette === '' ? '' : MatColors.getColor(this.selectedPalette).contrast[this.selectedHue]
        };
        // Emit the color changed event
        this.colorChanged.emit(this.selectedColor);
        // Mark the model as touched
        this._modelTouched(this.selectedColor.class);
        // Update the model
        this._modelChange(this.selectedColor.class);
    };
    /**
     * Go to palettes view
     *
     * @param event
     */
    FuseMaterialColorPickerComponent.prototype.goToPalettesView = function (event) {
        // Stop propagation
        event.stopPropagation();
        this.view = 'palettes';
    };
    /**
     * On menu open
     */
    FuseMaterialColorPickerComponent.prototype.onMenuOpen = function () {
        if (this.selectedPalette === '') {
            this.view = 'palettes';
        }
        else {
            this.view = 'hues';
        }
    };
    FuseMaterialColorPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-material-color-picker',
                    template: "<button mat-icon-button\n        class=\"mat-elevation-z1\"\n        [matMenuTriggerFor]=\"colorMenu\"\n        (menuOpened)=\"onMenuOpen()\"\n        [ngClass]=\"selectedPalette + '-' + selectedHue\">\n    <mat-icon>palette</mat-icon>\n</button>\n\n<mat-menu #colorMenu=\"matMenu\" class=\"fuse-material-color-picker-menu mat-elevation-z8\">\n\n    <header [ngClass]=\"selectedColor?.class || 'accent'\" class=\"mat-elevation-z4\"\n            fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n\n        <button mat-icon-button\n                class=\"secondary-text\"\n                [style.visibility]=\"view === 'hues' ? 'visible' : 'hidden'\"\n                (click)=\"goToPalettesView($event)\" aria-label=\"Palette\">\n            <mat-icon class=\"s-20\">arrow_back</mat-icon>\n        </button>\n\n        <span *ngIf=\"selectedColor?.palette\">\n            {{selectedColor.palette}} {{selectedColor.hue}}\n        </span>\n\n        <span *ngIf=\"!selectedColor?.palette\">\n            Select a Color\n        </span>\n\n        <button mat-icon-button\n                class=\"remove-color-button secondary-text\"\n                (click)=\"removeColor($event)\"\n                aria-label=\"Remove color\"\n                matTooltip=\"Remove color\">\n            <mat-icon class=\"s-20\">delete</mat-icon>\n        </button>\n    </header>\n\n    <div [ngSwitch]=\"view\" class=\"views\">\n\n        <div class=\"view\" *ngSwitchCase=\"'palettes'\">\n\n            <div fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" class=\"colors\" fusePerfectScrollbar>\n                <div class=\"color\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let color of (colors | keys)\"\n                     [ngClass]=\"color.key\"\n                     [class.selected]=\"selectedPalette === color.key\"\n                     (click)=\"selectPalette($event, color.key)\">\n                </div>\n            </div>\n        </div>\n\n        <div class=\"view\" *ngSwitchCase=\"'hues'\">\n            <div fxLayout=\"row wrap\" fxLayoutAlign=\"start start\" class=\"colors\" fusePerfectScrollbar>\n                <div class=\"color\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let hue of hues\"\n                     [fxHide]=\"selectedPalette === 'fuse-white' && hue !== '500' || selectedPalette === 'fuse-black' && hue !== '500'\"\n                     [ngClass]=\"selectedPalette + '-' + hue\"\n                     [class.selected]=\"selectedHue === hue\"\n                     (click)=\"selectHue($event, hue)\">\n                </div>\n            </div>\n        </div>\n\n    </div>\n</mat-menu>\n",
                    animations: fuseAnimations,
                    encapsulation: ViewEncapsulation.None,
                    providers: [FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR],
                    styles: [".fuse-material-color-picker-menu{width:245px}.fuse-material-color-picker-menu .mat-menu-content{padding:0}.fuse-material-color-picker-menu .mat-menu-content .views{display:flex;flex-direction:column;min-height:165px}.fuse-material-color-picker-menu .mat-menu-content .views .view{overflow:hidden}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors{padding:1px 0 0;margin-left:-1px}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors .color{width:40px;height:40px;margin:0 0 1px 1px;border-radius:0;cursor:pointer;transition:border-radius .4s cubic-bezier(.25,.8,.25,1)}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors .color:hover{border-radius:20%}.fuse-material-color-picker-menu .mat-menu-content .views .view .colors .color.selected{border-radius:50%!important}"]
                }] }
    ];
    /** @nocollapse */
    FuseMaterialColorPickerComponent.ctorParameters = function () { return []; };
    FuseMaterialColorPickerComponent.propDecorators = {
        colorChanged: [{ type: Output }],
        color: [{ type: Input }]
    };
    return FuseMaterialColorPickerComponent;
}());

var FuseMaterialColorPickerModule = /** @class */ (function () {
    function FuseMaterialColorPickerModule() {
    }
    FuseMaterialColorPickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseMaterialColorPickerComponent
                    ],
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatIconModule,
                        MatMenuModule,
                        MatTooltipModule,
                        FusePipesModule
                    ],
                    exports: [
                        FuseMaterialColorPickerComponent
                    ],
                },] }
    ];
    return FuseMaterialColorPickerModule;
}());

var FuseNavigationService = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseNavigationService() {
        this._registry = {};
        // Set the defaults
        this.onItemCollapsed = new Subject();
        this.onItemCollapseToggled = new Subject();
        // Set the private defaults
        this._currentNavigationKey = null;
        this._onNavigationChanged = new BehaviorSubject(null);
        this._onNavigationRegistered = new BehaviorSubject(null);
        this._onNavigationUnregistered = new BehaviorSubject(null);
        this._onNavigationItemAdded = new BehaviorSubject(null);
        this._onNavigationItemUpdated = new BehaviorSubject(null);
        this._onNavigationItemRemoved = new BehaviorSubject(null);
    }
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationChanged", {
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Get onNavigationChanged
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationRegistered", {
        /**
         * Get onNavigationRegistered
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationRegistered.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationUnregistered", {
        /**
         * Get onNavigationUnregistered
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationUnregistered.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationItemAdded", {
        /**
         * Get onNavigationItemAdded
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationItemAdded.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationItemUpdated", {
        /**
         * Get onNavigationItemUpdated
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationItemUpdated.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationItemRemoved", {
        /**
         * Get onNavigationItemRemoved
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationItemRemoved.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register the given navigation
     * with the given key
     *
     * @param key
     * @param navigation
     */
    FuseNavigationService.prototype.register = function (key, navigation) {
        // Check if the key already being used
        if (this._registry[key]) {
            console.error("The navigation with the key '" + key + "' already exists. Either unregister it first or use a unique key.");
            return;
        }
        // Add to the registry
        this._registry[key] = navigation;
        // Notify the subject
        this._onNavigationRegistered.next([key, navigation]);
    };
    /**
     * Unregister the navigation from the registry
     * @param key
     */
    FuseNavigationService.prototype.unregister = function (key) {
        // Check if the navigation exists
        if (!this._registry[key]) {
            console.warn("The navigation with the key '" + key + "' doesn't exist in the registry.");
        }
        // Unregister the sidebar
        delete this._registry[key];
        // Notify the subject
        this._onNavigationUnregistered.next(key);
    };
    /**
     * Get navigation from registry by key
     *
     * @param key
     * @returns {any}
     */
    FuseNavigationService.prototype.getNavigation = function (key) {
        // Check if the navigation exists
        if (!this._registry[key]) {
            console.warn("The navigation with the key '" + key + "' doesn't exist in the registry.");
            return;
        }
        // Return the sidebar
        return this._registry[key];
    };
    /**
     * Get flattened navigation array
     *
     * @param navigation
     * @param flatNavigation
     * @returns {any[]}
     */
    FuseNavigationService.prototype.getFlatNavigation = function (navigation, flatNavigation) {
        if (flatNavigation === void 0) { flatNavigation = []; }
        var e_1, _a;
        try {
            for (var navigation_1 = __values(navigation), navigation_1_1 = navigation_1.next(); !navigation_1_1.done; navigation_1_1 = navigation_1.next()) {
                var item = navigation_1_1.value;
                if (item.type === 'item') {
                    flatNavigation.push(item);
                    continue;
                }
                if (item.type === 'collapsable' || item.type === 'group') {
                    if (item.children) {
                        this.getFlatNavigation(item.children, flatNavigation);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (navigation_1_1 && !navigation_1_1.done && (_a = navigation_1.return)) _a.call(navigation_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return flatNavigation;
    };
    /**
     * Get the current navigation
     *
     * @returns {any}
     */
    FuseNavigationService.prototype.getCurrentNavigation = function () {
        if (!this._currentNavigationKey) {
            console.warn("The current navigation is not set.");
            return;
        }
        return this.getNavigation(this._currentNavigationKey);
    };
    /**
     * Set the navigation with the key
     * as the current navigation
     *
     * @param key
     */
    FuseNavigationService.prototype.setCurrentNavigation = function (key) {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn("The navigation with the key '" + key + "' doesn't exist in the registry.");
            return;
        }
        // Set the current navigation key
        this._currentNavigationKey = key;
        // Notify the subject
        this._onNavigationChanged.next(key);
    };
    /**
     * Get navigation item by id from the
     * current navigation
     *
     * @param id
     * @param {any} navigation
     * @returns {any | boolean}
     */
    FuseNavigationService.prototype.getNavigationItem = function (id, navigation) {
        if (navigation === void 0) { navigation = null; }
        var e_2, _a;
        if (!navigation) {
            navigation = this.getCurrentNavigation();
        }
        try {
            for (var navigation_2 = __values(navigation), navigation_2_1 = navigation_2.next(); !navigation_2_1.done; navigation_2_1 = navigation_2.next()) {
                var item = navigation_2_1.value;
                if (item.id === id) {
                    return item;
                }
                if (item.children) {
                    var childItem = this.getNavigationItem(id, item.children);
                    if (childItem) {
                        return childItem;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (navigation_2_1 && !navigation_2_1.done && (_a = navigation_2.return)) _a.call(navigation_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    /**
     * Get the parent of the navigation item
     * with the id
     *
     * @param id
     * @param {any} navigation
     * @param parent
     */
    FuseNavigationService.prototype.getNavigationItemParent = function (id, navigation, parent) {
        if (navigation === void 0) { navigation = null; }
        if (parent === void 0) { parent = null; }
        var e_3, _a;
        if (!navigation) {
            navigation = this.getCurrentNavigation();
            parent = navigation;
        }
        try {
            for (var navigation_3 = __values(navigation), navigation_3_1 = navigation_3.next(); !navigation_3_1.done; navigation_3_1 = navigation_3.next()) {
                var item = navigation_3_1.value;
                if (item.id === id) {
                    return parent;
                }
                if (item.children) {
                    var childItem = this.getNavigationItemParent(id, item.children, item);
                    if (childItem) {
                        return childItem;
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (navigation_3_1 && !navigation_3_1.done && (_a = navigation_3.return)) _a.call(navigation_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
    };
    /**
     * Add a navigation item to the specified location
     *
     * @param item
     * @param id
     */
    FuseNavigationService.prototype.addNavigationItem = function (item, id) {
        // Get the current navigation
        var navigation = this.getCurrentNavigation();
        // Add to the end of the navigation
        if (id === 'end') {
            navigation.push(item);
            // Trigger the observable
            this._onNavigationItemAdded.next(true);
            return;
        }
        // Add to the start of the navigation
        if (id === 'start') {
            navigation.unshift(item);
            // Trigger the observable
            this._onNavigationItemAdded.next(true);
            return;
        }
        // Add it to a specific location
        var parent = this.getNavigationItem(id);
        if (parent) {
            // Check if parent has a children entry,
            // and add it if it doesn't
            if (!parent.children) {
                parent.children = [];
            }
            // Add the item
            parent.children.push(item);
        }
        // Trigger the observable
        this._onNavigationItemAdded.next(true);
    };
    /**
     * Update navigation item with the given id
     *
     * @param id
     * @param properties
     */
    FuseNavigationService.prototype.updateNavigationItem = function (id, properties) {
        // Get the navigation item
        var navigationItem = this.getNavigationItem(id);
        // If there is no navigation with the give id, return
        if (!navigationItem) {
            return;
        }
        // Merge the navigation properties
        merge(navigationItem, properties);
        // Trigger the observable
        this._onNavigationItemUpdated.next(true);
    };
    /**
     * Remove navigation item with the given id
     *
     * @param id
     */
    FuseNavigationService.prototype.removeNavigationItem = function (id) {
        var item = this.getNavigationItem(id);
        // Return, if there is not such an item
        if (!item) {
            return;
        }
        // Get the parent of the item
        var parent = this.getNavigationItemParent(id);
        // This check is required because of the first level
        // of the navigation, since the first level is not
        // inside the 'children' array
        parent = parent.children || parent;
        // Remove the item
        parent.splice(parent.indexOf(item), 1);
        // Trigger the observable
        this._onNavigationItemRemoved.next(true);
    };
    FuseNavigationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseNavigationService.ctorParameters = function () { return []; };
    FuseNavigationService.ngInjectableDef = defineInjectable({ factory: function FuseNavigationService_Factory() { return new FuseNavigationService(); }, token: FuseNavigationService, providedIn: "root" });
    return FuseNavigationService;
}());

var FuseNavigationComponent = /** @class */ (function () {
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavigationComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.layout = 'vertical';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Load the navigation
            _this.navigation = _this._fuseNavigationService.getCurrentNavigation();
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
        // Subscribe to navigation item
        merge$1(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    FuseNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-navigation',
                    template: "<div class=\"nav\" [ngClass]=\"{'horizontal':layout === 'horizontal', 'vertical':layout === 'vertical'}\">\n\n    <!-- Vertical Navigation Layout -->\n    <ng-container *ngIf=\"layout === 'vertical'\">\n\n        <ng-container *ngFor=\"let item of navigation\">\n\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n\n        </ng-container>\n\n    </ng-container>\n    <!-- / Vertical Navigation Layout -->\n\n    <!-- Horizontal Navigation Layout -->\n    <ng-container *ngIf=\"layout === 'horizontal'\">\n\n        <ng-container *ngFor=\"let item of navigation\">\n\n            <fuse-nav-horizontal-collapsable *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-horizontal-collapsable>\n            <fuse-nav-horizontal-collapsable *ngIf=\"item.type=='collapsable'\"\n                                             [item]=\"item\"></fuse-nav-horizontal-collapsable>\n            <fuse-nav-horizontal-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-horizontal-item>\n\n        </ng-container>\n\n    </ng-container>\n    <!-- / Horizontal Navigation Layout -->\n\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["fuse-navigation{display:flex;flex:1 0 auto}fuse-navigation>.nav{margin:0;padding:0;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavigationComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService }
    ]; };
    FuseNavigationComponent.propDecorators = {
        layout: [{ type: Input }],
        navigation: [{ type: Input }]
    };
    return FuseNavigationComponent;
}());

var FuseNavVerticalItemComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavVerticalItemComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.classes = 'nav-item';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavVerticalItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to navigation item
        merge$1(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * On destroy
     */
    FuseNavVerticalItemComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    FuseNavVerticalItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-vertical-item',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n    </ng-template>\n\n</ng-container>",
                    styles: [".folded:not(.unfolded) :host .nav-link>.nav-link-badge,.folded:not(.unfolded) :host .nav-link>.nav-link-title{opacity:0;transition:opacity .2s}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavVerticalItemComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService }
    ]; };
    FuseNavVerticalItemComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }]
    };
    return FuseNavVerticalItemComponent;
}());

var FuseNavVerticalCollapsableComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {Router} _router
     */
    function FuseNavVerticalCollapsableComponent(_changeDetectorRef, _fuseNavigationService, _router) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this._router = _router;
        this.classes = 'nav-collapsable nav-item';
        this.isOpen = false;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavVerticalCollapsableComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Listen for router events
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }), takeUntil(this._unsubscribeAll))
            .subscribe(function (event) {
            // Check if the url can be found in
            // one of the children of this item
            if (_this.isUrlInChildren(_this.item, event.urlAfterRedirects)) {
                _this.expand();
            }
            else {
                _this.collapse();
            }
        });
        // Listen for collapsing of any navigation item
        this._fuseNavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (clickedItem) {
            if (clickedItem && clickedItem.children) {
                // Check if the clicked item is one
                // of the children of this item
                if (_this.isChildrenOf(_this.item, clickedItem)) {
                    return;
                }
                // Check if the url can be found in
                // one of the children of this item
                if (_this.isUrlInChildren(_this.item, _this._router.url)) {
                    return;
                }
                // If the clicked item is not this item, collapse...
                if (_this.item !== clickedItem) {
                    _this.collapse();
                }
            }
        });
        // Check if the url can be found in
        // one of the children of this item
        if (this.isUrlInChildren(this.item, this._router.url)) {
            this.expand();
        }
        else {
            this.collapse();
        }
        // Subscribe to navigation item
        merge$1(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * On destroy
     */
    FuseNavVerticalCollapsableComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle collapse
     *
     * @param ev
     */
    FuseNavVerticalCollapsableComponent.prototype.toggleOpen = function (ev) {
        ev.preventDefault();
        this.isOpen = !this.isOpen;
        // Navigation collapse toggled...
        this._fuseNavigationService.onItemCollapsed.next(this.item);
        this._fuseNavigationService.onItemCollapseToggled.next();
    };
    /**
     * Expand the collapsable navigation
     */
    FuseNavVerticalCollapsableComponent.prototype.expand = function () {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this._fuseNavigationService.onItemCollapseToggled.next();
    };
    /**
     * Collapse the collapsable navigation
     */
    FuseNavVerticalCollapsableComponent.prototype.collapse = function () {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this._fuseNavigationService.onItemCollapseToggled.next();
    };
    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    FuseNavVerticalCollapsableComponent.prototype.isChildrenOf = function (parent, item) {
        var e_1, _a;
        if (!parent.children) {
            return false;
        }
        if (parent.children.indexOf(item) !== -1) {
            return true;
        }
        try {
            for (var _b = __values(parent.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var children = _c.value;
                if (children.children) {
                    return this.isChildrenOf(children, item);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    FuseNavVerticalCollapsableComponent.prototype.isUrlInChildren = function (parent, url) {
        if (!parent.children) {
            return false;
        }
        for (var i = 0; i < parent.children.length; i++) {
            if (parent.children[i].children) {
                if (this.isUrlInChildren(parent.children[i], url)) {
                    return true;
                }
            }
            if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
                return true;
            }
        }
        return false;
    };
    FuseNavVerticalCollapsableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-vertical-collapsable',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- normal collapsable -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && !item.function\"\n       (click)=\"toggleOpen($event)\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       (click)=\"toggleOpen($event)\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       (click)=\"toggleOpen($event)\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"toggleOpen($event);item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"toggleOpen($event);item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"toggleOpen($event);item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n        <mat-icon class=\"collapsable-arrow\">keyboard_arrow_right</mat-icon>\n    </ng-template>\n\n    <div class=\"children\" [@slideInOut]=\"isOpen\">\n        <ng-container *ngFor=\"let item of item.children\">\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n        </ng-container>\n    </div>\n\n</ng-container>\n",
                    animations: fuseAnimations,
                    styles: [".folded:not(.unfolded) :host .nav-link>span{opacity:0;transition:opacity .2s}.folded:not(.unfolded) :host.open .children{display:none!important}:host .nav-link .collapsable-arrow{transition:transform .3s ease-in-out,opacity .25s ease-in-out .1s,-webkit-transform .3s ease-in-out;-webkit-transform:rotate(0);transform:rotate(0)}:host>.children{overflow:hidden}:host.open>.nav-link .collapsable-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavVerticalCollapsableComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService },
        { type: Router }
    ]; };
    FuseNavVerticalCollapsableComponent.propDecorators = {
        item: [{ type: Input }],
        classes: [{ type: HostBinding, args: ['class',] }],
        isOpen: [{ type: HostBinding, args: ['class.open',] }]
    };
    return FuseNavVerticalCollapsableComponent;
}());

var FuseNavVerticalGroupComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavVerticalGroupComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.classes = 'nav-group nav-item';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavVerticalGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to navigation item
        merge$1(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * On destroy
     */
    FuseNavVerticalGroupComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    FuseNavVerticalGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-vertical-group',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <div class=\"group-title\" [ngClass]=\"item.classes\">\n        <span class=\"hint-text\" [translate]=\"item.translate\">{{ item.title }}</span>\n    </div>\n\n    <div class=\"group-items\">\n        <ng-container *ngFor=\"let item of item.children\">\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n        </ng-container>\n    </div>\n\n</ng-container>",
                    styles: [".folded:not(.unfolded) :host>.group-title{align-items:center}.folded:not(.unfolded) :host>.group-title>span{opacity:0;transition:opacity .2s}.folded:not(.unfolded) :host>.group-title:before{content:'';display:block;position:absolute;min-width:1.6rem;border-top:2px solid;opacity:.2}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavVerticalGroupComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService }
    ]; };
    FuseNavVerticalGroupComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }]
    };
    return FuseNavVerticalGroupComponent;
}());

var FuseNavHorizontalItemComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseNavHorizontalItemComponent() {
        this.classes = 'nav-item';
    }
    FuseNavHorizontalItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-horizontal-item',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n    </ng-template>\n\n</ng-container>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseNavHorizontalItemComponent.ctorParameters = function () { return []; };
    FuseNavHorizontalItemComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }]
    };
    return FuseNavHorizontalItemComponent;
}());

var FuseNavHorizontalCollapsableComponent = /** @class */ (function () {
    function FuseNavHorizontalCollapsableComponent(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        this.isOpen = false;
        this.classes = 'nav-collapsable nav-item';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavHorizontalCollapsableComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this.fuseConfig = config;
        });
    };
    /**
     * On destroy
     */
    FuseNavHorizontalCollapsableComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open
     */
    FuseNavHorizontalCollapsableComponent.prototype.open = function () {
        this.isOpen = true;
    };
    /**
     * Close
     */
    FuseNavHorizontalCollapsableComponent.prototype.close = function () {
        this.isOpen = false;
    };
    FuseNavHorizontalCollapsableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-horizontal-collapsable',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- normal collapse -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && !item.function\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n        <mat-icon class=\"collapsable-arrow\">keyboard_arrow_right</mat-icon>\n    </ng-template>\n\n    <div class=\"children\" [ngClass]=\"{'open': isOpen}\">\n\n        <div class=\"{{fuseConfig.layout.navbar.primaryBackground}}\">\n\n            <ng-container *ngFor=\"let item of item.children\">\n                <fuse-nav-horizontal-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-horizontal-item>\n                <fuse-nav-horizontal-collapsable *ngIf=\"item.type=='collapsable'\"\n                                                 [item]=\"item\"></fuse-nav-horizontal-collapsable>\n                <fuse-nav-horizontal-collapsable *ngIf=\"item.type=='group'\"\n                                                 [item]=\"item\"></fuse-nav-horizontal-collapsable>\n            </ng-container>\n\n        </div>\n\n    </div>\n\n</ng-container>",
                    animations: fuseAnimations,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseNavHorizontalCollapsableComponent.ctorParameters = function () { return [
        { type: FuseConfigService }
    ]; };
    FuseNavHorizontalCollapsableComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }],
        open: [{ type: HostListener, args: ['mouseenter',] }],
        close: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return FuseNavHorizontalCollapsableComponent;
}());

var FuseNavigationModule = /** @class */ (function () {
    function FuseNavigationModule() {
    }
    FuseNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        MatIconModule,
                        MatRippleModule,
                        TranslateModule.forChild()
                    ],
                    exports: [
                        FuseNavigationComponent
                    ],
                    declarations: [
                        FuseNavigationComponent,
                        FuseNavVerticalGroupComponent,
                        FuseNavVerticalItemComponent,
                        FuseNavVerticalCollapsableComponent,
                        FuseNavHorizontalItemComponent,
                        FuseNavHorizontalCollapsableComponent
                    ]
                },] }
    ];
    return FuseNavigationModule;
}());

var FuseProgressBarService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Router} _router
     */
    function FuseProgressBarService(_router) {
        this._router = _router;
        // Initialize the service
        this._init();
    }
    Object.defineProperty(FuseProgressBarService.prototype, "bufferValue", {
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Buffer value
         */
        get: function () {
            return this._bufferValue.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setBufferValue = function (value) {
        this._bufferValue.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "mode", {
        /**
         * Mode
         */
        get: function () {
            return this._mode.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setMode = function (value) {
        this._mode.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "value", {
        /**
         * Value
         */
        get: function () {
            return this._value.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setValue = function (value) {
        this._value.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "visible", {
        /**
         * Visible
         */
        get: function () {
            return this._visible.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FuseProgressBarService.prototype._init = function () {
        var _this = this;
        // Initialize the behavior subjects
        this._bufferValue = new BehaviorSubject(0);
        this._mode = new BehaviorSubject('indeterminate');
        this._value = new BehaviorSubject(0);
        this._visible = new BehaviorSubject(false);
        // Subscribe to the router events to show/hide the loading bar
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationStart; }))
            .subscribe(function () {
            _this.show();
        });
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel; }))
            .subscribe(function () {
            _this.hide();
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the progress bar
     */
    FuseProgressBarService.prototype.show = function () {
        this._visible.next(true);
    };
    /**
     * Hide the progress bar
     */
    FuseProgressBarService.prototype.hide = function () {
        this._visible.next(false);
    };
    FuseProgressBarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseProgressBarService.ctorParameters = function () { return [
        { type: Router }
    ]; };
    FuseProgressBarService.ngInjectableDef = defineInjectable({ factory: function FuseProgressBarService_Factory() { return new FuseProgressBarService(inject(Router)); }, token: FuseProgressBarService, providedIn: "root" });
    return FuseProgressBarService;
}());

var FuseProgressBarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseProgressBarService} _fuseProgressBarService
     */
    function FuseProgressBarComponent(_fuseProgressBarService) {
        // Set the defaults
        this._fuseProgressBarService = _fuseProgressBarService;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseProgressBarComponent.prototype.ngOnInit = function () {
        // Subscribe to the progress bar service properties
        var _this = this;
        // Buffer value
        this._fuseProgressBarService.bufferValue
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (bufferValue) {
            _this.bufferValue = bufferValue;
        });
        // Mode
        this._fuseProgressBarService.mode
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (mode) {
            _this.mode = mode;
        });
        // Value
        this._fuseProgressBarService.value
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            _this.value = value;
        });
        // Visible
        this._fuseProgressBarService.visible
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (visible) {
            _this.visible = visible;
        });
    };
    /**
     * On destroy
     */
    FuseProgressBarComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    FuseProgressBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-progress-bar',
                    template: "<ng-container *ngIf=\"visible\">\n\n    <mat-progress-bar color=\"accent\" [bufferValue]=\"bufferValue\" [mode]=\"mode\" [value]=\"value\"></mat-progress-bar>\n\n</ng-container>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-progress-bar{position:absolute;top:0;left:0;right:0;width:100%;z-index:99998}fuse-progress-bar mat-progress-bar .mat-progress-bar-buffer{background-color:#c5c6cb!important}"]
                }] }
    ];
    /** @nocollapse */
    FuseProgressBarComponent.ctorParameters = function () { return [
        { type: FuseProgressBarService }
    ]; };
    return FuseProgressBarComponent;
}());

var FuseProgressBarModule = /** @class */ (function () {
    function FuseProgressBarModule() {
    }
    FuseProgressBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseProgressBarComponent
                    ],
                    imports: [
                        CommonModule,
                        RouterModule,
                        MatButtonModule,
                        MatIconModule,
                        MatProgressBarModule
                    ],
                    exports: [
                        FuseProgressBarComponent
                    ]
                },] }
    ];
    return FuseProgressBarModule;
}());

var FuseSearchBarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    function FuseSearchBarComponent(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseSearchBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this.fuseConfig = config;
        });
    };
    /**
     * On destroy
     */
    FuseSearchBarComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Collapse
     */
    FuseSearchBarComponent.prototype.collapse = function () {
        this.collapsed = true;
    };
    /**
     * Expand
     */
    FuseSearchBarComponent.prototype.expand = function () {
        this.collapsed = false;
    };
    /**
     * Search
     *
     * @param event
     */
    FuseSearchBarComponent.prototype.search = function (event) {
        this.input.emit(event.target.value);
    };
    FuseSearchBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-search-bar',
                    template: "<div class=\"fuse-search-bar\" [ngClass]=\"{'expanded':!collapsed}\">\n\n    <div class=\"fuse-search-bar-content\">\n\n        <label for=\"fuse-search-bar-input\">\n            <button mat-icon-button class=\"fuse-search-bar-expander\" aria-label=\"Expand Search Bar\" (click)=\"expand()\"\n                    *ngIf=\"collapsed\">\n                <mat-icon class=\"s-24 secondary-text\">search</mat-icon>\n            </button>\n        </label>\n\n        <input id=\"fuse-search-bar-input\" class=\"ml-24\" type=\"text\" placeholder=\"Search\" (input)=\"search($event)\"\n               fxFlex>\n\n        <button mat-icon-button class=\"fuse-search-bar-collapser\" (click)=\"collapse()\"\n                aria-label=\"Collapse Search Bar\">\n            <mat-icon class=\"s-24 secondary-text\">close</mat-icon>\n        </button>\n\n    </div>\n\n</div>",
                    styles: [":host .fuse-search-bar{display:flex;flex:0 1 auto;min-width:64px;height:64px;font-size:13px}:host .fuse-search-bar .fuse-search-bar-content{display:flex;flex:1 1 auto;align-items:center;justify-content:flex-start}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-collapser,:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-expander{cursor:pointer;padding:0 20px;margin:0;width:64px!important;height:64px!important;line-height:64px!important}@media screen and (max-width:599px){:host .fuse-search-bar{height:56px}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-collapser,:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-expander{height:56px!important;line-height:56px!important}}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-loader{width:64px!important;height:64px!important;line-height:64px!important}@media screen and (max-width:599px){:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-loader{height:56px!important;line-height:56px!important}}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-collapser{display:none}:host .fuse-search-bar .fuse-search-bar-content #fuse-search-bar-input{display:none;flex:1 0 auto;min-height:64px;font-size:16px;background-color:transparent;color:currentColor}:host .fuse-search-bar.expanded{position:absolute;top:0;right:0;bottom:0;left:0;z-index:10}:host .fuse-search-bar.expanded .fuse-search-bar-content #fuse-search-bar-input{display:flex}:host .fuse-search-bar.expanded .fuse-search-bar-content .fuse-search-bar-collapser{display:flex}:host body.fuse-search-bar-expanded #toolbar{z-index:999!important}"]
                }] }
    ];
    /** @nocollapse */
    FuseSearchBarComponent.ctorParameters = function () { return [
        { type: FuseConfigService }
    ]; };
    FuseSearchBarComponent.propDecorators = {
        input: [{ type: Output }]
    };
    return FuseSearchBarComponent;
}());

var FuseSearchBarModule = /** @class */ (function () {
    function FuseSearchBarModule() {
    }
    FuseSearchBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseSearchBarComponent
                    ],
                    imports: [
                        CommonModule,
                        RouterModule,
                        MatButtonModule,
                        MatIconModule
                    ],
                    exports: [
                        FuseSearchBarComponent
                    ]
                },] }
    ];
    return FuseSearchBarModule;
}());

var FuseShortcutsComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {CookieService} _cookieService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    function FuseShortcutsComponent(_cookieService, _fuseMatchMediaService, _fuseNavigationService, _mediaObserver, _renderer) {
        this._cookieService = _cookieService;
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseNavigationService = _fuseNavigationService;
        this._mediaObserver = _mediaObserver;
        this._renderer = _renderer;
        // Set the defaults
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseShortcutsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get the navigation items and flatten them
        this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);
        if (this._cookieService.check('FUSE2.shortcuts')) {
            this.shortcutItems = JSON.parse(this._cookieService.get('FUSE2.shortcuts'));
        }
        else {
            // User's shortcut items
            this.shortcutItems = [
                {
                    'title': 'Calendar',
                    'type': 'item',
                    'icon': 'today',
                    'url': '/apps/calendar'
                },
                {
                    'title': 'Mail',
                    'type': 'item',
                    'icon': 'email',
                    'url': '/apps/mail'
                },
                {
                    'title': 'Contacts',
                    'type': 'item',
                    'icon': 'account_box',
                    'url': '/apps/contacts'
                },
                {
                    'title': 'To-Do',
                    'type': 'item',
                    'icon': 'check_box',
                    'url': '/apps/todo'
                }
            ];
        }
        // Subscribe to media changes
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            if (_this._mediaObserver.isActive('gt-sm')) {
                _this.hideMobileShortcutsPanel();
            }
        });
    };
    /**
     * On destroy
     */
    FuseShortcutsComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Search
     *
     * @param event
     */
    FuseShortcutsComponent.prototype.search = function (event) {
        var value = event.target.value.toLowerCase();
        if (value === '') {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;
            return;
        }
        this.searching = true;
        this.filteredNavigationItems = this.navigationItems.filter(function (navigationItem) {
            return navigationItem.title.toLowerCase().includes(value);
        });
    };
    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    FuseShortcutsComponent.prototype.toggleShortcut = function (event, itemToToggle) {
        event.stopPropagation();
        for (var i = 0; i < this.shortcutItems.length; i++) {
            if (this.shortcutItems[i].url === itemToToggle.url) {
                this.shortcutItems.splice(i, 1);
                // Save to the cookies
                this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
                return;
            }
        }
        this.shortcutItems.push(itemToToggle);
        // Save to the cookies
        this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
    };
    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    FuseShortcutsComponent.prototype.isInShortcuts = function (navigationItem) {
        return this.shortcutItems.find(function (item) {
            return item.url === navigationItem.url;
        });
    };
    /**
     * On menu open
     */
    FuseShortcutsComponent.prototype.onMenuOpen = function () {
        var _this = this;
        setTimeout(function () {
            _this.searchInputField.nativeElement.focus();
        });
    };
    /**
     * Show mobile shortcuts
     */
    FuseShortcutsComponent.prototype.showMobileShortcutsPanel = function () {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    };
    /**
     * Hide mobile shortcuts
     */
    FuseShortcutsComponent.prototype.hideMobileShortcutsPanel = function () {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    };
    FuseShortcutsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-shortcuts',
                    template: "<div id=\"fuse-shortcuts\" #shortcuts>\n\n    <div class=\"shortcuts-mobile-toggle\" *ngIf=\"!mobileShortcutsPanelActive\" fxLayout=\"row\" fxLayoutAlign=\"start center\"\n         fxHide fxShow.lt-md>\n        <button mat-icon-button (click)=\"showMobileShortcutsPanel()\">\n            <mat-icon class=\"amber-600-fg\">star</mat-icon>\n        </button>\n    </div>\n\n    <div class=\"shortcuts\" fxLayout=\"row\" fxHide fxShow.gt-sm>\n\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex=\"0 1 auto\">\n\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                <div class=\"w-40 h-40 p-4\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let shortcutItem of shortcutItems\">\n\n                    <a mat-icon-button matTooltip=\"{{shortcutItem.title}}\" [routerLink]=\"shortcutItem.url\">\n                        <mat-icon class=\"secondary-text\" *ngIf=\"shortcutItem.icon\">{{shortcutItem.icon}}</mat-icon>\n                        <span *ngIf=\"!shortcutItem.icon\" class=\"h2 secondary-text text-bold\">\n                            {{shortcutItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n                    </a>\n\n                </div>\n\n                <button mat-icon-button [matMenuTriggerFor]=\"addMenu\" matTooltip=\"Click to add/remove shortcut\"\n                        (menuOpened)=\"onMenuOpen()\">\n                    <mat-icon class=\"amber-600-fg\">star</mat-icon>\n                </button>\n\n            </div>\n\n            <div class=\"shortcuts-mobile-close\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxHide fxShow.lt-md>\n                <button mat-icon-button (click)=\"hideMobileShortcutsPanel()\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </div>\n\n        </div>\n\n        <mat-menu #addMenu=\"matMenu\" class=\"w-240\">\n\n            <mat-form-field class=\"px-16 w-100-p\" (click)=\"$event.stopPropagation()\" floatLabel=\"never\">\n                <input #searchInput matInput placeholder=\"Search for an app or a page\" (input)=\"search($event)\">\n            </mat-form-field>\n\n            <mat-divider></mat-divider>\n\n            <mat-nav-list *ngIf=\"!searching\" style=\"max-height: 312px; overflow: auto\" fusePerfectScrollbar>\n\n                <mat-list-item *ngFor=\"let shortcutItem of shortcutItems\"\n                               (click)=\"toggleShortcut($event, shortcutItem)\">\n\n                    <div class=\"w-100-p\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                        <mat-icon mat-list-icon class=\"mr-8 secondary-text\" *ngIf=\"shortcutItem.icon\">\n                            {{shortcutItem.icon}}\n                        </mat-icon>\n\n                        <span class=\"h2 w-32 h-32 p-4 mr-8 secondary-text text-bold\" fxLayout=\"row\"\n                              fxLayoutAlign=\"center center\" *ngIf=\"!shortcutItem.icon\">\n                            {{shortcutItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n\n                        <p matLine fxFlex>{{shortcutItem.title}}</p>\n\n                        <mat-icon class=\"ml-8 amber-fg\">star</mat-icon>\n\n                    </div>\n\n                </mat-list-item>\n\n                <mat-list-item *ngIf=\"shortcutItems.length === 0\">\n                    <p>\n                        <small>No shortcuts yet!</small>\n                    </p>\n                </mat-list-item>\n\n            </mat-nav-list>\n\n            <mat-nav-list *ngIf=\"searching\" style=\"max-height: 312px; overflow: auto\" fusePerfectScrollbar>\n\n                <mat-list-item *ngFor=\"let navigationItem of filteredNavigationItems\"\n                               (click)=\"toggleShortcut($event, navigationItem)\">\n\n                    <div class=\"w-100-p\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                        <mat-icon mat-list-icon class=\"mr-8 secondary-text\" *ngIf=\"navigationItem.icon\">\n                            {{navigationItem.icon}}\n                        </mat-icon>\n\n                        <span class=\"h2 w-32 h-32 p-4 mr-8 secondary-text text-bold\" fxLayout=\"row\"\n                              fxLayoutAlign=\"center center\" *ngIf=\"!navigationItem.icon\">\n                            {{navigationItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n\n                        <p matLine fxFlex>{{navigationItem.title}}</p>\n\n                        <mat-icon class=\"ml-8 amber-fg\" *ngIf=\"isInShortcuts(navigationItem)\">star</mat-icon>\n\n                    </div>\n\n                </mat-list-item>\n\n            </mat-nav-list>\n\n        </mat-menu>\n\n    </div>\n\n</div>\n",
                    styles: ["@media screen and (max-width:959px){:host #fuse-shortcuts.show-mobile-panel{position:absolute;top:0;right:0;bottom:0;left:0;z-index:99;padding:0 8px}:host #fuse-shortcuts.show-mobile-panel .shortcuts{display:flex!important;flex:1;height:100%}:host #fuse-shortcuts.show-mobile-panel .shortcuts>div{flex:1 1 auto!important}}"]
                }] }
    ];
    /** @nocollapse */
    FuseShortcutsComponent.ctorParameters = function () { return [
        { type: CookieService },
        { type: FuseMatchMediaService },
        { type: FuseNavigationService },
        { type: MediaObserver },
        { type: Renderer2 }
    ]; };
    FuseShortcutsComponent.propDecorators = {
        navigation: [{ type: Input }],
        searchInputField: [{ type: ViewChild, args: ['searchInput',] }],
        shortcutsEl: [{ type: ViewChild, args: ['shortcuts',] }]
    };
    return FuseShortcutsComponent;
}());

var FuseShortcutsModule = /** @class */ (function () {
    function FuseShortcutsModule() {
    }
    FuseShortcutsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseShortcutsComponent
                    ],
                    imports: [
                        CommonModule,
                        RouterModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatDividerModule,
                        MatFormFieldModule,
                        MatIconModule,
                        MatInputModule,
                        MatMenuModule,
                        MatListModule,
                        MatTooltipModule
                    ],
                    exports: [
                        FuseShortcutsComponent
                    ],
                    providers: [
                        CookieService
                    ]
                },] }
    ];
    return FuseShortcutsModule;
}());

var FuseSidebarService = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseSidebarService() {
        // Private
        this._registry = {};
    }
    /**
     * Add the sidebar to the registry
     *
     * @param key
     * @param sidebar
     */
    FuseSidebarService.prototype.register = function (key, sidebar) {
        // Check if the key already being used
        if (this._registry[key]) {
            console.error("The sidebar with the key '" + key + "' already exists. Either unregister it first or use a unique key.");
            return;
        }
        // Add to the registry
        this._registry[key] = sidebar;
    };
    /**
     * Remove the sidebar from the registry
     *
     * @param key
     */
    FuseSidebarService.prototype.unregister = function (key) {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn("The sidebar with the key '" + key + "' doesn't exist in the registry.");
        }
        // Unregister the sidebar
        delete this._registry[key];
    };
    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns {FuseSidebarComponent}
     */
    FuseSidebarService.prototype.getSidebar = function (key) {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn("The sidebar with the key '" + key + "' doesn't exist in the registry.");
            return;
        }
        // Return the sidebar
        return this._registry[key];
    };
    FuseSidebarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseSidebarService.ctorParameters = function () { return []; };
    FuseSidebarService.ngInjectableDef = defineInjectable({ factory: function FuseSidebarService_Factory() { return new FuseSidebarService(); }, token: FuseSidebarService, providedIn: "root" });
    return FuseSidebarService;
}());

var FuseSidebarComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {ElementRef} _elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    function FuseSidebarComponent(_animationBuilder, _changeDetectorRef, _elementRef, _fuseConfigService, _fuseMatchMediaService, _fuseSidebarService, _mediaObserver, _renderer) {
        this._animationBuilder = _animationBuilder;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._fuseConfigService = _fuseConfigService;
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseSidebarService = _fuseSidebarService;
        this._mediaObserver = _mediaObserver;
        this._renderer = _renderer;
        this._backdrop = null;
        // Set the defaults
        this.foldedAutoTriggerOnHover = true;
        this.foldedWidth = 64;
        this.foldedChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.opened = false;
        this.position = 'left';
        this.invisibleOverlay = false;
        // Set the private defaults
        this._animationsEnabled = false;
        this._folded = false;
        this._unsubscribeAll = new Subject();
    }
    Object.defineProperty(FuseSidebarComponent.prototype, "folded", {
        get: function () {
            return this._folded;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Folded
         *
         * @param {boolean} value
         */
        set: function (value) {
            // Set the folded
            this._folded = value;
            // Return if the sidebar is closed
            if (!this.opened) {
                return;
            }
            // Programmatically add/remove padding to the element
            // that comes after or before based on the position
            var sibling, styleRule;
            var styleValue = this.foldedWidth + 'px';
            // Get the sibling and set the style rule
            if (this.position === 'left') {
                sibling = this._elementRef.nativeElement.nextElementSibling;
                styleRule = 'padding-left';
            }
            else {
                sibling = this._elementRef.nativeElement.previousElementSibling;
                styleRule = 'padding-right';
            }
            // If there is no sibling, return...
            if (!sibling) {
                return;
            }
            // If folded...
            if (value) {
                // Fold the sidebar
                this.fold();
                // Set the folded width
                this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
                this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
                this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
                // Set the style and class
                this._renderer.setStyle(sibling, styleRule, styleValue);
                this._renderer.addClass(this._elementRef.nativeElement, 'folded');
            }
            // If unfolded...
            else {
                // Unfold the sidebar
                this.unfold();
                // Remove the folded width
                this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
                this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
                this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');
                // Remove the style and class
                this._renderer.removeStyle(sibling, styleRule);
                this._renderer.removeClass(this._elementRef.nativeElement, 'folded');
            }
            // Emit the 'foldedChanged' event
            this.foldedChanged.emit(this.folded);
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this._fuseConfig = config;
        });
        // Register the sidebar
        this._fuseSidebarService.register(this.name, this);
        // Setup visibility
        this._setupVisibility();
        // Setup position
        this._setupPosition();
        // Setup lockedOpen
        this._setupLockedOpen();
        // Setup folded
        this._setupFolded();
    };
    /**
     * On destroy
     */
    FuseSidebarComponent.prototype.ngOnDestroy = function () {
        // If the sidebar is folded, unfold it to revert modifications
        if (this.folded) {
            this.unfold();
        }
        // Unregister the sidebar
        this._fuseSidebarService.unregister(this.name);
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setup the visibility of the sidebar
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupVisibility = function () {
        // Remove the existing box-shadow
        this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');
        // Make the sidebar invisible
        this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    };
    /**
     * Setup the sidebar position
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupPosition = function () {
        // Add the correct class name to the sidebar
        // element depending on the position attribute
        if (this.position === 'right') {
            this._renderer.addClass(this._elementRef.nativeElement, 'right-positioned');
        }
        else {
            this._renderer.addClass(this._elementRef.nativeElement, 'left-positioned');
        }
    };
    /**
     * Setup the lockedOpen handler
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupLockedOpen = function () {
        var _this = this;
        // Return if the lockedOpen wasn't set
        if (!this.lockedOpen) {
            // Return
            return;
        }
        // Set the wasActive for the first time
        this._wasActive = false;
        // Set the wasFolded
        this._wasFolded = this.folded;
        // Show the sidebar
        this._showSidebar();
        // Act on every media change
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Get the active status
            var isActive = _this._mediaObserver.isActive(_this.lockedOpen);
            // If the both status are the same, don't act
            if (_this._wasActive === isActive) {
                return;
            }
            // Activate the lockedOpen
            if (isActive) {
                // Set the lockedOpen status
                _this.isLockedOpen = true;
                // Show the sidebar
                _this._showSidebar();
                // Force the the opened status to true
                _this.opened = true;
                // Emit the 'openedChanged' event
                _this.openedChanged.emit(_this.opened);
                // If the sidebar was folded, forcefully fold it again
                if (_this._wasFolded) {
                    // Enable the animations
                    _this._enableAnimations();
                    // Fold
                    _this.folded = true;
                    // Mark for check
                    _this._changeDetectorRef.markForCheck();
                }
                // Hide the backdrop if any exists
                _this._hideBackdrop();
            }
            // De-Activate the lockedOpen
            else {
                // Set the lockedOpen status
                _this.isLockedOpen = false;
                // Unfold the sidebar in case if it was folded
                _this.unfold();
                // Force the the opened status to close
                _this.opened = false;
                // Emit the 'openedChanged' event
                _this.openedChanged.emit(_this.opened);
                // Hide the sidebar
                _this._hideSidebar();
            }
            // Store the new active status
            _this._wasActive = isActive;
        });
    };
    /**
     * Setup the initial folded status
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupFolded = function () {
        // Return, if sidebar is not folded
        if (!this.folded) {
            return;
        }
        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }
        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        var sibling, styleRule;
        var styleValue = this.foldedWidth + 'px';
        // Get the sibling and set the style rule
        if (this.position === 'left') {
            sibling = this._elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this._elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }
        // If there is no sibling, return...
        if (!sibling) {
            return;
        }
        // Fold the sidebar
        this.fold();
        // Set the folded width
        this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
        // Set the style and class
        this._renderer.setStyle(sibling, styleRule, styleValue);
        this._renderer.addClass(this._elementRef.nativeElement, 'folded');
    };
    /**
     * Show the backdrop
     *
     * @private
     */
    FuseSidebarComponent.prototype._showBackdrop = function () {
        var _this = this;
        // Create the backdrop element
        this._backdrop = this._renderer.createElement('div');
        // Add a class to the backdrop element
        this._backdrop.classList.add('fuse-sidebar-overlay');
        // Add a class depending on the invisibleOverlay option
        if (this.invisibleOverlay) {
            this._backdrop.classList.add('fuse-sidebar-overlay-invisible');
        }
        // Append the backdrop to the parent of the sidebar
        this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdrop);
        // Create the enter animation and attach it to the player
        this._player =
            this._animationBuilder
                .build([
                animate('300ms ease', style({ opacity: 1 }))
            ]).create(this._backdrop);
        // Play the animation
        this._player.play();
        // Add an event listener to the overlay
        this._backdrop.addEventListener('click', function () {
            _this.close();
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Hide the backdrop
     *
     * @private
     */
    FuseSidebarComponent.prototype._hideBackdrop = function () {
        var _this = this;
        if (!this._backdrop) {
            return;
        }
        // Create the leave animation and attach it to the player
        this._player =
            this._animationBuilder
                .build([
                animate('300ms ease', style({ opacity: 0 }))
            ]).create(this._backdrop);
        // Play the animation
        this._player.play();
        // Once the animation is done...
        this._player.onDone(function () {
            // If the backdrop still exists...
            if (_this._backdrop) {
                // Remove the backdrop
                _this._backdrop.parentNode.removeChild(_this._backdrop);
                _this._backdrop = null;
            }
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Change some properties of the sidebar
     * and make it visible
     *
     * @private
     */
    FuseSidebarComponent.prototype._showSidebar = function () {
        // Remove the box-shadow style
        this._renderer.removeStyle(this._elementRef.nativeElement, 'box-shadow');
        // Make the sidebar invisible
        this._renderer.removeStyle(this._elementRef.nativeElement, 'visibility');
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Change some properties of the sidebar
     * and make it invisible
     *
     * @private
     */
    FuseSidebarComponent.prototype._hideSidebar = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = true; }
        var delayAmount = delay ? 300 : 0;
        // Add a delay so close animation can play
        setTimeout(function () {
            // Remove the box-shadow
            _this._renderer.setStyle(_this._elementRef.nativeElement, 'box-shadow', 'none');
            // Make the sidebar invisible
            _this._renderer.setStyle(_this._elementRef.nativeElement, 'visibility', 'hidden');
        }, delayAmount);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Enable the animations
     *
     * @private
     */
    FuseSidebarComponent.prototype._enableAnimations = function () {
        // Return if animations already enabled
        if (this._animationsEnabled) {
            return;
        }
        // Enable the animations
        this._animationsEnabled = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the sidebar
     */
    FuseSidebarComponent.prototype.open = function () {
        if (this.opened || this.isLockedOpen) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Show the sidebar
        this._showSidebar();
        // Show the backdrop
        this._showBackdrop();
        // Set the opened status
        this.opened = true;
        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Close the sidebar
     */
    FuseSidebarComponent.prototype.close = function () {
        if (!this.opened || this.isLockedOpen) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Hide the backdrop
        this._hideBackdrop();
        // Set the opened status
        this.opened = false;
        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);
        // Hide the sidebar
        this._hideSidebar();
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Toggle open/close the sidebar
     */
    FuseSidebarComponent.prototype.toggleOpen = function () {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Mouseenter
     */
    FuseSidebarComponent.prototype.onMouseEnter = function () {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }
        this.unfoldTemporarily();
    };
    /**
     * Mouseleave
     */
    FuseSidebarComponent.prototype.onMouseLeave = function () {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }
        this.foldTemporarily();
    };
    /**
     * Fold the sidebar permanently
     */
    FuseSidebarComponent.prototype.fold = function () {
        // Only work if the sidebar is not folded
        if (this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Fold
        this.folded = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Unfold the sidebar permanently
     */
    FuseSidebarComponent.prototype.unfold = function () {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Unfold
        this.folded = false;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Toggle the sidebar fold/unfold permanently
     */
    FuseSidebarComponent.prototype.toggleFold = function () {
        if (this.folded) {
            this.unfold();
        }
        else {
            this.fold();
        }
    };
    /**
     * Fold the temporarily unfolded sidebar back
     */
    FuseSidebarComponent.prototype.foldTemporarily = function () {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Fold the sidebar back
        this.unfolded = false;
        // Set the folded width
        var styleValue = this.foldedWidth + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Unfold the sidebar temporarily
     */
    FuseSidebarComponent.prototype.unfoldTemporarily = function () {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Unfold the sidebar temporarily
        this.unfolded = true;
        // Remove the folded width
        this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
        this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
        this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    FuseSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-sidebar',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-sidebar{display:flex;flex-direction:column;flex:1 0 auto;position:absolute;top:0;bottom:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;width:280px;min-width:280px;max-width:280px;z-index:1000;box-shadow:0 2px 8px 0 rgba(0,0,0,.35)}@media screen and (max-width:599px){fuse-sidebar{min-width:0!important;max-width:80vw!important;width:80vw!important}}fuse-sidebar.left-positioned{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}fuse-sidebar.right-positioned{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}fuse-sidebar.open{-webkit-transform:translateX(0);transform:translateX(0)}fuse-sidebar.locked-open{position:relative!important;-webkit-transform:translateX(0)!important;transform:translateX(0)!important}fuse-sidebar.folded{position:absolute!important;top:0;bottom:0}fuse-sidebar.animations-enabled{transition-property:transform,width,min-width,max-width,-webkit-transform;transition-duration:150ms;transition-timing-function:ease-in-out}.fuse-sidebar-overlay{position:absolute;top:0;bottom:0;left:0;right:0;z-index:999;opacity:0}"]
                }] }
    ];
    /** @nocollapse */
    FuseSidebarComponent.ctorParameters = function () { return [
        { type: AnimationBuilder },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: FuseConfigService },
        { type: FuseMatchMediaService },
        { type: FuseSidebarService },
        { type: MediaObserver },
        { type: Renderer2 }
    ]; };
    FuseSidebarComponent.propDecorators = {
        name: [{ type: Input }],
        key: [{ type: Input }],
        position: [{ type: Input }],
        opened: [{ type: HostBinding, args: ['class.open',] }],
        lockedOpen: [{ type: Input }],
        isLockedOpen: [{ type: HostBinding, args: ['class.locked-open',] }],
        foldedWidth: [{ type: Input }],
        foldedAutoTriggerOnHover: [{ type: Input }],
        unfolded: [{ type: HostBinding, args: ['class.unfolded',] }],
        invisibleOverlay: [{ type: Input }],
        foldedChanged: [{ type: Output }],
        openedChanged: [{ type: Output }],
        _animationsEnabled: [{ type: HostBinding, args: ['class.animations-enabled',] }],
        folded: [{ type: Input }],
        onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return FuseSidebarComponent;
}());

var FuseSidebarModule = /** @class */ (function () {
    function FuseSidebarModule() {
    }
    FuseSidebarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseSidebarComponent
                    ],
                    exports: [
                        FuseSidebarComponent
                    ]
                },] }
    ];
    return FuseSidebarModule;
}());

var FuseThemeOptionsComponent = /** @class */ (function () {
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
    function FuseThemeOptionsComponent(document, _formBuilder, _fuseConfigService, _fuseNavigationService, _fuseSidebarService, _renderer) {
        this.document = document;
        this._formBuilder = _formBuilder;
        this._fuseConfigService = _fuseConfigService;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseSidebarService = _fuseSidebarService;
        this._renderer = _renderer;
        // Set the defaults
        this.barClosed = true;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseThemeOptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Build the config form
        // noinspection TypeScriptValidateTypes
        this.form = this._formBuilder.group({
            colorTheme: new FormControl(),
            customScrollbars: new FormControl(),
            layout: this._formBuilder.group({
                style: new FormControl(),
                width: new FormControl(),
                navbar: this._formBuilder.group({
                    primaryBackground: new FormControl(),
                    secondaryBackground: new FormControl(),
                    folded: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl(),
                    variant: new FormControl()
                }),
                toolbar: this._formBuilder.group({
                    background: new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl()
                }),
                footer: this._formBuilder.group({
                    background: new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl()
                }),
                sidepanel: this._formBuilder.group({
                    hidden: new FormControl(),
                    position: new FormControl()
                })
            })
        });
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            // Update the stored config
            _this.fuseConfig = config;
            // Set the config form values without emitting an event
            // so that we don't end up with an infinite loop
            _this.form.setValue(config, { emitEvent: false });
        });
        // Subscribe to the specific form value changes (layout.style)
        this.form.get('layout.style').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            // Reset the form values based on the
            // selected layout style
            _this._resetFormValues(value);
        });
        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            // Update the config
            _this._fuseConfigService.config = config;
        });
        // Add customize nav item that opens the bar programmatically
        var customFunctionNavItem = {
            'id': 'custom-function',
            'title': 'Custom Function',
            'type': 'group',
            'icon': 'settings',
            'children': [
                {
                    'id': 'customize',
                    'title': 'Customize',
                    'type': 'item',
                    'icon': 'settings',
                    'function': function () {
                        _this.toggleSidebarOpen('themeOptionsPanel');
                    }
                }
            ]
        };
        this._fuseNavigationService.addNavigationItem(customFunctionNavItem, 'end');
    };
    /**
     * On destroy
     */
    FuseThemeOptionsComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // Remove the custom function menu
        this._fuseNavigationService.removeNavigationItem('custom-function');
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    FuseThemeOptionsComponent.prototype._resetFormValues = function (value) {
        switch (value) {
            // Vertical Layout #1
            case 'vertical-layout-1':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'left',
                                variant: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'below-static'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'below-static'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
            // Vertical Layout #2
            case 'vertical-layout-2':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'left',
                                variant: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'below'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'below'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
            // Vertical Layout #3
            case 'vertical-layout-3':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'left',
                                layout: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'above-static'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'above-static'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
            // Horizontal Layout #1
            case 'horizontal-layout-1':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'top',
                                variant: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'above'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'above-fixed'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
        }
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    FuseThemeOptionsComponent.prototype.toggleSidebarOpen = function (key) {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    };
    FuseThemeOptionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-theme-options',
                    template: "<div class=\"theme-options-panel\" fusePerfectScrollbar>\n\n    <div class=\"header\">\n\n        <span class=\"title\">Theme Options</span>\n\n        <button mat-icon-button class=\"close-button\" (click)=\"toggleSidebarOpen('themeOptionsPanel')\">\n            <mat-icon>close</mat-icon>\n        </button>\n\n    </div>\n\n    <form [formGroup]=\"form\">\n\n        <!-- COLOR THEME -->\n        <div class=\"group\">\n\n            <h2>Color themes</h2>\n\n            <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"colorTheme\">\n                <mat-radio-button class=\"mb-12\" value=\"theme-default\">Default Light</mat-radio-button>\n                <mat-radio-button class=\"mb-12\" value=\"theme-yellow-light\">Yellow Light</mat-radio-button>\n                <mat-radio-button class=\"mb-12\" value=\"theme-blue-gray-dark\">Blue-Gray Dark</mat-radio-button>\n                <mat-radio-button class=\"mb-12\" value=\"theme-pink-dark\">Pink Dark</mat-radio-button>\n            </mat-radio-group>\n\n        </div>\n\n        <!-- LAYOUT STYLES -->\n        <div class=\"group\" formGroupName=\"layout\">\n\n            <h2>Layout Styles</h2>\n\n            <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"style\">\n\n                <mat-radio-button class=\"mb-12\" value=\"vertical-layout-1\">\n                    Vertical Layout #1\n                </mat-radio-button>\n\n                <mat-radio-button class=\"mb-12\" value=\"vertical-layout-2\">\n                    Vertical Layout #2\n                </mat-radio-button>\n\n                <mat-radio-button class=\"mb-12\" value=\"vertical-layout-3\">\n                    Vertical Layout #3\n                </mat-radio-button>\n\n                <mat-radio-button class=\"mb-12\" value=\"horizontal-layout-1\">\n                    Horizontal Layout #1\n                </mat-radio-button>\n\n            </mat-radio-group>\n\n            <!-- DIFFERENT FORMS BASED ON LAYOUT STYLES -->\n            <ng-container [ngSwitch]=\"fuseConfig.layout.style\">\n\n                <!-- VERTICAL LAYOUT #1 -->\n                <ng-container *ngSwitchCase=\"'vertical-layout-1'\">\n\n                    <!-- LAYOUT WIDTH -->\n                    <div class=\"group mt-32\">\n\n                        <h2>Layout Width</h2>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"width\">\n                            <mat-radio-button class=\"mb-12\" value=\"fullwidth\">Fullwidth</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"boxed\">Boxed</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                    <!-- NAVBAR -->\n                    <div class=\"group\" formGroupName=\"navbar\">\n\n                        <h2>Navbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <mat-slide-toggle class=\"mt-24\" formControlName=\"folded\">\n                            Folded\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-16\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-8\">Variant:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"variant\">\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-1\">Style 1</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-2\">Style 2</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-16 mb-8\">Primary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"primaryBackground\"></fuse-material-color-picker>\n\n                        <h3 class=\"mt-16 mb-8\">Secondary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"secondaryBackground\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- TOOLBAR -->\n                    <div class=\"group\" formGroupName=\"toolbar\">\n\n                        <h2>Toolbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above\">Above</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below-static\">Below Static</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below-fixed\">Below Fixed</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- FOOTER -->\n                    <div class=\"group\" formGroupName=\"footer\">\n\n                        <h2>Footer</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above\">Above</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below-static\">Below Static</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below-fixed\">Below Fixed</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- SIDE PANEL -->\n                    <div class=\"group\" formGroupName=\"sidepanel\">\n\n                        <h2>Side Panel</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                </ng-container>\n\n                <!-- VERTICAL LAYOUT #2 -->\n                <ng-container *ngSwitchCase=\"'vertical-layout-2'\">\n\n                    <!-- LAYOUT WIDTH -->\n                    <div class=\"group mt-32\">\n\n                        <h2>Layout Width</h2>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"width\">\n                            <mat-radio-button class=\"mb-12\" value=\"fullwidth\">Fullwidth</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"boxed\">Boxed</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                    <!-- NAVBAR -->\n                    <div class=\"group\" formGroupName=\"navbar\">\n\n                        <h2>Navbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <mat-slide-toggle class=\"mt-24\" formControlName=\"folded\">\n                            Folded\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-16\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-8\">Variant:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"variant\">\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-1\">Style 1</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-2\">Style 2</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-16 mb-8\">Primary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"primaryBackground\"></fuse-material-color-picker>\n\n                        <h3 class=\"mt-16 mb-8\">Secondary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"secondaryBackground\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- TOOLBAR -->\n                    <div class=\"group\" formGroupName=\"toolbar\">\n\n                        <h2>Toolbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above-static\">Above Static</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"above-fixed\">Above Fixed</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below\">Below</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- FOOTER -->\n                    <div class=\"group\" formGroupName=\"footer\">\n\n                        <h2>Footer</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above-static\">Above Static</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"above-fixed\">Above Fixed</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below\">Below</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- SIDE PANEL -->\n                    <div class=\"group\" formGroupName=\"sidepanel\">\n\n                        <h2>Side Panel</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                </ng-container>\n\n                <!-- VERTICAL LAYOUT #3 -->\n                <ng-container *ngSwitchCase=\"'vertical-layout-3'\">\n\n                    <!-- LAYOUT WIDTH -->\n                    <div class=\"group mt-32\">\n\n                        <h2>Layout Width</h2>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"width\">\n                            <mat-radio-button class=\"mb-12\" value=\"fullwidth\">Fullwidth</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"boxed\">Boxed</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                    <!-- NAVBAR -->\n                    <div class=\"group\" formGroupName=\"navbar\">\n\n                        <h2>Navbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <mat-slide-toggle class=\"mt-24\" formControlName=\"folded\">\n                            Folded\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-16\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-8\">Variant:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"variant\">\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-1\">Style 1</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-2\">Style 2</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-16 mb-8\">Primary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"primaryBackground\"></fuse-material-color-picker>\n\n                        <h3 class=\"mt-16 mb-8\">Secondary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"secondaryBackground\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- TOOLBAR -->\n                    <div class=\"group\" formGroupName=\"toolbar\">\n\n                        <h2>Toolbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above-static\">Above Static</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"above-fixed\">Above Fixed</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- FOOTER -->\n                    <div class=\"group\" formGroupName=\"footer\">\n\n                        <h2>Footer</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above-static\">Above Static</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"above-fixed\">Above Fixed</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- SIDE PANEL -->\n                    <div class=\"group\" formGroupName=\"sidepanel\">\n\n                        <h2>Side Panel</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                </ng-container>\n\n                <!-- HORIZONTAL LAYOUT #1 -->\n                <ng-container *ngSwitchCase=\"'horizontal-layout-1'\">\n\n                    <!-- LAYOUT WIDTH -->\n                    <div class=\"group mt-32\">\n\n                        <h2>Layout Width</h2>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"width\">\n                            <mat-radio-button class=\"mb-12\" value=\"fullwidth\">Fullwidth</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"boxed\">Boxed</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                    <!-- NAVBAR -->\n                    <div class=\"group\" formGroupName=\"navbar\">\n\n                        <h2>Navbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-16\" value=\"top\">Top</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-8\">Variant (Vertical):</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"variant\">\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-1\">Style 1</mat-radio-button>\n                            <mat-radio-button class=\"mb-16\" value=\"vertical-style-2\">Style 2</mat-radio-button>\n                        </mat-radio-group>\n\n                        <h3 class=\"mt-16 mb-8\">Primary background:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"primaryBackground\">\n                        </fuse-material-color-picker>\n\n                        <h3 class=\"mt-16 mb-8\">Secondary background (Vertical):</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"secondaryBackground\">\n                        </fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- TOOLBAR -->\n                    <div class=\"group\" formGroupName=\"toolbar\">\n\n                        <h2>Toolbar</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above\">Above</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"below\">Below</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- FOOTER -->\n                    <div class=\"group\" formGroupName=\"footer\">\n\n                        <h2>Footer</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"above-fixed\">Above Fixed</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"above-static\">Above Static</mat-radio-button>\n                        </mat-radio-group>\n\n                        <mat-checkbox class=\"mt-24\" formControlName=\"customBackgroundColor\">\n                            Use custom background color\n                        </mat-checkbox>\n\n                        <h3 class=\"mt-24 mb-8\">Background color:</h3>\n                        <fuse-material-color-picker class=\"mb-16\"\n                                                    formControlName=\"background\"></fuse-material-color-picker>\n\n                    </div>\n\n                    <!-- SIDE PANEL -->\n                    <div class=\"group\" formGroupName=\"sidepanel\">\n\n                        <h2>Side Panel</h2>\n\n                        <mat-slide-toggle formControlName=\"hidden\">\n                            Hide\n                        </mat-slide-toggle>\n\n                        <h3 class=\"mt-24\">Position:</h3>\n                        <mat-radio-group fxLayout=\"column\" fxLayoutAlign=\"start start\" formControlName=\"position\">\n                            <mat-radio-button class=\"mb-12\" value=\"left\">Left</mat-radio-button>\n                            <mat-radio-button class=\"mb-12\" value=\"right\">Right</mat-radio-button>\n                        </mat-radio-group>\n\n                    </div>\n\n                </ng-container>\n\n            </ng-container>\n\n        </div>\n\n        <!-- CUSTOM SCROLLBARS -->\n        <div class=\"group\">\n\n            <h2>Custom scrollbars</h2>\n\n            <mat-slide-toggle class=\"mb-12\" formControlName=\"customScrollbars\">\n                Enable custom scrollbars\n            </mat-slide-toggle>\n\n        </div>\n\n    </form>\n\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    animations: fuseAnimations,
                    styles: ["@-webkit-keyframes rotating{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}fuse-theme-options{display:flex;overflow:hidden}fuse-theme-options .theme-options-panel{display:flex;flex-direction:column;flex:1 0 auto;padding:40px 24px 24px;overflow:auto;-webkit-overflow-scrolling:touch}fuse-theme-options .theme-options-panel .header{display:flex;flex:0 1 auto;margin-bottom:32px;align-items:center;justify-content:space-between}fuse-theme-options .theme-options-panel .header .title{font-size:20px;font-weight:600;padding-left:4px}fuse-theme-options .theme-options-panel form{display:flex;flex:1 1 auto;flex-direction:column}fuse-theme-options .theme-options-panel form .group{display:flex;flex:1 0 auto;flex-direction:column;position:relative;border-radius:2px;padding:28px 16px 8px;margin:16px 0}fuse-theme-options .theme-options-panel form .group h2{position:absolute;top:-11px;left:8px;margin:0;padding:0 8px;font-size:16px;font-weight:600}fuse-theme-options .theme-options-panel form .group h3{font-size:14px;font-weight:600;margin:24px 0 16px;padding:0}fuse-theme-options .theme-options-panel form .group h3:first-of-type{margin-top:0}"]
                }] }
    ];
    /** @nocollapse */
    FuseThemeOptionsComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: FormBuilder },
        { type: FuseConfigService },
        { type: FuseNavigationService },
        { type: FuseSidebarService },
        { type: Renderer2 }
    ]; };
    FuseThemeOptionsComponent.propDecorators = {
        barClosed: [{ type: HostBinding, args: ['class.bar-closed',] }]
    };
    return FuseThemeOptionsComponent;
}());

var FuseThemeOptionsModule = /** @class */ (function () {
    function FuseThemeOptionsModule() {
    }
    FuseThemeOptionsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseThemeOptionsComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FlexLayoutModule,
                        MatButtonModule,
                        MatCheckboxModule,
                        MatDividerModule,
                        MatFormFieldModule,
                        MatIconModule,
                        MatOptionModule,
                        MatRadioModule,
                        MatSelectModule,
                        MatSlideToggleModule,
                        FuseDirectivesModule,
                        FuseMaterialColorPickerModule,
                        FuseSidebarModule
                    ],
                    exports: [
                        FuseThemeOptionsComponent
                    ]
                },] }
    ];
    return FuseThemeOptionsModule;
}());

var FuseWidgetToggleDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    function FuseWidgetToggleDirective(elementRef) {
        this.elementRef = elementRef;
    }
    FuseWidgetToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fuseWidgetToggle]'
                },] }
    ];
    /** @nocollapse */
    FuseWidgetToggleDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return FuseWidgetToggleDirective;
}());

var FuseWidgetComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    function FuseWidgetComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.flipped = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After content init
     */
    FuseWidgetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Listen for the flip button click
        setTimeout(function () {
            _this.toggleButtons.forEach(function (flipButton) {
                _this._renderer.listen(flipButton.elementRef.nativeElement, 'click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.toggle();
                });
            });
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle the flipped status
     */
    FuseWidgetComponent.prototype.toggle = function () {
        this.flipped = !this.flipped;
    };
    FuseWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-widget',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-widget{display:block;position:relative;-webkit-perspective:3000px;perspective:3000px;padding:12px}fuse-widget>div{position:relative;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;transition:transform 1s;transition:transform 1s,-webkit-transform 1s}fuse-widget>.fuse-widget-front{display:flex;flex-direction:column;flex:1 1 auto;position:relative;overflow:hidden;visibility:visible;width:100%;opacity:1;z-index:10;border-radius:8px;transition:transform .5s ease-out,visibility ease-in .2s,opacity ease-in .2s,-webkit-transform .5s ease-out;-webkit-transform:rotateY(0);transform:rotateY(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid}fuse-widget>.fuse-widget-back{display:block;position:absolute;top:12px;right:12px;bottom:12px;left:12px;overflow:hidden;visibility:hidden;opacity:0;z-index:10;border-radius:8px;transition:transform .5s ease-out,visibility ease-in .2s,opacity ease-in .2s,-webkit-transform .5s ease-out;-webkit-transform:rotateY(180deg);transform:rotateY(180deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid}fuse-widget>.fuse-widget-back [fuseWidgetToggle]{position:absolute;top:0;right:0}fuse-widget.flipped>.fuse-widget-front{visibility:hidden;opacity:0;-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}fuse-widget.flipped>.fuse-widget-back{display:block;visibility:visible;opacity:1;-webkit-transform:rotateY(360deg);transform:rotateY(360deg)}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-wrapper{padding:16px 0}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-wrapper .mat-form-field-infix{border:none;padding:0}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-underline{display:none}"]
                }] }
    ];
    /** @nocollapse */
    FuseWidgetComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    FuseWidgetComponent.propDecorators = {
        flipped: [{ type: HostBinding, args: ['class.flipped',] }],
        toggleButtons: [{ type: ContentChildren, args: [FuseWidgetToggleDirective, { descendants: true },] }]
    };
    return FuseWidgetComponent;
}());

var FuseWidgetModule = /** @class */ (function () {
    function FuseWidgetModule() {
    }
    FuseWidgetModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FuseWidgetComponent,
                        FuseWidgetToggleDirective
                    ],
                    exports: [
                        FuseWidgetComponent,
                        FuseWidgetToggleDirective
                    ],
                },] }
    ];
    return FuseWidgetModule;
}());

var FuseTranslationLoaderService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
    function FuseTranslationLoaderService(_translateService) {
        this._translateService = _translateService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Load translations
     *
     * @param {Locale} args
     */
    FuseTranslationLoaderService.prototype.loadTranslations = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var locales = __spread(args);
        locales.forEach(function (locale) {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            _this._translateService.setTranslation(locale.lang, locale.data, true);
        });
    };
    FuseTranslationLoaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseTranslationLoaderService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    FuseTranslationLoaderService.ngInjectableDef = defineInjectable({ factory: function FuseTranslationLoaderService_Factory() { return new FuseTranslationLoaderService(inject(TranslateService)); }, token: FuseTranslationLoaderService, providedIn: "root" });
    return FuseTranslationLoaderService;
}());

var FuseSplashScreenService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param _document
     * @param {Router} _router
     */
    function FuseSplashScreenService(_animationBuilder, _document, _router) {
        this._animationBuilder = _animationBuilder;
        this._document = _document;
        this._router = _router;
        // Initialize
        this._init();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FuseSplashScreenService.prototype._init = function () {
        var _this = this;
        // Get the splash screen element
        this.splashScreenEl = this._document.body.querySelector('#fuse-splash-screen');
        // If the splash screen element exists...
        if (this.splashScreenEl) {
            // Hide it on the first NavigationEnd event
            this._router.events
                .pipe(filter((function (event) { return event instanceof NavigationEnd; })), take(1))
                .subscribe(function () {
                setTimeout(function () {
                    _this.hide();
                });
            });
        }
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the splash screen
     */
    FuseSplashScreenService.prototype.show = function () {
        var _this = this;
        this.player =
            this._animationBuilder
                .build([
                style({
                    opacity: '0',
                    zIndex: '99999'
                }),
                animate('400ms ease', style({ opacity: '1' }))
            ]).create(this.splashScreenEl);
        setTimeout(function () {
            _this.player.play();
        }, 0);
    };
    /**
     * Hide the splash screen
     */
    FuseSplashScreenService.prototype.hide = function () {
        var _this = this;
        this.player =
            this._animationBuilder
                .build([
                style({ opacity: '1' }),
                animate('400ms ease', style({
                    opacity: '0',
                    zIndex: '-10'
                }))
            ]).create(this.splashScreenEl);
        setTimeout(function () {
            _this.player.play();
        }, 0);
    };
    FuseSplashScreenService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseSplashScreenService.ctorParameters = function () { return [
        { type: AnimationBuilder },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: Router }
    ]; };
    FuseSplashScreenService.ngInjectableDef = defineInjectable({ factory: function FuseSplashScreenService_Factory() { return new FuseSplashScreenService(inject(AnimationBuilder), inject(DOCUMENT), inject(Router)); }, token: FuseSplashScreenService, providedIn: "root" });
    return FuseSplashScreenService;
}());

/**
 * This class is based on the code in the following projects:
 * https://github.com/zenorocha/select
 * https://github.com/zenorocha/clipboard.js/
 *
 * Both released under MIT license - © Zeno Rocha
 */
var FuseCopierService = /** @class */ (function () {
    function FuseCopierService() {
    }
    /**
     * Copy the text value to the clipboard
     *
     * @param {string} text
     * @returns {boolean}
     */
    FuseCopierService.prototype.copyText = function (text) {
        this.createTextareaAndSelect(text);
        var copySuccessful = document.execCommand('copy');
        this._removeFake();
        return copySuccessful;
    };
    /**
     * Creates a hidden textarea element, sets its value from `text` property,
     * and makes a selection on it.
     *
     * @param {string} text
     */
    FuseCopierService.prototype.createTextareaAndSelect = function (text) {
        // Create a fake element to hold the contents to copy
        this.textarea = document.createElement('textarea');
        // Prevent zooming on iOS
        this.textarea.style.fontSize = '12pt';
        // Hide the element
        this.textarea.classList.add('cdk-visually-hidden');
        // Move element to the same position vertically
        var yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.textarea.style.top = yPosition + 'px';
        this.textarea.setAttribute('readonly', '');
        this.textarea.value = text;
        document.body.appendChild(this.textarea);
        this.textarea.select();
        this.textarea.setSelectionRange(0, this.textarea.value.length);
    };
    /**
     * Remove the text area from the DOM
     *
     * @private
     */
    FuseCopierService.prototype._removeFake = function () {
        if (this.textarea) {
            document.body.removeChild(this.textarea);
            this.textarea = null;
        }
    };
    FuseCopierService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    FuseCopierService.ngInjectableDef = defineInjectable({ factory: function FuseCopierService_Factory() { return new FuseCopierService(); }, token: FuseCopierService, providedIn: "root" });
    return FuseCopierService;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { fuseAnimations as ɵr, FuseCountdownComponent as ɵl, FuseDemoContentComponent as ɵm, FuseDemoSidebarComponent as ɵn, FuseHighlightComponent as ɵo, FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR as ɵp, FuseMaterialColorPickerComponent as ɵq, FuseNavHorizontalCollapsableComponent as ɵx, FuseNavHorizontalItemComponent as ɵw, FuseNavigationComponent as ɵs, FuseNavVerticalCollapsableComponent as ɵv, FuseNavVerticalGroupComponent as ɵt, FuseNavVerticalItemComponent as ɵu, FuseProgressBarComponent as ɵy, FuseProgressBarService as ɵz, FuseSearchBarComponent as ɵba, FuseShortcutsComponent as ɵbb, FuseSidebarComponent as ɵbc, FuseThemeOptionsComponent as ɵbd, FuseWidgetToggleDirective as ɵbf, FuseWidgetComponent as ɵbe, FuseDirectivesModule as ɵa, FuseIfOnDomDirective as ɵb, FuseInnerScrollDirective as ɵc, FuseMatSidenavHelperDirective as ɵd, FuseMatSidenavTogglerDirective as ɵe, FuseMatSidenavHelperService as ɵf, CamelCaseToDashPipe as ɵk, FilterPipe as ɵj, GetByIdPipe as ɵh, HtmlToPlaintextPipe as ɵi, KeysPipe as ɵg, FuseModule, FuseSharedModule, fuseAnimations, FuseConfirmDialogModule, FuseCountdownModule, FuseDemoModule, FuseHighlightModule, FuseMaterialColorPickerModule, FuseNavigationModule, FuseProgressBarModule, FuseSearchBarModule, FuseShortcutsModule, FuseSidebarModule, FuseThemeOptionsModule, FuseWidgetModule, FusePipesModule, MatColors, FuseUtils, FuseTranslationLoaderService, FuseSplashScreenService, FUSE_CONFIG, FuseConfigService, FuseCopierService, FuseMatchMediaService, FuseNavigationService, FuseSidebarService, FuseConfirmDialogComponent, FusePerfectScrollbarDirective };

//# sourceMappingURL=mdt-fuse.js.map