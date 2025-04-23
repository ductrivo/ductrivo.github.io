---
layout: post-sidebar
title:  "Dynamic Model of Planar Robots with Two Revolut Joints"
author: ductri
categories: [Robotics]
tags: [featured, sticky, robots, kinematics]
image: "https://i.imgur.com/CWIBlLM.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
    In this post, we focus on the dynamics of a **2R planar manipulator**. Using the **Lagrangian formulation**, we derive the equations of motion step-by-step, starting from energy definitions to the compact matrix form widely used in robotics.

description: In this post, we focus on the dynamics of a 2R planar manipulator. Using the Lagrangian formulation, we derive the equations of motion step-by-step, starting from energy definitions to the compact matrix form widely used in robotics.
---

> This post is part of my [Robotics Modeling, Control, and Design Tutorial](/robotics.html) series.

## Introduction to Dynamics

While **kinematics** describes *how* a robot moves, **dynamics** explains *why* it moves that way. In other words:

- **Kinematics** focuses on position, velocity, and acceleration.
- **Dynamics** includes **mass**, **inertia**, and **forces/torques**, and describes how motion is generated in response to those quantities.

Dynamics is essential for simulating physical behavior, designing control laws, and analyzing stability.

## General Form of Robot Dynamics

The dynamics of the robot are described by a system of nonlinear [Ordinary Differential Equations (ODEs)](https://en.wikipedia.org/wiki/Ordinary_differential_equation) as follows (assuming that there is no force at the end effector):

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}} + \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} + \mathbf{g}(\boldsymbol{\chi}) = \boldsymbol{\tau}
\end{align}
$$

where:

- $$ \boldsymbol{\chi} \in \mathbb{R}^n $$: Vector of generalized coordinates, typically joint angles for revolute joints.
- $$ \dot{\boldsymbol{\chi}},\, \ddot{\boldsymbol{\chi}} \in \mathbb{R}^n $$: First and second derivatives of joint positions, representing joint velocities and accelerations.
- $$ \boldsymbol{\tau} \in \mathbb{R}^n $$: Vector of input torques applied at the joints by actuators.
- $$ \mathbf{M}(\boldsymbol{\chi}) \in \mathbb{R}^{n \times n} $$: Inertia matrix, a symmetric and positive-definite matrix that encodes the mass and geometry of the robot.
- $$ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} \in \mathbb{R}^n $$: Coriolis and centrifugal term, capturing the nonlinear velocity-dependent effects.
- $$ \mathbf{g}(\boldsymbol{\chi}) \in \mathbb{R}^n $$: Vector of generalized forces due to gravity, often omitted in planar cases where gravity acts orthogonally to the plane of motion.

---

## Dynamic Model of 2R Plannar Robots

### Lagrangian Formulation

{% include figure.html
    src=site.data.images.planar_robot_2r_dynamics.src
    alt=site.data.images.planar_robot_2r_dynamics.alt
    caption=site.data.images.planar_robot_2r_dynamics.caption
%}

To derive the dynamic equations of motion, we apply the **Lagrangian mechanics method**, which constructs the Lagrangian function:

$$
\begin{align}
\mathcal{L} = K - U
\end{align}
$$

where:

- $$K$$ is the total kinetic energy of the system
- $$U$$ is the total potential energy due to gravity

The energy terms are computed by considering:

- Rotational kinetic energy due to link inertias $$I_1, I_2$$
- Translational kinetic energy from distributed link masses $$m_1^L, m_2^L$$
- Point masses located at joints and at the end-effector: $$m_1, m_2, m_E$$
- Gravitational potential energy of all mass components

---

#### 1. Kinetic Energy

Let:

- $$ \dot{\chi}_1, \dot{\chi}_2 $$ be the joint angular velocities
- $$ \mathbf{v}_i $$ be the linear velocity of the center of mass or a lumped point mass $$m_i$$

Then the total kinetic energy is given by:

$$
\begin{align}
K = \frac{1}{2} I_1 \dot{\chi}_1^2 + \frac{1}{2} I_2 (\dot{\chi}_1 + \dot{\chi}_2)^2
+ \sum_i \frac{1}{2} m_i \| \mathbf{v}_i \|^2.
\end{align}
$$

