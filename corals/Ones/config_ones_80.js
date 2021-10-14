// Those variables contain the trait of the coral.

const SIZE          = 800       // Growth size
const SPEED         = 1         // Growth speed
const LOCATION      = 1         // Location
const COLOROPTION   = 8         // Coloroption
const RYTHM         = 7         // Growth RYTHM

// Those are the config value that the algorithm uses. Do not modify this value or the coral will be changed unexpectedly.

const INDEX         = 80
const REALSIZE      = SIZE
const NMAX          = 10 ** 6
const ONE           = 1 / REALSIZE
const STP           = 0.1 * ONE
const NEARL         = 10 * ONE
const FARL          = 100 * ONE
const INIT_RAD      = 8 * ONE
const INIT_NUM      = 8
const MID           = 0.5
const TWOPI         = 2 * Math.PI
let FRONT, BACK, CURRENTSIZE
