let render_container
const color = [
    [255, 0 , 0],
    [255, 0 , 36],
    [255, 0 , 72],
    [255, 0 , 108],
    [255, 0 , 144],
    [255, 0 , 180],
    [255, 0 , 216],
    [255, 0 , 255],
    [216, 0 , 255],
    [180, 0 , 255],
    [144, 0 , 255],
    [108, 0 , 255],
    [72, 0 , 255],
    [36, 0 , 255],
    [0, 0 , 255],
    [0, 36 , 255],
    [0, 72 , 255],
    [0, 108 , 255],
    [0, 144 , 255],
    [0, 180 , 255],
    [0, 216 , 255],
    [0, 255 , 255],
    [0, 255 , 216],
    [0, 255 , 180],
    [0, 255 , 144],
    [0, 255 , 108],
    [0, 255 , 72],
    [0, 255 , 36],
    [0, 255 , 0],
    [36, 255 , 0],
    [72, 255 , 0],
    [108, 255 , 0],
    [144, 255 , 0],
    [180, 255 , 0],
    [216, 255 , 0],
    [255, 255 , 0],
    [255, 216 , 0],
    [255, 180 , 0],
    [255, 144 , 0],
    [255, 108 , 0],
    [255, 72 , 0],
    [255, 36 , 0],
]
class Render {
    constructor(n, back, front) {
        this.n      = n
        this.front  = front
        this.back   = back
        this.pix    = 1 / n
        
        this.colors = []
        this.ncolors = 0, 
        this.num_img = 0
        render_container = this
        this.clear_canvas()
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
        fill(this.back)
        rect(0,0,REALSIZE,REALSIZE)
    }

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
    }

    circles(x1, y1, x2, y2, r, nmin = 2, fill=false) {
        let dx = x1 - x2
        let dy = y1 - y2

        let dd = Math.sqrt(dx ** 2 + dy ** 2)
        let n = parseInt(dd / render_container.pix) 
        if(n < nmin) {
            n = nmin
        }
        let a = Math.atan2(dy, dx)
        let scale = render_container.linspace(0, dd, n)
        for(let i = 0; i < scale.length; i ++ ) {
            let xp = x1 - scale[i] * Math.cos(a)
            let yp = y1 - scale[i] * Math.sin(a)
            noFill()
            if(fill) {
                if(!growth_flag || pulse_erase) {
                    stroke(this.back) 
                } else {
                    if(COLOROPTION < 5) {
                        stroke(this.front)
                    } else {
                        stroke(current_front)
                    }
                }
            } else {
                if(COLOROPTION < 5) {
                    stroke(this.front)
                } else {
                    stroke(current_front)
                }
            }
            arc(xp * REALSIZE, yp * REALSIZE, r * REALSIZE, r * REALSIZE, 0, TWOPI, OPEN)
        }
    }

    linspace(start, stop, num, endpoint = true) {
        const div = endpoint ? (num - 1) : num;
        const step = (stop - start) / div;
        return Array.from({length: num}, (_, i) => start + step * i);
    }

    dot(xys, width = 0) {
        let pix
        if(width) {
            pix = width
        } else {
            pix = this.pix
        }
        let xyLength = xys.length
        for(let i = 0; i < xyLength; i ++) {
            let point = xys[i]
            let x = point[0]
            let y =  point[1]
            rect(x * REALSIZE,y * REALSIZE,pix * REALSIZE, pix * REALSIZE)
            if(!growth_flag || pulse_erase) {
                stroke(this.back) 
            } else {
                if(COLOROPTION < 5) {
                    stroke(this.front)
                } else {
                    stroke(current_front)
                }
                // stroke(this.front)
            }
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
            
            if(!growth_flag || pulse_erase) {
                stroke(this.back) 
            } else {
                if(COLOROPTION < 5) {
                    stroke(this.front)
                } else {
                    stroke(current_front)
                }
            }
            rect(x * REALSIZE, y * REALSIZE, pix * REALSIZE, pix * REALSIZE);
        }
    }
}