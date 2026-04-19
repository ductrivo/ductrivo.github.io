---
layout: post-sidebar
title:  "Cinématique des Robots Planaires avec Liaisons Pivots"
author: ductri
categories: [Robotics]
tags: [featured, robots, kinematics]
image: "https://i.imgur.com/3jfOT0D.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
    Dans ce tutoriel, nous examinons la **cinématique directe et inverse** des robots planaires avec **N liaisons pivots**. En parcourant ce cas simple, les lecteurs peuvent acquérir une compréhension intuitive de la cinématique avant de passer à des méthodes plus générales telles que les paramètres de Denavit-Hartenberg (DH) ou le Produit d'Exponentielles (PoE), qui seront introduits au Chapitre 3.

description: Dans ce tutoriel, nous examinons la cinématique directe et inverse des robots planaires avec N liaisons pivots. En parcourant ce cas simple, les lecteurs peuvent acquérir une compréhension intuitive de la cinématique avant de passer à des méthodes plus générales telles que les paramètres de Denavit-Hartenberg (DH) ou le Produit d'Exponentielles (PoE), qui seront introduits au Chapitre 3.
lang: fr
permalink: /fr/kinematics-planar-robots/
---

> Cet article fait partie de ma série de tutoriels [Modélisation, Contrôle et Conception en Robotique](/robotics.html).

## Introduction

La **cinématique** est la branche de la mécanique qui décrit le mouvement des systèmes *sans considérer les forces* qui causent ce mouvement. En robotique, la cinématique se concentre sur la *position*, la *vitesse* et l'*accélération* des segments (links) et des articulations (joints) du robot.

**Cinématique Directe (Forward Kinematics - FK) :** Étant donné les variables articulaires (angles pour les liaisons pivots), calculer la *position et l'orientation* de l'organe terminal du robot. La FK est généralement analytique et directe pour les robots planaires.

**Cinématique Inverse (Inverse Kinematics - IK) :** Étant donné la position souhaitée (et éventuellement l'orientation) de l'organe terminal, calculer les *variables articulaires* qui permettent de l'atteindre. L'IK peut être *analytique* pour des robots simples, *numérique* ou *itérative* pour des robots plus complexes. De plus, elle peut avoir *plusieurs solutions, aucune solution ou une infinité de solutions*.

Examinons les robots planaires avec 2 et 3 liaisons pivots.

## Robot Planaire avec 2 Liaisons Pivots

### Cinématique Directe des Robots Planaires 2R

Considérons un robot planaire avec deux liaisons pivots, comme le montre la figure ci-dessous. Soit :

- $$ \chi_1,\, \chi_2 \in [-\pi, \pi) $$ les angles articulaires
- $$ l_1,\, l_2 \in \mathbb{R} $$ les longueurs des segments

{% include figure.html
    src=site.data.images.planar_robot_2r.src
    alt=site.data.images.planar_robot_2r.alt
    caption=site.data.images.planar_robot_2r.caption
%}

<div class="post-intro-toc">
Alors la position de l'organe terminal est donnée par :

$$
\begin{align}
x_E &= l_1 \cos(\chi_1) + l_2 \cos(\chi_1 + \chi_2) \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2)
\end{align}
$$
</div>
Ce modèle représente un manipulateur planaire à deux segments dans une configuration en "coude".

---

### Cinématique Inverse du Robot Planaire 2R

Soit la position cible de l'organe terminal $$\left(x_E, y_E\right)$$. L'objectif est de résoudre pour les angles articulaires $$\chi_1, \chi_2$$ étant donné les longueurs des segments $$l_1,\, l_2$$.

#### Étape 1 : Calculer $$ \chi_2 $$ en utilisant la [loi des cosinus](https://fr.wikipedia.org/wiki/Loi_des_cosinus)

En appliquant la loi des cosinus au triangle $$O_1O_2E$$ :

