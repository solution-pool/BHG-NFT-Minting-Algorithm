let render_container
const color = [
    '#FFEBEE',
    '#F44336',
    '#FF8A80',
    '#F8BBD0',
    '#D81B60',
    '#FF4081',
    '#CE93D8',
    '#7B1FA2',
    '#D500F9',
    '#9575CD',
    '#4527A0',
    '#6200EA',
    '#5C6BC0',
    '#1A237E',
    '#E3F2FD',
    '#2196F3',
    '#82B1FF',
    '#B3E5FC',
    '#0288D1',
    '#00B0FF',
    '#4DD0E1',
    '#00838F',
    '#00B8D4',
    '#26A69A',
    '#004D40',
    '#E8F5E9',
    '#4CAF50',
    '#B9F6CA',
    '#DCEDC8',
    '#7CB342',
    '#B2FF59',
    '#E6EE9C',
    '#AFB42B',
    '#C6FF00',
    '#FFF176',
    '#F9A825',
    '#FFD600',
    '#FFCA28',
    '#FF6F00',
    '#FFF3E0',
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

    circles(x1, y1, x2, y2, r, nmin = 2) {
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
            stroke(this.front)
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
            stroke(this.front)
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
            
            stroke(FRONT)
            rect(x * REALSIZE, y * REALSIZE, pix * REALSIZE, pix * REALSIZE);
        }
    }
}