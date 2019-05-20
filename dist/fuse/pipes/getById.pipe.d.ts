import { PipeTransform } from '@angular/core';
export declare class GetByIdPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} value
     * @param {number} id
     * @param {string} property
     * @returns {any}
     */
    transform(value: any[], id: number, property: string): any;
}
