class Segments {

  constructor(nmax, zonewidth) {
      this.X = []
      _e(this.X, nmax, 0)
      this.Y = []
      _e(this.Y, nmax, 0)
      this.VA =  []
      _e(this.VA, nmax, 0)
      this.VS = []
      _e(this.VS, nmax, -1)
      this.EV = []
      _e(this.EV, 2*nmax, -1)
      this.VE = []
      _e(this.VE, 2* nmax, -1)

      this.nmax = nmax

      this.vnum = 0

      this.edgeNumber = 0

      this.snum = 0

      this.zonewidth = zonewidth

      this.nz = 1.0 /zonewidth

      if (this.nz<3) {
          this.nz = 1
          this.zonewidth = 1.0
      }

      this.zonemap = new Zonemap(this.nz)
      this.zonemap._ac(this.X, this.Y)
  }
  _m(x,  y) {
      if (x<0 || x>1 || y<0 || y>1) 
          return -1
      return 1
  }
  _n(x, y, s, p) {
      if (this._m(x,y)<0) {
          throw new Error("Vertext outside unit square.")
      }

      const vnum = this.vnum
      
      this.X[vnum] = x
      this.Y[vnum] = y
      this.VA[vnum] = 1
      this.VS[vnum] = s

      this.zonemap._ad(vnum)

      this.vnum = vnum + 1
      return vnum
  }

  _o(v1,  v2) {
      if (v1<0 || v1>this.vnum-1 || this.VA[v1]<0) {
        return -1
      }

      if (v2<0 || v2>this.vnum-1 || this.VA[v2]<0) {
        return -1
      }

      return 1
  }

  _p(v1,  v2) {
      v1 = parseInt(v1)
      v2 = parseInt(v2)
      const edgeNumber = this.edgeNumber
      if (this._o(v1,v2)<0) {
          throw new Error("invalid vertex in _p v1, v2, " + v1 + ',' + v2)
      }

      this.EV[2*edgeNumber] = v1
      this.EV[2*edgeNumber+1] = v2

      _f(v1, edgeNumber, this.VE)
      _f(v2, edgeNumber, this.VE)

      this.edgeNumber += 1
      return edgeNumber
  }

  _q(e1) {

      if (this.EV[2*e1]>-1 && this.EV[2*e1+1]>-1) {
          return 1
      }
      else {
          return -1
      }
  }

  _r(v1) {

      this.VA[v1] = -1

      this.zonemap._ae(v1)

      return 1
  }

  _s(e1) {

      if (e1<0 || e1>this.edgeNumber-1) {
          throw new Error("invalid edge in _s e1" + e1)
      }

      let v1 = this.EV[2*e1]
      let v2 = this.EV[2*e1+1]

      this.EV[2*e1] = -1
      this.EV[2*e1+1] = -1

      if (v1>-1) {
        _g(v1, e1, this.VE)
      }
      if (v2>-1) {
        _g(v2, e1, this.VE)
      }

      return 1
    }

  _t(a) {

      let edgeNumber = this.edgeNumber
      let n = 0

      for (let e = 0; e < edgeNumber; e ++ ) {

          if (this.EV[2*e]>-1) {

              let v1 = this.EV[2*e]
              let v2 = this.EV[2*e+1]
              a[n][0] = this.X[v1]
              a[n][1] = this.Y[v1]
              a[n][2] = this.X[v2]
              a[n][3] = this.Y[v2]

              n+=1
          }
      }

      return n
  }

  _u(a) {
  
      let vnum = this.vnum
      let n = 0

      for (let v = 0; v < vnum; v ++) {

          if (this.VA[v]>-1) {

              a[n][0] = this.X[v]
              a[n][1] = this.Y[v]
              n+=1
          }
      }

      return n
  }

  _v(e1) {

    let nx = this.X[this.EV[2*e1]] - this.X[this.EV[2*e1+1]]
    let ny = this.Y[this.EV[2*e1]] - this.Y[this.EV[2*e1+1]]
    let length = Math.sqrt(nx*nx+ny*ny)

    return length
  }

  _w(xys, lock_edges=1) {

    let vertices = []
    let snum = this.snum
    let xx, yy

    if (lock_edges>0) {

      xx = xys[0][0]
      yy =  xys[0][1]

      vertices.push(this._n(xx,yy,snum,0))

      for(let i = 1; i < xys.length - 1 ; i ++) {
        xx = xys[i][0]
        yy = xys[i][1]
        vertices.push(this._n(xx, yy, snum, 1))
      }

      xx = xys[xys.length - 1][0]
      yy = xys[xys.length - 1][1]
      vertices.push(this._n(xx,yy,snum,0))
    }

    else {
      for (let i = 0 ; i < xys.length; i ++ ) {
        xx = xys[i][0]
        yy = xys[i][1]
        vertices.push(this._n(xx,yy,snum,1))
      }
    }

    for (let i = 0; i < vertices.length - 1; i ++) {
      this._p(vertices[i],vertices[i+1])
    }

    this.snum = snum+1
  }

