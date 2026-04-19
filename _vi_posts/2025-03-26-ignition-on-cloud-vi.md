---
layout: post-sidebar
title:  "Cài đặt Ignition trên VPS"
author: ductri
categories: [SCADA]
tags: [ignition]
image: "https://i.imgur.com/BniJjuq.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
lang: vi
permalink: /vi/cai-dat-ignition-tren-vps/
intro: >
  Trong bài viết này, chúng ta sẽ thực hiện các bước để cài đặt **Ignition 8.1** trên một **VPS được lưu trữ trên OVH**. Quá trình bao gồm:
description: Trong bài viết này, chúng ta sẽ thực hiện các bước để cài đặt Ignition 8.1 trên một VPS được lưu trữ trên OVH.
---

{% include figure.html
    src=site.data.images.ignition_81_logo.src
    alt=site.data.images.ignition_81_logo.alt
    caption=site.data.images.ignition_81_logo.caption
%}

<!-- 1. Tạo khóa SSH
2. Tạo phiên bản VPS
3. Kết nối qua SSH
4. Tải lên trình cài đặt
5. Chạy trình cài đặt -->

---

## Tạo khóa SSH

Trên máy cục bộ của bạn (Linux/macOS/WSL), mở terminal và chạy:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Nhấn `Enter` để chấp nhận vị trí mặc định. Một cặp khóa công khai/riêng tư sẽ được tạo tại `~/.ssh/id_rsa` và `~/.ssh/id_rsa.pub`.

## Tạo VPS trên OVH

- Truy cập OVHcloud
- Chọn gói VPS (khuyên dùng Ubuntu Server 22.04 LTS)
- Khi được yêu cầu, hãy dán khóa SSH công khai của bạn (`~/.ssh/id_rsa.pub`)
- Triển khai phiên bản của bạn và đợi vài phút.

## Kết nối với VPS của bạn qua SSH

Sử dụng IP được cung cấp bởi OVH:

```bash
ssh root@<YOUR_VPS_IP>
```

## Tải xuống & Tải lên trình cài đặt Ignition

- Tải xuống trình cài đặt (trên máy cục bộ của bạn): Truy cập Inductive Automation Downloads và tải xuống trình cài đặt Linux (.run) cho phiên bản 8.1.

- Tải lên VPS từ máy cục bộ của bạn:

```bash
scp ~/Downloads/ignition-8.1.x-linux-x64-installer.run root@<YOUR_VPS_IP>:/root/
```

## Chạy trình cài đặt Ignition

- SSH vào VPS nếu chưa kết nối:

```bash
ssh root@<YOUR_VPS_IP>
```

- Cấp quyền thực thi cho trình cài đặt:

```bash
chmod +x ignition-8.1.x-linux-x64-installer.run
```

- Chạy trình cài đặt:

```bash
./ignition-8.1.x-linux-x64-installer.run
```

- Làm theo thiết lập tương tác. Sau khi cài đặt, Ignition sẽ chạy trên cổng 8088:

```bash
http://<YOUR_VPS_IP>:8088
```
