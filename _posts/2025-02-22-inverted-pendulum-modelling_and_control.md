---
layout: post-sidebar
title:  "Inverted Pendulumn Modelling and Control"
author: ductri
categories: [Control System]
tags: [featured]
image: '/assets/images/control_systems/inverted_pendulum_on_cart.png'
# font: vietnamese-font
# description: "Test latex."
toc: False
side_toc: True
---

<figure style="margin: auto; text-align: center;">
  <img src="/assets/images/control_systems/inverted_pendulum_on_cart.png" alt="Free-body diagrams" style="width:75%;">
  <figcaption>Free-body diagrams</figcaption>
</figure>

In this post, we derive the equations of motion for an inverted pendulum mounted on a cart using the Lagrangian approach. The system consists of a cart with mass $$M$$ that can move horizontally and a pendulum with mass $$m$$ attached by a rigid rod of length $$l$$. The pendulum’s angle $$\theta$$ is measured from the vertical.

## 1. Kinetic Energy

The total kinetic energy is the sum of the kinetic energy of the cart and that of the pendulum.

### 1.1. Kinetic Energy of the Cart

The kinetic energy of the cart is given by:

$$
\begin{align}
    K_\text{cart} = \frac{1}{2} M \dot{x}^2, \label{K_cart}
\end{align}
$$

where $$x$$ is the horizontal position of the cart.

### 1.2. Kinetic Energy of the Pendulum

The position of the pendulum mass $$m$$ can be expressed as:

$$
\begin{align}
    x_m = x + l \sin\theta, \quad y_m = l \cos\theta.
\end{align}
$$

Taking time derivatives, we obtain:

$$
\begin{align}
    \dot{x}_m = \dot{x} + l\dot{\theta}\cos\theta, \quad \dot{y}_m = -l\dot{\theta}\sin\theta.
\end{align}
$$

Thus, the kinetic energy of the pendulum is:

$$
\begin{align}
    K_m &= \frac{1}{2} m \left(\dot{x}_m^2 + \dot{y}_m^2\right) \notag \\
        &= \frac{1}{2} m \Bigl[\bigl(\dot{x} + l\dot{\theta}\cos\theta\bigr)^2 + \bigl(-l\dot{\theta}\sin\theta\bigr)^2\Bigr] \notag \\
        &= \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\left(\cos^2\theta + \sin^2\theta\right)\right] \notag \\
        &= \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right]. \label{K_m}
\end{align}
$$

Combining \eqref{K_cart} and \eqref{K_m}, the total kinetic energy is:

$$
\begin{align}
    K   &= K_\text{cart} + K_m \notag \\
        &= \frac{1}{2} M \dot{x}^2 + \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right].
\end{align}
$$

## 2. Potential Energy

For this system, only the pendulum contributes to the gravitational potential energy. Taking the upward vertical direction as positive, the potential energy of the pendulum is:

$$
\begin{align}
    P_m = mgy_m = mgl\cos\theta.
\end{align}
$$

*Note:* The choice of the reference level for potential energy is arbitrary, and the dynamics remain unaffected by an additive constant.

## 3. The Lagrangian Function

The Lagrangian is defined as the difference between the kinetic and potential energies:

$$
\begin{align}
    \mathcal{L} &= K - P \notag \\
    &= \frac{1}{2} M \dot{x}^2 + \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right] - mgl\cos\theta.
\end{align}
$$

We choose the generalized coordinates:

$$
\begin{align}
    \mathbf{q} = \begin{bmatrix} x \\ \theta \end{bmatrix}.
\end{align}
$$

## 4. Derivation of the Equations of Motion

Using the Euler–Lagrange equation for each coordinate $$q_i$$:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{q}_i}\right) - \frac{\partial \mathcal{L}}{\partial q_i} = Q_i,
\end{align}
$$

where $$Q_i$$ represents the generalized forces. Here, an external force $$F$$ is applied to the cart (affecting $$x$$), while there is no external torque on $$\theta$$.

### 4.1. Equation for $$x$$

First, compute the derivative with respect to $$\dot{x}$$:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \dot{x}} = (M+m)\dot{x} + ml\dot{\theta}\cos\theta.
\end{align}
$$

Taking the time derivative yields:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{x}}\right) &= (M+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta.
\end{align}
$$

Since $$\mathcal{L}$$ does not explicitly depend on $$x$$:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial x} = 0.
\end{align}
$$

Thus, the Euler–Lagrange equation for $$x$$ becomes:

$$
\begin{align}
    (M+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta = F. \label{final_eq_1}
\end{align}
$$

### 4.2. Equation for $$\theta$$

Next, compute the derivative with respect to $$\dot{\theta}$$:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \dot{\theta}} = ml\dot{x}\cos\theta + ml^2\dot{\theta}.
\end{align}
$$

Taking its time derivative:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{\theta}}\right) = ml\left(\ddot{x}\cos\theta - \dot{x}\dot{\theta}\sin\theta\right) + ml^2\ddot{\theta}.
\end{align}
$$

The partial derivative with respect to $$\theta$$ is:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \theta} = -ml\dot{x}\dot{\theta}\sin\theta + mgl\sin\theta.
\end{align}
$$

Thus, the Euler–Lagrange equation for $$\theta$$ (with no external torque) is:

$$
\begin{align}
    ml\left(\ddot{x}\cos\theta - \dot{x}\dot{\theta}\sin\theta\right) + ml^2\ddot{\theta} + ml\dot{x}\dot{\theta}\sin\theta - mgl\sin\theta = 0.
\end{align}
$$

Notice that the terms $$ - ml\dot{x}\dot{\theta}\sin\theta $$ and $$ + ml\dot{x}\dot{\theta}\sin\theta $$ cancel, allowing simplifying the equation above to:

$$
\begin{align}
ml\ddot{x}\cos\theta + ml^2\ddot{\theta} - mgl\sin\theta = 0. \label{final_eq_2}
\end{align}
$$

## 5. Final Dynamical Model

Collecting the results, the dynamical model of the inverted pendulum on a cart is given by:

$$
\begin{align}
(M+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta &= F, \quad \text{(from \eqref{final_eq_1})}\\
ml\ddot{x}\cos\theta + ml^2\ddot{\theta} - mgl\sin\theta &= 0. \quad \text{(from \eqref{final_eq_2})}
\end{align}
$$

These equations describe the coupled dynamics of the cart and pendulum. They form the basis for further analysis and control design for stabilizing the inverted pendulum.
