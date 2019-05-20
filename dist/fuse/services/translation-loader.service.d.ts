import { TranslateService } from '@ngx-translate/core';
export interface Locale {
    lang: string;
    data: Object;
}
export declare class FuseTranslationLoaderService {
    private _translateService;
    /**
     * Constructor
     *
     * @param {TranslateService} _translateService
     */
    constructor(_translateService: TranslateService);
    /**
     * Load translations
     *
     * @param {Locale} args
     */
    loadTranslations(...args: Locale[]): void;
}
