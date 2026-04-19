---
layout: post-sidebar
title:  "Modèle Dynamique des Robots Planaires à Deux Liaisons Pivots"
author: ductri
categories: [Robotics]
tags: [featured, sticky, robots, kinematics]
image: "https://i.imgur.com/CWIBlLM.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
    Dans cet article, nous nous concentrons sur la dynamique d'un **manipulateur planaire 2R**. En utilisant la **formulation lagrangienne**, nous dérivons les équations du mouvement étape par étape, en partant des définitions de l'énergie jusqu'à la forme matricielle compacte largement utilisée en robotique.

description: Dans cet article, nous nous concentrons sur la dynamique d'un manipulateur planaire 2R. En utilisant la formulation lagrangienne, nous dérivons les équations du mouvement étape par étape, en partant des définitions de l'énergie jusqu'à la forme matricielle compacte largement utilisée en robotique.
lang: fr
permalink: /fr/dynamics-of-planar-robots-with-revolute-joints/
---

> Cet article fait partie de ma série de tutoriels [Modélisation, Contrôle et Conception en Robotique](/robotics.html).

## Introduction à la Dynamique

Alors que la **cinématique** décrit *comment* un robot se déplace, la **dynamique** explique *pourquoi* il se déplace de cette façon. En d'autres termes :

- La **cinématique** se concentre sur la position, la vitesse et l'accélération.
- La **dynamique** inclut la **masse**, l'**inertie** et les **forces/couples**, et décrit comment le mouvement est généré en réponse à ces quantités.

La dynamique est essentielle pour simuler le comportement physique, concevoir des lois de commande et analyser la stabilité.

## Forme Générale de la Dynamique d'un Robot

La dynamique du robot est décrite par un système d'équations différentielles ordinaires (EDO) non linéaires comme suit (en supposant qu'il n'y a pas de force à l'organe terminal) :

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}} + \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} + \mathbf{g}(\boldsymbol{\chi}) = \boldsymbol{\tau}
\end{align}
$$

où :

- $$ \boldsymbol{\chi} \in \mathbb{R}^n $$ : Vecteur des coordonnées généralisées, typiquement les angles articulaires pour les liaisons pivots.
- $$ \dot{\boldsymbol{\chi}},\, \ddot{\boldsymbol{\chi}} \in \mathbb{R}^n $$ : Première et deuxième dérivées des positions articulaires, représentant les vitesses et accélérations articulaires.
- $$ \boldsymbol{\tau} \in \mathbb{R}^n $$ : Vecteur des couples d'entrée appliqués aux articulations par les actionneurs.
- $$ \mathbf{M}(\boldsymbol{\chi}) \in \mathbb{R}^{n \times n} $$ : Matrice d'inertie, une matrice symétrique et définie positive qui code la masse et la géométrie du robot.
- $$ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} \in \mathbb{R}^n $$ : Terme de Coriolis et centrifuge, capturant les effets non linéaires dépendant de la vitesse.
- $$ \mathbf{g}(\boldsymbol{\chi}) \in \mathbb{R}^n $$ : Vecteur des forces généralisées dues à la gravité, souvent omis dans les cas planaires où la gravité agit orthogonalement au plan du mouvement.

---

## Modèle Dynamique des Robots Planaires 2R

### Formulation Lagrangienne

{% include figure.html
    src=site.data.images.planar_robot_2r_dynamics.src
    alt=site.data.images.planar_robot_2r_dynamics.alt
    caption=site.data.images.planar_robot_2r_dynamics.caption
%}

Pour dériver les équations dynamiques du mouvement, nous appliquons la **méthode de la mécanique lagrangienne**, qui construit la fonction lagrangienne :

$$
\begin{align}
\mathcal{L} = K - U
\end{align}
$$

où :

- $$K$$ est l'énergie cinétique totale du système
- $$U$$ est l'énergie potentielle totale due à la gravité

Les termes énergétiques sont calculés en considérant :

- L'énergie cinétique de rotation due aux inerties des segments $$I_1, I_2$$
- L'énergie cinétique de translation provenant des masses réparties des segments $$m_1^L, m_2^L$$
- Les masses ponctuelles situées aux articulations et à l'organe terminal : $$m_1, m_2, m_E$$
- L'énergie potentielle gravitationnelle de tous les composants massiques

---

#### 1. Énergie Cinétique

Soit :

- $$ \dot{\chi}_1, \dot{\chi}_2 $$ les vitesses angulaires articulaires
- $$ \mathbf{v}_i $$ la vitesse linéaire du centre de masse ou d'une masse ponctuelle localisée $$m_i$$

Alors l'énergie cinétique totale est donnée par :

$$
\begin{align}
K = \frac{1}{2} I_1 \dot{\chi}_1^2 + \frac{1}{2} I_2 (\dot{\chi}_1 + \dot{\chi}_2)^2
+ \sum_i \frac{1}{2} m_i \| \mathbf{v}_i \|^2.
\end{align}
$$

Ici, $$\mathbf{v}_i$$ est dérivé de la cinématique directe (voir [Cinématique des Robots Planaires avec Liaisons Pivots](/fr/kinematics-planar-robots/)). Nous avons les positions planaires de la deuxième articulation et de l'organe terminal comme :

$$
\begin{align}
x_2 &= l_1 \cos\chi_1,\\
y_2 &= l_1 \sin\chi_1, \\
x_E &= l_1 \cos\chi_1 + l_2 \cos(\chi_1 + \chi_2),\\
y_E &= l_1 \sin\chi_1 + l_2 \sin(\chi_1 + \chi_2).
\end{align}
$$

