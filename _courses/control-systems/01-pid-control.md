---
layout: lesson
title: "PID Control & Tuning"
course: control-systems
lesson_order: 1
duration_min: 50
has_quiz: false
has_interactive: true
---

This lesson introduces PID control and tuning methods for control systems engineering.

## PID Transfer Function

A PID controller in the frequency domain is:

$$C(j\omega) = K_p\left(1 + \frac{1}{T_i j\omega} + T_d j\omega\right)$$

**Explore the Bode plot interactively:**

{% include bode-plot.html Kp=1.0 Ti=1.0 Td=0.1 %}
