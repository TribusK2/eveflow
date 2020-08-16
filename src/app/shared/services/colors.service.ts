import { Injectable } from '@angular/core';

import { GradientColor } from '../models/gradient-color.model';
import { MathService } from './math.service';
import { SkyObjectColor } from '../models/sky-object-color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(
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

  /**
   * Set up main colors of the
   * @param  {SkyObjectColor} startColor
   * @param  {SkyObjectColor} endColor
   * @param  {number} angle
   * @returns string
   */
  setColors(startColor: SkyObjectColor, endColor: SkyObjectColor, angle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.R, endColor.mainColor.R, angle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.G, endColor.mainColor.G, angle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.B, endColor.mainColor.B, angle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.A, endColor.mainColor.A, angle);

    return `rgba(${R}, ${G}, ${B}, ${A})`;
  }

  /**
   * Setup CSS shadow of the sky object
   * @param  {SkyObjectColor} startColor
   * @param  {SkyObjectColor} endColor
   * @param  {number} angle
   * @returns string
   */
  setShadow(startColor: SkyObjectColor, endColor: SkyObjectColor, angle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.R, endColor.mainColor.R, angle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.G, endColor.mainColor.G, angle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.B, endColor.mainColor.B, angle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.mainColor.A, endColor.mainColor.A, angle);
    const size = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shadow, endColor.shadow, angle);
      
    return `0 0 ${size}px ${size}px rgba(${R}, ${G}, ${B}, ${A})`;

  }

  /**
   * Setup small shine of the sky object
   * @param  {SkyObjectColor} startColor
   * @param  {SkyObjectColor} endColor
   * @param  {number} angle
   * @returns string
   */
  setShineShadow(startColor: SkyObjectColor, endColor: SkyObjectColor, angle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineColor.R, endColor.shineColor.R, angle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineColor.G, endColor.shineColor.G, angle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineColor.B, endColor.shineColor.B, angle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineColor.A, endColor.shineColor.A, angle);
    
    if(startColor.shineShadow && endColor.shineShadow){
      const size = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineShadow, endColor.shineShadow, angle);
      return `0 0 ${size}px ${size}px rgba(${R}, ${G}, ${B}, ${A})`;
    }else{
      return `rgba(${R}, ${G}, ${B}, ${A})`;
    }

  }

  /**
   * Setup large shine of the sky object
   * @param  {SkyObjectColor} startColor
   * @param  {SkyObjectColor} endColor
   * @param  {number} angle
   * @returns string
   */
  setShineWideShadow(startColor: SkyObjectColor, endColor: SkyObjectColor, angle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineWideColor.R, endColor.shineWideColor.R, angle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineWideColor.G, endColor.shineWideColor.G, angle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineWideColor.B, endColor.shineWideColor.B, angle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.shineWideColor.A, endColor.shineWideColor.A, angle);

    return `0 0 150px 150px rgba(${R}, ${G}, ${B}, ${A})`;
  }

}
