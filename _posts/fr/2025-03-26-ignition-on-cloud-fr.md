---
layout: post-sidebar
title:  "Installer Ignition sur un VPS"
author: ductri
categories: [SCADA]
tags: [ignition]
image: "https://i.imgur.com/BniJjuq.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
  Dans cet article, nous allons passer en revue les étapes pour installer **Ignition 8.1** sur un **VPS hébergé chez OVH**. Le processus comprend :
description: Dans cet article, nous allons passer en revue les étapes pour installer Ignition 8.1 sur un VPS hébergé chez OVH.
lang: fr
permalink: /fr/install-ignition-vps/
---

{% include figure.html
    src=site.data.images.ignition_81_logo.src
    alt=site.data.images.ignition_81_logo.alt
    caption=site.data.images.ignition_81_logo.caption
%}

<!-- 1. Génération d'une clé SSH
2. Création d'une instance VPS
3. Connexion via SSH
4. Téléchargement de l'installateur
5. Exécution de l'installateur -->

---

## Créer une Clé SSH

Sur votre machine locale (Linux/macOS/WSL), ouvrez un terminal et lancez :

```bash
ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
```

Appuyez sur `Entrée` pour accepter l'emplacement par défaut. Une paire de clés publique/privée sera générée dans `~/.ssh/id_rsa` et `~/.ssh/id_rsa.pub`.

## Créer un VPS sur OVH

- Allez sur OVHcloud
- Choisissez une offre VPS (Ubuntu Server 22.04 LTS recommandé)
- Lorsque demandé, collez votre clé SSH publique (`~/.ssh/id_rsa.pub`)
- Déployez votre instance et attendez quelques minutes.

## Se Connecter à votre VPS via SSH

Utilisez l'IP fournie par OVH :

```bash
ssh root@<VOTRE_IP_VPS>
```

## Télécharger et Transférer l'Installateur Ignition

- Téléchargez l'installateur (sur votre machine locale) : Allez sur les téléchargements d'Inductive Automation et téléchargez l'installateur Linux (.run) pour la version 8.1.

- Transférer vers le VPS depuis votre machine locale :

```bash
scp ~/Downloads/ignition-8.1.x-linux-x64-installer.run root@<VOTRE_IP_VPS>:/root/
```

## Lancer l'Installateur Ignition

- Connectez-vous au VPS via SSH si ce n'est pas déjà fait :

```bash
ssh root@<VOTRE_IP_VPS>
```

- Rendez l'installateur exécutable :

```bash
chmod +x ignition-8.1.x-linux-x64-installer.run
```

- Lancez l'installateur :

```bash
./ignition-8.1.x-linux-x64-installer.run
```

- Suivez l'installation interactive. Une fois installé, Ignition devrait fonctionner sur le port 8088 :

```bash
http://<VOTRE_IP_VPS>:8088
```