  _x(x, y, r, angles) {
    
    let vertices = []
    let snum = this.snum

    let num_angles = angles.length

    for (let i = 0; i < num_angles; i ++) {
      const the = angles[i]

      const xx = x + Math.cos(the)*r
      const yy = y + Math.sin(the)*r

      vertices.push(this._n(xx,yy,snum,1))
    }

    for (let i = 0; i < vertices.length-1; i ++) {
      this._p(vertices[i],vertices[i+1])
    }

    this._p(vertices[0],vertices[num_angles-1])
    this.snum = snum+1
  }

  _y(e1, minimum_length=-1) {
    if (this._q(e1)<0) {
      throw new Error("e1 does not exist")
    }
    if (e1<0) {
      throw new Error("invalid edge in _y e1" + e1)
    }

    let v1 = this.EV[2*e1]
    let v2 = this.EV[2*e1+1]

    let s = this.VS[v1]

    if (s<0) {
      throw new Error("Invalid segment id.")
    }

    if (minimum_length>0) {
      let dx = this.X[v1] - this.X[v2]
      let dy = this.Y[v1] - this.Y[v2]

      if (dx*dx+dy*dy<minimum_length*minimum_length) {
        throw new Error("edge too short, e1," + e1)
      }
    }

    let midx = (this.X[v1] + this.X[v2])*0.5
    let midy = (this.Y[v1] + this.Y[v2])*0.5

    let v3 = this._n(midx,midy,s,1)
    this._s(e1)

    this._p(v1,v3)
    this._p(v2,v3)

    return 1
  }

  _z(e1) {

    if (this._q(e1)<0) {
      throw new Error("e1 does not exist")
    }

    if (e1<0) {
      throw new Error("invalid edge in _y e1" + e1)
    }

    let va = this.EV[2*e1]
    let vb = this.EV[2*e1+1]
    let e2, e3

    if (va<0 || vb<0) {
      throw new Error("non-vertex")
    }
    if (this.VE[2*va] == this.VE[2*vb]) {
      e2 = this.VE[2*va+1]
      e3 = this.VE[2*vb+1]
    }
    else if (this.VE[2*va] == this.VE[2*vb+1]) {
      e2 = this.VE[2*va+1]
      e3 = this.VE[2*vb]
    }
    else if (this.VE[2*va+1] == this.VE[2*vb]) {
      e2 = this.VE[2*va]
      e3 = this.VE[2*vb+1]
    }
    else if (this.VE[2*va+1] == this.VE[2*vb+1]) {
      e2 = this.VE[2*va]
      e3 = this.VE[2*vb]
    }
    else {
      throw new Error('edges not connected')
    }

    let v3 = this.EV[2*e1]
    let v4 = this.EV[2*e1+1]
    let v1, v2, ax, bx, ay, by
    let t = 0.0
    
    if (e2>-1) {
      v1 = this.EV[2*e2]
      v2 = this.EV[2*e2+1]

      ax = this.X[v1] - this.X[v2]
      bx = this.X[v3] - this.X[v4]
      ay = this.Y[v1] - this.Y[v2]
      by = this.Y[v3] - this.Y[v4]

      t += Math.abs(ax*by - ay*bx)*0.5
    }
    if (e3>-1) {
      v1 = this.EV[2*e3]
      v2 = this.EV[2*e3+1]

      ax = this.X[v1] - this.X[v2]
      bx = this.X[v3] - this.X[v4]
      ay = this.Y[v1] - this.Y[v2]
      by = this.Y[v3] - this.Y[v4]

      t += Math.abs(ax*by - ay*bx)*0.5
    }
    
    if (t<=0) {
      throw new Error("no curvature.")
    }

    return t
  }

  _aa(limit) {
    let vnum = this.vnum
    for (let i = 0 ; i < vnum ; i ++) {
        if( this.X[i] < ((RS - CURRENTSIZE) / 2 / RS + limit) || this.X[i] > (1 - (RS - CURRENTSIZE) / 2 / RS - limit) ) {
          return - 1
        }
        if(this.Y[i] < ((RS - CURRENTSIZE) / 2 / RS + limit) || this.Y[i] > (1 - (RS - CURRENTSIZE) / 2 / RS - limit)) {
            return -1
        }
    }
    return 1
  }

  _ab() {
      return this.edgeNumber
  }
}
