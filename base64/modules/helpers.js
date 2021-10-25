function _e(a, n, v) {
    for(let i = 0; i < n; i ++) {
        a[i] = v
    }

    return a
}

function _f(v, e, ve) {
    if(ve[2*v] < 0) {
        ve[2*v] = e
    } else {
        ve[2*v + 1] = e
    }
}

function _g(v, e, ve) {
    if(ve[2*v] == e ) {
        ve[2*v] = ve[2*v + 1]
        ve[2*v + 1] = -1
    } else if(ve[2*v + 1] == e) {
        ve[2*v + 1] = -1
    }

    return ve
}
