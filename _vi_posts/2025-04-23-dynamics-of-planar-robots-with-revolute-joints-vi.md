---
layout: post-sidebar
title:  "Mô hình động lực học của Robot phẳng với hai khớp quay"
ref: dynamics-planar-robots
author: ductri
categories: [Robotics]
tags: [featured, sticky, robots, kinematics]
image: "https://i.imgur.com/CWIBlLM.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
lang: vi
permalink: /vi/dynamics-of-planar-robots-with-revolute-joints/
intro: >
    Trong bài viết này, chúng ta tập trung vào động lực học của một **cánh tay máy phẳng 2R**. Sử dụng **phương pháp Lagrange**, chúng ta xây dựng các phương trình chuyển động từng bước một, bắt đầu từ định nghĩa năng lượng cho đến dạng ma trận thu gọn được sử dụng rộng rãi trong robot.

description: Trong bài viết này, chúng ta tập trung vào động lực học của một cánh tay máy phẳng 2R. Sử dụng phương pháp Lagrange, chúng ta xây dựng các phương trình chuyển động từng bước một.
---

> Bài viết này là một phần của chuỗi hướng dẫn [Mô hình hóa, Điều khiển và Thiết kế Robot](/robotics.html).

## Giới thiệu về Động lực học

Trong khi **động học** mô tả robot di chuyển *như thế nào*, **động lực học** (dynamics) giải thích *tại sao* nó di chuyển theo cách đó. Nói cách khác:

- **Động học** tập trung vào vị trí, vận tốc và gia tốc.
- **Động lực học** bao gồm **khối lượng**, **mô-men quán tính**, và **lực/mô-men xoắn**, và mô tả cách chuyển động được tạo ra để đáp ứng với các đại lượng đó.

Động lực học là thiết yếu để mô phỏng hành vi vật lý, thiết kế luật điều khiển và phân tích tính ổn định.

## Dạng tổng quát của Động lực học Robot

Động lực học của robot được mô tả bởi một hệ các [Phương trình Vi phân Thường (ODEs)](https://en.wikipedia.org/wiki/Ordinary_differential_equation) phi tuyến như sau (giả sử không có lực tác động tại điểm tác động cuối):

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}} + \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} + \mathbf{g}(\boldsymbol{\chi}) = \boldsymbol{\tau}
\end{align}
$$

trong đó:

- $$ \boldsymbol{\chi} \in \mathbb{R}^n $$: Vector tọa độ tổng quát, thường là các góc khớp đối với khớp quay.
- $$ \dot{\boldsymbol{\chi}},\, \ddot{\boldsymbol{\chi}} \in \mathbb{R}^n $$: Đạo hàm bậc nhất và bậc hai của vị trí khớp, đại diện cho vận tốc và gia tốc khớp.
- $$ \boldsymbol{\tau} \in \mathbb{R}^n $$: Vector mô-men xoắn đầu vào được tác động tại các khớp bởi các bộ truyền động.
- $$ \mathbf{M}(\boldsymbol{\chi}) \in \mathbb{R}^{n \times n} $$: Ma trận quán tính, một ma trận đối xứng và xác định dương mã hóa khối lượng và hình học của robot.
- $$ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}} \in \mathbb{R}^n $$: Số hạng Coriolis và ly tâm, nắm bắt các hiệu ứng phi tuyến phụ thuộc vào vận tốc.
- $$ \mathbf{g}(\boldsymbol{\chi}) \in \mathbb{R}^n $$: Vector các lực tổng quát do trọng trường, thường được bỏ qua trong các trường hợp phẳng nơi trọng lực tác động vuông góc với mặt phẳng chuyển động.

---

## Mô hình động lực học của Robot phẳng 2R

### Phương pháp Lagrange

{% include figure.html
    src=site.data.images.planar_robot_2r_dynamics.src
    alt=site.data.images.planar_robot_2r_dynamics.alt
    caption=site.data.images.planar_robot_2r_dynamics.caption
%}

Để xây dựng các phương trình chuyển động, chúng ta áp dụng **phương pháp cơ học Lagrange**, xây dựng hàm Lagrangian:

$$
\begin{align}
\mathcal{L} = K - U
\end{align}
$$

trong đó:

