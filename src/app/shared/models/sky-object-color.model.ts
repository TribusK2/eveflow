import { RGBAColor } from './rgba-color.model';


export interface SkyObjectColor {
    colorName: string;
    startTime: string;
    startAngle?: number;
    endTime: string;
    endAngle?: number;
    mainColor: RGBAColor,
    shineColor: RGBAColor,
    shineWideColor: RGBAColor,
    shadow?: number,
    shineShadow?: number
}