$$
\begin{align}
\cos \widehat{O_1O_2E} &= \dfrac{O_2O_1^2 + O_2E^2 - O_1E^2}{2O_1O_2},\\
\Rightarrow \cos(\pi - \chi_2) &= \dfrac{l_1^2 + l_2^2 - \left(x_E^2 + y_E^2\right)}{2l_1 l_2}.
\end{align}
$$

En notant que $$ \cos(\pi - \chi_2) = -\cos\chi_2 $$, nous calculons $$\chi_2 \in [-\pi, \pi)$$ comme :

$$
\begin{align}
\chi_2 = \pm \arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

Il y a **deux solutions possibles** pour $$ \chi_2 $$ correspondant aux configurations **coude en haut** et **coude en bas**.

---

#### Étape 2 : Calculer $$ \chi_1 $$ en utilisant la [loi des cosinus](https://fr.wikipedia.org/wiki/Loi_des_cosinus)

Soit $$\psi = \widehat{O_2O_1E}$$. Alors la somme $$\chi_1 + \psi$$ est l'angle de la base à la cible, et est donnée par :

$$
\begin{align}
\chi_1 + \psi = \text{arctan2 }(y_E, x_E).
\end{align}
$$

En appliquant à nouveau la loi des cosinus dans le triangle $$O_2O_1E$$ :

$$
\begin{align}
\cos \widehat{O_2O_1E} &= \dfrac{O_1O_2^2 + O_1E^2 - O_2E^2}{2O_1O_2},\\
\Rightarrow \cos \psi &= \dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}},\\
\Rightarrow \psi &= \pm \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right).
\end{align}
$$

Ainsi, $$\chi_1$$ est calculé comme :

$$
\begin{align}
\chi_1 = \text{arctan2 }(y_E, x_E) \pm \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right).
\end{align}
$$

#### Solution Finale

D'après les équations ci-dessus, nous voyons qu'il existe **quatre solutions mathématiques** pour $$ (\chi_1, \chi_2) $$. Cependant, seules deux d'entre elles sont des configurations **physiquement réalisables** pour le robot. Ce sont :

<div class="post-intro-toc">
<strong>Configuration coude en bas</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_E, x_E) - \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right),\\
    \chi_2 &= \arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

<strong>Configuration coude en haut</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_E, x_E) + \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right),\\
    \chi_2 &= -\arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

</div>

---

## Robot Planaire avec 3 Liaisons Pivots

### Cinématique Directe du Robot Planaire 3R

Soit :

- $$ \chi_1,\, \chi_2,\, \chi_3 $$ les angles articulaires
- $$ l_1,\, l_2,\, l_3 $$ les longueurs des segments

La cinématique directe donne la position de l'organe terminal :

$$
\begin{aligned}
x_E &= l_1 \cos(\chi_1) + l_2 \cos(\chi_1 + \chi_2) + l_3 \cos(\chi_1 + \chi_2 + \chi_3) \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2) + l_3 \sin(\chi_1 + \chi_2 + \chi_3)
\end{aligned}
$$

Cette configuration introduit une **redondance cinématique**, qui permet plus de flexibilité pour atteindre un point cible, et permet l'optimisation pour des objectifs supplémentaires tels que l'évitement d'obstacles ou la minimisation des efforts articulaires.

---

### Cinématique Inverse du Robot Planaire 3R

{% include figure.html
    src=site.data.images.planar_robot_3r.src
    alt=site.data.images.planar_robot_3r.alt
    caption=site.data.images.planar_robot_3r.caption
%}

Parce que le robot a **trois degrés de liberté** dans un **espace 2D**, le système est **redondant** — ce qui signifie qu'il existe une infinité de combinaisons de $$ (\chi_1, \chi_2, \chi_3) $$ qui permettent d'atteindre la même pose de l'organe terminal. En d'autres termes, nous pouvons positionner non seulement la position $$ (x_E, y_E) $$ mais aussi l'orientation $\theta_E$ de l'organe terminal.

