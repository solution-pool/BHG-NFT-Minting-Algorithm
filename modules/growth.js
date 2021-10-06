function spawn (df, d, limit) {
    const edgeNumber  = df.get_enum()
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
        let l = df.get_edge_length(rndmask[i])

        if(l < d) {
            continue
        }

        try {
            df.split_edge(rndmask[i])
        } 
        catch(e) {
            continue
        }
    }
}

function spawn_curl(df, limit, prob_spawn=1.0) {
    let edgeNumber = df.get_enum()
    let ind_curv = []
    let tot_curv = []
    let max_curv = -100000

    for(let e = 0; e < edgeNumber; e ++) {
        try {
            let t = df.get_edge_curvature(e)
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
                df.split_edge(e, minimum_length = limit)
            } catch (e) {
                
            }
        }
    }
}

function collapse(df, d, limit) {
    let edgeNumber  = df.get_enum()
    let rnd         = []
    let rndmask     = []

    for(let i = 0 ; i < edgeNumber; i ++) {
        rnd.push(Math.random())
    }

    const rndLength = rnd.length
    for(i = 0; i < rndLength ; i ++) {
        if(rnd[i] < limit) {
            continue
        }
        rndmask.push(i)
    }
    let rndmaskLength = rndmask.length    
    for(let i = 0 ; i < rndmaskLength; i ++) {
        let l = df.get_edge_length(rndmask[i])

        if(l < d && edgeNumber > INIT_NUM) {
            try {
                df.collapse_edge(rndmask[i])
            } 
            catch(e) {
                continue
            }
        }
    }
}