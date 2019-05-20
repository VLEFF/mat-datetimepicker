import { PipeTransform } from '@angular/core';
export declare class CamelCaseToDashPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    transform(value: string, args?: any[]): string;
}
