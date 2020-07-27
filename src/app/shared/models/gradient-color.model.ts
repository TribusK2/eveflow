export interface GradientColor {
    colorName: string;
    startSecond: number;
    endSecond: number;
    topRGBA: {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    bottomRGBA: {
        r: number;
        g: number;
        b: number;
        a: number;
    }

}