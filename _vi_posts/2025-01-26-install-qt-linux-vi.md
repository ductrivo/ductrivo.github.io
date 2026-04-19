---
layout: post-sidebar
title:  "Cài đặt Qt trên Linux"
author: ductri
categories: [Programming]
tags: [featured, python]
image: /assets/images/python-clean-code-style-guides-formatters-linters.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: False
side_toc: True
lang: vi
permalink: /vi/cai-dat-qt-tren-linux/
---

## 1. Windows Subsystem for Linux (WSL)

## 2. Cài đặt các thành phần tiên quyết

- Đối với các phân phối dựa trên Debian (ví dụ: Ubuntu, Debian, Mint):
  - Cập nhật trình quản lý gói:

  ```bash
  sudo apt-get update && sudo apt-get upgrade
  ```

  - Cài đặt các công cụ và thư viện cần thiết:

  ```bash
  sudo apt-get -y install build-essential openssl libssl-dev libssl1.0 libgl1-mesa-dev libqt5x11extras5 '^libxcb.*-dev' libx11-xcb-dev libglu1-mesa-dev libxrender-dev libxi-dev libxkbcommon-dev libxkbcommon-x11-dev
  ```

- Đối với các biến thể Linux khác, đảm bảo cài đặt make, g++ và gdb. Trên các hệ thống Fedora/Red Hat, bạn có thể sử dụng trình quản lý gói yum.

## 2. Tải xuống và chạy trình cài đặt Qt

- Lấy trình cài đặt Qt mới nhất từ trang tải xuống chính thức của Qt. Trang web sẽ tự động cung cấp trình cài đặt phù hợp cho hệ thống Linux của bạn.
- Di chuyển đến thư mục chứa trình cài đặt.
- Cấp quyền thực thi cho trình cài đặt:

```bash
chmod +x qt-unified-linux-x64-*.run
```

- Chạy trình cài đặt:

```bash
./qt-unified-linux-x64-*.run
```
