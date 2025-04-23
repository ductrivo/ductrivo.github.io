---
layout: post-sidebar
title:  "Kinematics of Planar Robots with Revolut Joints"
author: ductri
categories: [Robotics]
tags: [featured, sticky, robots, kinematics]
image: "https://i.imgur.com/3jfOT0D.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
    In this tutorial, we examine the **forward and inverse kinematics** of planar robots with **N revolute joints**. By walking through this simple case, readers can gain an intuitive understanding of kinematics before moving on to more general methods such as the Denavit-Hartenberg (DH) parameters or the Product of Exponentials (PoE), which will be introduced in Chapter 3.

description: In this tutorial, we examine the forward and inverse kinematics of planar robots with N revolute joints. By walking through this simple case, readers can gain an intuitive understanding of kinematics before moving on to more general methods such as the Denavit-Hartenberg (DH) parameters or the Product of Exponentials (PoE), which will be introduced in Chapter 3.
---

> This post is part of my [Robotics Modeling, Control, and Design Tutorial](/robotics.html) series.

## Introduction

**Kinematics** is the branch of mechanics that describes the motion of systems *without considering the forces* that cause that motion. In robotics, kinematics focuses on the *position*, *velocity*, and *acceleration* of robot links and joints.

**Forward Kinematics (FK):** Given the joint variables (angles for revolute joints), compute the *position and orientation* of the robot's end-effector. FK is usually analytical and straightforward for planar robots.

**Inverse Kinematics (IK):** Given the desired position (and possibly orientation) of the end-effector, compute the *joint variables* that achieve it. IK can be *analytical* for simple robots, *numerical* or *iterative* for more complex ones. Also, it may have *multiple solutions, no solution, or infinite solutions*

Let us examine planar robots with 2 and 3 revolute joints.

## Planar Robot with 2 Revolute Joints

### Forward Kinematics of 2R Plannar Robots

Consider a planar robot with two revolute joints, as shown in the figure below. Let:

- $$ \chi_1,\, \chi_2 \in [-\pi, \pi) $$ be the joint angles
- $$ l_1,\, l_2 \in \mathbb{R} $$ be the link lengths

{% include figure.html
    src=site.data.images.planar_robot_2r.src
    alt=site.data.images.planar_robot_2r.alt
    caption=site.data.images.planar_robot_2r.caption
%}

<div class="post-intro-toc">
Then the position of the end-effector is given by:

$$
\begin{align}
x_E &= l_1 \cos(\chi_1) + l_2 \cos(\chi_1 + \chi_2) \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2)
\end{align}
$$
</div>
This model represents a two-link planar manipulator in an elbow configuration.

---

### Inverse Kinematics of 2R Plannar Robot

Let the target end-effector position be $$\left(x_E, y_E\right)$$. The goal is to solve for joint angles $$\chi_1, \chi_2$$ given the link lengths $$l_1,\, l_2$$.

#### Step 1: Compute $$ \chi_2 $$ using the [law of cosines](https://en.wikipedia.org/wiki/Law_of_cosines)

Applying the law of cosines to the triangle $$O_1O_2E$$:

$$
\begin{align}
\cos \widehat{O_1O_2E} &= \dfrac{O_2O_1^2 + O_2E^2 - O_1E^2}{2O_1O_2},\\
\Rightarrow \cos(\pi - \chi_2) &= \dfrac{l_1^2 + l_2^2 - \left(x_E^2 + y_E^2\right)}{2l_1 l_2}.
\end{align}
$$

Noting that $$ \cos(\pi - \chi_2) = -\cos\chi_2 $$, we compute $$\chi_2 \in [-\pi, \pi)$$ as:

$$
\begin{align}
\chi_2 = \pm \arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

There are **two possible solutions** for $$ \chi_2 $$ corresponding to the **elbow-up** and **elbow-down** configurations.

---

#### Step 2: Compute $$ \chi_1 $$ using the [law of cosines](https://en.wikipedia.org/wiki/Law_of_cosines)

Let $$\psi = \widehat{O_2O_1E}$$. Then the sum $$\chi_1 + \psi$$ is the angle from the base to the target, and is given by:

$$
\begin{align}
\chi_1 + \psi = \text{arctan2 }(y_E, x_E).
\end{align}
$$

Again applying the law of cosines in triangle $$O_2O_1E$$:

$$
\begin{align}
\cos \widehat{O_2O_1E} &= \dfrac{O_1O_2^2 + O_1E^2 - O_2E^2}{2O_1O_2},\\
\Rightarrow \cos \psi &= \dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}},\\
\Rightarrow \psi &= \pm \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right).
\end{align}
$$

Thus, $$\chi_1$$ is computed as:

$$
\begin{align}
\chi_1 = \text{arctan2 }(y_E, x_E) \pm \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right).
\end{align}
$$

#### Final Solution

From the equations above, we see that there are **four mathematical solutions** for $$ (\chi_1, \chi_2) $$. However, only two of them are **physically feasible** configurations for the robot. These are:

