---
layout: lesson
title: "Forward & Inverse Kinematics"
course: robotics
lesson_order: 2
duration_min: 45
has_quiz: true
has_interactive: true
---

This lesson covers forward and inverse kinematics for robotic manipulators.

## Forward Kinematics

Given joint angles $$\theta_1, \theta_2$$, the end-effector position of a 2R planar robot is:

$$x = l_1\cos\theta_1 + l_2\cos(\theta_1+\theta_2)$$
$$y = l_1\sin\theta_1 + l_2\sin(\theta_1+\theta_2)$$

**Try it live:**

{% include robot-arm.html joints=2 l1=150 l2=120 %}

## Coding FK

Run the FK calculation yourself:

{% include python-sandbox.html %}
