import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  /**
   * Calculate linear function of given points and return Y value for given X (Y = aX + b)
   * @param  {number} a1
   * @param  {number} a2
   * @param  {number} b1
   * @param  {number} b2
   * @param  {number} X
   * @returns number
   */
  curentValueCalculation(a1: number, a2: number, b1: number, b2: number, X: number): number {
    return (b2 - b1) / (a2 - a1) * X + b1 - (b2 - b1) / (a2 - a1) * a1;
  }

}