<div class="post-intro-toc">
<strong>Elbow-down configuration</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_E, x_E) - \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right),\\
    \chi_2 &= \arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

<strong>Elbow-up configuration</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_E, x_E) + \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right),\\
    \chi_2 &= -\arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

</div>

---

## Planar Robot with 3 Revolute Joints

### Forward Kinematics of 3R Plannar Robot

Let:

- $$ \chi_1,\, \chi_2,\, \chi_3 $$ be the joint angles
- $$ l_1,\, l_2,\, l_3 $$ be the link lengths

The forward kinematics gives the position of the end-effector:

$$
\begin{aligned}
x_E &= l_1 \cos(\chi_1) + l_2 \cos(\chi_1 + \chi_2) + l_3 \cos(\chi_1 + \chi_2 + \chi_3) \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2) + l_3 \sin(\chi_1 + \chi_2 + \chi_3)
\end{aligned}
$$

This configuration introduces **kinematic redundancy**, which allows more flexibility in reaching a target point, and enables optimization for additional objectives such as obstacle avoidance or joint effort minimization.

---

### Inverse Kinematics of 3R Plannar Robot

{% include figure.html
    src=site.data.images.planar_robot_3r.src
    alt=site.data.images.planar_robot_3r.alt
    caption=site.data.images.planar_robot_3r.caption
%}

Because the robot has **three degrees of freedom** in a **2D space**, the system is **redundant** — meaning that there are infinitely many combinations of $$ (\chi_1, \chi_2, \chi_3) $$ that achieve the same end-effector pose. In other word, we can position not only the position $$ (x_E, y_E) $$ but also the orientation $\theta_E$ of the end effector.

To find a solution, we can adopt the following approach:

1. **Choose a desired orientation with respect to the base frame** $$ \theta_E $$ for the end-effector (either given or arbitrarily selected).
2. Compute:
   $$
   \chi_3 = \theta_E - (\chi_1 + \chi_2)
   $$

3. Define the wrist position $$ (x_W, y_W) = (x_{O_3}, y_{O_3})$$ as:

$$
\begin{align}
x_W &= x_E - l_3 \cos(\theta_E) \\
y_W &= y_E - l_3 \sin(\theta_E)
\end{align}
$$

This reduces the problem to solving inversed kinematics for a 2R manipulator to reach the wrist position with links $$ l_1, l_2 $$. As derived in the previous section, we have

<div class="post-intro-toc">
<strong>Elbow-down configuration</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_W, x_W) - \arccos \left(\dfrac{x_W^2 + y_W^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_W^2 + y_W^2}}\right),\\
    \chi_2 &= \arccos \left(\dfrac{x_W^2 + y_W^2  - l_1^2 - l_2^2}{2l_1 l_2}\right),\\
    \chi_3 &= \theta_E - (\chi_1 + \chi_2).
\end{align}
$$

<strong>Elbow-up configuration</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_W, x_W) + \arccos \left(\dfrac{x_W^2 + y_W^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_W^2 + y_W^2}}\right),\\
    \chi_2 &= -\arccos \left(\dfrac{x_W^2 + y_W^2  - l_1^2 - l_2^2}{2l_1 l_2}\right),\\
    \chi_3 &= \theta_E - (\chi_1 + \chi_2).
\end{align}
$$

</div>

---

## Forward Kinematics of an $$N$$-R Planar Robot

The forward kinematics of a planar robot with $$N$$ revolute joints can be expressed in a compact and generalized form. Each link contributes to the end-effector position based on the cumulative joint angles up to that link:

$$
\begin{aligned}
x_E &= \sum_{i=1}^{N} l_i \cos\left( \sum_{j=1}^{i} \chi_j \right), \\
y_E &= \sum_{i=1}^{N} l_i \sin\left( \sum_{j=1}^{i} \chi_j \right).
\end{aligned}
$$

This formulation accounts for the sequential rotation of each joint and the cumulative nature of the angles in planar serial chains.

## Summary

In this post, we explored the kinematics of planar robots with 2 and 3 revolute joints.

- **Kinematics** describes how a robot moves without reference to forces. We examined both **Forward Kinematics (FK)** and **Inverse Kinematics (IK)**.
- For the **2R planar robot**, we derived analytical expressions for both FK and IK. The IK problem yields **two feasible configurations**: **elbow-up** and **elbow-down**.
- For the **3R planar robot**, we introduced **redundancy**. The robot has three degrees of freedom in a 2D space, allowing it to reach the same point with infinite combinations of joint angles. By choosing a desired orientation of the end-effector, we reduce the problem to a **2R IK problem** for the wrist position.
- This approach is commonly used in practice and can be extended to optimize for secondary objectives such as minimizing joint displacement or avoiding obstacles.

This study provides a solid foundation for understanding kinematic modeling of planar manipulators. In future sections, we will generalize these methods using techniques such as **Denavit–Hartenberg parameters (DH)** and the **Product of Exponentials (PoE)** formulation for more complex spatial mechanisms.
