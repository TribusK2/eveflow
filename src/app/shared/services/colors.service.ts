import { Injectable } from '@angular/core';

import { GradientColor } from '../models/gradient-color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }

  setColorGradient(startColor: GradientColor, endColor: GradientColor, secondsAmount: number) {

    let startSecond = this.secondCalculate(startColor.startTime);
    let endSecond = this.secondCalculate(startColor.endTime);
    
    const firstR = this.curentValueCalculation(startSecond, endSecond, startColor.topRGBA.r, endColor.topRGBA.r, secondsAmount);
    const firstG = this.curentValueCalculation(startSecond, endSecond, startColor.topRGBA.g, endColor.topRGBA.g, secondsAmount);
    const firstB = this.curentValueCalculation(startSecond, endSecond, startColor.topRGBA.b, endColor.topRGBA.b, secondsAmount);
    const firstA = this.curentValueCalculation(startSecond, endSecond, startColor.topRGBA.a, endColor.topRGBA.a, secondsAmount);
    
    const secondR = this.curentValueCalculation(startSecond, endSecond, startColor.bottomRGBA.r, endColor.bottomRGBA.r, secondsAmount);
    const secondG = this.curentValueCalculation(startSecond, endSecond, startColor.bottomRGBA.g, endColor.bottomRGBA.g, secondsAmount);
    const secondB = this.curentValueCalculation(startSecond, endSecond, startColor.bottomRGBA.b, endColor.bottomRGBA.b, secondsAmount);
    const secondA = this.curentValueCalculation(startSecond, endSecond, startColor.bottomRGBA.a, endColor.bottomRGBA.a, secondsAmount);
    
    return { 'background-image': `linear-gradient(rgba(${firstR}, ${firstG}, ${firstB}, ${firstA}), rgba(${secondR}, ${secondG}, ${secondB}, ${secondA}))` }
  }

  curentValueCalculation(x1: number, x2: number, y1: number, y2: number, secondsAmount: number) {
    return (y2 - y1) / (x2 - x1) * secondsAmount + y1 - (y2 - y1) / (x2 - x1) * x1;
  }

  secondCalculate(time: string){
    let timeArray = time.split(':');
    let seconds = (parseInt(timeArray[0]) * 30 + parseInt(timeArray[1]) * 0.5)*120;
    return seconds;
  }
}
