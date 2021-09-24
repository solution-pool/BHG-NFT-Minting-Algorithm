function show_detail() {
    render.clear_canvas()
    render_circle = render.circle

    small = render.pix * 3
    large = render.pix * 10

    render.set_line_width(render.pix)

    for(let i = 0; i < edges_coordinates.length; i ++) {
        let vv=  edges_coordinates[i]
        render.set_front([1,0,0,0.4])
        render_circle(vv[0], vv[1], r=large, fill=false)
        render_circle(vv[2], vv[3], r=large, fill=false)
        
        render.set_front([0,0,0,0.8])
        render_circle(vv[0], vv[1], r=small, fill=true)
        render_circle(vv[2], vv[3], r=small, fill=true)
    }
}

function show(render, edges_coordinates, r=null, clear= true) {
    if(!r) {
        r = 2.5 * render.pix
    }
    if(clear) {
        render.clear_canvas()
    }

    render_circles = render.circles

    for(let i = 0; i < edges_coordinates.length; i ++) {
        render_circles(edges_coordinates[i], r=r, nmin = 2)
    }
}

function sandstroke (render, xys, grains=5, fn=null) {
    render_stroke = render.sandstroke
    render_sandstroke(xys, grains=grains)
}

function dots(render, xys) {
    render_dot = render.dot

    for(let i = 0; i < xys.length; i ++) {
        render_dot(xys[i])
    }
}

function show_closed(render, coords, fill=true) {
    render.clear_canvas() 
    render.close_path(coords)
}