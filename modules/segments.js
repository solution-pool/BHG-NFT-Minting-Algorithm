class Segments {

  constructor(nmax, zonewidth) {
      this.X = new Array()
      double_array_init(this.X, nmax, 0)
      this.Y = new Array()
      double_array_init(this.Y, nmax, 0)
      this.VA =  new Array()
      long_array_init(this.VA, nmax, 0)
      this.VS = new Array()
      long_array_init(this.VS, nmax, -1)
      this.EV = new Array()
      long_array_init(this.EV, 2*nmax, -1)
      this.VE = new Array()
      long_array_init(this.VE, 2* nmax, -1)

      this.nmax = nmax

      this.vnum = 0

      this.vact = 0

      this.edgeNumber = 0

      this.snum = 0

      this.zonewidth = zonewidth

      this.nz = 1.0 /zonewidth

      if (this.nz<3) {
          this.nz = 1
          this.zonewidth = 1.0
      }

      this.zonemap = new Zonemap(this.nz)
      this.zonemap.__assign_xy_arrays(this.X, this.Y)
  }
  __valid_new_vertex(x,  y) {

      if (x<0 || x>1) {
          return -1
      }

      if (y<0 || y>1) {
          return -1
      }

      return 1
  }
  __add_vertex(x, y, s) {
      if (this.__valid_new_vertex(x,y)<0) {
          throw new Error("Vertext outside unit square.")
      }

      const vnum = this.vnum
      
      this.X[vnum] = x
      this.Y[vnum] = y
      this.VA[vnum] = 1
      this.VS[vnum] = s

      this.zonemap.__add_vertex(vnum)

      this.vnum = vnum + 1
      return vnum
  }

  __add_passive_vertex(x, y,  s) {
  
      if (this.__valid_new_vertex(x,y)<0) {
          throw new Error("Vertext outside unit square.")
      }

      let vnum = this.vnum

      this.X[vnum] = x
      this.Y[vnum] = y
      this.VA[vnum] = 0
      this.VS[vnum] = s

      this.zonemap.__add_vertex(vnum)

      this.vnum += 1
      return vnum
  }
  
  __valid_new_edge(v1,  v2) {
      if (v1<0 || v1>this.vnum-1 || this.VA[v1]<0) {
        return -1
      }

      if (v2<0 || v2>this.vnum-1 || this.VA[v2]<0) {
        return -1
      }

      return 1
  }

  __add_edge(v1,  v2) {
      v1 = parseInt(v1)
      v2 = parseInt(v2)
      const edgeNumber = this.edgeNumber
      if (this.__valid_new_edge(v1,v2)<0) {
          throw new Error("invalid vertex in __add_edge v1, v2, " + v1 + ',' + v2)
      }

      this.EV[2*edgeNumber] = v1
      this.EV[2*edgeNumber+1] = v2

      add_e_to_ve(v1, edgeNumber, this.VE)
      add_e_to_ve(v2, edgeNumber, this.VE)

      this.edgeNumber += 1
      return edgeNumber
  }

  __edge_exists(e1) {

      if (this.EV[2*e1]>-1 && this.EV[2*e1+1]>-1) {
          return 1
      }
      else {
          return -1
      }
  }

  __vertex_exists(v1) {

      if (this.VA[v1]>-1) {
          return 1
      }
      else {
          return -1
      }
  }

  __vertex_status(v1) {

      return this.VA[v1]
  }

  __vertex_segment(v1) {

      return this.VS[v1]
  }

  __del_vertex(v1) {

      this.VA[v1] = -1

      this.zonemap.__del_vertex(v1)

      return 1
  }

  __set_passive_vertex(v1) {
  
      this.VA[v1] = 0

      return 1
  }

  __del_edge(e1) {

      if (e1<0 || e1>this.edgeNumber-1) {
          throw new Error("invalid edge in __del_edge e1" + e1)
      }

      let v1 = this.EV[2*e1]
      let v2 = this.EV[2*e1+1]

      this.EV[2*e1] = -1
      this.EV[2*e1+1] = -1

      if (v1>-1) {
        del_e_from_ve(v1, e1, this.VE)
      }
      if (v2>-1) {
        del_e_from_ve(v2, e1, this.VE)
      }

      return 1
  }   

  __get_edge_normal(s1,  nn) {

      let v1 = this.EV[2*s1]
      let v2 = this.EV[2*s1+1]

      let x1 = this.X[v1]
      let y1 = this.Y[v1]
      let x2 = this.X[v2]
      let y2 = this.Y[v2]

      let nx = -(y2-y1)
      let ny = x2-x1
      let dn = Math.sqrt(nx*nx+ny*ny)

      if (dn<=0) {
          throw new Error("edge normal is < 0 in __get_edge_normal")
      }

      nn[0] = nx/dn
      nn[1] = ny/dn

      return 1
  }

  __safe_vertex_positions(limit) {
      let vnum = this.vnum
      for (let i = 0 ; i < vnum ; i ++) {
          if( this.X[i] < ((REALSIZE - SIZE) / 2 / REALSIZE - limit) || this.X[i] > (1 - (REALSIZE - SIZE) / 2 / REALSIZE + limit) ) {
            return - 1
          }
          if(this.Y[i] < ((REALSIZE - SIZE) / 2 / REALSIZE - limit) || this.Y[i] > (1 - (REALSIZE - SIZE) / 2 / REALSIZE + limit)) {
              return -1
          }
      }
      return 1
  }   

  get_edges_coordinates() {
  
      let res = []
      let edgeNumber = this.edgeNumber

      for (e = 0 ; e < edgeNumber; e ++ ) {

          if (this.EV[2*e]>-1) {

              v1 = this.EV[2*e]
              v2 = this.EV[2*e+1]
              res.push([this.X[v1], this.Y[v1],
                          this.X[v2], this.Y[v2]])
          }
      }
      return res
  }

  np_get_edges_coordinates(a) {

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

  np_get_edges(a) {
      n = 0

      for(e = 0; e < count(this.edgeNumber); e ++ ) {
          

        if (this.EV[2*e]>-1) {

            a[n,0] = this.EV[2*e]
            a[n,1] = this.EV[2*e+1]

            n+=1
        }
      }
      return n
  }

  np_get_vert_coordinates(a) {
  
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

  get_greatest_distance(x, y) {
      
      vnum = this.vnum
      max = 0.0

      for (v = 0; v < count(vnum); v ++) {

          if (his.VA[v]>-1) {

              dx = x - this.X[v]
              dy = y - this.Y[v]
              d = sqrt(dx*dx+dy*dy)
              if (d>dmax) {
                dmax = d
              }
          }
      }

      return dmax
  }

  np_get_sorted_verts(a) {
      throw new Error("Error occured")
      let ev_dict = {}
      let ve_dict = {}
      let e_visited = {}
      let v_ordered = []
      let edgeNumber = this.edgeNumber

      let e_start = -1

      for (e= 0 ;e < count(edgeNumber); e ++ ) {

          if (this.EV[2*e]>-1) {

              e_start = e

              v1 = this.EV[2*e]
              v2 = this.EV[2*e+1]
              ev_dict[e] = [v1,v2]

              if (v1 in ve_dict) {
                  ve_dict[v1].append(e)
              }
              else {
                  ve_dict[v1] = [e]
              }

              if (v2 in ve_dict) {
                  ve_dict[v2].append(e)
              }
              else {
                  ve_dict[v2] = [e]
              }
          }   
          if (e_start>-1) {

              e_visited[e_start] = True

              vcurr = ev_dict[e_start][1]
              vend = ev_dict[e_start][0]

              while (vend!=vcurr) {

                  if (ve_dict[vcurr][0] in e_visited) {
                      e = ve_dict[vcurr][1]
                  }
                  else {
                      e = ve_dict[vcurr][0]
                  }

                  e_visited[e] = True

                  v1,v2 = ev_dict[e]

                  if (v1 == vcurr) {
                      vcurr = v2
                  }
                  else {
                      vcurr = v1
                  }

                  v_ordered.append(vcurr)
              }
          }
      }

      for (i in v_ordered) {
        a[i] = v_ordered[i]
      }

      return len(v_ordered)
  }

  np_get_sorted_vert_coordinates(a) {

    ev_dict = {}
    ve_dict = {}
    e_visited = {}
    v_ordered = []
    edgeNumber = this.edgeNumber

    e_start = -1

    for (e = 0 ; e < count(edgeNumber); e ++) {

      if (this.EV[2*e]>-1) {

        e_start = e

        v1 = this.EV[2*e]
        v2 = this.EV[2*e+1]
        ev_dict[e] = [v1,v2]

        if (v1 in ve_dict) {
          ve_dict[v1].append(e)
        }
        else {
          ve_dict[v1] = [e]
        }

        if (v2 in ve_dict) {
          ve_dict[v2].append(e)
        }
        else {
          ve_dict[v2] = [e]
        }
      }
    }
    if (e_start>-1) {

      e_visited[e_start] = True

      vcurr = ev_dict[e_start][1]
      vend = ev_dict[e_start][0]

      while (vend!=vcurr) {

        if (ve_dict[vcurr][0] in e_visited) {
          e = ve_dict[vcurr][1]
        }
        else {
          e = ve_dict[vcurr][0]
        }

        e_visited[e] = True

        v1,v2 = ev_dict[e]

        if (v1 == vcurr) {
          vcurr = v2
        }
        else {
          vcurr = v1
        }

        v_ordered.append(vcurr)
      }
    }

    for (k in v_ordered) {
      a[k,0] = this.X[v_ordered[k]]
      a[k,1] = this.Y[v_ordered[k]]
    }

    return len(v_ordered)
  }

  get_edges() {

    res = []
    edgeNumber = this.edgeNumber

    for (e in range(edgeNumber)) {

      if (this.EV[2*e]>-1) {

        res.append(e)
      }
    }

    return res
  }

  get_edges_vertices() {
    res = []
    edgeNumber = this.edgeNumber

    for (e in range(edgeNumber)) {

      if (this.EV[2*e]>-1) {

        res.append([this.EV[2*e],this.EV[2*e+1]])
      }
    }

    return res
  }

  get_edge_length(e1) {

    let nx = this.X[this.EV[2*e1]] - this.X[this.EV[2*e1+1]]
    let ny = this.Y[this.EV[2*e1]] - this.Y[this.EV[2*e1+1]]
    let length = Math.sqrt(nx*nx+ny*ny)

    return length
  }

  get_edge_vertices(e1) {

    return [this.EV[2*e1], this.EV[2*e1+1]]
  }

  init_line_segment(xys, lock_edges=1) {

    let vertices = []
    let snum = this.snum
    let xx, yy

    if (lock_edges>0) {

      xx = xys[0][0]
      yy =  xys[0][1]

      vertices.push(this.__add_passive_vertex(xx,yy,snum))

      for(let i = 1; i < xys.length - 1 ; i ++) {
        xx = xys[i][0]
        yy = xys[i][1]
        vertices.push(this.__add_vertex(xx, yy, snum))
      }

      xx = xys[xys.length - 1][0]
      yy = xys[xys.length - 1][1]
      vertices.push(this.__add_passive_vertex(xx,yy,snum))
    }

    else {
      for (let i = 0 ; i < xys.length; i ++ ) {
        xx = xys[i][0]
        yy = xys[i][1]
        vertices.push(this.__add_vertex(xx,yy,snum))
      }
    }

    for (let i = 0; i < vertices.length - 1; i ++) {
      this.__add_edge(vertices[i],vertices[i+1])
    }

    this.snum = snum+1
  }

  init_passive_line_segment(xys) {

    vertices = []
    snum = this.snum

    for (xx in xys) {
      vertices.append(this.__add_passive_vertex(xx,xys[xx],snum))
    }

    for (i in range(len(vertices)-1)) {
      this.__add_edge(vertices[i],vertices[i+1])
    }

    this.snum = snum+1
  }

  init_circle_segment(x, y, r, angles) {
    
    let vertices = []
    let snum = this.snum

    let num_angles = angles.length

    for (let i = 0; i < num_angles; i ++) {
      const the = angles[i]

      const xx = x + cos(the)*r
      const yy = y + sin(the)*r

      vertices.push(this.__add_vertex(xx,yy,snum))
    }

    for (let i = 0; i < vertices.length-1; i ++) {
      this.__add_edge(vertices[i],vertices[i+1])
    }

    this.__add_edge(vertices[0],vertices[num_angles-1])
    this.snum = snum+1
  }

  init_passive_circle_segment(x, y, r, angles) {

    vertices = []
    snum = this.snum

    for (i in range(len(angles))) {
      the = angles[i]

      xx = x + cos(the)*r
      yy = y + sin(the)*r

      vertices.append(this.__add_passive_vertex(xx,yy,snum))
    }

    for (i in range(len(vertices)-1)) {
      seg = this.__add_edge(vertices[i],vertices[i+1])
    }

    this.__add_edge(vertices[0],vertices[-1])
    this.snum = snum+1
  }

  collapse_edge(e1, maximum_length=-1.) {

    if (this.__edge_exists(e1)<0) {
      throw new Error("e1 does not exist")
    }

    if (e1<0) {
      throw new Error("invalid edge in split_edge e1, " + e1)
    }

    v1 = this.EV[2*e1]
    v2 = this.EV[2*e1+1]

    if (this.VA[v1] < 1 || this.VA[v2] < 1) {
      throw new Error("edge is connected to passive vertex")
    }

    if (this.VE[2*v1] == e1) {
      e2 = this.VE[2*v1+1]
    }
    else {
      e2 = this.VE[2*v1]
    }

    if (this.EV[2*e2] == v1) {
      v3 = this.EV[2*e2+1]
    }
    else {
      v3 = this.EV[2*e2]
    }

    if (maximum_length>0) {
      dx = this.X[v1] - this.X[v2]
      dy = this.Y[v1] - this.Y[v2]

      if (dx*dx+dy*dy>maximum_length*maximum_length) {
        throw new Error("edge too long, e1," + e1)
      }
    }

    this.X[v2] = (this.X[v1] + this.X[v2])*0.5
    this.Y[v2] = (this.Y[v1] + this.Y[v2])*0.5

    this.__del_edge(e1)
    this.__del_edge(e2)

    this.__del_vertex(v1)
    this.__add_edge(v3,v2)

    return 1
  } 

  split_edge(e1, minimum_length=-1.) {
    if (this.__edge_exists(e1)<0) {
      throw new Error("e1 does not exist")
    }
    if (e1<0) {
      throw new Error("invalid edge in split_edge e1" + e1)
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

    let v3 = this.__add_vertex(midx,midy,s)
    this.__del_edge(e1)

    this.__add_edge(v1,v3)
    this.__add_edge(v2,v3)

    return 1
  }

  split_long_edges(limit) {

    edgeNumber = this.edgeNumber

    for (e in range(edgeNumber)) {

      if (this.EV[2*e]>-1) {

        v1 = this.EV[2*e]
        v2 = this.EV[2*e+1]

        if (this.VA[v1]<1 && this.VA[v2]<1)
          // # edge is passive/dead
          continue

        dx = this.X[v1] - this.X[v2]
        dy = this.Y[v1] - this.Y[v2]
        d = sqrt(dx*dx+dy*dy)

        if (d>limit) {
          this.split_edge(e)
        }
      }
    }

    return
  }

  get_edge_curvature(e1) {

    if (this.__edge_exists(e1)<0) {
      throw new Error("e1 does not exist")
    }

    if (e1<0) {
      throw new Error("invalid edge in split_edge e1" + e1)
    }

    va = this.EV[2*e1]
    vb = this.EV[2*e1+1]

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

    v3 = this.EV[2*e1]
    v4 = this.EV[2*e1+1]

    t = 0.0

    if (e2>-1) {
      v1 = this.EV[2*e2]
      v2 = this.EV[2*e2+1]

      ax = this.X[v1] - this.X[v2]
      bx = this.X[v3] - this.X[v4]
      ay = this.Y[v1] - this.Y[v2]
      by = this.Y[v3] - this.Y[v4]

      t += Math.fabs(ax*by - ay*bx)*0.5
    }
    if (e3>-1) {
      v1 = this.EV[2*e3]
      v2 = this.EV[2*e3+1]

      ax = this.X[v1] - this.X[v2]
      bx = this.X[v3] - this.X[v4]
      ay = this.Y[v1] - this.Y[v2]
      by = this.Y[v3] - this.Y[v4]

      t += Math.fabs(ax*by - ay*bx)*0.5
    }

    if (t<=0) {
      throw new Error("no curvature.")
    }

    return t
  }

  get_active_vertex_count() {

      c = 0

      for (v = 0; v < count(this.vnum); v ++) {
          if (this.VA[v]>0) {
              c += 1
          }
      }

      return c
  }

  safe_vertex_positions(limit) {
      return this.__safe_vertex_positions(limit)
  }

  get_snum() {

      return this.snum
  }

  get_vnum() {

      return this.vnum
  }

  get_enum() {

      return this.edgeNumber
  }
}
