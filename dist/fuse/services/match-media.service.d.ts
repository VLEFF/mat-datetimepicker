import { MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject } from 'rxjs';
export declare class FuseMatchMediaService {
    private _mediaObserver;
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string>;
    /**
     * Constructor
     *
     * @param {MediaObserver} _mediaObserver
     */
    constructor(_mediaObserver: MediaObserver);
    /**
     * Initialize
     *
     * @private
     */
    private _init;
}
