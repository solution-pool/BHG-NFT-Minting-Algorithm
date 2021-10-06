let np_coords, np_vert_coords, growth_flag, DF, render, coloroptions, current_front
let step_count = 1, step_length, color_count = 0, draw_path = [], pulse_path = [], pulse_num = 50, pulse_start = false, pulse_erase = false, pulse_fill = false
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
  let res     = steps(DF)
  let vert_num = DF.np_get_vert_coordinates(np_vert_coords)
  let real = np_vert_coords.slice(0, vert_num)
  
  if(pulse_start) {
    real = pulse_path.shift() 
    if(pulse_path.length >= pulse_num) {
      pulse_erase = true
      pulse_fill = false
    } else {
      pulse_erase = false
      pulse_fill = true
    }
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
    spawn(df, NEARL, 0.5)
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
  
  