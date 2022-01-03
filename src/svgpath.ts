import {Spire, BubbleSpire, RGBBubbleSpire}  from "./spire";
import { Point } from "./point";


let count = 0;

class SvgPath {
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

class SvgPathMove {
    private svgPath!: SvgPath;

    private step: number = 1;

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
                obj.update(p);
                return true;
            }
        });
    }

}

document.addEventListener("DOMContentLoaded", () => {
    let svg_3: SVGPathElement = document.querySelector("#svg_3")!;
    let canvas: HTMLCanvasElement = document.querySelector('#canv')!;
    let ctx = canvas.getContext("2d")!;
    let svgPath = new SvgPath(svg_3);
    let move = new SvgPathMove(svgPath);
    move.setStep(2.5);
    let idx = 10;
    let sp = new BubbleSpire(idx);
    sp.radius = idx;
    move.addSpire(sp);
    let start = () => {
        count++;
        if (count % 300 == 0) {
            let sp = new RGBBubbleSpire(idx);
            sp.radius = idx;
            move.setStep(3);
            move.addSpire(sp)
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        move.draw(ctx);
        if (move.spireLen() == 2) {
            count == 0;
            let sp = new BubbleSpire(idx);
            sp.radius = idx;
            move.setStep(3);
            move.addSpire(sp);
        }
        window.requestAnimationFrame(() =>{ 
            start();
        })
    };
    start();
});