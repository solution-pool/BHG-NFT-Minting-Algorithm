function long_array_init(a, n, v) {
    for(let i = 0; i < n; i ++) {
        a[i] = v
    }

    return a
}

function double_array_init(a, n, v) {
    for(let i = 0; i < n; i ++) {
        a[i] = v
    }

    return a
}

function add_e_to_ve(v, e, ve) {
    if(ve[2*v] < 0) {
        ve[2*v] = e
    } else {
        ve[2*v + 1] = e
    }
}

function del_e_from_ve(v, e, ve) {
    if(ve[2*v] == e ) {
        ve[2*v] = ve[2*v + 1]
        ve[2*v + 1] = -1
    } else if(ve[2*v + 1] == e) {
        ve[2*v + 1] = -1
    }

    return ve
}

function edges_are_connected(e1, e2, ev) {
    let v11 = ev[2*e1]
    let v12 = ev[2*e1 + 1]
    let v21 = ev[2*e2]
    let v22 = ev[2*e2 + 1]

    if(v11 == v21 && v11 > -1) {
        return v11
    } else if(v11 == v22 && v11 > -1) {
        return v11
    } else if(v12 == v21 && v12 > -1) {
        return v12
    } else if(v12 == v22 && v12 > -1) {
        return v12
    } else {
        return -1
    }
}