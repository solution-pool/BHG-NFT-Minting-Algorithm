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

function _h() {
    ctx.fillStyle = 'rgb(' + BACK.toString() + ')'
    ctx.fillRect(0,0,RS,RS)
}

function _i(x1, y1, x2, y2, r, nmin = 2, fill=false) {
    let dx = x1 - x2
    let dy = y1 - y2

    let dd = Math.sqrt(dx ** 2 + dy ** 2)
    let n = parseInt(dd / ONE) 
    if(n < nmin) {
        n = nmin
    }
    let a = Math.atan2(dy, dx)
    let scale = _j(0, dd, n)
    for(let i = 0; i < scale.length; i ++ ) {
        let xp = x1 - scale[i] * Math.cos(a)
        let yp = y1 - scale[i] * Math.sin(a)
        ctx.beginPath()
        if(fill) {
            if(!gf || pe) {
                ctx.strokeStyle = 'rgb(' + BACK.toString() + ')'
            } else {
                if(CO < 5) {
                    ctx.strokeStyle = 'rgb(' + FRONT.toString() + ')'
                } else {
                    ctx.strokeStyle = 'rgb(' + cf.toString() + ')'
                }
            }
        } else {
            if(CO < 5) {
                ctx.strokeStyle = 'rgb(' + FRONT.toString() + ')'
            } else {
                ctx.strokeStyle = 'rgb(' + cf.toString() + ')'
            }
        }
        ctx.arc(xp * RS, yp * RS, r * RS, 0, TWOPI)
        ctx.stroke()
    }
}

function _j(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num;
    const step = (stop - start) / div;
    return Array.from({length: num}, (_, i) => start + step * i);
}

function _k(xys) {
    let xyLength = xys.length
    for(let i = 0; i < xyLength; i ++) {
        let point = xys[i]
        let x = point[0]
        let y =  point[1]
        if(!gf || pe) {
            ctx.strokeStyle = 'rgb(' + BACK.toString() + ')'
        } else {
            if(CO < 5) {
                ctx.strokeStyle = 'rgb(' + FRONT.toString() + ')'
            } else {
                ctx.strokeStyle = 'rgb(' + cf.toString() + ')'
            }
        }
        ctx.strokeRect(x * RS,y * RS, ONE * RS, ONE * RS)
    }
}

function _l(xys) {
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
        
        if(!gf || pe) {
            ctx.strokeStyle = 'rgb(' + BACK.toString() + ')'
        } else {
            if(CO < 5) {
                ctx.strokeStyle = 'rgb(' + FRONT.toString() + ')'
            } else {
                ctx.strokeStyle = 'rgb(' + cf.toString() + ')'
            }
        }
        strokeRect(x * RS, y * RS, ONE * RS, ONE * RS);
    }
}