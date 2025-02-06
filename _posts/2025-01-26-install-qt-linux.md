---
layout: post-sidebar
title:  "Install Qt on Linux"
author: ductri
categories: [Programming]
tags: [featured, python]
image: assets/images/python-clean-code-style-guides-formatters-linters.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: False
side_toc: True
---

## 1. Windows Subsystem for Linux (WSL)

## 2. Install Prerequisites
- For Debian-based distributions (e.g., Ubuntu, Debian, Mint):
  - Update Package Manager:
  ```bash
  sudo apt-get update && sudo apt-get upgrade
  ```
  - Install Required Tools and Libraries:
  ```bash
  sudo apt-get -y install build-essential openssl libssl-dev libssl1.0 libgl1-mesa-dev libqt5x11extras5 '^libxcb.*-dev' libx11-xcb-dev libglu1-mesa-dev libxrender-dev libxi-dev libxkbcommon-dev libxkbcommon-x11-dev
  ```
- For other Linux variants, ensure the installation of make, g++, and gdb. On Fedora/Red Hat systems, you might use the yum package manager.

## 2. Download and Run the Qt Installer

- Obtain the latest Qt installer from the official Qt download site. The site should automatically provide the appropriate installer for your Linux system.
- Navigate to the directory where the installer is located.
- Make the installer executable:
```bash
chmod +x qt-unified-linux-x64-*.run
```
- Execute the installer:
```bash
./qt-unified-linux-x64-*.run
```

