---
title: "Robotics Modeling, Control, and Design Tutorial"
layout: post-sidebar
permalink: "/robotics.html"
image: "/assets/images/screenshot.jpg"
comments: true
toc: false
side_toc: True

---
This tutorial series started with an idea: [`EXPREDCO`](https://github.com/ductrivo/nextpredco), a flexible control and optimziation framework. From there, I specialize it into a class of application *Robotics Modeling, Control, and Design*, starting with planar *robot arms, then mobile robots*, and finally extending the concepts to *industrial robot* systems.

The central theme is simple:

> Control is about unleashing the full potential of a system. And to control effectively, we must first well understand that system.

That's why each module in this roadmap ends with a practical session: *from mechanical and electrical design to programming and implementation*. For example, one final project will involve building and controlling a mobile robot with an integrated robotic arm.

I hope this tutorial will be useful for anyone who wants to strengthen both their theoretical and practical skills in robotics and control system.

**Quick note:** If you're experiencing vibration or poor precision, consider looking into the system's *dynamic control*, specifically, check *the torque and speed characteristics of the motors*.

💻 The code used in this tutorial is currently available here:

👉 [https://github.com/ductrivo/robot-analysis-demo](https://github.com/ductrivo/robot-analysis-demo)

## CHAPTER 1: PLANNAR ROBOT ARMS

This chapter focuses on the **modeling, control, and simulation of planar open-chain robotic arms** composed of multiple revolute joints (N-DOF systems). The objective is to analyze both the **kinematics** and **dynamics** of these systems under various control strategies, from basic PID to advanced Model Predictive Control.

Currently, this project supports analysis of **2D planar robot arms** where the **mass of each link is assumed to be concentrated at the joints**. This simplification enables efficient and insightful study of robot behavior in both simulation and hardware implementations.

<div align="center">
  <img src="https://i.imgur.com/QlCwtKa.png" alt="A 3R planar open chain robot." width="70%">
  <p><strong>Figure: A 3R planar open-chain robot.</strong></p>
</div>

- **Languages:** `Python` and `Rust` for most simulation and control; `C++` for embedded systems and `ROS2`.
- **Hardware:** `Arduino`, `STM32`, `ESP32`, encoders, motors, 2D planar links
- **Final Project:** Design and Fabrication of a 3R Robotic Arm Actuated by Stepper Motors and Manufactured via 3D Printing.

### Module 1: Kinematic Modeling and Control

<!-- - Trigonometry method  
- Denavit-Hartenberg (DH) method
- Product of Exponentials (Screw Theory) method   -->
<!-- 2. Inverse Kinematics
 - Closed-form and numerical solver   -->

1. [Kinematics Using Trigonometry Method](/kinematics-of-planar-robots-with-revolute-joints/)
2. Trajectory Generation / Motion Planning
   - Cartesian/joint space interpolation
   - Point-to-point trajectories
   - Polynomial trajectories (B-spline, Bézier Curve)
   - Obstacle avoidance.
3. Kinematic Control
   - Feedforward PID control and tuning
   - Model Predictive Control (MPC)  

---

### Module 2: Dynamics Modeling and Control

1. [Dynamic Model of Planar Robots with Two Revolut Joints](/dynamics-of-planar-robots-with-revolute-joints/)
2. Motor Influence on Control
   - Torque-speed curves  
3. Trajectory Generation (Dynamics-Based)
   - Optimization-based method (take in to account the dynamics of robot)
4. Dynamic Control
   - Velocity Control: Feedforward PID, MPC  
   - Computed Torque Control: PID, Sliding Mode, MPC  

---

### Module 3: Robot Precision and Robustness

1. System Identification / Calibration  
2. Online State and Parameter Estimation
3. Mechanical Tolerance Compensation  

---

### Module 4: Experiments – Motor Control Fundamentals

1. Stepper Motor Control
2. DC Motor Identification and Control
3. Data Logging and Communication  

---

### Module 5: Experiments – Robot Arm Design (with Stepper Motor)

1. Task Description & Specification  
2. Mechanical Design  
3. Electrical Design
4. Kinematics and Control Implementation

---

## CHAPTER 2: MOBILE ROBOTS

### Module 1: Kinematics and Motion Models

1. Mobile Robot Configurations  
   - Differential drive  
   - Tricycle drive  
   - Omnidirectional platforms  

2. Forward and Inverse Kinematics  
   - Pose estimation  
   - Velocity kinematics  

3. Kinematic Constraints  
   - Nonholonomic constraints  
   - Feasible motion sets  

---

### Module 2: Path Planning and Trajectory Generation

1. Global Path Planning  
   - A*, Dijkstra, D* Lite algorithms  

2. Sampling-Based Motion Planning  
   - RRT, RRT*, PRM  

3. Trajectory Generation  
   - Polynomial interpolation  
   - Obstacle-aware motion planning  
   - Velocity/acceleration profiling  

---

### Module 3: Motion Control and Feedback

1. Classical Control  
   - PID control  
   - Feedforward enhancement  

2. Tracking Controllers  
   - Pure Pursuit  
   - Stanley Controller  

3. Advanced Control  
   - Model Predictive Control (MPC)  
   - Trajectory tracking  

4. Reactive Navigation  
   - Bug algorithm  
   - Vector Field Histogram  

---

### Module 4: Localization and SLAM

1. State Estimation  
   - Odometry  
   - Sensor fusion  

2. Filtering Techniques  
   - Extended Kalman Filter  
   - Particle Filter  

3. SLAM Implementation  
   - 2D SLAM: GMapping  
   - Visual SLAM (optional)  

4. ROS2 Integration  
   - Navigation stack  
   - Map server and localization nodes  

---

### Module 5: Experiments – Mobile Robot Prototyping

1. Task Specification and Planning  
2. Hardware Assembly  
   - Motors, sensors, chassis, MCU  

3. Embedded Programming  
   - ESP32 / STM32 motor control  
   - Serial communication  

4. ROS2 Integration and Testing  
5. Real-world Evaluation and Tuning  

---

## CHAPTER 3: GENERAL ROBOTS

### Module 1: Unified Robot Description

1. Denavit-Hartenberg Parameter Extraction  
2. URDF Modeling with Xacro  
3. Linking CAD Models to URDF  
4. Robot Description in ROS2  

---

### Module 2: Unified Kinematics and Dynamics

1. Kinematic Modeling  
   - DH Method  
   - Product of Exponentials (Screw Theory)  

2. Dynamic Modeling  
   - Mass, Coriolis, Gravity matrices  
   - Screw Theory-based equations  

---

### Module 3: Unified Trajectory Generation

1. Trajectory Representations  
   - Waypoints  
   - B-spline, Bézier curves  

2. Trajectory Planning  
   - Joint space vs Cartesian space  

3. Time Parametrization  
   - Velocity and acceleration constraints  

---

### Module 4: Unified Control Framework

1. ROS2 Controller Architecture  
   - Controller Manager  
   - Joint State Publisher  

2. MoveIt Integration  
   - Motion planning interface  
   - Planning scene and safety  

3. Hybrid Control Modes  
   - Position and velocity control  
   - Feedback integration  

4. Real-Time Control Considerations  
   - Watchdogs  
   - Exception handling  

---

### Module 5: Visualization and Simulation

1. Real-time Visualization with RViz  
2. Physics-Based Simulation using Gazebo  
3. Data Logging and ROS Bag Analysis  
4. GUI and Teleoperation Interfaces  

---
