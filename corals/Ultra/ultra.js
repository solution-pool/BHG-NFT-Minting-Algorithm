let step_count = 1
let SIZE = parseInt(REALSIZE / 5 * step_count)

const TWOPI     = 2 * Math.PI
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
    // angles.push(Math.random() * Math.PI )
    angles.push(1 / INIT_NUM * (i ** 1 % 10) * PI * 1.5)
  }
  DF.init_circle_segment(MID, MID, INIT_RAD, angles)
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

async function steps(df) {
  df.optimize_position(STP)
  spawn(df, NEARL, 0.3)
  if(df.safe_vertex_positions(3 * STP) < 0) {
    // throw new Error("Vertices reached boundary. Stopping.")
    sleep(2000)
    Math.seedrandom(index_number)

    setup()
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
  