---
layout: post-sidebar
title:  "Hierarchical Control using Approximate Simulation Relations"
author: ductri
categories: [Control System]
tags: [featured]
image: "https://i.imgur.com/NEcje0J.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
    Curious about how complex systems can be controlled with simpler models? In this post, I will introduce you an interesting approach called hierarchical control using approximate simulation relations. You'll find a clear, easy-to-follow summary of Girard's 2006 paper, along with insights into how the method works, how it's evolved in recent research, and where it's being applied today--from robot motion control to multi-agent systems. Plus, I've included my own implementation code so you can try it out for yourself!

description: Curious about how complex systems can be controlled with simpler models? In this post, I unpack an elegant approach called hierarchical control using approximate simulation relations.
---

## Paper Summary

The paper {% cite Girard2006 %} introduces a hierarchical control framework for complex systems by approximating them with simpler models, facilitating the controller design. Central to this approach are the concepts of *approximate simulation relations*, which define how closely the outputs $$\mathbf{y}$$ and $$\mathbf{y}'$$ of the concrete system $$\Sigma$$ and the abstract system $$\Sigma'$$ align. These relations are constructed using *simulation functions*, which are positive functions bounding the differences between the outputs of the two systems and ensuring that these bounds are non-increasing during their parallel evolution.

The framework's architecture consists of two main layers: the *concrete system* $$\Sigma$$, which represents the detailed and complex model of the plant, and the *abstract system* $$\Sigma'$$[^1], a simplified model characterized using approximate simulation relations to simplify control design at the *Abstract System Controller*. These layers are connected via a *control interface*, which synthesizes the control inputs for the concrete system.

{% include figure.html
    src=site.data.images.herarchical_control_girard.src
    alt=site.data.images.herarchical_control_girard.alt
    caption=site.data.images.herarchical_control_girard.caption
%}

Consider a control problem for the concrete system with specific invariance and reachability properties. Section III proves that the proposed control architecture guarantees that the output $$\mathbf{y}$$ of $$\Sigma$$ satisfies these desired properties, provided the following conditions are met:

- $$\Sigma'$$ is a *complete approximate sub-system of* $$\Sigma$$ *with precision* $$\delta$$, meaning that for every initial state $$\mathbf{x}_0$$ of $$\Sigma$$, there exists a corresponding initial state $$\mathbf{z}_0$$ of $$\Sigma'$$ such that, starting from these initial conditions, the outputs are bounded, i.e., $$\|\mathbf{h}(\mathbf{x}) - \mathbf{k}(\mathbf{z})\| \leq \delta$$ for all $$t \geq 0$$;[^3]
- $$\Sigma'$$ satisfies the invariance and reachability properties within a safety margin of $$\delta$$.

This approach is demonstrated through an application in robot motion control. The authors used a first-order kinematic model of the robot as $$\Sigma'$$ to approximate the second-order dynamical model of the robot, treated as $$\Sigma$$. Using the simulation function proposed in Proposition 4.1, the conditions and precision for which $$\Sigma'$$ becomes a complete approximate sub-system of $$\Sigma$$ are computed as functions of the bounds on $$\|\mathbf{u}\|$$ and $$\|\mathbf{v}\|$$, as detailed in Theorem 4.3. Finally, the application of this architecture to autonomous robots is explored in the latter part of the paper, showcasing its practicality and effectiveness.[^4]

## Reviews on Hierarchical Control based on Approximate Simulation Relations

In {% cite Kurtz2020 %}, the architecture shown in Fig. 1 was extended to account for disturbances in the concrete system by introducing the *Robust Simulation Function* and *Robust Approximate Simulation Relation*. Subsequently, in {% cite Wooding2023 %}, an interface function for disturbances was integrated into the same architecture, allowing the abstract system to handle significant disturbances in the concrete system. Building on this, {% cite Firouzmand2024 %} incorporated an observer to estimate the state of the concrete system, enabling *Extended Robust Approximate Simulation Relations* for linear systems.

The study of hierarchical control systems has also evolved in other directions. In {% cite Yang2017 %}, vector simulation functions were used to analyze large-scale hierarchical control systems. Meanwhile, {% cite Tang2012 %} explored hierarchical control for a class of nonlinear systems using approximate simulation relations. This work was extended to distributed multi-agent systems in {% cite Tang2018 %} and further applied to the Nash equilibrium of distributed multi-agent systems in {% cite Tang2023 %}.

## Comments

The hierarchical control architecture based on approximate simulation relations offers an exciting perspective, mainly because my background is in process control, where hierarchical control is typically viewed as a multi-layered structure operating at different time scales (see {% cite SCATTOLINI2009723 %}). In this context, each layer generally focuses on controlling a sub-system rather than addressing control and abstraction of the concrete system as presented in {% cite Girard2006 %}.

## References

{% bibliography --cited %}

## Footnotes

[^1]: The method for characterizing the abstract system $$\Sigma'$$ in the context of linear systems $$\Sigma$$ is detailed in a subsequent paper by the author {% cite Girard2009 %}.

[^2]: I added the *Abstract System Controller* to clarify the control mechanism: we also need to design the controller for the abstract system.
[^3]: The precision $$\delta$$ can be computed from the simulation function using equation (6) in {% cite Girard2006 %}.
[^4]: I tried to reproduce the simulation results, which are available at this link: [Google Colab](https://colab.research.google.com/drive/16XZ5cDuYZwOKxt4M3upsC4mEnaYfyiv6?usp=sharing)
