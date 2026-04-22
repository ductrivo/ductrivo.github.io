---
layout: post-sidebar
title:  "Mô hình hóa và điều khiển con lắc ngược"
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
lang: vi
permalink: /vi/mo-hinh-hoa-va-dieu-khien-con-lac-nguoc/
---

{% include figure.html
    src=site.data.images.inv_pendulum_free_body.src
    alt=site.data.images.inv_pendulum_free_body.alt
    caption=site.data.images.inv_pendulum_free_body.caption
%}

Trong bài viết này, chúng ta sẽ xây dựng các phương trình chuyển động cho một con lắc ngược gắn trên một xe đẩy bằng cách sử dụng phương pháp Lagrange. Hệ thống bao gồm một xe đẩy có khối lượng $$m_\text{cart}$$ có thể di chuyển theo phương ngang và một con lắc có khối lượng $$m$$ được gắn bằng một thanh cứng có chiều dài $$l$$. Góc của con lắc $$\theta$$ được đo từ phương thẳng đứng.

## 1. Động năng

Tổng động năng là tổng động năng của xe đẩy và động năng của con lắc.

### 1.1. Động năng của xe đẩy

Động năng của xe đẩy được cho bởi:

$$\begin{align}
    K_\text{cart} = \frac{1}{2} m_\text{cart} \dot{x}^2, \label{K_cart}
\end{align}$$

trong đó $$x$$ là vị trí nằm ngang của xe đẩy.

### 1.2. Động năng của con lắc

Vị trí của khối lượng con lắc $$m$$ có thể được biểu diễn như sau:

$$
\begin{align}
    x_m = x + l \sin\theta, \quad y_m = l \cos\theta.
\end{align}
$$

Lấy đạo hàm theo thời gian, ta được:

$$
\begin{align}
    \dot{x}_m = \dot{x} + l\dot{\theta}\cos\theta, \quad \dot{y}_m = -l\dot{\theta}\sin\theta.
\end{align}
$$

Do đó, động năng của con lắc là:

$$
\begin{align}
    K_m &= \frac{1}{2} m \left(\dot{x}_m^2 + \dot{y}_m^2\right) \not n \\
        &= \frac{1}{2} m \Bigl[\bigl(\dot{x} + l\dot{\theta}\cos\theta\bigr)^2 + \bigl(-l\dot{\theta}\sin\theta\bigr)^2\Bigr] \not n \\
        &= \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\left(\cos^2\theta + \sin^2\theta\right)\right] \not n \\
        &= \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right]. \label{K_m}
\end{align}
$$

Kết hợp \eqref{K_cart} và \eqref{K_m}, tổng động năng là:

$$
\begin{align}
    K   &= K_\text{cart} + K_m \not n \\
        &= \frac{1}{2} m_\text{cart} \dot{x}^2 + \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right].
\end{align}
$$

## 2. Thế năng

Đối với hệ thống này, chỉ có con lắc đóng góp vào thế năng trọng trường. Chọn hướng thẳng đứng lên trên là dương, thế năng của con lắc là:

$$
\begin{align}
    P_m = mgy_m = mgl\cos\theta.
\end{align}
$$

*Lưu ý:* Việc chọn mức tham chiếu cho thế năng là tùy ý, và động lực học không bị ảnh hưởng bởi một hằng số cộng thêm.

## 3. Hàm Lagrangian

Hàm Lagrangian được định nghĩa là hiệu số giữa động năng và thế năng:

$$
\begin{align}
    \mathcal{L} &= K - P \not n \\
    &= \frac{1}{2} m_\text{cart} \dot{x}^2 + \frac{1}{2} m \left[\dot{x}^2 + 2l\dot{x}\dot{\theta}\cos\theta + l^2\dot{\theta}^2\right] - mgl\cos\theta.
\end{align}
$$

Chúng ta chọn các tọa độ tổng quát:

$$
\begin{align}
    \mathbf{q} = \begin{bmatrix} x \\ \theta \end{bmatrix}.
\end{align}
$$

## 4. Xây dựng các phương trình chuyển động

Sử dụng phương trình Euler–Lagrange cho mỗi tọa độ $$q_i$$:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{q}_i}\right) - \frac{\partial \mathcal{L}}{\partial q_i} = Q_i,
\end{align}
$$

trong đó $$Q_i$$ đại diện cho các lực tổng quát. Ở đây, một ngoại lực $$F$$ được tác động vào xe đẩy (ảnh hưởng đến $$x$$), trong khi không có mô-men xoắn bên ngoài tác động lên $$\theta$$.

### 4.1. Phương trình cho $$x$$

Đầu tiên, tính đạo hàm riêng theo $$\dot{x}$$:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \dot{x}} = (m_\text{cart}+m)\dot{x} + ml\dot{\theta}\cos\theta.
\end{align}
$$

Lấy đạo hàm theo thời gian:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{x}}\right) &= (m_\text{cart}+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta.
\end{align}
$$

Vì $$\mathcal{L}$$ không phụ thuộc trực tiếp vào $$x$$:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial x} = 0.
\end{align}
$$

Do đó, phương trình Euler–Lagrange cho $$x$$ trở thành:

$$
\begin{align}
    (m_\text{cart}+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta = F. \label{final_eq_1}
\end{align}
$$

### 4.2. Phương trình cho $$\theta$$

Tiếp theo, tính đạo hàm riêng theo $$\dot{\theta}$$:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \dot{\theta}} = ml\dot{x}\cos\theta + ml^2\dot{\theta}.
\end{align}
$$

Lấy đạo hàm theo thời gian:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{\theta}}\right) = ml\left(\ddot{x}\cos\theta - \dot{x}\dot{\theta}\sin\theta\right) + ml^2\ddot{\theta}.
\end{align}
$$

Đạo hàm riêng theo $$\theta$$ là:

$$
\begin{align}
    \frac{\partial \mathcal{L}}{\partial \theta} = -ml\dot{x}\dot{\theta}\sin\theta + mgl\sin\theta.
\end{align}
$$

Do đó, phương trình Euler–Lagrange cho $$\theta$$ (không có mô-men xoắn bên ngoài) là:

$$
\begin{align}
    ml\left(\ddot{x}\cos\theta - \dot{x}\dot{\theta}\sin\theta\right) + ml^2\ddot{\theta} + ml\dot{x}\dot{\theta}\sin\theta - mgl\sin\theta = 0.
\end{align}
$$

Lưu ý rằng các số hạng $$ - ml\dot{x}\dot{\theta}\sin\theta $$ và $$ + ml\dot{x}\dot{\theta}\sin\theta $$ triệt tiêu lẫn nhau, cho phép đơn giản hóa phương trình trên thành:

$$
\begin{align}
ml\ddot{x}\cos\theta + ml^2\ddot{\theta} - mgl\sin\theta = 0. \label{final_eq_2}
\end{align}
$$

## 5. Mô hình động lực học cuối cùng

Tập hợp các kết quả, mô hình động lực học của con lắc ngược trên xe đẩy được cho bởi:

$$
\begin{align}
(m_\text{cart}+m)\ddot{x} + ml\ddot{\theta}\cos\theta - ml\dot{\theta}^2\sin\theta &= F, \quad \text{(từ \eqref{final_eq_1})}\\
ml\ddot{x}\cos\theta + ml^2\ddot{\theta} - mgl\sin\theta &= 0. \quad \text{(từ \eqref{final_eq_2})}
\end{align}
$$

Các phương trình này mô tả động lực học kết hợp của xe đẩy và con lắc. Chúng tạo thành cơ sở cho việc phân tích sâu hơn và thiết kế điều khiển để ổn định con lắc ngược.
