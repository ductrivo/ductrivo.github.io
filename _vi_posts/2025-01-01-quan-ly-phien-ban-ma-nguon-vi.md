---
layout: post-sidebar
title:  "Quản lý phiên bản mã nguồn (Code Versioning)"
author: ductri
categories: [Programming]
tags: [featured, python]
image: /assets/images/code-versioning.webp
# description: "Dành cho các nhà khoa học dữ liệu, nhà phân tích và lập trình viên mới bắt đầu: chuyển từ 'người viết mã' sang 'kỹ sư phần mềm' và học cách phát hành mã nguồn."
toc: true
side_toc: true
ref: code-versioning
lang: vi
permalink: /vi/quan-ly-phien-ban-ma-nguon/
---

## Định danh phiên bản ngữ nghĩa (Semantic Versioning)
[**Tóm tắt:**](https://semver.org/) Với số phiên bản theo định dạng `Major.Minor.Patch`, hãy tăng số:
- `Major` (Phiên bản chính) khi bạn có những thay đổi API không tương thích với phiên bản cũ.
- `Minor` (Phiên bản phụ) khi bạn thêm chức năng mới nhưng vẫn tương thích ngược.
- `Patch` (Phiên bản sửa lỗi) khi bạn thực hiện các bản vá lỗi tương thích ngược.
Các nhãn bổ sung cho bản phát hành trước (pre-release) và siêu dữ liệu bản dựng (build metadata) có sẵn dưới dạng phần mở rộng của định dạng `Major.Minor.Patch`.

Ví dụ:
```python
# 1.0.0
def add_numbers(a, b, c):
    return a + b + c
    
# 1.0.1
def add_number(a, b, c):
    # Nhanh hơn và an toàn hơn :)
    ...
    
# 2.0.0
def add_numbers(a, b, c, d):
    return a + b + c + d
    
# Nhưng phiên bản có thể là 1.1.0 nếu các thay đổi không gây lỗi tương thích
def add_numbers(a, b, c, d = 0):
		return a + b + c + d

# pip install cool_library
add_numbers(1, 2, 3, 0)
```
