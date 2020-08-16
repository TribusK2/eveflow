import { Injectable } from '@angular/core';
import { SkyObjectColor } from '../models/sky-object-color.model';

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

  /**
   * Calculate static angle of sky object position
   * @param  {string} time
   * @returns number
   */
  claculateAngle(time: string): number {
    let timeArray = time.split(':');
    let initDisplacement = (parseInt(timeArray[0]) + parseInt(timeArray[1]) / 60) / (12 / Math.PI);
    return initDisplacement;
  }

  /**
   * Calculate angle values for given colors
   * @param  {SkyObjectColor[]} colors
   * @returns void
   */
  calculateStampAngles(colors: SkyObjectColor[], initDisplacement: number): void {
    for (const color of colors) {
      const startAngle = this.claculateAngle(color.startTime);
      color.startAngle = startAngle + 6 / (12 / Math.PI) - initDisplacement;

      const endAngle = this.claculateAngle(color.endTime);
      color.endAngle = endAngle + 6 / (12 / Math.PI) - initDisplacement;
    }
  }

}