- $$K$$ là tổng động năng của hệ thống
- $$U$$ là tổng thế năng do trọng trường

Các số hạng năng lượng được tính toán bằng cách xem xét:

- Động năng quay do quán tính các thanh nối $$I_1, I_2$$
- Động năng tịnh tiến từ khối lượng phân bố của các thanh nối $$m_1^L, m_2^L$$
- Các khối lượng tập trung đặt tại các khớp và tại điểm tác động cuối: $$m_1, m_2, m_E$$
- Thế năng trọng trường của tất cả các thành phần khối lượng

---

#### 1. Động năng

Gọi:

- $$ \dot{\chi}_1, \dot{\chi}_2 $$ là các vận tốc góc của khớp
- $$ \mathbf{v}_i $$ là vận tốc tuyến tính của tâm khối hoặc một khối lượng tập trung $$m_i$$

Khi đó tổng động năng được cho bởi:

$$
\begin{align}
K = \frac{1}{2} I_1 \dot{\chi}_1^2 + \frac{1}{2} I_2 (\dot{\chi}_1 + \dot{\chi}_2)^2
+ \sum_i \frac{1}{2} m_i \| \mathbf{v}_i \|^2.
\end{align}
$$

Ở đây, $$\mathbf{v}_i$$ được suy ra từ động học thuận. Chúng ta có vị trí phẳng của khớp thứ hai và điểm tác động cuối là:

$$
\begin{align}
x_2 &= l_1 \cos\chi_1,\\
y_2 &= l_1 \sin\chi_1, \\
x_E &= l_1 \cos\chi_1 + l_2 \cos(\chi_1 + \chi_2),\\
y_E &= l_1 \sin\chi_1 + l_2 \sin(\chi_1 + \chi_2).
\end{align}
$$

Lấy đạo hàm theo thời gian của các vị trí ta được các vận tốc:

**Khớp 2:**

$$
\begin{align}
\dot{x}_2 &= -l_1 \sin\chi_1 \cdot \dot{\chi}_1 \\
\dot{y}_2 &=  l_1 \cos\chi_1 \cdot \dot{\chi}_1.
\end{align}
$$

Do đó:

$$
\begin{align}
\| \mathbf{v}_2 \|^2 = \dot{x}_2^2 + \dot{y}_2^2 = l_1^2 \dot{\chi}_1^2.
\end{align}
$$

**Điểm tác động cuối:**

$$
\begin{align}
\dot{x}_E &= -l_1 \sin\chi_1 \cdot \dot{\chi}_1
             -l_2 \sin(\chi_1 + \chi_2) \cdot (\dot{\chi}_1 + \dot{\chi}_2) \\
\dot{y}_E &=  l_1 \cos\chi_1 \cdot \dot{\chi}_1
             +l_2 \cos(\chi_1 + \chi_2) \cdot (\dot{\chi}_1 + \dot{\chi}_2).
\end{align}
$$

Sử dụng [hằng đẳng thức lượng giác Pythagoras](https://en.wikipedia.org/wiki/Pythagorean_trigonometric_identity), ta tìm được:

$$
\begin{align}
\| \mathbf{v}_E \|^2 = l_1^2 \dot{\chi}_1^2
+ l_2^2 (\dot{\chi}_1 + \dot{\chi}_2)^2
+ 2 l_1 l_2 \cos(\chi_2) \dot{\chi}_1 (\dot{\chi}_1 + \dot{\chi}_2)
\end{align}
$$

Thay vào biểu thức tổng quát cho động năng:

$$
\begin{align}
K &= \frac{1}{2} I_1 \dot{\chi}_1^2
+ \frac{1}{2} I_2 (\dot{\chi}_1 + \dot{\chi}_2)^2 + \frac{1}{2} m_2 l_1^2 \dot{\chi}_1^2 \\
&\quad + \frac{1}{2} m_E \left[
    l_1^2 \dot{\chi}_1^2
  + l_2^2 (\dot{\chi}_1 + \dot{\chi}_2)^2
  + 2 l_1 l_2 \cos\chi_2 \dot{\chi}_1 (\dot{\chi}_1 + \dot{\chi}_2)
\right]
\end{align}
$$

Điều này cung cấp **biểu thức giải tích đầy đủ** cho động năng của cánh tay máy phẳng 2R, tính đến cả quán tính phân bố và các khối lượng tập trung.

#### 2. Thế năng

Giả sử trọng lực tác động theo hướng $$y$$ âm với độ lớn $$g$$, thế năng trọng trường được tính từ vị trí thẳng đứng của các khối lượng.

Gọi:

- $$y_2$$ là vị trí thẳng đứng của khớp thứ hai
- $$y_E$$ là vị trí thẳng đứng của điểm tác động cuối
- $$m_2, m_E$$ lần lượt là khối lượng tại khớp 2 và điểm tác động cuối

Khi đó thế năng là:

$$
\begin{align}
U = m_2 g y_2 + m_E g y_E
\end{align}
$$

Từ động học thuận:

$$
\begin{align}
y_2 &= l_1 \sin(\chi_1), \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2).
\end{align}
$$

