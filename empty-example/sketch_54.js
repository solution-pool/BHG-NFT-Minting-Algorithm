const NMAX  = 10 ** 4
SIZE  = 800
const ONE   = 1 / SIZE

const STP   = ONE
const NEARL = 4 * ONE
const FARL  = 55 * ONE

const INIT_RAD  = 10 * ONE
const INIT_NUM  = 40
const MID   = 0.5
const PROCS = 2

const TWOPI     = 2* Math.PI
const LINEWIDTH = 1 * ONE

const FRONT = [255,255,255, 0.2]
const BACK  = [0,0,0]
let DF = []

let render = []
let np_coords = []
let np_vert_coords = []

for(let i = 0; i < NMAX; i ++) {
  np_coords.push([0,0,0,0])
}
for(let i = 0; i < NMAX; i ++) {
  np_vert_coords.push([0,0])
}

function setup() {
  createCanvas(SIZE, SIZE)
  background(BACK)
  DF = new DifferentialLine(NMAX, FARL * 2, NEARL, FARL, PROCS)

  let angles = []
  for(let i = 0; i < INIT_NUM ; i ++ ) {
    angles.push(Math.random() * TWOPI)
  }
  angles.sort()
  DF.init_circle_segment(MID, MID, INIT_RAD, angles)

  render = new Animate(SIZE, BACK, FRONT, wrap)
}
function initialize () {
  for(let i = 0; i < NMAX; i ++) {
    np_coords.push([0,0,0,0])
  }
  for(let i = 0; i < NMAX; i ++) {
    np_vert_coords.push([0,0])
  }
  DF = new DifferentialLine(NMAX, FARL * 2, NEARL, FARL, PROCS)
  render = new Animate(SIZE, BACK, FRONT, wrap)
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
  