Pour trouver une solution, nous pouvons adopter l'approche suivante :

1. **Choisir une orientation souhaitée par rapport au référentiel de base** $$ \theta_E $$ pour l'organe terminal (donnée ou choisie arbitrairement).
2. Calculer :
   $$
   \chi_3 = \theta_E - (\chi_1 + \chi_2)
   $$

3. Définir la position du poignet $$ (x_W, y_W) = (x_{O_3}, y_{O_3})$$ comme :

$$
\begin{align}
x_W &= x_E - l_3 \cos(\theta_E) \\
y_W &= y_E - l_3 \sin(\theta_E)
\end{align}
$$

Cela ramène le problème à la résolution de la cinématique inverse pour un manipulateur 2R afin d'atteindre la position du poignet avec les segments $$ l_1, l_2 $$. Comme dérivé dans la section précédente, nous avons :

<div class="post-intro-toc">
<strong>Configuration coude en bas</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_W, x_W) - \arccos \left(\dfrac{x_W^2 + y_W^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_W^2 + y_W^2}}\right),\\
    \chi_2 &= \arccos \left(\dfrac{x_W^2 + y_W^2  - l_1^2 - l_2^2}{2l_1 l_2}\right),\\
    \chi_3 &= \theta_E - (\chi_1 + \chi_2).
\end{align}
$$

<strong>Configuration coude en haut</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_W, x_W) + \arccos \left(\dfrac{x_W^2 + y_W^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_W^2 + y_W^2}}\right),\\
    \chi_2 &= -\arccos \left(\dfrac{x_W^2 + y_W^2  - l_1^2 - l_2^2}{2l_1 l_2}\right),\\
    \chi_3 &= \theta_E - (\chi_1 + \chi_2).
\end{align}
$$

</div>

---

## Cinématique Directe d'un Robot Planaire à $$N$$ Articulations

La cinématique directe d'un robot planaire avec $$N$$ liaisons pivots peut être exprimée sous une forme compacte et généralisée. Chaque segment contribue à la position de l'organe terminal sur la base des angles articulaires cumulés jusqu'à ce segment :

$$
\begin{aligned}
x_E &= \sum_{i=1}^{N} l_i \cos\left( \sum_{j=1}^{i} \chi_j \right), \\
y_E &= \sum_{i=1}^{N} l_i \sin\left( \sum_{j=1}^{i} \chi_j \right).
\end{aligned}
$$

Cette formulation tient compte de la rotation séquentielle de chaque articulation et de la nature cumulative des angles dans les chaînes sérielles planaires.

## Résumé

Dans cet article, nous avons exploré la cinématique des robots planaires avec 2 et 3 liaisons pivots.

- La **cinématique** décrit comment un robot se déplace sans référence aux forces. Nous avons examiné à la fois la **cinématique directe (FK)** et la **cinématique inverse (IK)**.
- Pour le **robot planaire 2R**, nous avons dérivé des expressions analytiques pour la FK et l'IK. Le problème d'IK donne **deux configurations réalisables** : **coude en haut** et **coude en bas**.
- Pour le **robot planaire 3R**, nous avons introduit la **redondance**. Le robot a trois degrés de liberté dans un espace 2D, ce qui lui permet d'atteindre le même point avec une infinité de combinaisons d'angles articulaires. En choisissant une orientation souhaitée de l'organe terminal, nous ramenons le problème à un **problème d'IK 2R** pour la position du poignet.
- Cette approche est couramment utilisée en pratique et peut être étendue pour optimiser des objectifs secondaires tels que la minimisation du déplacement articulaire ou l'évitement d'obstacles.

Cette étude fournit une base solide pour comprendre la modélisation cinématique des manipulateurs planaires. Dans les sections futures, nous généraliserons ces méthodes en utilisant des techniques telles que les **paramètres de Denavit-Hartenberg (DH)** et la formulation du **Produit d'Exponentielles (PoE)** pour des mécanismes spatiaux plus complexes.
