function spawn (df, d, limit) {
    const edgeNumber  = df.get_enum()
    let rnd = []
    let rndmask = []
    for(let i = 0; i < edgeNumber ; i ++) {
        rnd.push(Math.random())
    }

    const rndLength = rnd.length
    for(i = 0; i < rndLength ; i ++) {
        if(rnd[i] > limit) {
            continue
        }

        rndmask.push(rnd[i])
    }

    for(let i = 0 ; i < rndmask.length; i ++) {
        let l = df.get_edge_length(rndmask[i])

        if(l < d) {
            continue
        }

        try {
            df.split_edge(i)
        } 
        catch(e) {
        }
    }
}