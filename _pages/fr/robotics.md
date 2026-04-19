---
title: "Tutoriel sur la modélisation, le contrôle et la conception en robotique"
layout: post-sidebar
permalink: "/fr/robotics.html"
image: "/assets/images/screenshot.jpg"
comments: true
toc: false
side_toc: True
lang: fr
---
Cette série de tutoriels a commencé avec une idée : [`EXPREDCO`](https://github.com/ductrivo/nextpredco), un cadre de contrôle et d'optimisation flexible. À partir de là, je l'ai spécialisé dans une classe d'application *Modélisation, Contrôle et Conception en Robotique*, en commençant par les *bras robotiques planaires*, puis les *robots mobiles*, et enfin en étendant les concepts aux systèmes de *robots industriels*.

Le thème central est simple :

> Le contrôle consiste à libérer tout le potentiel d'un système. Et pour contrôler efficacement, nous devons d'abord bien comprendre ce système.

C'est pourquoi chaque module de cette feuille de route se termine par une séance pratique : *de la conception mécanique et électrique à la programmation et à la mise en œuvre*. Par exemple, un projet final consistera à construire et à contrôler un robot mobile avec un bras robotique intégré.

J'espère que ce tutoriel sera utile à tous ceux qui souhaitent renforcer leurs compétences théoriques et pratiques en robotique et en systèmes de contrôle.

**Note rapide :** Si vous rencontrez des vibrations ou une faible précision, envisagez d'examiner le *contrôle dynamique* du système, en particulier, vérifiez *les caractéristiques de couple et de vitesse des moteurs*.

💻 Le code utilisé dans ce tutoriel est actuellement disponible ici :

👉 [https://github.com/ductrivo/robot-analysis-demo](https://github.com/ductrivo/robot-analysis-demo)

## CHAPITRE 1 : BRAS ROBOTIQUES PLANAIRES

Ce chapitre se concentre sur la **modélisation, le contrôle et la simulation de bras robotiques à chaîne ouverte planaires** composés de plusieurs articulations rotoïdes (systèmes N-DOF). L'objectif est d'analyser à la fois la **cinématique** et la **dynamique** de ces systèmes sous diverses stratégies de contrôle, du PID de base à la commande prédictive (MPC).

Actuellement, ce projet prend en charge l'analyse de **bras robotiques planaires 2D** où la **masse de chaque segment est supposée concentrée aux articulations**. Cette simplification permet une étude efficace et instructive du comportement du robot tant en simulation qu'en implémentations matérielles.

<div align="center">
  <img src="https://i.imgur.com/QlCwtKa.png" alt="Un robot à chaîne ouverte planaire 3R." width="70%">
  <p><strong>Figure : Un robot à chaîne ouverte planaire 3R.</strong></p>
</div>

- **Langages :** `Python` et `Rust` pour la plupart des simulations et du contrôle ; `C++` pour les systèmes embarqués et `ROS2`.
- **Matériel :** `Arduino`, `STM32`, `ESP32`, encodeurs, moteurs, segments planaires 2D.
- **Projet Final :** Conception et fabrication d'un bras robotique 3R actionné par des moteurs pas à pas et fabriqué via impression 3D.

### Module 1 : Modélisation et Contrôle Cinématique

1. [Cinématique utilisant la méthode trigonométrique](/fr/kinematics-of-planar-robots-with-revolute-joints/)
2. Génération de trajectoire / Planification de mouvement
   - Interpolation dans l'espace cartésien/articulaire
   - Trajectoires point à point
   - Trajectoires polynomiales (B-spline, courbe de Bézier)
   - Évitement d'obstacles
3. Contrôle cinématique
   - Contrôle PID avec anticipation (feedforward) et réglage
   - Commande prédictive (MPC)

---

### Module 2 : Modélisation et Contrôle Dynamique

1. [Modèle dynamique des robots planaires avec deux articulations rotoïdes](/fr/dynamics-of-planar-robots-with-revolute-joints/)
2. Influence du moteur sur le contrôle
   - Courbes couple-vitesse
3. Génération de trajectoire (basée sur la dynamique)
   - Méthode basée sur l'optimisation (prenant en compte la dynamique du robot)
4. Contrôle dynamique
   - Contrôle de vitesse : PID Feedforward, MPC
   - Contrôle par couple calculé : PID, Mode Glissant (Sliding Mode), MPC

---

### Module 3 : Précision et Robustesse du Robot

1. Identification du système / Étalonnage
2. Estimation en ligne de l'état et des paramètres
3. Compensation des tolérances mécaniques

---

### Module 4 : Expériences – Fondamentaux du contrôle moteur

1. Contrôle de moteur pas à pas
2. Identification et contrôle de moteur à courant continu (DC)
3. Enregistrement de données et communication

---

### Module 5 : Expériences – Conception de bras robotique (avec moteur pas à pas)

1. Description et spécifications des tâches
2. Conception mécanique
3. Conception électrique
4. Implémentation de la cinématique et du contrôle

---

## CHAPITRE 2 : ROBOTS MOBILES

### Module 1 : Cinématique et modèles de mouvement

1. Configurations de robots mobiles
   - Entraînement différentiel
   - Entraînement tricycle
   - Plateformes omnidirectionnelles
2. Cinématique directe et inverse
   - Estimation de la pose
   - Cinématique des vitesses
3. Contraintes cinématiques
   - Contraintes non-holonomes
   - Ensembles de mouvements réalisables

---

### Module 2 : Planification de chemin et génération de trajectoire

1. Planification de chemin globale
   - Algorithmes A*, Dijkstra, D* Lite
2. Planification de mouvement basée sur l'échantillonnage
   - RRT, RRT*, PRM
3. Génération de trajectoire
   - Interpolation polynomiale
   - Planification de mouvement tenant compte des obstacles
   - Profilage de vitesse/accélération

---

### Module 3 : Contrôle du mouvement et rétroaction

1. Contrôle classique
   - Contrôle PID
   - Amélioration par anticipation (feedforward)
2. Contrôleurs de suivi
   - Pure Pursuit
   - Contrôleur Stanley
3. Contrôle avancé
   - Commande prédictive (MPC)
   - Suivi de trajectoire
4. Navigation réactive
   - Algorithme Bug
   - Histogramme de champ de vecteurs (VFH)

---

### Module 4 : Localisation et SLAM

1. Estimation de l'état
   - Odométrie
   - Fusion de capteurs
2. Techniques de filtrage
   - Filtre de Kalman étendu
   - Filtre particulaire
3. Implémentation du SLAM
   - SLAM 2D : GMapping
   - SLAM visuel (optionnel)
4. Intégration ROS2
   - Pile de navigation (Navigation stack)
   - Serveur de cartes et nœuds de localisation

---

### Module 5 : Expériences – Prototypage de robots mobiles

1. Spécification et planification des tâches
2. Assemblage du matériel
   - Moteurs, capteurs, châssis, MCU
3. Programmation embarquée
   - Contrôle moteur ESP32 / STM32
   - Communication série
4. Intégration et tests ROS2
5. Évaluation et réglage en conditions réelles

---

## CHAPITRE 3 : ROBOTS GÉNÉRAUX

### Module 1 : Description unifiée du robot

1. Extraction des paramètres Denavit-Hartenberg
2. Modélisation URDF avec Xacro
3. Liaison des modèles CAD à l'URDF
4. Description du robot dans ROS2

---

### Module 2 : Cinématique et dynamique unifiées

1. Modélisation cinématique
   - Méthode DH
   - Produit d'exponentielles (théorie des vis)
2. Modélisation dynamique
   - Matrices de masse, de Coriolis et de gravité
   - Équations basées sur la théorie des vis

---

### Module 3 : Génération de trajectoire unifiée

1. Représentations de trajectoires
   - Points de passage (Waypoints)
   - Courbes B-spline, Bézier
2. Planification de trajectoire
   - Espace articulaire vs espace cartésien
3. Paramétrage temporel
   - Contraintes de vitesse et d'accélération

---

### Module 4 : Cadre de contrôle unifié

1. Architecture du contrôleur ROS2
   - Gestionnaire de contrôleurs (Controller Manager)
   - Éditeur d'état des articulations (Joint State Publisher)
2. Intégration MoveIt
   - Interface de planification de mouvement
   - Scène de planification et sécurité
3. Modes de contrôle hybrides
   - Contrôle de position et de vitesse
   - Intégration de la rétroaction
4. Considérations sur le contrôle en temps réel
   - Watchdogs (Chiens de garde)
   - Gestion des exceptions

---

### Module 5 : Visualisation et simulation

1. Visualisation en temps réel avec RViz
2. Simulation basée sur la physique avec Gazebo
3. Enregistrement de données et analyse ROS Bag
4. Interfaces GUI et de téléopération
