import {Spire, BubbleSpire, RGBBubbleSpire}  from "./spire";
import { Point } from "./point";

export class SvgPath {
    private svgPath!: SVGPathElement;

    public constructor(svgPath: SVGPathElement) {
        this.svgPath = svgPath;
    }

    getPoint(idx: number): Point {
        let dp: DOMPoint = this.svgPath.getPointAtLength(idx);
        return new Point(dp.x, dp.y);
    }

    getLength(): number {
        return this.svgPath.getTotalLength();
    }
    
}

export class SvgPathMove {
    private svgPath!: SvgPath;

    private step: number = 1;

    private xScale: number = 1;
    
    private yScale: number = 1;

    private spires: Spire[];

    constructor(svgPath: SvgPath) {
        this.svgPath = svgPath;
        this.spires = new Array();
    }

    addSpire(spire: Spire) {
        this.spires.push(spire);
    }

    spireLen(): number {
        return this.spires.length;
    }

    setStep(step: number) {
        this.step = step;
    }

    draw(ctx2d: CanvasRenderingContext2D) {
        let len = this.svgPath.getLength();
        this.spires.forEach(o => o.draw(ctx2d));
        this.spires = this.spires.filter(obj => {
            let index = obj.point.index;
            if (obj.point.index >= len)
                return false;
            else {
                let nidx = index + this.step;
                let p = this.svgPath.getPoint(nidx);
                p.index = nidx;
                p = p.scale(this.xScale, this.yScale);
                obj.update(p);
                return true;
            }
        });
    }

}

