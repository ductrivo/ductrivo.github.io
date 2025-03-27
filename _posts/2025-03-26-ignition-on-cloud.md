---
layout: post-sidebar
title:  "Install Ignition on VPS"
author: ductri
categories: [SCADA]
tags: [featured, sticky]
image: "https://i.imgur.com/BniJjuq.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
intro: >
  In this post, we’ll go through the steps to install **Ignition 8.1** on a **VPS hosted on OVH**. The process includes:
description: In this post, we’ll go through the steps to install Ignition 8.1 on a VPS hosted on OVH.
---

{% include figure.html
    src=site.data.images.ignition_81_logo.src
    alt=site.data.images.ignition_81_logo.alt
    caption=site.data.images.ignition_81_logo.caption
%}

<!-- 1. Generating an SSH key
2. Creating a VPS instance
3. Connecting via SSH
4. Uploading the installer
5. Running the installer -->

---

## Create an SSH Key

On your local machine (Linux/macOS/WSL), open a terminal and run:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Press `Enter` to accept the default location. A public/private key pair will be generated at `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub`.

## Create a VPS on OVH

- Go to OVHcloud
- Choose a VPS plan (Ubuntu Server 22.04 LTS recommended)
- When prompted, paste your public SSH key (`~/.ssh/id_rsa.pub`)
- Deploy your instance and wait a few minutes.

## Connect to Your VPS via SSH

Use the IP provided by OVH:

```bash
ssh root@<YOUR_VPS_IP>
```

## Download & Upload Ignition Installer

- Download Installer (on your local machine): Go to Inductive Automation Downloads and download the Linux installer (.run) for version 8.1.

- Upload to VPS From your local machine:

```bash
scp ~/Downloads/ignition-8.1.x-linux-x64-installer.run root@<YOUR_VPS_IP>:/root/
```

## Run the Ignition Installer

- SSH into the VPS if not already connected:

```bash
ssh root@<YOUR_VPS_IP>
```

- Make the installer executable:

```bash
chmod +x ignition-8.1.x-linux-x64-installer.run
```

- Run the installer:

```bash
./ignition-8.1.x-linux-x64-installer.run
```

- Follow the interactive setup. Once installed, Ignition should be running on port 8088:

```bash
http://<YOUR_VPS_IP>:8088
```
