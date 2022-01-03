import { Point } from "./point";

export interface Spire {
    point: Point;

    update(point: Point): void;
    
    draw(ctx: CanvasRenderingContext2D): void;
}

class Bubble {
    point: Point;
    radius: number;
    radiusProcessed: number;
    radForward: number;
    constructor(radius: number = 5, point?: Point) {
        this.point = point??new Point(0, 0);
        this.radius = radius;
        this.radForward = 1;
        this.radiusProcessed = radius;
    }

    getRadius(): number {
        let factor = 0.03;
        if (this.radiusProcessed > this.radius *1.3) {
            this.radForward = 0;
        }

        if (this.radiusProcessed < this.radius *0.7) {
            this.radForward = 1;
        }
        if (this.radForward == 1) {
            this.radiusProcessed *= (1 + factor);
        } else {
            this.radiusProcessed *= (1 - factor);
        } 
        return this.radiusProcessed;
    }

}

export class RGBBubbleSpire extends Bubble implements Spire {
    r: number;
    g: number;
    b: number;
    dc: number;
    constructor(radius: number = 5, point?: Point) {
        super(radius, point);
        this.r = 180;
        this.b = 60;
        this.g = 100;
        this.dc = 0.1;
        
    }

    update(point: Point): void {
        let old = this.point;
        this.point = point;
        if (old.x - point.x > 2 || 
            old.x - point.x < -2 || 
            old.y - point.y > 2 || 
            old.y - point.y < -2 ) {
            this.r = Math.floor(Math.random() * 180);
            this.g = Math.floor(Math.random() * 60);
            this.b = Math.floor(Math.random() * 100);
        }
    }

    private getColor(off: number): string {
        var r = this.r - off;
        var g = this.g - off;
        var b = this.b - off;
        return `rgb(${r},${g},${b})`;
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        let x = this.point.x;
        let y = this.point.y;
        let radius = this.getRadius();
        ctx.shadowBlur = 80;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = this.getColor(0);
        ctx.shadowColor = this.getColor(-60);
        
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.globalCompositeOperation = 'lighter';
        ctx.fill();
        ctx.closePath();
    }
    
}

export class BubbleSpire extends Bubble implements Spire {
    hue: number;
    brightness: number;
    saturation: number;
    dc: number;

    constructor(radius: number = 5, point?: Point) {
        super(radius, point);
        this.hue = 360;
        this.brightness = 255;
        this.saturation = 100;
        this.dc = 0.5;
        this.radForward = 1;
        this.radiusProcessed = radius;
    }

    update(point: Point): void {
        this.point = point;
        if(this.hue > 0){
            this.hue -= this.dc;
        } else if(this.brightness > 0){
            this.brightness -= this.dc;
        } else if(this.saturation > 0){
            this.saturation -= this.dc;
        } else {
            this.hue = 360;
            this.brightness = 100;
            this.saturation = 100;
        }
    }

    private getColor(satur: number): string {
        let hue = this.hue;
        let brightness = this.brightness;
        let saturation = this.saturation - satur;
        return `hsla(${hue}, ${brightness}%, ${saturation}%, 1)`;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        let x = this.point.x;
        let y = this.point.y;
        let radius = this.getRadius();
        let grt = ctx.createRadialGradient( x, y, 0, x, y, radius);
        grt.addColorStop(0.0, this.getColor(0));
        grt.addColorStop(1.0, this.getColor(30));
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = grt;
        ctx.fill();
        ctx.closePath();
    }
    
}