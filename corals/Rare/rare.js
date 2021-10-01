let step_count = 7
let SIZE = parseInt(REALSIZE / 7 * step_count)

const TWOPI     = 2* Math.PI
let DF = []
let render = []
let np_coords = []
let np_vert_coords = []
let growth_flag = true

Math.seedrandom(index_number)

for(let i = 0; i < NMAX; i ++) {
  np_coords.push([0,0,0,0])
}
for(let i = 0; i < NMAX; i ++) {
  np_vert_coords.push([0,0])
}

function setup() {
  createCanvas(REALSIZE, REALSIZE)
  background(BACK)
  DF = new DifferentialLine(NMAX, FARL * 2, NEARL, FARL)

  let angles = []
  for(let i = 0; i < INIT_NUM ; i ++ ) {
      angles.push(Math.random() * TWOPI)
  }
  let xys = []
  let lock_edges
  for (let i = 0; i < angles.length; i ++) {
    let a = angles[i]
    let x = 0.5 + cos(a)*0.1
    let y = 0.5 + sin(a)*0.1
    xys.push([x,y])
  }
  xys.sort()

  DF.init_line_segment(xys, lock_edges=1)
  render = new Render(REALSIZE, BACK, FRONT, wrap)
}

function draw() {
  wrap(render)
}

function wrap (render) {
  let res     = steps(DF)
  let vert_num = DF.np_get_vert_coordinates(np_vert_coords)
  const real = np_vert_coords.slice(0, vert_num)
  render.dot(real)
  return res
}

function steps(df) {
  df.optimize_position(STP)
  spawn(df, NEARL, 0.03)

  if(df.safe_vertex_positions(3 * STP) < 0) {
    // setup()
    throw new Error("Vertices reached boundary. Stopping.")
  }
}
  