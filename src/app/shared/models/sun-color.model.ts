export interface RGBAColor {
    R: number;
    G: number;
    B: number;
    A: number
}

export interface SunColor {
    colorName: string;
    startTime: string;
    startAngle?: number;
    endTime: string;
    endAngle?: number;
    sunColor: RGBAColor,
    sunShineColor: RGBAColor,
    sunShineWideColor: RGBAColor,
    sunShadow: number,
    sunShineShadow: number
}