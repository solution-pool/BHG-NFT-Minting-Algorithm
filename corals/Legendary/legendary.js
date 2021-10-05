let np_coords, np_vert_coords, growth_flag, DF, render, coloroptions, current_front
let step_count = 1, step_length, color_count = 0, draw_path = [], pulsating_path = [], pulsating_count =  0, pulse_start = false

function preload() {
  let colorLength = color.length
  coloroptions = {
    1 : {
      BACK : [0,0,0],
      FRONT : color[(INDEX % colorLength)]
    },
    2 : {
      BACK : [255, 255, 255],
      FRONT : color[(INDEX % colorLength)]
    },
    3 : {
      BACK : color[(INDEX % colorLength)],
      FRONT : [0, 0, 0]
    },
    4 : {
      BACK : color[(INDEX % colorLength)],
      FRONT : [255, 255, 255]
    },
    5 : {
      BACK : [255, 255, 255],
      FRONT : [
        color[(INDEX % colorLength)],
        color[((INDEX + 21) % colorLength)]
      ]
    },
    6 : {
      BACK : [0, 0, 0],
      FRONT : [
        color[(INDEX % colorLength)],
        color[((INDEX + 21) % colorLength)]
      ]
    },
    7 : {
      BACK : [255, 255, 255],
      FRONT : [
        color[(INDEX % colorLength)],
        color[((INDEX + 14) % colorLength)],
        color[((INDEX + 28) % colorLength)]
      ]
    },
    8 : {
      BACK : [0, 0, 0],
      FRONT : [
        color[(INDEX % colorLength)],
        color[((INDEX + 14) % colorLength)],
        color[((INDEX + 28) % colorLength)]
      ]
    },
  }
  FRONT = coloroptions[COLOROPTION].FRONT
  BACK  = coloroptions[COLOROPTION].BACK
}

function init_current_size() {
  if(RYTHM == 1 || RYTHM == 2) {
    CURRENTSIZE = REALSIZE
  } else {
    CURRENTSIZE = parseInt(REALSIZE / (RYTHM - 1))
  }
}

function setup() {
  init_current_size()
  growth_flag = true
  Math.seedrandom(INDEX)
  if(COLOROPTION > 4) {
    current_front = FRONT[color_count]
    color_count = (color_count + 1) % (FRONT.length)
  } else {
    current_front = FRONT
  }
  createCanvas(REALSIZE, REALSIZE)
  background(BACK)
  DF = new DifferentialLine(NMAX, FARL * 2, NEARL, FARL)

  let angles = []
  for(let i = 0; i < INIT_NUM ; i ++ ) {
    angles.push(Math.random() * TWOPI)
  }
  DF.init_circle_segment(MID, MID, INIT_RAD, angles)
  render = new Render(REALSIZE, BACK, current_front)
}

function draw() {
  wrap(render)
}

function wrap (render) {
  init_coordinates()
  let res     = steps(DF)
  let vert_num = DF.np_get_vert_coordinates(np_vert_coords)
  let real  = np_vert_coords.slice(0, vert_num)

    if(growth_flag) {
      draw_path.push(real)
    } else {
      if(pulse_start) {
        real = draw_path.pop()
        pulsating_path.push(real)  
      } else {
        real = pulsating_path.pop()
      }
      if(real == undefined) {
        setup()
        return
      }
    }
  render.dot(real)

  return res
}

function init_coordinates() {
  np_coords       = new Array()
  np_vert_coords  = new Array()
  for(let i = 0; i < NMAX; i ++) {
    np_coords[i] = [0,0,0,0]
  }
  for(let i = 0; i < NMAX; i ++) {
    np_vert_coords[i] = [0,0,0,0]
  }
}

function steps(df) {
  if(growth_flag) {
    df.optimize_position(STP)
    spawn(df, NEARL, 0.03)
  }

  if(df.safe_vertex_positions(3 * STP) < 0) {
    if(RYTHM == 1 ) {
      noLoop()
    } else {
      growth_flag = false
      if(RYTHM > 2) {
        pulse_start = true
      }
    }
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
  