La dérivée temporelle des positions donne les vitesses :

**Articulation 2 :**

$$
\begin{align}
\dot{x}_2 &= -l_1 \sin\chi_1 \cdot \dot{\chi}_1 \\
\dot{y}_2 &=  l_1 \cos\chi_1 \cdot \dot{\chi}_1.
\end{align}
$$

D'où :

$$
\begin{align}
\| \mathbf{v}_2 \|^2 = \dot{x}_2^2 + \dot{y}_2^2 = l_1^2 \dot{\chi}_1^2.
\end{align}
$$

**Organe Terminal :**

$$
\begin{align}
\dot{x}_E &= -l_1 \sin\chi_1 \cdot \dot{\chi}_1
             -l_2 \sin(\chi_1 + \chi_2) \cdot (\dot{\chi}_1 + \dot{\chi}_2) \\
\dot{y}_E &=  l_1 \cos\chi_1 \cdot \dot{\chi}_1
             +l_2 \cos(\chi_1 + \chi_2) \cdot (\dot{\chi}_1 + \dot{\chi}_2).
\end{align}
$$

En utilisant l'[identité pythagoricienne](https://fr.wikipedia.org/wiki/Identit%C3%A9_trigonom%C3%A9trique_pythagoricienne), nous trouvons :

$$
\begin{align}
\| \mathbf{v}_E \|^2 = l_1^2 \dot{\chi}_1^2
+ l_2^2 (\dot{\chi}_1 + \dot{\chi}_2)^2
+ 2 l_1 l_2 \cos(\chi_2) \dot{\chi}_1 (\dot{\chi}_1 + \dot{\chi}_2)
\end{align}
$$

En remplaçant dans l'expression totale de l'énergie cinétique :

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

Ceci fournit l'**expression analytique complète** de l'énergie cinétique du manipulateur planaire 2R, tenant compte à la fois des inerties réparties et des masses ponctuelles.

#### 2. Énergie Potentielle

En supposant que la gravité agit dans la direction négative de $$y$$ avec une magnitude $$g$$, l'énergie potentielle gravitationnelle est calculée à partir des positions verticales des masses.

Soit :

- $$y_2$$ la position verticale de la deuxième articulation
- $$y_E$$ la position verticale de l'organe terminal
- $$m_2, m_E$$ les masses à l'articulation 2 et à l'organe terminal, respectivement

Alors l'énergie potentielle est :

$$
\begin{align}
U = m_2 g y_2 + m_E g y_E
\end{align}
$$

D'après la cinématique directe :

$$
\begin{align}
y_2 &= l_1 \sin(\chi_1), \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2).
\end{align}
$$

En remplaçant dans l'expression :

$$
\begin{align}
U &= m_2 g \cdot l_1 \sin(\chi_1)
+ m_E g \left[ l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2) \right] \\
&= (m_2 + m_E) g l_1 \sin(\chi_1)
+ m_E g l_2 \sin(\chi_1 + \chi_2)
\end{align}
$$

Cette expression capture l'énergie potentielle du robot en fonction de sa configuration.

---

#### 3. Équations d'Euler-Lagrange

Pour chaque coordonnée généralisée $$\chi_k$$, la dynamique est régie par :

$$
\frac{d}{dt} \left( \frac{\partial \mathcal{L}}{\partial \dot{\chi}_k} \right)
- \frac{\partial \mathcal{L}}{\partial \chi_k}
= \tau_k
$$

Nous insérons maintenant les expressions de l'énergie cinétique $$K$$ et de l'énergie potentielle $$U$$ :

##### Pour l'Articulation 1

L'équation résultante est :

$$
\begin{align}
&\left[ I_1 + I_2 + (m_2 + m_E) l_1^2 + m_E l_2^2 + 2 m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_1 \\
&+ \left[ I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_2 \\
&- m_E l_1 l_2 \sin(\chi_2) \left(2 \dot{\chi}_1 \dot{\chi}_2 + \dot{\chi}_2^2 \right) \\
&+ (m_2 + m_E) g l_1 \cos(\chi_1) + m_E g l_2 \cos(\chi_1 + \chi_2) \\
&= \tau_1
\end{align}
$$

##### Pour l'Articulation 2

L'équation résultante est :

$$
\begin{align}
&\left[ I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_1 \\
&+ \left[ I_2 + m_E l_2^2 \right] \ddot{\chi}_2 \\
&+ m_E l_1 l_2 \sin(\chi_2) \dot{\chi}_1^2 \\
&+ m_E g l_2 \cos(\chi_1 + \chi_2) \\
&= \tau_2
\end{align}
$$

Ces deux équations différentielles non linéaires du second ordre couplées décrivent entièrement la dynamique du robot planaire 2R sous l'influence de la gravité, de l'inertie des segments et des couples externes $$\tau_1, \tau_2$$.

## Résumé

Cet article a présenté la dynamique d'un robot planaire 2R en utilisant la **méthode lagrangienne**. Nous avons dérivé des expressions pour :

- L'**énergie cinétique et potentielle** basées sur les angles articulaires, les longueurs des segments et les masses.
- Les **équations d'Euler-Lagrange** qui mènent à deux équations différentielles non linéaires du second ordre.
- La forme compacte **MCG** :

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}}
+ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}}
+ \mathbf{g}(\boldsymbol{\chi})
= \boldsymbol{\tau}
\end{align}
$$

Cette formulation fournit la base pour la simulation, le contrôle et l'analyse du mouvement du robot.
