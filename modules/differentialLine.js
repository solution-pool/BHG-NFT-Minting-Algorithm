class DifferentialLine extends Segments {

    constructor(nmax, zonewidth, nearl, farl) {
        super(nmax, zonewidth)

        this.SX = new Array()
        this.SY = new Array()
        this.SD = new Array()

        this.nearl = nearl
        this.farl = farl
    }

    optimize_position(step) {
        let vertices = new Array()
        const vnumCount = this.vnum
        for(let v = 0; v < vnumCount; v ++ ) {
            this.SX[v] = 0.0
            this.SY[v] = 0.0

            let num = this.zonemap.__sphere_vertices(
                this.X[v],
                this.Y[v],
                this.farl,
                vertices
            )
            this.__reject(
                v, 
                vertices,
                num, 
                step,
                this.SX,
                this.SY
            )

        }
        for (let v = 0; v < vnumCount ; v ++) {
            if(this.VA[v] < 0) {
                continue
            }

            this.X[v] = this.X[v] + this.SX[v]
            this.Y[v] = this.Y[v] + this.SY[v]
        }

        for(let v = 0; v < vnumCount; v ++) {
            if(this.VA[v] < 0) {
                continue
            }
            try {
                this.zonemap.__update_v(v)
            }
            catch {
            }
        }
    }

    __reject(v, vertices, num, step, sx, sy) {
        if(this.VA[v] < 1) {
            return -1
        }

        let e1 = this.VE[2*v]
        let e2 = this.VE[2*v + 1]
        let v1, v2
        // connected vertices to v, v1 and v2
        if(this.EV[2*e1] == v) {
            v1 = this.EV[2*e1 + 1]
        } else {
            v1 = this.EV[2*e1]
        }

        if(this.EV[2*e2] == v) {
            v2 = this.EV[2*e2 + 1]
        } else {
            v2 =  this.EV[2*e2]
        }

        let resx = 0
        let resy = 0

        for(let k = 0; k < num; k ++) {
            let neigh =  vertices[k]
            let dx = this.X[v] - this.X[neigh]
            let dy =  this.Y[v] -  this.Y[neigh]

            let nrm = Math.sqrt(dx * dx + dy * dy)

            if(neigh == v1 || neigh == v2) {
                if(nrm < this.nearl || nrm <= 0) {
                    continue
                }

                resx += -dx/nrm *step
                resy += -dy/nrm * step
            } else {
                if(nrm > this.farl || nrm <= 0) {
                    continue
                }

                if(growth_flag) {
                    resx += dx * (this.farl/nrm -1) *step
                    resy += dy * (this.farl/nrm-1)*step
                } else {
                    resx += dx * (this.farl/nrm -1.5) *step
                    resy += dy * (this.farl/nrm-1.5)*step
                }
            }
        }
        sx[v] += resx
        sy[v] += resy

        return 1

    }
}
