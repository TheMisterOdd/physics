var dt, time;

// Radius
const R = 50, r = 200;

// Mass and Gravity
const m = 100, g = 5000;
const I = 2 / 5 * m * R * R
const gamma = 0.0

// Position, Vel, Acc
var d2theta, dtheta, theta
var d2phi, dphi, phi

var d2alph, dalph, alph
var d2beta, dbeta, beta
var d2delta, ddelta, delta

var Rcm, Rc;

function setup() {
  createCanvas(1200, 700, WEBGL);
  //debugMode();
  
  dt = time = 0
  
  d2theta = dtheta = theta = 0
  d2phi = dphi = phi = 0
  d2alph = dalph = alph = 0
  d2beta = dbeta = beta = 0
  d2delta = ddelta = delta = 0
  
  alph = 0; 
  delta = 0;
  
  dphi = -2.55;
  phi = 0;
  
  beta = PI/10000
  
  dtheta = 1
  theta = PI - 0.8

  Rcm = createVector(0, 0, 0);
  Rc = createVector(0, 0, 0);
}

function f_d2theta(_dtheta, _dphi, _theta, _phi) {
  return ( m * g * r * sin(_theta) + _dphi * _dphi * (m * r * r * sin(_theta) * cos(_theta) + I * (1 + r / R) * (1 + r / R) * tan(_theta) / (cos(_theta) * cos(_theta))) ) / (m * r * r + I * (1 + r/R) * (1 + r/R)) - gamma*_dtheta
}

function f_d2phi(_dtheta, _dphi, _theta, _phi) {
  return - 2 * _dphi * _dtheta * (m * r * r * sin(_theta) * cos(_theta) + I * (1 + r/R) * (1 + r/R) * tan(_theta) / (cos(_theta) * cos(_theta))) / (m * r * r * sin(_theta) * sin(_theta) + I * (1 + r/R) * (1 + r/R) * tan(_theta) * tan(_theta)) - gamma*_dphi
}

function f_dtheta(_dtheta, _dphi, _theta, _phi) {
  return _dtheta
}

function f_dphi(_dtheta, _dphi, _theta, _phi) {
  return _dphi
}

function f_dalph(_dtheta, _dphi, _theta, _phi, _alph, _beta, _delta) {
  return (1 + r/R) * (cos(_beta) / sin(_beta)) * (cos(_alph - _phi) * dtheta + (sin(_theta) / cos(_theta)) * sin(_alph - _phi) * _dphi)
}

function f_dbeta(_dtheta, _dphi, _theta, _phi, _alph, _beta, _delta) {
  return (1 + r / R) * sin(_alph - _phi) * _dtheta - (1 + r / R) * (sin(_theta) / cos(_theta)) * cos(_alph - _phi) * _dphi
}

function f_ddelta(_dtheta, _dphi, _theta, _phi, _alph, _beta, _delta) {
  return -(1 + r / R) * (cos(_alph - _phi) * _dtheta + (sin(_theta) / cos(_theta)) * sin(_alph - _phi) * _dphi) / sin(_beta)
}

