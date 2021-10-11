// Those variables contain the trait of the coral.

const SIZE          = 900       // Growth size
const SPEED         = 1         // Growth speed
const LOCATION      = 1         // Location
const COLOROPTION   = 6         // Coloroption
const RYTHM         = 6         // Growth RYTHM

// Those are the config value that the algorithm uses. Do not modify this value or the coral will be changed unexpectedly.

const INDEX         = 24
const REALSIZE      = SIZE
const NMAX          = 10 ** 4
const ONE           = 1 / REALSIZE
const STP           = ONE * 0.1
const NEARL         = 6 * ONE
const FARL          = 60 * ONE
const INIT_RAD      = 20 * ONE
const INIT_NUM      = 10
const MID           = 0.5
const TWOPI         = 2 * Math.PI
let FRONT, BACK, CURRENTSIZE
