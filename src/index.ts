import {BubbleSpire, RGBBubbleSpire, Spire}  from "./spire";
import { SvgPath, SvgPathMove } from "./svgpath";
import {GIFEncoder, Encoder, quantize, applyPalette, QuantizeOptions} from "gifenc";


let count = 0;
let encoder: Encoder|null = null;
let binfGifBtnEvent = (canvas: HTMLCanvasElement) => {
     let btn: HTMLButtonElement = document.querySelector("button")!;
     
     btn.addEventListener("click", () => {
        let clicked = btn.getAttribute("clicked")??"false";
        btn.setAttribute("clicked", clicked == "true"?"false":"true");
        if (clicked == "false") {
            btn.innerText = "停止录制gif";
            encoder = GIFEncoder();
            let addFrameCall = () => {
                if (btn.getAttribute("clicked") == "true") {
                    let ctx = canvas.getContext("2d");
                    let imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
                    let palette = quantize(imgData?.data!, 256, {format: "rgb444"});
                    let index = applyPalette(imgData?.data!, palette);
                    encoder?.writeFrame(index, canvas.width, canvas.height, {palette, delay: 200});
                    setTimeout(addFrameCall, 200);
                }
            };
            addFrameCall();
        } else {
            encoder?.finish();
            let img: HTMLImageElement|null = document.querySelector('img');
            let buf = encoder?.bytesView();
            let arrBlobPart: BlobPart[] = [buf as ArrayBuffer]; 
            let blob = buf instanceof Blob ? buf : new Blob(arrBlobPart, { type: 'image/gif' });
            let url = URL.createObjectURL(blob);
            img!.src = url;
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
    let w = canvas.width;
    let h = canvas.height;
    let start = () => {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
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