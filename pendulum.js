var time, dt

var origin

var g, L, angle, ang_vel, ang_acc
var x, x_vel, x_acc

var mass1, mass2

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    dt = 0.0
    time = 0.0

    g = 9.81
    L = 500

    angle = 0
    ang_vel = 3.0
    ang_acc = 0.0

    x = 0
    x_vel = 0
    x_acc = 0

    mass1 = 1
    mass2 = 100

    origin = createVector(0, -height/4)
    time = 0
}

function on(x) {
    var epsilon = 0.01
    if (abs(x) < epsilon) {
        return 1;
    }
    print
    return 0;
}

function vector(x1, y1, x2, y2) {
    var offset = 11
    line(x1, y1, x2, y2)
    push() //start new drawing state
    var angle = atan2(y1 - y2, x1 - x2); //gets the angle of the line
    translate(x2, y2); //translates to the destination vertex
    rotate(angle-HALF_PI); //rotates the arrow point
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
    pop();
}

function draw() {
    dt = deltaTime / 10000.0
    time += dt
    clear()
    background(20)

    stroke(255)
    noFill()
    print(time)
    l = (L / 1000.0) // divide by 1000.0 for "realistical" results 
    
    x_vel = -(mass1/(mass1 + mass2))*l*ang_vel*cos(angle)


    ang_acc = -(x_acc/l) * cos(angle)  - (g/l) * sin(angle) 
    ang_vel += ang_acc* dt
    angle += ang_vel * dt + 0.5 * ang_acc * dt * dt 
    
    x_acc = ((-(mass1/(mass1 + mass2))*l*ang_vel*cos(angle) - x_vel)*60)
    x += x_vel * dt + 0.5 * x_acc * dt * dt

    var pos1 = createVector(
        1000*x + origin.x,
        origin.y
    )

    var pos2 = createVector(
        pos1.x + L * sin(angle),
        pos1.y + L * cos(angle)
    )

	line(pos1.x, pos1.y, pos2.x, pos2.y)
	line(-width/2, pos1.y, +width/2, pos1.y)

    circle(pos1.x, pos1.y, 50)
    circle(pos2.x, pos2.y, 50)
    
    //vector(pos1.x, pos1.y, pos1.x + 10*x_vel, pos1.y)
    vector(pos2.x, pos2.y, pos2.x + 50*ang_vel*cos(angle), pos2.y - 50*ang_vel*sin(angle))
}