---
layout: post-sidebar
title:  "Modélisation et Contrôle d'un Pendule Inversé"
ref: inverted-pendulum
author: ductri
categories: [Control System]
tags: [featured]
# image: site.data.images.inv_pendulum_free_body.src
image: "https://i.imgur.com/nNWWyEy.png"
# font: vietnamese-font
# description: "Test latex."
toc: False
side_toc: True
lang: fr
permalink: /fr/inverted-pendulum-modelling-control/
---

{% include figure.html
    src=site.data.images.inv_pendulum_free_body.src
    alt=site.data.images.inv_pendulum_free_body.alt
    caption=site.data.images.inv_pendulum_free_body.caption
%}

Dans cet article, nous dérivons les équations du mouvement pour un pendule inversé monté sur un chariot en utilisant l'approche lagrangienne. Le système se compose d'un chariot de masse $$m_\text{cart}$$ qui peut se déplacer horizontalement et d'un pendule de masse $$m$$ attaché par une tige rigide de longueur $$l$$. L'angle du pendule $$\theta$$ est mesuré à partir de la verticale.

## 1. Énergie Cinétique

L'énergie cinétique totale est la somme de l'énergie cinétique du chariot et de celle du pendule.

### 1.1. Énergie Cinétique du Chariot

L'énergie cinétique du chariot est donnée par :

$$\begin{align}
    K_\text{cart} = \frac{1}{2} m_\text{cart} \dot{x}^2, \label{K_cart}
\end{align}$$

où $$x$$ est la position horizontale du chariot.

### 1.2. Énergie Cinétique du Pendule

La position de la masse du pendule $$m$$ peut être exprimée comme suit :

$$
\begin{align}
    x_m = x + l \sin\theta, \quad y_m = l \cos\theta.
\end{align}
$$

En prenant les dérivées temporelles, nous obtenons :

$$
\begin{align}
    \dot{x}_m = \dot{x} + l\dot{\theta}\cos\theta, \quad \dot{y}_m = -l\dot{\theta}\sin\theta.
\end{align}
$$

Ainsi, l'énergie cinétique du pendule est :

$$
\begin{align}
    K_m &= \frac{1}{2} m \left(\dot{x}_m^2 + \dot{y}_m^2\right) \notag \\
        &= \frac{1}{2} m \Bigl[\bigl(\dot{x} + l\dot{\theta}\cos\theta\bigr)^2 + \bigl(-l\dot{\theta}\sin\theta\bigr)^2\Bigr] \notag \\
        &= \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\left(\cos^2\theta + \sin^2\theta\right)\right] \notag \\
        &= \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right]. \label{K_m}
\end{align}
$$

En combinant \eqref{K_cart} et \eqref{K_m}, l'énergie cinétique totale est :

$$
\begin{align}
    K   &= K_\text{cart} + K_m \notag \\
        &= \frac{1}{2} m_\text{cart} \dot{x}^2 + \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right].
\end{align}
$$

## 2. Énergie Potentielle

Pour ce système, seul le pendule contribue à l'énergie potentielle gravitationnelle. En prenant la direction verticale vers le haut comme positive, l'énergie potentielle du pendule est :

$$
\begin{align}
    P_m = mgy_m = mgl\cos\theta.
\end{align}
$$

*Note :* Le choix du niveau de référence pour l'énergie potentielle est arbitraire, et la dynamique reste inchangée par une constante additive.

## 3. La Fonction Lagrangienne

Le Lagrangien est défini comme la différence entre les énergies cinétique et potentielle :

$$
\begin{align}
    \mathcal{L} &= K - P \notag \\
    &= \frac{1}{2} m_\text{cart} \dot{x}^2 + \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right] - mgl\cos\theta.
\end{align}
$$

Nous choisissons les coordonnées généralisées :

$$
\begin{align}
    \mathbf{q} = \begin{bmatrix} x \\ \theta \end{bmatrix}.
\end{align}
$$

## 4. Dérivation des Équations du Mouvement

En utilisant l'équation d'Euler-Lagrange pour chaque coordonnée $$q_i$$ :

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{q}_i}\right) - \frac{\partial \mathcal{L}}{\partial q_i} = Q_i,
\end{align}
$$

où $$Q_i$$ représente les forces généralisées. Ici, une force externe $$F$$ est appliquée au chariot (affectant $$x$$), tandis qu'il n'y a pas de couple externe sur $$\theta$$.

### 4.1. Équation pour $$x$$

Tout d'abord, calculons la dérivée par rapport à $$\dot{x}$$ :

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \dot{x}} = (m_\text{cart}+m)\dot{x} + ml\dot{\theta}\cos\theta.
\end{align}
$$

La dérivée temporelle donne :

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{x}}\right) &= (m_\text{cart}+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta.
\end{align}
$$

Comme $$\mathcal{L}$$ ne dépend pas explicitement de $$x$$ :

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial x} = 0.
\end{align}
$$

Ainsi, l'équation d'Euler-Lagrange pour $$x$$ devient :

$$
\begin{align}
    (m_\text{cart}+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta = F. \label{final_eq_1}
\end{align}
$$

### 4.2. Équation pour $$\theta$$

Ensuite, calculons la dérivée par rapport à $$\dot{\theta}$$ :

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \dot{\theta}} = ml\dot{x}\cos\theta + ml^2\dot{\theta}.
\end{align}
$$

Sa dérivée temporelle est :

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{\theta}}\right) = ml\left(\ddot{x}\cos\theta - \dot{x}\dot{\theta}\sin\theta\right) + ml^2\ddot{\theta}.
\end{align}
$$

La dérivée partielle par rapport à $$\theta$$ est :

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \theta} = -ml\dot{x}\dot{\theta}\sin\theta + mgl\sin\theta.
\end{align}
$$

Ainsi, l'équation d'Euler-Lagrange pour $$\theta$$ (sans couple externe) est :

$$
\begin{align}
    ml\left(\ddot{x}\cos\theta - \dot{x}\dot{\theta}\sin\theta\right) + ml^2\ddot{\theta} + ml\dot{x}\dot{\theta}\sin\theta - mgl\sin\theta = 0.
\end{align}
$$

Remarquez que les termes $$ - ml\dot{x}\dot{\theta}\sin\theta $$ et $$ + ml\dot{x}\dot{\theta}\sin\theta $$ s'annulent, permettant de simplifier l'équation ci-dessus en :

$$
\begin{align}
ml\ddot{x}\cos\theta + ml^2\ddot{\theta} - mgl\sin\theta = 0. \label{final_eq_2}
\end{align}
$$

## 5. Modèle Dynamique Final

En rassemblant les résultats, le modèle dynamique du pendule inversé sur un chariot est donné par :

$$
\begin{align}
(m_\text{cart}+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta &= F, \quad \text{(de \eqref{final_eq_1})}\\
ml\ddot{x}\cos\theta + ml^2\ddot{\theta} - mgl\sin\theta &= 0. \quad \text{(de \eqref{final_eq_2})}
\end{align}
$$

Ces équations décrivent la dynamique couplée du chariot et du pendule. Elles constituent la base d'analyses ultérieures et de la conception de commandes pour stabiliser le pendule inversé.
