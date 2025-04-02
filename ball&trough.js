const r = 5, R = 50, c = 0.8 * R
const Mb = 1, Mc = Math.sqrt(3)
const Ib = (2/5) * Mb * r * r, Ic = 0.25 * Mc * (2*R*R + c*c + 2*R*c)
const g = 981.0
var psi, dpsi, d2psi
var phi, dphi, d2phi
var dtheta, theta
var x

var dt, time

function setup() {
  createCanvas(1150, 1000, WEBGL);
  psi = dpsi = d2psi = phi = dphi = d2phi = theta = dtheta = x = 0
  dt = time = 0
  
  phi = (PI/3) + PI/8;
}

function draw() {
  dt = deltaTime / 1000.0;
  time += dt;
  
  background(220);
  
  d2phi = ( (Mb * R * (R - r) + Ib * R * (R/r - 1) / r) * (d2psi * cos(phi) - dpsi * dphi * sin(phi)) + (Mb * R * (R - r) + Ib * R * (R/r - 1) / r) * dpsi * dphi * sin(phi) - (Ib * R * R / (2 * r * r)) * psi * psi * sin(2*phi) - Mb * g * (R - r) * sin(phi)) / (Mb * (R - r) * (R - r) + Ib * (R/r - 1) * (R/r - 1) );
  
  d2phi = d2phi - 0.1 * dphi;
  
  dphi += d2phi * dt;
  phi += dphi * dt;
  
  
  
  d2psi = ( ( (Ib * R * R / (r * r)) * sin(2*phi) * dphi - 2 * Mc * R * c * dpsi * sin(psi)) * dpsi + (Mb * R * (R - r) + Ib * R * (R/r - 1) / r) * (d2phi * cos(phi) - dphi * dphi * sin(phi)) + Mc * R * c * sin(psi) * dpsi - Mc * g * c * sin(psi) ) / (Mb * R * R + Ib * R * R * cos(phi) * cos(phi) / (r * r) + Ic + Mc * (R*R + c*c - 2 * R * c * cos(psi)));
  
  d2psi = d2psi - 0.1 * dpsi;
  
  dpsi += d2psi * dt;
  psi += dpsi * dt;
  
  
  
  x = -R * psi 
  dtheta = -(-R/r) * dpsi * cos(phi) - (R/r - 1) * dphi; 
  theta += dtheta * dt;
  
  let Xcm = x + c * sin(psi)
  let Ycm = -c * cos(psi)
  
  let Xb = x + (R - r)*sin(phi)
  let Yb = -(R - r)*cos(phi)
  
  strokeWeight(2);
  line(x, 0, Xcm, -Ycm);
  line(Xb, -Yb, Xb + r*sin(theta), -Yb + r*cos(theta))

  
  fill(255, 0, 0)
  circle(Xcm, -Ycm, 10)

  fill(0, 0, 0, 0);
  circle(Xb, -Yb, 2*r);
  //circle(x, 0, 2*R);
  arc(x, 0, 2*R, 2*R, -psi, PI + -psi)
  
  line(-windowWidth/2, R, windowWidth/2, R);
  
}