Thay vào biểu thức:

$$
\begin{align}
U &= m_2 g \cdot l_1 \sin(\chi_1)
+ m_E g \left[ l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2) \right] \\
&= (m_2 + m_E) g l_1 \sin(\chi_1)
+ m_E g l_2 \sin(\chi_1 + \chi_2)
\end{align}
$$

Biểu thức này nắm bắt thế năng của robot theo cấu hình của nó.

---

#### 3. Phương trình Euler–Lagrange

Đối với mỗi tọa độ tổng quát $$\chi_k$$, động lực học được điều chỉnh bởi:

$$
\frac{d}{dt} \left( \frac{\partial \mathcal{L}}{\partial \dot{\chi}_k} \right)
- \frac{\partial \mathcal{L}}{\partial \chi_k}
= \tau_k
$$

Bây giờ chúng ta thay các biểu thức cho động năng $$K$$ và thế năng $$U$$:

##### Cho Khớp 1

Phương trình kết quả là:

$$
\begin{align}
&\left[ I_1 + I_2 + (m_2 + m_E) l_1^2 + m_E l_2^2 + 2 m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_1 \\
&+ \left[ I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_2 \\
&- m_E l_1 l_2 \sin(\chi_2) \left(2 \dot{\chi}_1 \dot{\chi}_2 + \dot{\chi}_2^2 \right) \\
&+ (m_2 + m_E) g l_1 \cos(\chi_1) + m_E g l_2 \cos(\chi_1 + \chi_2) \\
&= \tau_1
\end{align}
$$

##### Cho Khớp 2

Phương trình kết quả là:

$$
\begin{align}
&\left[ I_2 + m_E l_2^2 + m_E l_1 l_2 \cos(\chi_2) \right] \ddot{\chi}_1 \\
&+ \left[ I_2 + m_E l_2^2 \right] \ddot{\chi}_2 \\
&+ m_E l_1 l_2 \sin(\chi_2) \dot{\chi}_1^2 \\
&+ m_E g l_2 \cos(\chi_1 + \chi_2) \\
&= \tau_2
\end{align}
$$

Hai phương trình vi phân phi tuyến bậc hai liên kết này mô tả đầy đủ động lực học của robot phẳng 2R dưới ảnh hưởng của trọng trường, quán tính thanh nối và các mô-men xoắn bên ngoài $$\tau_1, \tau_2$$.

## Tóm tắt

Bài viết này đã giới thiệu động lực học của một robot phẳng 2R bằng **phương pháp Lagrange**. Chúng ta đã xây dựng các biểu thức cho:

- **Động năng và thế năng** dựa trên các góc khớp, chiều dài thanh nối và khối lượng.
- **Các phương trình Euler–Lagrange** dẫn đến hai phương trình vi phân bậc hai phi tuyến.
- Dạng **MCG thu gọn**:

$$
\begin{align}
\mathbf{M}(\boldsymbol{\chi}) \ddot{\boldsymbol{\chi}}
+ \mathbf{C}(\boldsymbol{\chi}, \dot{\boldsymbol{\chi}}) \dot{\boldsymbol{\chi}}
+ \mathbf{g}(\boldsymbol{\chi}) = \boldsymbol{\tau}
\end{align}
$$

Công thức này cung cấp cơ sở cho việc mô phỏng, điều khiển và phân tích chuyển động của robot.
