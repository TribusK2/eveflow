import { Injectable } from '@angular/core';

import { GradientColor } from '../models/gradient-color.model';
import { MathService } from './math.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(
    private timeService: TimeService,
    private mathService: MathService,
    ) { }

  /**
   * Get CSS linear-gradient of the background-image for given parameter colors
   * @param  {GradientColor} startColor
   * @param  {GradientColor} endColor
   * @param  {number} secondsAmount
   * @returns string
   */
  setColorGradient(startColor: GradientColor, endColor: GradientColor, secondsAmount: number): {'background-image': string} {
    
    const firstR = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.r, endColor.topRGBA.r, secondsAmount);
    const firstG = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.g, endColor.topRGBA.g, secondsAmount);
    const firstB = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.b, endColor.topRGBA.b, secondsAmount);
    const firstA = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.a, endColor.topRGBA.a, secondsAmount);
    
    const secondR = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.r, endColor.bottomRGBA.r, secondsAmount);
    const secondG = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.g, endColor.bottomRGBA.g, secondsAmount);
    const secondB = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.b, endColor.bottomRGBA.b, secondsAmount);
    const secondA = this.mathService.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.a, endColor.bottomRGBA.a, secondsAmount);
    
    return { 'background-image': `linear-gradient(rgba(${firstR}, ${firstG}, ${firstB}, ${firstA}), rgba(${secondR}, ${secondG}, ${secondB}, ${secondA}))` }
  }

}
