
var time, dt
var origin

var system

class Node {
    constructor(pos, vel) {
        this.last = pos
        this.pos = pos
        this.vel = vel
        this.acc = createVector(0, 0)
    }
}

class Medium {
    constructor() {
        this.node = []
        
        let n = 50
        let interval = width/n

        /* setting pos */
        for (let i = 0; i < n; i++) {
            this.node.push(
                new Node(
                    createVector(i * interval, origin.y),
                    createVector(0.0, 0.0)
                )
            )
        }

        for (let i = -n/2; i < n/2; i++) {
           this.node[i + n/2].pos.y = -100*exp(-(i**2)/10) + origin.y
        }
    }

    updt(dt) {
        //this.node[floor(this.node.length/2.0)].pos.y = 12 * sin(time) + 12 * sin(0.9 * time) + origin.y
        for (let i = 0; i < this.node.length; i++) {
            var pos = this.node[i].pos, 
            nextPos = (this.node[i + 1] != null) ? this.node[i + 1].pos : createVector(0, origin.y), 
            lastPos = (this.node[i - 1] != null) ? this.node[i - 1].pos : createVector(0, origin.y)

            
            var acc = this.node[i].acc // for simplicity
            acc.x = 0
            let dx = nextPos.y - pos.y
            acc.y = ((nextPos.y - 2*pos.y + lastPos.y)) 

            let aux = createVector(pos.x, pos.y)
            pos.x = 2* pos.x - this.node[i].last.x + acc.x * dt * dt
            pos.y = 2* pos.y - this.node[i].last.y + acc.y * dt * dt
            this.node[i].last = createVector(aux.x, aux.y)
        }

    }

    draw() {
        let to = color(244, 133, 73), from = color(32, 51, 136)

        strokeWeight(5)
        for (let i = 0; i < this.node.length; i++) {
            //circle(this.node[i].pos.x, this.node[i].pos.y, 5)
            var pos = this.node[i].pos, 
            nextPos = (this.node[i + 1] != null) ? this.node[i + 1].pos : createVector(origin.x*2, origin.y)
            
            let c = lerpColor(from, to, Math.pow(pos.y, 10)/7e26)
            stroke(c)
            fill(c)
            //line(pos.x, pos.y, nextPos.x, nextPos.y)
            line(pos.x, origin.y, pos.x, pos.y)
        }
    }

    run(dt) {
        this.updt(dt)
        this.draw()
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    time = 0.0
    dt = 0.0
    origin = createVector(width/2, height/2)
    system = new Medium()
}

function draw() {
    dt = deltaTime / 1000.0
    time += dt
    clear()
    background(20)

    noFill()
    stroke(255)

    system.updt(dt)
    system.draw()
}