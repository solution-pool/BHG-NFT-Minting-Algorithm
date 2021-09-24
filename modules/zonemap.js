// from __future__ import division

// cimport cython
// from libc.stdlib cimport malloc, free, realloc
// from libc.math cimport sqrt

// from helpers cimport long_array_init
// from helpers cimport double_array_init

// import numpy as np
// cimport numpy as np

let SIZE = 1024


class Zonemap {

  constructor(nz) {
    nz = parseInt(nz)
    const total_zones = nz ** 2
    this.VZ                     = []
    this.Z                      = []

    this.vnum                   = 0
    this.vsize                  = SIZE

    this.nz                     = nz
    this.total_zones            = nz*nz
    this.greatest_zone_size     = SIZE
    
    this.__init_zones()
  }
  __init_zones() {
    // somehow this did not work when executed inside cinit

    for (let i = 0; i < this.total_zones ; i ++) {

      let z = []

      z.i = i
      z.size = SIZE
      z.count = 0
      z.ZV = []

      this.Z[i] = z
    }
  }
  __assign_xy_arrays(X,Y) {

    this.X = X
    this.Y = Y

    return
  }
  __add_vertex(v1) {
    v1 = parseInt(v1)
    let vnum = this.vnum

    const x = this.X[v1]
    const y = this.Y[v1]

    const z1 = this.__get_z(x,y)

    this.__add_v_to_zone(z1, vnum)
    this.VZ[vnum] = z1

    const new_vz = []
    
    if (this.vnum>=this.vsize-1) {
      this.VZ = new_vz;
      this.vsize = this.vsize*2
    }

    this.vnum += 1
    return vnum
  }
  __del_vertex(v1) {

    v1 = parseInt(v1)
    this.__remove_v_from_zone(this.VZ[v1], v1)
    this.VZ[v1] = -1

    return 1
  }
  __add_v_to_zone(z1, v1) {
    
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
      return this.__extend_zv_of_zone(z)
    }

