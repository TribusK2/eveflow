import { Injectable } from '@angular/core';

import { GradientColor } from '../models/gradient-color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }

  setColorGradient(startColor: GradientColor, endColor: GradientColor, secondsAmount: number) {
    
    const firstR = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.r, endColor.topRGBA.r, secondsAmount);
    const firstG = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.g, endColor.topRGBA.g, secondsAmount);
    const firstB = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.b, endColor.topRGBA.b, secondsAmount);
    const firstA = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.topRGBA.a, endColor.topRGBA.a, secondsAmount);
    
    const secondR = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.r, endColor.bottomRGBA.r, secondsAmount);
    const secondG = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.g, endColor.bottomRGBA.g, secondsAmount);
    const secondB = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.b, endColor.bottomRGBA.b, secondsAmount);
    const secondA = this.curentValueCalculation(startColor.startSecond, startColor.endSecond, startColor.bottomRGBA.a, endColor.bottomRGBA.a, secondsAmount);
    
    return { 'background-image': `linear-gradient(rgba(${firstR}, ${firstG}, ${firstB}, ${firstA}), rgba(${secondR}, ${secondG}, ${secondB}, ${secondA}))` }
  }

  curentValueCalculation(x1: number, x2: number, y1: number, y2: number, secondsAmount: number) {
    return (y2 - y1) / (x2 - x1) * secondsAmount + y1 - (y2 - y1) / (x2 - x1) * x1;
  }
}
