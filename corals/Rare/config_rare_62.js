// Those variables contain the trait of the coral.

const SIZE          = 400       // Growth size
const SPEED         = 1         // Growth speed
const LOCATION      = 1         // Location
const COLOROPTION   = 1         // Coloroption
const RYTHM         = 5         // Growth RYTHM

// Those are the config value that the algorithm uses. Do not modify this value or the coral will be changed unexpectedly.

const INDEX         = 62
const REALSIZE      = SIZE
const NMAX          = 10 ** 4
const ONE           = 1 / REALSIZE
const STP           = ONE
const NEARL         = 6 * ONE
const FARL          = 60 * ONE
const INIT_RAD      = 6 * ONE
const INIT_NUM      = 8
const MID           = 0.5
const TWOPI         = 2 * Math.PI
let FRONT, BACK, CURRENTSIZE