    return 1
  }
  __extend_zv_of_zone(z) {

    let new_size = z.size*2
    // // let new_zv = <long *>realloc(z.ZV, new_size*sizeof(long))
    const new_zv = []
    // if (new_zv) {
      z.ZV = new_zv;
      z.size = new_size
      if (new_size>this.greatest_zone_size) {
        this.greatest_zone_size = new_size
      }

      this.Z.push(z)
    return 1
  }
  __remove_v_from_zone(z1, v1) {
    z1 = parseInt(z1)
    v1 = parseInt(v1)

    let z = this.Z[z1]
    if(z == undefined) {
      this.VZ = []
      setup()
      return -1
    } else {
      for (let i = 0; i < z.count ;  i ++) {

        if (z.ZV[i] == v1) {
          z.ZV[i] = z.ZV[z.count-1]
          z.count -= 1
          return 1
        }
      }

      return -1
    }
  }
  __get_z(x, y) {

    const nz = this.nz

    const i = parseInt(x*nz)
    const j = parseInt(y*nz)
    const z = nz*i + j

    return z
  }
  __update_v(v1) {
    v1 = parseInt(v1)
    const x = this.X[v1]
    const y = this.Y[v1]
    const new_z = parseInt(this.__get_z(x, y))
    const old_z = parseInt(this.VZ[v1])

    if (old_z<0) {
      return -1
    }

    if (new_z != old_z) {
      this.__remove_v_from_zone(old_z, v1)
      this.__add_v_to_zone(new_z, v1)
      this.VZ[v1] = new_z

      return 1
    }

    return -1
  }
  __sphere_is_free(x, y, rad) {
    // """
    // tests if there is another vertex within rad of x,y. rad must be less than
    // the width of each zone.
    // """
    const nz = this.nz

    const zx = parseInt(x*nz)
    const zy = parseInt(y*nz)

    const rad2 = rad*rad

    // # TOOD: check middle zone first
    for (let a = Math.max(zx-1,0); a < Math.min(zx+2,nz); i ++) {
      for (let b = max(zy-1,0); b < min(zy+2,nz); b ++) {

        let z = this.Z[a*nz+b]

        for (let i = 0; i < z.count; i ++) {

          const dx = x-this.X[z.ZV[i]]
          const dy = y-this.Y[z.ZV[i]]

          if (dx*dx+dy*dy<rad2) {
            return -1
          }
        }
      }
    }

    return 1
  }
  __sphere_vertices(x, y, rad, vertices) {

    const nz = this.nz

    const zx = parseInt(x*nz)
    const zy = parseInt(y*nz)

    let num = 0

    const rad2 = rad*rad


    for (let a = max(zx-1,0); a < min(zx+2,nz); a ++) {
      for (let b = max(zy-1,0); b < min(zy+2,nz); b ++ ) {
        
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
  __get_encode_zonemap_max_size() {

    return this.total_zones * (3 + this.greatest_zone_size)
  }
  __encode_zonemap(a) {

    a[0] = this.vnum
    a[1] = this.nz
    a[2] = this.total_zones
    a[3] = this.greatest_zone_size

    let i = 4
    for (let z = 0; z < this.total_zones; z ++) {

      const zone = this.Z[z]
      a[i] = zone.count

      i += 1
      for (let s = 0; s < zone.count; s ++) {
        a[i] = zone.ZV[s]
        i += 1
      }
    }
  }
  __decode_zonemap(a) {

    const vnum = a[0]
    const nz = a[1]
    const total_zones = a[2]
    const greatest_zone_size = a[3]

    // #TODO: VZ size
    if (vnum>=this.vsize-1) {
    //   const new_vz = <long *>realloc(self.VZ, self.vsize*2*sizeof(long))
      // if (new_vz) {
        this.VZ = new_vz;
        this.vsize = this.vsize*2
      // }
      // else {
      //   // ## this is really bad
      //   // pass
      // }
    }

    this.vnum = vnum
    this.nz = nz
    this.total_zones = total_zones
    this.greatest_zone_size = greatest_zone_size

    let count = a[4]
    let z = 0
    let s = 0
    let i = 5
    let k = 0

    while (true) {

      if (count>=this.Z[z].size-1) {
        // const new_zv = <long *>realloc(self.Z[z].ZV, self.Z[z].size*2*sizeof(long))
        // if (new_zv) {
          this.Z[z].ZV = new_zv;
          this.Z[z].size = this.Z[z].size*2
        // }
        // else {
        //   ## this is really bad
        //   pass
        // }
      }

      for (let s = 0; s < count; s ++) {

        // #TODO: ZV sizes
        this.Z[z].ZV[s] = a[i]
        this.VZ[k] = z
        i += 1
        k += 1
      }

      this.Z[z].count = count

      count = a[i]
      z += 1
      i += 1

      if (z>=this.total_zones) {
        break
      }
    }
    return
  }
  add_vertex(v1) {
    v1 = parseInt(v1)
    return this.__add_vertex(v1)
  }
  del_vertex(v1) {
    v1 = parseInt(v1)
    return this.__del_vertex(v1)
  }
  __get_max_sphere_count() {

    return this.greatest_zone_size*9
  }
  _perftest(nmax, num_points) {
    nmax = parseInt(nmax)
    let a = []
    let res = []
    let X = []
    let Y = []
    this.__assign_xy_arrays(X,Y)

    for (let i = 0; i < num_points; i ++) {
        a.push([Math.random(), Math.random()])
    }

    let t1 = time()
    
    for (i = 0; i < num_points; i ++ ) {
        X[i] = a[i][0]
        Y[i] = a[i][1]
        this.__add_vertex(i)
    }
    let t2 = time()
    res.push(['add',t2-t1])

    t1 = time()
    for (i = 0; i < num_points; i ++) {
        this.__sphere_is_free(X[i], Y[i], 1.0/this.nz)
    }
    t2 = time()
    res.append(['free',t2-t1])

    t1 = time()
    let asize = this.__get_max_sphere_count()
    let vertices = []
    for (i = 0; i < num_points; i ++) {
    this.__sphere_vertices(
            X[i],
            Y[i],
            1.0/this.nz,
            vertices
        )
    }
    t2 = time()
    res.push(['sphere',t2-t1])

    t1 = time()
      for (i = 0; i < num_points; i ++ ) {
        this.__del_vertex(i)
      }
    t2 = time()
    res.push(['del',t2-t1])
    return res
  }
  update_v(v1) {
    v1 = parseInt(v1)
    return this.__update_v(v1)
  }
  sphere_is_free(x, y, rad) {

    return this.__sphere_is_free(x, y, rad)
  }
  get_max_sphere_count() {

    return this.__get_max_sphere_count()
  }
  get_vnum() {

    return this.vnum
  }
  get_zone_info_dicts() {

    let res = []

    for (let i = 0; i < this.total_zones; i ++) {

      d = {
        'i': this.Z[i].i,
        'size': this.Z[i].size,
        'count': this.Z[i].count
      }

      res.push(d)
    }
    return res
  }
}
