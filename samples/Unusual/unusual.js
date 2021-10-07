let np_coords, np_vert_coords, growth_flag, DF, render, coloroptions, current_front
let step_count = 1, step_length, color_count = 0, draw_path = [], pulse_path = [], pulse_num = 50, pulse_start = false
let currendColorStore = [], colorIndex = 0, colorOperation = 1

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

  make_color_store()
}


function make_color_store() {
  if(COLOROPTION < 5)
    return
  if(FRONT.length == 2) {
    let first = FRONT[0]
    let last  = FRONT[1]

    if(first[0] > last[0]) {
      for(let i = first[0]; i >= last[0]; i --) {
        currendColorStore.push([i, first[1], first[2]])
      } 
    } else {
      for(let i = first[0]; i <= last[0]; i ++) {
        currendColorStore.push([i, first[1], first[2]])
      }
    }

    if(first[1] > last[1]) {
      for(let i = first[1]; i >= last[1]; i --) {
        currendColorStore.push([last[0], i, first[2]])
      } 
    } else {
      for(let i = first[1]; i <= last[1]; i ++) {
        currendColorStore.push([last[0], i, first[2]])
      }
    }

    if(first[2] > last[2]) {
      for(let i = first[2]; i >= last[2]; i --) {
        currendColorStore.push([last[0], last[1], i])
      } 
    } else {
      for(let i = first[2]; i <= last[2]; i ++) {
        currendColorStore.push([last[0], last[1], i])
      }
    }
  } else {
    let first = FRONT[0]
    let second = FRONT[1]
    let last  = FRONT[2]

    if(first[0] > second[0]) {
      for(let i = first[0]; i >= second[0]; i --) {
        currendColorStore.push([i, first[1], first[2]])
      } 
    } else {
      for(let i = first[0]; i <= second[0]; i ++) {
        currendColorStore.push([i, first[1], first[2]])
      }
    }

    if(first[1] > second[1]) {
      for(let i = first[1]; i >= second[1]; i --) {
        currendColorStore.push([second[0], i, first[2]])
      } 
    } else {
      for(let i = first[1]; i <= second[1]; i ++) {
        currendColorStore.push([second[0], i, first[2]])
      }
    }

    if(first[2] > second[2]) {
      for(let i = first[2]; i >= second[2]; i --) {
        currendColorStore.push([second[0], second[1], i])
      } 
    } else {
      for(let i = first[2]; i <= second[2]; i ++) {
        currendColorStore.push([second[0], second[1], i])
      }
    }
    
    if(second[0] > last[0]) {
      for(let i = second[0]; i >= last[0]; i --) {
        currendColorStore.push([i, second[1], second[2]])
      } 
    } else {
      for(let i = second[0]; i <= last[0]; i ++) {
        currendColorStore.push([i, second[1], second[2]])
      }
    }

    if(second[1] > last[1]) {
      for(let i = second[1]; i >= last[1]; i --) {
        currendColorStore.push([last[0], i, second[2]])
      } 
    } else {
      for(let i = second[1]; i <= last[1]; i ++) {
        currendColorStore.push([last[0], i, second[2]])
      }
    }

    if(second[2] > last[2]) {
      for(let i = second[2]; i >= last[2]; i --) {
        currendColorStore.push([last[0], last[1], i])
      } 
    } else {
      for(let i = second[2]; i <= last[2]; i ++) {
        currendColorStore.push([last[0], last[1], i])
      }
    }
  }
}


function init_current_size() {
  step_count = 1
  if(RYTHM > 2) {
    CURRENTSIZE   = parseInt(REALSIZE / (RYTHM - step_count))
    step_unit   = CURRENTSIZE
    step_length = CURRENTSIZE
  } else {
    step_length = step_unit = CURRENTSIZE = REALSIZE
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
  angles.sort()
  let xys = []
  let lock_edges
  for (let i = 0; i < angles.length; i ++) {
    let a = angles[i]
    let x = 0.5 + cos(a)*0.065
    let y = 0.5 + sin(a)*0.065
    xys.push([x,y])
  }
  xys.sort()

  DF.init_line_segment(xys, lock_edges=1)

  render = new Render(SIZE, BACK, current_front)
}

function draw() {
  if(COLOROPTION < 5) {
    current_front = FRONT
  } else {
    current_front = currendColorStore[colorIndex]
    if(colorIndex >= currendColorStore.length - 1) {
      colorOperation = 2
    } 
    if(colorIndex <= 0) {
      colorOperation = 1
    }

    if(colorOperation == 1) {
      colorIndex ++
    } else {
      colorIndex --
    }
  }
  wrap(render)
}

function wrap (render) {
  init_coordinates()
  growth_flag = true
  let res     = steps(DF)
  let num     = DF.np_get_edges_coordinates(np_coords)
  let real  = np_coords.slice(0, num)
  if(pulse_start) {
    real = pulse_path.shift() 
  } else {
    if(growth_flag) {
      draw_path.push(real)
    } else {
      real = draw_path.pop()
    }
    if(real == undefined) {
      setup()
      return
    }
  }
  render.clear_canvas()
  for(let i = 0; i < real.length; i ++) {
    let point = real[i]
    let x1 = point[0]
    let y1 = point[1]
    let x2 = point[2]
    let y2 = point[3]

    let r = render.pix
    render.circles(x1, y1, x2, y2, r)
  }
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
  if(pulse_start) {
    if(pulse_path.length == 0) {
      pulse_start = false
      if(step_count < RYTHM - 1) {
        step_count ++
      } else {
        step_count = 1
      }
      step_length = step_unit * step_count
    }
  } else {
    if(growth_flag) {
      df.optimize_position(STP)
      spawn(df, NEARL, 0.03)
    }
    if(check_step(step_length, df)) {
      if(step_count < RYTHM - 1) {
        pulse_start = true
        let drawLength = draw_path.length
        for(let i = 1; i <= pulse_num; i ++ ) {
          pulse_path.push(draw_path[drawLength - i])
        }
        for(let i = pulse_num; i > 0; i -- ) {
          pulse_path.push(draw_path[drawLength - i])
        }
      } else {
        if(RYTHM == 1) {
          noLoop()
        }
        growth_flag = false
      }
    }
  }
}

function check_step(step, df) {
  let temp = CURRENTSIZE
  CURRENTSIZE = step
  let result = df.safe_vertex_positions(3 * STP) < 0
  CURRENTSIZE = temp
  return result
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}