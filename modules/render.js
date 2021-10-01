let render_container
const color = [
    '#FFEBEE',
    '#FFCDD2',
    '#EF9A9A',
    '#E57373',
    '#EF5350',
    '#F44336',
    '#E53935',
    '#D32F2F',
    '#C62828',
    '#B71C1C',
    '#FF8A80',
    '#FF5252',
    '#FF1744',
    '#D50000',
    '#FCE4EC',
    '#F8BBD0',
    '#F48FB1',
    '#F06292',
    '#EC407A',
    '#E91E63',
    '#D81B60',
    '#C2185B',
    '#AD1457',
    '#880E4F',
    '#FF80AB',
    '#FF4081',
    '#F50057',
    '#C51162',
    '#F3E5F5',
    '#E1BEE7',
    '#CE93D8',
    '#BA68C8',
    '#AB47BC',
    '#9C27B0',
    '#8E24AA',
    '#7B1FA2',
    '#6A1B9A',
    '#4A148C',
    '#EA80FC',
    '#E040FB',
    '#D500F9',
    '#AA00FF',
    '#EDE7F6',
    '#D1C4E9',
    '#B39DDB',
    '#9575CD',
    '#7E57C2',
    '#673AB7',
    '#5E35B1',
    '#512DA8',
    '#4527A0',
    '#311B92',
    '#B388FF',
    '#7C4DFF',
    '#651FFF',
    '#6200EA',
    '#E8EAF6',
    '#C5CAE9',
    '#9FA8DA',
    '#7986CB',
    '#5C6BC0',
    '#3F51B5',
    '#3949AB',
    '#303F9F',
    '#283593',
    '#1A237E',
    '#8C9EFF',
    '#536DFE',
    '#3D5AFE',
    '#304FFE',
    '#E3F2FD',
    '#BBDEFB',
    '#90CAF9',
    '#64B5F6',
    '#42A5F5',
    '#2196F3',
    '#1E88E5',
    '#1976D2',
    '#1565C0',
    '#0D47A1',
    '#82B1FF',
    '#448AFF',
    '#2979FF',
    '#2962FF',
    '#E1F5FE',
    '#B3E5FC',
    '#81D4FA',
    '#4FC3F7',
    '#29B6F6',
    '#039BE5',
    '#0288D1',
    '#0277BD',
    '#01579B',
    '#80D8FF',
    '#40C4FF',
    '#00B0FF',
    '#0091EA',
    '#E0F7FA',
    '#B2EBF2',
    '#80DEEA',
    '#4DD0E1',
    '#26C6DA',
    '#00BCD4',
    '#00ACC1',
    '#0097A7',
    '#00838F',
    '#006064',
    '#84FFFF',
    '#18FFFF',
    '#00E5FF',
    '#00B8D4',
    '#EOF2F1',
    '#B2DFDB',
    '#80CBC4',
    '#4DB6AC',
    '#26A69A',
    '#009688',
    '#00897B',
    '#00796B',
    '#00695C',
    '#004D40',
    '#A7FFEB',
    '#64FFDA',
    '#1DE9B6',
    '#00BFA5',
    '#E8F5E9',
    '#C8E6C9',
    '#A5D6A7',
    '#81C784',
    '#66BB6A',
    '#4CAF50',
    '#43A047',
    '#388E3C',
    '#2E7D32',
    '#1B5E20',
    '#B9F6CA',
    '#69F0AE',
    '#00E676',
    '#00C853',
    '#F1F8E9',
    '#DCEDC8',
    '#C5E1A5',
    '#AED581',
    '#9CCC65',
    '#8BC34A',
    '#7CB342',
    '#689F38',
    '#558B2F',
    '#33691E',
    '#CCFF90',
    '#B2FF59',
    '#76FF03',
    '#64DD17',
    '#F9FBE7',
    '#F0F4C3',
    '#E6EE9C',
    '#DCE775',
    '#D4E157',
    '#CDDC39',
    '#C0CA33',
    '#AFB42B',
    '#9E9D24',
    '#827717',
    '#F4FF81',
    '#EEFF41',
    '#C6FF00',
    '#AEEA00',
    '#FFFDE7',
    '#FFF9C4',
    '#FFF59D',
    '#FFF176',
    '#FFEE58',
    '#FFEB3B',
    '#FDD835',
    '#FBC02D',
    '#F9A825',
    '#F57F17',
    '#FFFF8D',
    '#FFFF00',
    '#FFEA00',
    '#FFD600',
    '#FFF8E1',
    '#FFECB3',
    '#FFE082',
    '#FFD54F',
    '#FFCA28',
    '#FFC107',
    '#FFB300',
    '#FFA000',
    '#FF8F00',
    '#FF6F00',
    '#FFE57F',
    '#FFD740',
    '#FFC400',
    '#FFAB00',
    '#FFF3E0',
    '#FFE0B2',
    '#FFCC80',
    '#FFB74D',
    '#FFA726'
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
        fill(BACK)
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
            stroke(FRONT)
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
            stroke(FRONT)
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