Here, $$\mathbf{v}_i$$ is derived from forward kinematics (see [Kinematics of Planar Robots with Revolute Joints](/kinematics-of-planar-robots-with-revolute-joints-copy/)). We have the planar positions of the second joint and the end-effector as:

$$
\begin{align}
x_2 &= l_1 \cos\chi_1,\\
y_2 &= l_1 \sin\chi_1, \\
x_E &= l_1 \cos\chi_1 + l_2 \cos(\chi_1 + \chi_2),\\
y_E &= l_1 \sin\chi_1 + l_2 \sin(\chi_1 + \chi_2).
\end{align}
$$

Taking the time derivative of the positions gives the velocities:

**Joint 2:**

$$
\begin{align}
\dot{x}_2 &= -l_1 \sin\chi_1 \cdot \dot{\chi}_1 \\
\dot{y}_2 &=  l_1 \cos\chi_1 \cdot \dot{\chi}_1.
\end{align}
$$

Hence:

$$
\begin{align}
\| \mathbf{v}_2 \|^2 = \dot{x}_2^2 + \dot{y}_2^2 = l_1^2 \dot{\chi}_1^2.
\end{align}
$$

**End-Effector:**

$$
\begin{align}
\dot{x}_E &= -l_1 \sin\chi_1 \cdot \dot{\chi}_1
             -l_2 \sin(\chi_1 + \chi_2) \cdot (\dot{\chi}_1 + \dot{\chi}_2) \\
\dot{y}_E &=  l_1 \cos\chi_1 \cdot \dot{\chi}_1
             +l_2 \cos(\chi_1 + \chi_2) \cdot (\dot{\chi}_1 + \dot{\chi}_2).
\end{align}
$$

Using the [Pythagorean identity](https://en.wikipedia.org/wiki/Pythagorean_trigonometric_identity), we find:

$$
\begin{align}
\| \mathbf{v}_E \|^2 = l_1^2 \dot{\chi}_1^2
+ l_2^2 (\dot{\chi}_1 + \dot{\chi}_2)^2
+ 2 l_1 l_2 \cos(\chi_2) \dot{\chi}_1 (\dot{\chi}_1 + \dot{\chi}_2)
\end{align}
$$

Substituting into the total expression for kinetic energy:

$$
\begin{align}
K &= \frac{1}{2} I_1 \dot{\chi}_1^2
+ \frac{1}{2} I_2 (\dot{\chi}_1 + \dot{\chi}_2)^2 + \frac{1}{2} m_2 l_1^2 \dot{\chi}_1^2 \\
&\quad + \frac{1}{2} m_E \left[
    l_1^2 \dot{\chi}_1^2
  + l_2^2 (\dot{\chi}_1 + \dot{\chi}_2)^2
  + 2 l_1 l_2 \cos\chi_2 \dot{\chi}_1 (\dot{\chi}_1 + \dot{\chi}_2)
\right]
\end{align}
$$

This provides the **full analytical expression** for the kinetic energy of the 2R planar manipulator, accounting for both distributed inertias and point masses.

#### 2. Potential Energy

Assuming gravity acts in the negative $$y$$ direction with magnitude $$g$$, the gravitational potential energy is computed from the vertical positions of the masses.

Let:

- $$y_2$$ be the vertical position of the second joint
- $$y_E$$ be the vertical position of the end-effector
- $$m_2, m_E$$ be the masses at joint 2 and the end-effector, respectively

Then the potential energy is:

$$
\begin{align}
U = m_2 g y_2 + m_E g y_E
\end{align}
$$

From forward kinematics:

$$
\begin{align}
y_2 &= l_1 \sin(\chi_1), \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2).
\end{align}
$$

Substituting into the expression:

$$
\begin{align}
U &= m_2 g \cdot l_1 \sin(\chi_1)
+ m_E g \left[ l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2) \right] \\
&= (m_2 + m_E) g l_1 \sin(\chi_1)
+ m_E g l_2 \sin(\chi_1 + \chi_2)
\end{align}
$$

This expression captures the potential energy of the robot in terms of its configuration.

---

#### 3. Euler–Lagrange Equations

For each generalized coordinate $$\chi_k$$, the dynamics are governed by:

