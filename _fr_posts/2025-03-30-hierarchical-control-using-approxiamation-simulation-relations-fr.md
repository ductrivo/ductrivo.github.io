---
layout: post-sidebar
title:  "Contrôle Hiérarchique utilisant des Relations de Simulation Approchées"
author: ductri
categories: [Control System]
tags: [featured]
image: "https://i.imgur.com/NEcje0J.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
    Curieux de savoir comment des systèmes complexes peuvent être contrôlés avec des modèles plus simples ? Dans cet article, je vais vous présenter une approche intéressante appelée contrôle hiérarchique utilisant des relations de simulation approchées. Vous trouverez un résumé clair et facile à suivre de l'article de Girard de 2006, ainsi que des aperçus sur le fonctionnement de la méthode, son évolution dans les recherches récentes et ses applications actuelles -- du contrôle de mouvement des robots aux systèmes multi-agents. De plus, j'ai inclus mon propre code d'implémentation pour que vous puissiez l'essayer par vous-même !

description: Curieux de savoir comment des systèmes complexes peuvent être contrôlés avec des modèles plus simples ? Dans cet article, je décortique une approche élégante appelée contrôle hiérarchique utilisant des relations de simulation approchées.
lang: fr
permalink: /fr/hierarchical-control-approximate-simulation/
---

## Résumé de l'Article

L'article {% cite Girard2006 %} introduit un cadre de contrôle hiérarchique pour les systèmes complexes en les approximant avec des modèles plus simples, facilitant ainsi la conception du contrôleur. Au cœur de cette approche se trouvent les concepts de *relations de simulation approchées*, qui définissent à quel point les sorties $$\mathbf{y}$$ et $$\mathbf{y}'$$ du système concret $$\Sigma$$ et du système abstrait $$\Sigma'$$ sont alignées. Ces relations sont construites à l'aide de *fonctions de simulation*, qui sont des fonctions positives bornant les différences entre les sorties des deux systèmes et garantissant que ces bornes sont non-croissantes pendant leur évolution parallèle.

L'architecture du cadre se compose de deux couches principales : le *système concret* $$\Sigma$$, qui représente le modèle détaillé et complexe de l'installation, et le *système abstrait* $$\Sigma'$$[^1], un modèle simplifié caractérisé à l'aide de relations de simulation approchées pour simplifier la conception de la commande au niveau du *Contrôleur du Système Abstrait*. Ces couches sont reliées par une *interface de contrôle*, qui synthétise les entrées de commande pour le système concret.

{% include figure.html
    src=site.data.images.herarchical_control_girard.src
    alt=site.data.images.herarchical_control_girard.alt
    caption=site.data.images.herarchical_control_girard.caption
%}

Considérons un problème de commande pour le système concret avec des propriétés spécifiques d'invariance et d'accessibilité. La section III prouve que l'architecture de contrôle proposée garantit que la sortie $$\mathbf{y}$$ de $$\Sigma$$ satisfait ces propriétés souhaitées, à condition que les conditions suivantes soient remplies :

- $$\Sigma'$$ est un *sous-système approché complet* de $$\Sigma$$ *avec une précision* $$\delta$$, ce qui signifie que pour chaque état initial $$\mathbf{x}_0$$ de $$\Sigma$$, il existe un état initial correspondant $$\mathbf{z}_0$$ de $$\Sigma'$$ tel que, en partant de ces conditions initiales, les sorties sont bornées, c'est-à-dire $$\|\mathbf{h}(\mathbf{x}) - \mathbf{k}(\mathbf{z})\| \leq \delta$$ pour tout $$t \geq 0$$;[^3]
- $$\Sigma'$$ satisfait les propriétés d'invariance et d'accessibilité dans une marge de sécurité de $$\delta$$.

Cette approche est démontrée par une application au contrôle de mouvement d'un robot. Les auteurs ont utilisé un modèle cinématique de premier ordre du robot comme $$\Sigma'$$ pour approximer le modèle dynamique de second ordre du robot, traité comme $$\Sigma$$. En utilisant la fonction de simulation proposée dans la Proposition 4.1, les conditions et la précision pour lesquelles $$\Sigma'$$ devient un sous-système approché complet de $$\Sigma$$ sont calculées en fonction des bornes sur $$\|\mathbf{u}\|$$ et $$\|\mathbf{v}\|$$, comme détaillé dans le Théorème 4.3. Enfin, l'application de cette architecture aux robots autonomes est explorée dans la dernière partie de l'article, illustrant sa praticité et son efficacité.[^4]

## Revues sur le Contrôle Hiérarchique basé sur les Relations de Simulation Approchées

Dans {% cite Kurtz2020 %}, l'architecture illustrée à la Fig. 1 a été étendue pour tenir compte des perturbations dans le système concret en introduisant la *Fonction de Simulation Robuste* et la *Relation de Simulation Approchée Robuste*. Par la suite, dans {% cite Wooding2023 %}, une fonction d'interface pour les perturbations a été intégrée dans la même architecture, permettant au système abstrait de gérer des perturbations significatives dans le système concret. S'appuyant sur cela, {% cite Firouzmand2024 %} a incorporé un observateur pour estimer l'état du système concret, permettant des *Relations de Simulation Approchées Robustes Étendues* pour les systèmes linéaires.

L'étude des systèmes de contrôle hiérarchique a également évolué dans d'autres directions. Dans {% cite Yang2017 %}, des fonctions de simulation vectorielles ont été utilisées pour analyser des systèmes de contrôle hiérarchique à grande échelle. Parallèlement, {% cite Tang2012 %} a exploré le contrôle hiérarchique pour une classe de systèmes non-linéaires utilisant des relations de simulation approchées. Ce travail a été étendu aux systèmes multi-agents distribués dans {% cite Tang2018 %} et appliqué ultérieurement à l'équilibre de Nash des systèmes multi-agents distribués dans {% cite Tang2023 %}.

## Commentaires

L'architecture de contrôle hiérarchique basée sur des relations de simulation approchées offre une perspective passionnante, principalement parce que ma formation est en contrôle de processus, où le contrôle hiérarchique est typiquement considéré comme une structure multicouche opérant à différentes échelles de temps (voir {% cite SCATTOLINI2009723 %}). Dans ce contexte, chaque couche se concentre généralement sur le contrôle d'un sous-système plutôt que sur le contrôle et l'abstraction du système concret comme présenté dans {% cite Girard2006 %}.

## Références

{% bibliography --cited %}

## Notes de bas de page

[^1]: La méthode pour caractériser le système abstrait $$\Sigma'$$ dans le contexte des systèmes linéaires $$\Sigma$$ est détaillée dans un article ultérieur de l'auteur {% cite Girard2009 %}.
[^2]: J'ai ajouté le *Contrôleur du Système Abstrait* pour clarifier le mécanisme de commande : nous devons également concevoir le contrôleur pour le système abstrait.
[^3]: La précision $$\delta$$ peut être calculée à partir de la fonction de simulation en utilisant l'équation (6) dans {% cite Girard2006 %}.
[^4]: J'ai essayé de reproduire les résultats de simulation, qui sont disponibles à ce lien : [Google Colab](https://colab.research.google.com/drive/16XZ5cDuYZwOKxt4M3upsC4mEnaYfyiv6?usp=sharing)
