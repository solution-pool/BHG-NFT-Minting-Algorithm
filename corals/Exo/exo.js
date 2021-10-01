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
  angles.sort()
  DF.init_circle_segment(MID, MID, INIT_RAD, angles)

  render = new Render(REALSIZE, BACK, FRONT, wrap)
}

function draw() {
  wrap(render)
}

function wrap (render) {
  let res     = steps(DF)
  let num     = DF.np_get_edges_coordinates(np_coords)
  const real  = np_coords.slice(0, num)
  render.sandstroke(real)
  return res
}

function steps(df) {
  df.optimize_position(STP)
  spawn(df, NEARL, 0.03)

  if(df.safe_vertex_positions(3 * STP) < 0) {
    throw new Error("Vertices reached boundary. Stopping.")
  }
}
  