import {Spire, BubbleSpire, RGBBubbleSpire}  from "./spire";
import { Point } from "./point";
import { SvgPath, SvgPathMove } from "./svgpath";

let count = 0;

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