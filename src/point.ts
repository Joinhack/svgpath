export class Point {
    x!: number
    y!: number
    index!: number
    constructor(x: number, y: number, index: number = 0) {
        this.x = x;
        this.y = y;
        this.index = index;
    }

    scale(xScale: number, yScale: number): Point {
        return new Point(this.x* xScale, this.y* yScale, this.index);
    }
}