$$
\frac{d}{dt} \left( \frac{\partial \mathcal{L}}{\partial \dot{\chi}_k} \right)
- \frac{\partial \mathcal{L}}{\partial \chi_k}
= \tau_k
$$

We now plug in the expressions for kinetic energy $$K$$ and potential energy $$U$$:

##### For Joint 1

The resulting equation is:

$$
\begin{align}
&\left[ I_1 + I_2 + (m_2 + m_E) l_1^2 + m_E l_2^2 + 2 m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_1 \\
&+ \left[ I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_2 \\
&- m_E l_1 l_2 \sin(\chi_2) \left(2 \dot{\chi}_1 \dot{\chi}_2 + \dot{\chi}_2^2 \right) \\
&+ (m_2 + m_E) g l_1 \cos(\chi_1) + m_E g l_2 \cos(\chi_1 + \chi_2) \\
&= \tau_1
\end{align}
$$

##### For Joint 2

The resulting equation is:

$$
\begin{align}
&\left[ I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_1 \\
&+ \left[ I_2 + m_E l_2^2 \right] \ddot{\chi}_2 \\
&+ m_E l_1 l_2 \sin(\chi_2) \dot{\chi}_1^2 \\
&+ m_E g l_2 \cos(\chi_1 + \chi_2) \\
&= \tau_2
\end{align}
$$

These two coupled second-order nonlinear differential equations fully describe the dynamics of the 2R planar robot under the influence of gravity, link inertia, and external torques $$\tau_1, \tau_2$$.

<!-- ### 4. Compact Form: MCG Equation

The dynamic model of the 2R planar robot can be compactly written in the **MCG form**:

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}}
+ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}}
+ \mathbf{g}(\boldsymbol{\chi})
= \boldsymbol{\tau}
\end{align}
$$

where:

- $$\boldsymbol{\chi} = \begin{bmatrix} \chi_1 \\ \chi_2 \end{bmatrix}$$ is the joint position vector,
- $$\boldsymbol{\tau} = \begin{bmatrix} \tau_1 \\ \tau_2 \end{bmatrix}$$ is the joint torque vector.

#### Mass Matrix

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) =
\begin{bmatrix}
M_{11} & M_{12} \\
M_{21} & M_{22}
\end{bmatrix}
\end{align}
$$

with:

$$
\begin{align}
M_{11} &= I_1 + I_2 + (m_2 + m_E) l_1^2 + m_E l_2^2 + 2 m_E l_1 l_2 \cos(\chi_2) \\
M_{12} &= M_{21} = I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \\
M_{22} &= I_2 + m_E l_2^2
\end{align}
$$

#### Coriolis and Centrifugal Terms

Let

$$
\begin{align}
b = m_E l_1 l_2 \sin(\chi_2)
\end{align}
$$

Then:

$$
\begin{align}
\mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} =
\begin{bmatrix}
-b \dot{\chi}_2 (2\dot{\chi}_1 + \dot{\chi}_2) \\
b \dot{\chi}_1^2
\end{bmatrix}
\end{align}
$$

#### Gravity Vector

$$
\begin{align}
\mathbf{g}(\boldsymbol{\chi}) =
\begin{bmatrix}
(m_2 + m_E) g l_1 \cos(\chi_1) + m_E g l_2 \cos(\chi_1 + \chi_2) \\
m_E g l_2 \cos(\chi_1 + \chi_2)
\end{bmatrix}
\end{align}
$$

#### Final Equation

The full motion equation becomes:

$$
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}}
+ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}}
+ \mathbf{g}(\boldsymbol{\chi}) = \boldsymbol{\tau}
$$

This compact MCG form is widely used in control design and simulation of robotic manipulators. It forms the basis for:

- Computed torque control
- Adaptive control
- Model-based feedforward compensation
- Numerical simulation of joint trajectories -->

## Summary

This post introduced the dynamics of a 2R planar robot using the **Lagrangian method**. We derived expressions for:

- **Kinetic and potential energy** based on joint angles, link lengths, and masses.
- **Euler–Lagrange equations** that lead to two nonlinear second-order differential equations.
- The compact **MCG form**:

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}}
+ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}}
+ \mathbf{g}(\boldsymbol{\chi}) = \boldsymbol{\tau}
\end{align}
$$

This formulation provides the basis for simulation, control, and analysis of robot motion.
