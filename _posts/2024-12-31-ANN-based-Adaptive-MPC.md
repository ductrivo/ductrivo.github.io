---
layout: post
title:  "ANN-Based Adaptive NMPC for Uranium Extraction-Scrubbing Operation in Spent Nuclear Fuel Treatment Process"
author: ductri
categories: [Control System]
tags: [featured]
image: /assets/images/ann-based-mpc-paper.png
# description: "Test latex."
---

**Abstract:** This study focuses on the challenges in optimizing the control of uranium extraction and scrubbing within the PUREX process. The objective is to maintain the system at a target solvent saturation level while adhering to operational constraints, managing disturbances, and adjusting to changes in set points. The French Alternative Energies and Atomic Energy Commission (CEA) developed a specialized simulator called PAREX to model liquid-liquid extraction in the PUREX process. However, the underlying mathematical model is complicated, consisting of nonlinear, high-dimensional differential-algebraic equations (DAEs). Consequently, direct application of optimal control methods would result in computationally intensive, large-scale nonlinear programming problems. To overcome this, we propose training a neural network to forecast process outputs based on historical measurements. This network architecture incorporates long short-term memory (LSTM), linear regression, and logistic regression networks, effectively reducing the number of state variables and simplifying the optimization problem. Furthermore, we formulate and solve nonlinear model predictive control (NMPC) and moving horizon estimation (MHE) problems using the Particle Swarm Optimization (PSO) algorithm. Simulation results demonstrate the effectiveness of this adaptive optimal control approach in meeting the control objectives, suggesting its potential for real-world implementation.

[Download the Paper]({{site.baseurl}}/assets/publications/ANN-Based-Adaptive-NMPC-for-Uranium-Extraction-Scrubbing-Operation-in-Spent-Nuclear-Fuel-Treatment-Process.pdf)

<!-- # Introduction

## Motivation

The PUREX process, an acronym for "Plutonium, Uranium, Reduction, EXtraction," was developed to recover uranium and plutonium from spent nuclear fuels, which is composed of 95% uranium, 1% plutonium, and 4% high radioactive toxic waste (the ultimate waste). This process offers a high-purity U-Pu recovery and recycling, reducing the ultimate waste volume and thus contributing to sustainable nuclear energy development. The overall control objective is quickly driving the process to achieve a desired solvent saturation level, guarantee constraints, handle the disturbances, and set point variations. 

PAREX is a simulation program developed by the French Alternative Energies and Atomic Energy Commission (CEA). It can simulate liquid-liquid extraction operations within the PUREX process. As reported in \cite{Bisson2016}, PAREX is currently used in the nuclear fuel reprocessing industry for process optimization, troubleshooting, and safety analysis. PAREX offers valuable insights into process dynamics and enables the applicability of model-based control approaches.

This work continues the studies of developing the adaptive Nonlinear Model Predictive Control (NMPC) for the uranium extraction-scrubbing operation in the PUREX process (\cite{vo2023}) and (\cite{Vo2023a}). We aim to exploit the benefits of the qualified PAREX simulator in the control scheme to satisfy the control objectives and constraints introduced above. However, it requires high-level security controls when developing an ANN replicate of PAREX since PAREX and its data are strictly protected. Therefore, in this first study, we propose a mathematical model that captures the main dynamics of the process, then use it to illustrate and study the developed control strategy in multiple simulations. Note that the proposed algorithm can be generalized to PAREX without any limitation.

In our previous studies (\cite{vo2023} and \cite{Vo2023a}), a high dimensional process model with 128 states was employed. However, note that from a practical viewpoint, only two state variables have critical roles in the control problem. Therefore, if we can reduce the number of variables in the process model, we can reduce the complexity of the control problem, which is the motivation of this paper.

Our main idea is to develop an artificial neural network (ANN) to predict the essential state variables based on available measurements. Then, the ANN is embedded as a predictor in the Nonlinear Model Predictive Controller (NMPC) scheme and as an estimator in the Moving Horizon Estimator (MHE) strategy. Furthermore, integrating NMPC and MHE allows us to have an adaptive control scheme in which any unmeasured disturbances can be estimated and updated to the controller. To solve the NMPC and MHE optimization problems, we use the enhanced Particle Swarm Optimization (PSO) developed in our previous work (\cite{Vo2023a}).

The Long Short-term Memory (LSTM) neural network, which was first proposed by \cite{Hochreiter}, is a common choice for time series prediction applications. Therefore, it represents a good candidate method for approximating system dynamics, allowing the application of model-based control techniques such as NMPC. The applicability of LSTM within NMPC was comprehensively discussed by \cite{JUNG2023106226}. Note that our proposed ANN architecture is based on the LSTM and linear and logistic regression networks. As will be discussed later in the paper, the ANN is designed based on the particularities of the control problem.  -->
