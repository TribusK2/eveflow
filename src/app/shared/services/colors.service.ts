import { Injectable } from '@angular/core';

import { GradientColor } from '../models/gradient-color.model';
import { MathService } from './math.service';
import { SunColor } from '../models/sun-color.model';

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
   * @param  {SunColor} startColor
   * @param  {SunColor} endColor
   * @param  {number} sunAngle
   * @returns string
   */
  setSunColors(startColor: SunColor, endColor: SunColor, sunAngle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.R, endColor.sunColor.R, sunAngle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.G, endColor.sunColor.G, sunAngle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.B, endColor.sunColor.B, sunAngle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.A, endColor.sunColor.A, sunAngle);

    return `rgba(${R}, ${G}, ${B}, ${A})`;
  }

  /**
   * Setup CSS shadow of the sun
   * @param  {SunColor} startColor
   * @param  {SunColor} endColor
   * @param  {number} sunAngle
   * @returns string
   */
  setSunShadow(startColor: SunColor, endColor: SunColor, sunAngle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.R, endColor.sunColor.R, sunAngle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.G, endColor.sunColor.G, sunAngle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.B, endColor.sunColor.B, sunAngle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunColor.A, endColor.sunColor.A, sunAngle);
    const size = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShadow, endColor.sunShadow, sunAngle);

    return `0 0 ${size}px ${size}px rgba(${R}, ${G}, ${B}, ${A})`;
  }

  /**
   * Setup small shine of the sun
   * @param  {SunColor} startColor
   * @param  {SunColor} endColor
   * @param  {number} sunAngle
   * @returns string
   */
  setSunShineShadow(startColor: SunColor, endColor: SunColor, sunAngle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineColor.R, endColor.sunShineColor.R, sunAngle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineColor.G, endColor.sunShineColor.G, sunAngle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineColor.B, endColor.sunShineColor.B, sunAngle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineColor.A, endColor.sunShineColor.A, sunAngle);
    const size = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineShadow, endColor.sunShineShadow, sunAngle);

    return `0 0 ${size}px ${size}px rgba(${R}, ${G}, ${B}, ${A})`;
  }

  /**
   * Setup large shine of the sun
   * @param  {SunColor} startColor
   * @param  {SunColor} endColor
   * @param  {number} sunAngle
   * @returns string
   */
  setSunShineWideShadow(startColor: SunColor, endColor: SunColor, sunAngle: number): string {
    
    const R = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineWideColor.R, endColor.sunShineWideColor.R, sunAngle);
    const G = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineWideColor.G, endColor.sunShineWideColor.G, sunAngle);
    const B = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineWideColor.B, endColor.sunShineWideColor.B, sunAngle);
    const A = this.mathService.curentValueCalculation(startColor.startAngle, startColor.endAngle, startColor.sunShineWideColor.A, endColor.sunShineWideColor.A, sunAngle);

    return `0 0 150px 150px rgba(${R}, ${G}, ${B}, ${A})`;
  }

}