function draw() {
  
  dt = deltaTime / 1000.0; 
  time += dt;
  
  let k11 = f_d2theta(dtheta, dphi, theta, phi)
  let k12 = f_d2phi(dtheta, dphi, theta, phi)
  let k13 = f_dtheta(dtheta, dphi, theta, phi)
  let k14 = f_dphi(dtheta, dphi, theta, phi)
  let k15 = f_dalph(dtheta, dphi, theta, phi, alph, beta, delta);
  let k16 = f_dbeta(dtheta, dphi, theta, phi, alph, beta, delta);
  let k17 = f_ddelta(dtheta, dphi, theta, phi, alph, beta, delta);
  
  let k21 = f_d2theta(dtheta + (1/2) * k11 * dt, dphi + (1/2) * k12 * dt, theta + (1/2) * k13 * dt, phi + (1/2) * k14 * dt)
  let k22 = f_d2phi(dtheta + (1/2) * k11 * dt, dphi + (1/2) * k12 * dt, theta + (1/2) * k13 * dt, phi + (1/2) * k14 * dt)
  let k23 = f_dtheta(dtheta + (1/2) * k11 * dt, dphi + (1/2) * k12 * dt, theta + (1/2) * k13 * dt, phi + (1/2) * k14 * dt)
  let k24 = f_dphi(dtheta + (1/2) * k11 * dt, dphi + (1/2) * k12 * dt, theta + (1/2) * k13 * dt, phi + (1/2) * k14 * dt)
  
  let k31 = f_d2theta(dtheta + (1/2) * k21 * dt, dphi + (1/2) * k22 * dt, theta + (1/2) * k23 * dt, phi + (1/2) * k24 * dt)
  let k32 = f_d2phi(dtheta + (1/2) * k21 * dt, dphi + (1/2) * k22 * dt, theta + (1/2) * k23 * dt, phi + (1/2) * k24 * dt)
  let k33 = f_dtheta(dtheta + (1/2) * k21 * dt, dphi + (1/2) * k22 * dt, theta + (1/2) * k23 * dt, phi + (1/2) * k24 * dt)
  let k34 = f_dphi(dtheta + (1/2) * k21 * dt, dphi + (1/2) * k22 * dt, theta + (1/2) * k23 * dt, phi + (1/2) * k24 * dt)
  
  let k41 = f_d2theta(dtheta + k31 * dt, dphi + k32 * dt, theta + k33 * dt, phi + k34 * dt)
  let k42 = f_d2phi(dtheta + k31 * dt, dphi + k32 * dt, theta + k33 * dt, phi + k34 * dt)
  let k43 = f_dtheta(dtheta + k31 * dt, dphi + k32 * dt, theta + k33 * dt, phi + k34 * dt)
  let k44 = f_dphi(dtheta + k31 * dt, dphi + k32 * dt, theta + k33 * dt, phi + k34 * dt)
  
  dtheta += ((1/6) * k11 + (1/3) * k21 + (1/3) * k31 + (1/6) * k41) * dt
  theta += ((1/6) * k13 + (1/3) * k23 + (1/3) * k33 + (1/6) * k43) * dt
  
  dphi += ((1/6) * k12 + (1/3) * k22 + (1/3) * k32 + (1/6) * k42) * dt
  phi += ((1/6) * k14 + (1/3) * k24 + (1/3) * k34 + (1/6) * k44) * dt
  
  let k25 = f_dalph(dtheta + (1/5) * k11 * dt, dphi + (1/5) * k12 * dt, theta + (1/5) * k13 * dt, phi + (1/5) * k14 * dt, alph + (1/5) * k15 * dt, beta + (1/5) * k16 * dt, delta + (1/5) * k17 * dt);
  let k26 = f_dbeta(dtheta + (1/5) * k11 * dt, dphi + (1/5) * k12 * dt, theta + (1/5) * k13 * dt, phi + (1/5) * k14 * dt, alph + (1/5) * k15 * dt, beta + (1/5) * k16 * dt, delta + (1/5) * k17 * dt);
  let k27 = f_ddelta(dtheta + (1/5) * k11 * dt, dphi + (1/5) * k12 * dt, theta + (1/5) * k13 * dt, phi + (1/5) * k14 * dt, alph + (1/5) * k15 * dt, beta + (1/5) * k16 * dt, delta + (1/5) * k17 * dt);
  
  let k35 = f_dalph(dtheta + (1/5) * k11 * dt, dphi + (1/5) * k12 * dt, theta + (1/5) * k13 * dt, phi + (1/5) * k14 * dt, alph + (1/5) * k15 * dt, beta + (1/5) * k16 * dt, delta + (1/5) * k17 * dt);
  let k36 = f_dbeta(dtheta + (1/5) * k11 * dt, dphi + (1/5) * k12 * dt, theta + (1/5) * k13 * dt, phi + (1/5) * k14 * dt, alph + (1/5) * k15 * dt, beta + (1/5) * k16 * dt, delta + (1/5) * k17 * dt);
  let k37 = f_ddelta(dtheta + (1/5) * k11 * dt, dphi + (1/5) * k12 * dt, theta + (1/5) * k13 * dt, phi + (1/5) * k14 * dt, alph + (1/5) * k15 * dt, beta + (1/5) * k16 * dt, delta + (1/5) * k17 * dt);
  
  let k45 = f_dalph(dtheta + k11 * dt, dphi + k12 * dt, theta + k13 * dt, phi + k14 * dt, alph + k15 * dt, beta + k16 * dt, delta + k17 * dt);
  let k46 = f_dbeta(dtheta + k11 * dt, dphi + k12 * dt, theta + k13 * dt, phi + k14 * dt, alph + k15 * dt, beta + k16 * dt, delta + k17 * dt);
  let k47 = f_ddelta(dtheta + k11 * dt, dphi + k12 * dt, theta + k13 * dt, phi + k14 * dt, alph + k15 * dt, beta + k16 * dt, delta + k17 * dt);
  
  alph += ((1/6) * k15 + (1/3) * k25 + (1/3) * k35 + (1/6) * k45) * dt
  beta += ((1/6) * k16 + (1/3) * k26 + (1/3) * k36 + (1/6) * k46) * dt
  
  delta += ((1/6) * k17 + (1/3) * k27 + (1/3) * k37 + (1/6) * k47) * dt 
  
  background(200);
  orbitControl();
  lights();
  
  Rcm.x = r * sin(theta) * cos(phi)
  Rcm.y = r * cos(theta)
  Rcm.z = r * sin(theta) * sin(phi)
  
  
  push();
    translate(Rcm.x, -Rcm.y, Rcm.z);
    rotateZ(PI)
    rotateY(alph)
    rotateX(beta)
    rotateY(delta)
  
    strokeWeight(0.25)
    sphere(R);
      
  pop()
  
  beginShape(QUAD_STRIP);
  // Latitude
  for (let i = 0; i < PI/2; i += PI/20) {
    // Longitude
    for (let j = 0; j <= TWO_PI; j += PI/20) {
      let x1 = sin(i) * cos(j);
      let z1 = sin(i) * sin(j);
      let y1 = cos(i);
      
      let x2 = sin(i) * cos(j);
      let z2 = sin(i) * sin(j);
      let y2 = cos(i);
      
      // Scale the points to the sphere size you want
      let radius = R + r;
      vertex(x1 * radius, y1 * radius, z1 * radius);
      vertex(x2 * radius, y2 * radius, z2 * radius);
    }
  }
  endShape();
}
