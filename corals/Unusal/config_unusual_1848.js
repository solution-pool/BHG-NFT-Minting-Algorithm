// Those variables contain the trait of the coral.

const SIZE          = 800       // Growth size
const SPEED         = 1         // Growth speed
const LOCATION      = 1         // Location
const COLOROPTION   = 2         // Coloroption
const RYTHM         = 9         // Growth RYTHM

// Those are the config value that the algorithm uses. Do not modify this value or the coral will be changed unexpectedly.

const INDEX         = 1848
const REALSIZE      = SIZE
const NMAX          = 10 ** 5
const ONE           = 1 / REALSIZE
const STP           = ONE
const NEARL         = 4 * ONE
const FARL          = 30 * ONE
const INIT_RAD      = 7 * ONE
const INIT_NUM      = 3
const MID           = 0.5
const TWOPI         = 2 * Math.PI
let FRONT, BACK, CURRENTSIZE
