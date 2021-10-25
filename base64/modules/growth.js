function _c (df, d, limit) {
    const edgeNumber  = df._ab()
    let rnd = []
    let rndmask = []
    for(let i = 0; i < edgeNumber ; i ++) {
        rnd.push(Math.random())
    }

    const rndLength = rnd.length
    for(i = 0; i < rndLength ; i ++) {
        if(rnd[i] > limit || !rnd[i]) {
            continue
        }

        rndmask.push(i)
    }
    let rndmaskLength = rndmask.length
    
    for(let i = 0 ; i < rndmaskLength; i ++) {
        let l = df._v(rndmask[i])

        if(l < d) {
            continue
        }

        try {
            df._y(rndmask[i])
        } 
        catch(e) {
            continue
        }
    }
}

function _d(df, limit, prob_spawn=1.0) {
    let edgeNumber = df._ab()
    let ind_curv = []
    let tot_curv = []
    let max_curv = -100000

    for(let e = 0; e < edgeNumber; e ++) {
        try {
            let t = df._z(e)
            ind_curv[e] = t
            tot_curv += t
            max_curv = Math.max(max_curv, t)
        } catch (e) {
        }
    }
    let ne = ind_curv.length

    for(let i = 0; i < ne; i ++) {
        let r = Math.random()
        let e = i
        let t = ind_curv[e]

        if(r < t / max_curv * prob_spawn) {
            try {
                df._y(e, minimum_length = limit)
            } catch (e) {
                
            }
        }
    }
}