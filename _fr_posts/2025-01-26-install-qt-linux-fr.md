---
layout: post-sidebar
title:  "Installer Qt sur Linux"
author: ductri
categories: [Programming]
tags: [featured, python]
image: /assets/images/python-clean-code-style-guides-formatters-linters.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: False
side_toc: True
lang: fr
permalink: /fr/install-qt-linux/
---

## 1. Sous-système Windows pour Linux (WSL)

## 2. Installer les Prérequis

- Pour les distributions basées sur Debian (par exemple, Ubuntu, Debian, Mint) :
  - Mettre à jour le gestionnaire de paquets :

  ```bash
  sudo apt-get update && sudo apt-get upgrade
  ```

  - Installer les outils et bibliothèques requis :

  ```bash
  sudo apt-get -y install build-essential openssl libssl-dev libssl1.0 libgl1-mesa-dev libqt5x11extras5 '^libxcb.*-dev' libx11-xcb-dev libglu1-mesa-dev libxrender-dev libxi-dev libxkbcommon-dev libxkbcommon-x11-dev
  ```

- Pour les autres variantes de Linux, assurez-vous de l'installation de make, g++ et gdb. Sur les systèmes Fedora/Red Hat, vous pouvez utiliser le gestionnaire de paquets yum.

## 2. Télécharger et Lancer l'Installateur Qt

- Obtenez le dernier installateur Qt sur le site officiel de téléchargement de Qt. Le site devrait automatiquement fournir l'installateur approprié pour votre système Linux.
- Naviguez vers le répertoire où se trouve l'installateur.
- Rendez l'installateur exécutable :

```bash
chmod +x qt-unified-linux-x64-*.run
```

- Exécutez l'installateur :

```bash
./qt-unified-linux-x64-*.run
```
