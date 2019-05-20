import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import '../../components/highlight/prism-languages';
export declare class FuseHighlightComponent implements OnInit, OnDestroy {
    private _elementRef;
    private _httpClient;
    source: ElementRef;
    lang: string;
    path: string;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {HttpClient} _httpClient
     */
    constructor(_elementRef: ElementRef, _httpClient: HttpClient);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Highlight the given source code
     *
     * @param sourceCode
     */
    highlight(sourceCode: any): void;
}
