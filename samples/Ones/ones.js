let np_coords, np_vert_coords, growth_flag, DF, render, coloroptions, current_front
let step_count = 1, step_length, draw_path = [], pulse_path = [], pulse_num = 100, pulse_start = false, pulse_erase = false, pulse_fill = false
let currendColorStore = [], colorIndex = 0, colorOperation = 1, fullColorStack = []

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
    9 : {
      BACK : [0, 0, 0],
      FRONT : color[(INDEX % colorLength)]
    }
  }
  FRONT = coloroptions[COLOROPTION].FRONT
  BACK  = coloroptions[COLOROPTION].BACK

  make_full_color_stack()
  make_color_store()
}

function make_full_color_stack() {
  for(let i = 0; i <256; i ++) {
    fullColorStack.push([255, 0, i])
  }
  for(let i = 255; i >= 0; i --) {
    fullColorStack.push([i, 0, 255])
  }
  for(let i = 0; i <256; i ++) {
    fullColorStack.push([0, i, 255])
  }
  for(let i = 255; i >= 0; i --) {
    fullColorStack.push([0, 255, i])
  }
  for(let i = 0; i <256; i ++) {
    fullColorStack.push([i, 255, 0])
  }
  for(let i = 255; i >=0; i --) {
    fullColorStack.push([255, i, 0])
  }
}

function make_color_store() {
  if(COLOROPTION < 5)
    return
  if(COLOROPTION == 5 || COLOROPTION == 6) {
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
  }
  else if(COLOROPTION == 7 || COLOROPTION == 8) {
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
  } else {
    let stackLength = fullColorStack.length
    for(let i = 0; i < stackLength; i ++) {
      if(fullColorStack[i].join(',') === FRONT.join(',')) {
        colorIndex = i
        break
      }
    }
  }
}

function init_current_size() {
  step_count = 1
  if(RYTHM > 2) {
    CURRENTSIZE   = parseInt(REALSIZE / (RYTHM - 1))
    step_unit   = CURRENTSIZE
    step_length = CURRENTSIZE
  } else {
    step_length = step_unit = CURRENTSIZE = REALSIZE
  }
}

function setup() {
  init_current_size()
  growth_flag = true
  if(COLOROPTION < 9) 
    colorIndex  = 0

  Math.seedrandom(INDEX)
  if(COLOROPTION > 4 && COLOROPTION < 9) {
    current_front = FRONT[0]
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
  DF.init_circle_segment(MID, MID, FARL * 0.2, angles)
  render = new Render(REALSIZE, BACK, current_front)
}

function draw() {
  if(COLOROPTION < 5) {
    current_front = FRONT
  } else if(COLOROPTION < 9 && COLOROPTION > 4) {
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
  } else {
    current_front = fullColorStack[colorIndex]
    if(colorIndex >= fullColorStack.length - 1) {
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
    
    render.sandstroke(real)
    if(Math.random() < 0.1) {
      let vert_num = DF.np_get_vert_coordinates(np_vert_coords)
      real = np_vert_coords.slice(0, vert_num)

      render.dot(real)
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
      // spawn(df, NEARL, 0.03)
      spawn_curl(df, NEARL)
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
  