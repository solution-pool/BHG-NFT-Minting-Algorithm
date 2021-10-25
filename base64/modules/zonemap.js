class Zonemap {

  constructor(nz) {
    nz = parseInt(nz)
    const total_zones = nz ** 2
    this.VZ                     = []
    this.Z                      = []

    this.vnum                   = 0
    this.vsize                  = RS

    this.nz                     = nz
    this.total_zones            = nz*nz
    this.greatest_zone_size     = RS

    for (let i = 0; i < this.total_zones ; i ++) {

      let z = []

      z.i = i
      z.size = RS
      z.count = 0
      z.ZV = []

      this.Z[i] = z
    }
  }
  _ac(X,Y) {

    this.X = X
    this.Y = Y

    return
  }
  _ad(v1) {
    v1 = parseInt(v1)
    let vnum = this.vnum

    const x = this.X[v1]
    const y = this.Y[v1]

    const z1 = this._ai(x,y)

    this._af(z1, vnum)
    this.VZ[vnum] = z1

    const new_vz = []
    
    if (this.vnum>=this.vsize-1) {
      this.VZ = new_vz;
      this.vsize = this.vsize*2
    }

    this.vnum += 1
    return vnum
  }
  _ae(v1) {

    v1 = parseInt(v1)
    this._ah(this.VZ[v1], v1)
    this.VZ[v1] = -1

    return 1
  }
  _af(z1, v1) {
    
    z1 = parseInt(z1)
    v1 = parseInt(v1)

    let z = this.Z[z1]
    if(z == undefined) {
      z = []
      z.count = 0
      z.ZV = []
      z.i = 0
      z.size = SIZE

      this.Z.push(z)
    }
    z.ZV[z.count] = v1
    z.count += 1

    if (z.count>=z.size-1) {
      return this._ag(z)
    }

    return 1
  }
  _ag(z) {

    let new_size = z.size*2
    const new_zv = []
      z.ZV = new_zv;
      z.size = new_size
      if (new_size>this.greatest_zone_size) {
        this.greatest_zone_size = new_size
      }

      this.Z.push(z)
    return 1
  }
  _ah(z1, v1) {
    z1 = parseInt(z1)
    v1 = parseInt(v1)

    let z = this.Z[z1]
    for (let i = 0; i < z.count ;  i ++) {

      if (z.ZV[i] == v1) {
        z.ZV[i] = z.ZV[z.count-1]
        z.count -= 1
        return 1
      }
    }

    return -1
  }
  _ai(x, y) {

    const nz = this.nz

    const i = parseInt(x*nz)
    const j = parseInt(y*nz)
    const z = nz*i + j

    return z
  }
  _aj(v1) {
    v1 = parseInt(v1)
    const x = this.X[v1]
    const y = this.Y[v1]
    const new_z = parseInt(this._ai(x, y))
    const old_z = parseInt(this.VZ[v1])

    if (old_z<0) {
      return -1
    }

    if (new_z != old_z) {
      this._ah(old_z, v1)
      this._af(new_z, v1)
      this.VZ[v1] = new_z

      return 1
    }

    return -1
  }
  _ak(x, y, rad, vertices) {

    const nz = this.nz

    const zx = parseInt(x*nz)
    const zy = parseInt(y*nz)

    let num = 0

    const rad2 = rad*rad


    for (let a = Math.max(zx-1,0); a < Math.min(zx+2,nz); a ++) {
      for (let b = Math.max(zy-1,0); b < Math.min(zy+2,nz); b ++ ) {
        
        const z = this.Z[a*nz+b]

        for (let i = 0; i < z.count; i ++) {

          const dx = x-this.X[z.ZV[i]]
          const dy = y-this.Y[z.ZV[i]]

          if (dx*dx+dy*dy<rad2) {

            vertices[num] = z.ZV[i]
            num += 1
          }
        }
      }
    }
    return num
  }
}
