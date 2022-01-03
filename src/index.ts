import {BubbleSpire, RGBBubbleSpire, Spire}  from "./spire";
import { SvgPath, SvgPathMove } from "./svgpath";
import GIF from "gif.js";


let count = 0;
let gif: GIF|null = null;
let binfGifBtnEvent = (canvas: HTMLCanvasElement) => {
     let btn: HTMLButtonElement = document.querySelector("button")!;
     
     btn.addEventListener("click", () => {
        let clicked = btn.getAttribute("clicked")??"true";
        btn.setAttribute("clicked", clicked == "true"?"false":"true");
        
        if (clicked == "true") {
            btn.innerText = "停止录制gif";
            gif = new GIF({
                workers: 2,
                quality: 10
            });
        } else {
            let img: HTMLImageElement|null = document.querySelector('img');
            img?.setAttribute("src", canvas.toDataURL("image/png"));
            btn.innerText = "录制gif";
        }
        
     });
};

document.addEventListener("DOMContentLoaded", () => {
    
    let svg_3: SVGPathElement = document.querySelector("#svg_3")!;
    let canvas: HTMLCanvasElement = document.querySelector('#canv')!;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    binfGifBtnEvent(canvas);
    let svgPath = new SvgPath(svg_3);
    let move = new SvgPathMove(svgPath);
    move.setStep(2.5);
    let idx = 8;
    let sp = new BubbleSpire(idx);
    sp.radius = idx;
    move.addSpire(sp);
    let start = () => {
        count++;
        if (count % 90 == 0) {
            let sp: Spire;
            let r = Math.floor(Math.random()*100) + 1;
            console.log();
            if (r % 2  == 0) {
                let _sp = new RGBBubbleSpire(idx);
                _sp.radius = idx;
                sp = _sp;
            } else {
                let _sp = new BubbleSpire(idx);
                _sp.radius = idx;
                sp = _sp;
            }
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