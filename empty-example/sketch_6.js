const NMAX  = 10 **4
SIZE  = 500
const ONE   = 1 / SIZE

const STP   = ONE
const NEARL = 5 * ONE
const FARL  = 60 * ONE

const INIT_RAD  = 5 * ONE
const INIT_NUM  = 5
const MID   = 0.5
const PROCS = 2

const TWOPI     = Math.PI
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
    angles.push(1 / INIT_NUM * (i ** 1 % 10) * PI * 1.5)
  }
  DF.init_circle_segment(MID, MID, INIT_RAD, angles)
  render = new Animate(SIZE, BACK, FRONT, wrap)
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
  spawn(df, NEARL, 0.5)
  if(df.safe_vertex_positions(3 * STP) < 0) {
    throw new Error("Vertices reached boundary. Stopping.")
  }
}
  