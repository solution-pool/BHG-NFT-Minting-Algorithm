// let render_container

class Render {
    constructor(n, back, front) {
        this.n      = n
        this.front  = front
        this.back   = back
        this.pix    = 1 / n
        

        this.colors = []
        this.ncolors = 0, 
        this.num_img = 0

        // this.__init_cairo()
        // this.__init_cairo()
        // render_container = this
    }

    __init_cairo() {
        let sur = cairo.ImageSurface(cairo.FORMAT_ARGB32, this.n, this.n)
        let ctx = cairo.Context(sur)
        ctx.scale(this.n, this.n)

        this.sur = sur
        this.ctx = ctx

        this.clear_canvas()
    }

    clear_canvas() {
        let ctx = this.ctx 

        ctx.set_source_rgba(this.back)
        ctx.rect(0,0,1,1)
        ctx.fill()
        ctx.set_source_rgba(this.front)
    }

    // write_to_png(fn) {
    //     this.sur.write_to_png(fn)
    //     this.num_img += 1
    // }

    // set_front() {
    //     this.front = c
    //     this.ctx.set_source_rgba(c)
    // }


    // set_back(c) {
    //     this.back = c
    // }

    // set_line_width(w) {
    //     this.ctx.set_line_width(w)
    // }

    // line(x1, y1, x2, y2) {
    //     let ctx = this.ctx
    //     ctx.move_to(x1, y1)
    //     ctx.line_to(x2, y2)

    //     ctx.stroke()
    // }

    // triangle(x1, y1, x2, y2, x3, y3, fill=false) {
    //     let ctx = this.ctx
    //     ctx.move_to(x1, y1)
    //     ctx.line_to(x2, y2)
    //     ctx.line_to(x3, y3)
    //     ctx.close_path()

    //     if(fill) {
    //         ctx.fill()
    //     } else {
    //         ctx.stroke()
    //     }
    // }

    // dot(x, y) {
    //     let pix = this.pix
    //     rect(x, y, pix, pix)
    //     fill()
    // }

    circle(x, y, r, fill=false) {
        arc(x, y, r, 0, TWOPI)

        if(fill) {
            fill()
        } else {
            stroke()
        }
    }

    // sandstroke(xys, grains = 10) {
    //     let pix = this.pix
    //     let xyLength = xys.length
    //     for(let i = 0; i < xyLength; i ++) {
    //         let point = xys[i]
    //         let dx = point[2] - point[0]
    //         let dy = point[3] - point[1]

    //         let aa = Math.atan(dy/dx)
    //         let directions = [Math.cos(aa), Math.sin(aa)]

    //         let dd = Math.sqrt(dx*dx, dy*dy)
    //         let random = dd * Math.random() 
    //         let x = point[0] + directions[0] * random
    //         let y = point[1] + directions[1] * random

    //         stroke('rgba(' + FRONT + ')')
    //         rect(x * SIZE, y * SIZE, pix * SIZE, pix * SIZE);
    //     }
    // }


    // random_parallelogram(x1, y1, x2, y2, x3, y3, grains) {
    //     let pix = this.pix
    //     let rectangle = this.ctx.rect
    //     let fill = this.ctx.fill

    //     let v1 = 
    // }

    dot(xys) {
        
        let pix = this.pix
        let xyLength = xys.length
        for(let i = 0; i < xyLength; i ++) {
            let point = xys[i]
            let x = point[0]
            let y =  point[1]
            stroke('rgba(' + FRONT + ')')
            rect(x * SIZE,y * SIZE,pix * SIZE, pix * SIZE)
        }
    }

    sandstroke(xys, grains = 10) {
        let pix = this.pix
        // pix = 50
        
        const xyLength = xys.length
        
        for(let i = 0; i < xyLength ; i ++ ) {
            let point = xys[i]
            let dx = point[2] - point[0]
            let dy = point[3] - point[1]

            let atanValue
            if(dx == 0) {
                atanValue = 0
            } else {
                atanValue = dy / dx
            }
            
            let aa = Math.atan(atanValue)
            let direct =  [Math.cos(aa), Math.sin(aa)]

            let dd = Math.sqrt(dx ** 2, dy ** 2)
            
            let random = Math.random() * dd
            let x = point[0] + direct[0] * random
            let y = point[1] + direct[1] * random
            
            stroke('rgba(' + FRONT + ')')
            rect(x * SIZE, y * SIZE, pix * SIZE, pix * SIZE);
        }
    }
    
}

class Animate extends Render{
    constructor(n, front, back, step) {
        super(n, front, back)
        this.step   =  step
        this.steps  = 0
        this.step_wrap()
    }

    expose() {
        
    }
 
    step_wrap() {
        let res = this.step(this)
        this.steps += 1
        this.expose()

        return res
    }
}