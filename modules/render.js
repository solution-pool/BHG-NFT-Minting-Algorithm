let render_container

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
        render_container = this
        this.clear_canvas()
    }

    __init_cairo() {
        let sur = cairo.ImageSurface(cairo.FORMAT_ARGB32, this.n, this.n)
        let ctx = cairo.Context(sur)
        ctx.scale(this.n, this.n)

        this.sur = sur
        this.ctx = ctx

        // this.clear_canvas()
    }

    set_back(c) {
        background('rgba(' + c + ')')
    }

    set_line_width(w) {

    }

    line(x1, y1, x2, y2) {
        line(x1, y1, x2, y2)
    }

    triangle(x1, y1, x2, y2, x3, y3, fill = false) {
        line(x1, y1, x2, y2)
        line(x2, y2, x3, y3)
    }

    clear_canvas() {
        // let ctx = this.ctx 

        // ctx.set_source_rgba(this.back)
        // ctx.rect(0,0,1,1)
        // ctx.fill()
        // ctx.set_source_rgba(this.front)
        fill('rgba(0,0,0,1)')
        rect(0,0,SIZE,SIZE)
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

    circle(xys, r, fill=false) {
        let xyLength = xys.length
        if(!r) {
            r = 2.5*this.pix
        }
        for(let  i = 0; i < xyLength ; i ++) {
            let point = xys[i]
            let x = point[2]
            let y = point[1]

            fill('rgba(' + FRONT + ')')
            arc(x, y, r)

        }
        

        // if(fill) {
        //     fill()
        // } else {
        //     stroke()
        // }
    }

    // circles (xys) {
    //     let xyLength = xys.length
    //     let r = 2.5 * this.pix

    //     for(let i = 0; i < xyLength; i++) {
    //         let point = xys[i]

    //         let dx = point[2] - point[0]
    //         let dy = point[3] - point[1]

    //         let dd = Math.sqrt(dx ** 2 + dy **2)

    //         let n = parseInt(dd / this.pix)
    //         if(n < 2) {
    //             n = 2
    //         }

    //         let a = Math.atan2(dy, dx)

    //         let scale = this.linspace(0, dd, n)

    //         // for(let i = 0; i < scale.length; i ++) {
    //             let x = point[2] - dd * Math.cos(a)
    //             let y = point[3] - dd * Math.sin(a)

    //             stroke(255, 255, 255)

    //             arc(x * SIZE, y * SIZE, r * SIZE, r * SIZE, 0,TWOPI, PIE)

    //         // }
    //     }

    // }

    circles(x1, y1, x2, y2, r, nmin = 2) {
        stroke('rgba(255, 255, 255, 1)')
        line(x1 * SIZE, y1 * SIZE, x2 * SIZE, y2 * SIZE)
        // let dx = x1 - x2
        // let dy = y1 - y2

        // let dd = Math.sqrt(dx ** 2 + dy ** 2)
        // let n = parseInt(dd / render_container.pix) 
        // if(n < nmin) {
        //     n = nmin
        // }
        // let a = Math.atan2(dy, dx)
        // let scale = render_container.linspace(0, dd, n)
        // for(let i = 0; i < scale.length; i ++ ) {
        //     let xp = x1 - scale[i] * Math.cos(a)
        //     let yp = y1 - scale[i] * Math.sin(a)
        //     noFill()
        //     stroke('rgba(255, 255, 255, 1)')
        //     arc(xp * SIZE, yp * SIZE, r * SIZE, r * SIZE, 0, TWOPI, OPEN)
        // }
    }

    linspace(start, stop, num, endpoint = true) {
        const div = endpoint ? (num - 1) : num;
        const step = (stop - start) / div;
        return Array.from({length: num}, (_, i) => start + step * i);
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
        const xyLength = xys.length
        
        for(let i = 0; i < xyLength ; i ++ ) {
            let point = xys[i]
            let dx = point[2] - point[0]
            let dy = point[3] - point[1]
            
            let aa = Math.atan2(dy, dx)
            let direct =  [Math.cos(aa), Math.sin(aa)]

            let dd = Math.sqrt(dx ** 2, dy ** 2)
            
            let random = Math.random() * dd
            let x = point[0] + direct[0] * random
            let y = point[1] + direct[1] * random
            
            stroke('rgba(' + FRONT + ')')
            rect(x * SIZE, y * SIZE, pix * SIZE, pix * SIZE);
        }
    }
 
    // sandstroke_orthogonal(xys, height = null, steps=10, grains = 10) {
    //     let pix = this.pix
    //     let xyLength = xys.length

    //     if(!height) {
    //         height =  pix * 10
    //     }
        
    //     for (let i = i ; i < xyLength; i ++) {
    //         let point = xys[i]
    //         let dx = point[2] - point[0]
    //         let dy = point[3] - point[1]

    //         let aa = Math.atan(dy / dx)
    //         let directions = [Math.cos(aa), Math.sin(aa)]
    //         let dd = Math.sqrt(dx ** 2, dy ** 2) 

    //         let aa_orth = aa + pi*0.5

    //         directions_pah = [Math.cos(aa_orth), Math.sind)]
        
    //     }
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