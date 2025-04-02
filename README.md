# physics
physics simulations made with p5js.
Try them [here](https://editor.p5js.org/). Just paste the code of one of the demos into the p5js editor.

## Ball & Trough

#### Lagrangian
```math
\mathcal L = \frac{1}{2} m_b \left ( R^2 \dot{\psi}^2 + (R-r)^2 \dot{\phi}^2 - 2 R (R - r) \dot{\psi} \dot{\phi} \cos{\phi} \right ) + \frac{1}{2} I_b \dot{\varphi}^2 + \frac{1}{2} m_c \left( R^2 + c^2 - 2 R c \cos{\psi} \right) \dot{\psi}^2 + \frac{1}{2}I_c \dot{\psi}^2 - m_b g \left (R - (R - r) \cos{\phi} \right)  - m_c g \left( R - c \cos{\phi} \right)
```
#### Rolling conditions:
$$
\dot{x} = - R \dot {\psi}
$$
$$
\dot{\varphi} = - \frac{R}{r} \dot{\psi} \cos{\phi} + \left (\frac{R}{r} - 1 \right)\dot{\phi}
$$
### Other Conditions:
$$
c = \frac{2 R}{\pi}
$$
$$
I_b = \frac{2}{5} m_b r^2
$$
$$
I_c = \frac{1}{4} m_c (2 R^2 + c^2 + 2 R c)
$$
