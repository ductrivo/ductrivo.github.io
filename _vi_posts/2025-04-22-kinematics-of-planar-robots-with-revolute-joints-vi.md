---
layout: post-sidebar
title:  "Động học của Robot phẳng với các khớp quay"
author: ductri
categories: [Robotics]
tags: [featured, robots, kinematics]
image: "https://i.imgur.com/3jfOT0D.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
lang: vi
permalink: /vi/dong-hoc-robot-phang-voi-khop-quay/
intro: >
    Trong hướng dẫn này, chúng ta sẽ xem xét **động học thuận và nghịch** của các robot phẳng với **N khớp quay**. Bằng cách đi qua trường hợp đơn giản này, người đọc có thể có được sự hiểu biết trực quan về động học trước khi chuyển sang các phương pháp tổng quát hơn như tham số Denavit-Hartenberg (DH) hoặc Tích các ma trận mũ (PoE), sẽ được giới thiệu trong Chương 3.

description: Trong hướng dẫn này, chúng ta xem xét động học thuận và nghịch của các robot phẳng với N khớp quay. Bằng cách đi qua trường hợp đơn giản này, người đọc có thể có được sự hiểu biết trực quan về động học trước khi chuyển sang các phương pháp tổng quát hơn.
---

> Bài viết này là một phần của chuỗi hướng dẫn [Mô hình hóa, Điều khiển và Thiết kế Robot](/robotics.html).

## Giới thiệu

**Động học** (Kinematics) là một nhánh của cơ học mô tả chuyển động của các hệ thống *mà không xem xét các lực* gây ra chuyển động đó. Trong robot, động học tập trung vào *vị trí*, *vận tốc* và *gia tốc* của các thanh nối và khớp robot.

**Động học thuận (Forward Kinematics - FK):** Cho biết các biến khớp (góc đối với khớp quay), tính toán *vị trí và hướng* của điểm tác động cuối (end-effector) của robot. FK thường mang tính phân tích và đơn giản đối với các robot phẳng.

**Động học nghịch (Inverse Kinematics - IK):** Cho biết vị trí mong muốn (và có thể là hướng) của điểm tác động cuối, tính toán *các biến khớp* để đạt được điều đó. IK có thể mang tính *phân tích* đối với các robot đơn giản, hoặc mang tính *số học* hoặc *lặp* đối với các robot phức tạp hơn. Ngoài ra, nó có thể có *nhiều nghiệm, vô nghiệm hoặc vô số nghiệm*.

Hãy cùng xem xét các robot phẳng với 2 và 3 khớp quay.

## Robot phẳng với 2 khớp quay

### Động học thuận của Robot phẳng 2R

Xét một robot phẳng với hai khớp quay như trong hình bên dưới. Gọi:

- $$ \chi_1,\, \chi_2 \in [-\pi, \pi) $$ là các góc khớp
- $$ l_1,\, l_2 \in \mathbb{R} $$ là chiều dài các thanh nối

{% include figure.html
    src=site.data.images.planar_robot_2r.src
    alt=site.data.images.planar_robot_2r.alt
    caption=site.data.images.planar_robot_2r.caption
%}

<div class="post-intro-toc">
Khi đó vị trí của điểm tác động cuối được cho bởi:

$$
\begin{align}
x_E &= l_1 \cos(\chi_1) + l_2 \cos(\chi_1 + \chi_2) \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2)
\end{align}
$$
</div>
Mô hình này đại diện cho một cánh tay robot phẳng hai thanh nối trong cấu hình khuỷu tay.

---

### Động học nghịch của Robot phẳng 2R

Gọi vị trí điểm tác động cuối mục tiêu là $$\left(x_E, y_E\right)$$. Mục tiêu là giải các góc khớp $$\chi_1, \chi_2$$ cho trước chiều dài các thanh nối $$l_1,\, l_2$$.

#### Bước 1: Tính $$ \chi_2 $$ sử dụng [định lý hàm cos](https://en.wikipedia.org/wiki/Law_of_cosines)

Áp dụng định lý hàm cos cho tam giác $$O_1O_2E$$:

$$
\begin{align}
\cos \widehat{O_1O_2E} &= \dfrac{O_2O_1^2 + O_2E^2 - O_1E^2}{2O_1O_2},\\
\Rightarrow \cos(\pi - \chi_2) &= \dfrac{l_1^2 + l_2^2 - \left(x_E^2 + y_E^2\right)}{2l_1 l_2}.
\end{align}
$$

Lưu ý rằng $$ \cos(\pi - \chi_2) = -\cos\chi_2 $$, ta tính được $$\chi_2 \in [-\pi, \pi)$$ là:

$$
\begin{align}
\chi_2 = \pm \arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

Có **hai nghiệm khả dĩ** cho $$ \chi_2 $$ tương ứng với các cấu hình **khuỷu tay lên (elbow-up)** và **khuỷu tay xuống (elbow-down)**.

---

#### Bước 2: Tính $$ \chi_1 $$ sử dụng [định lý hàm cos](https://en.wikipedia.org/wiki/Law_of_cosines)

Gọi $$\psi = \widehat{O_2O_1E}$$. Khi đó tổng $$\chi_1 + \psi$$ là góc từ đế đến mục tiêu, và được cho bởi:

$$
\begin{align}
\chi_1 + \psi = \text{arctan2 }(y_E, x_E).
\end{align}
$$

Tiếp tục áp dụng định lý hàm cos trong tam giác $$O_2O_1E$$:

$$
\begin{align}
\cos \widehat{O_2O_1E} &= \dfrac{O_1O_2^2 + O_1E^2 - O_2E^2}{2O_1O_2},\\
\Rightarrow \cos \psi &= \dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}},\\
\Rightarrow \psi &= \pm \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right).
\end{align}
$$

Do đó, $$\chi_1$$ được tính là:

$$
\begin{align}
\chi_1 = \text{arctan2 }(y_E, x_E) \pm \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right).
\end{align}
$$

#### Nghiệm cuối cùng

Từ các phương trình trên, chúng ta thấy có **bốn nghiệm toán học** cho $$ (\chi_1, \chi_2) $$. Tuy nhiên, chỉ có hai trong số đó là các cấu hình **khả thi về mặt vật lý** cho robot. Đó là:

<div class="post-intro-toc">
<strong>Cấu hình khuỷu tay xuống (Elbow-down)</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_E, x_E) - \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right),\\
    \chi_2 &= \arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

<strong>Cấu hình khuỷu tay lên (Elbow-up)</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_E, x_E) + \arccos \left(\dfrac{x_E^2 + y_E^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_E^2 + y_E^2}}\right),\\
    \chi_2 &= -\arccos \left(\dfrac{x_E^2 + y_E^2  - l_1^2 - l_2^2}{2l_1 l_2}\right).
\end{align}
$$

</div>

---

## Robot phẳng với 3 khớp quay

### Động học thuận của Robot phẳng 3R

Gọi:

- $$ \chi_1,\, \chi_2,\, \chi_3 $$ là các góc khớp
- $$ l_1,\, l_2,\, l_3 $$ là chiều dài các thanh nối

Động học thuận cho biết vị trí của điểm tác động cuối:

$$
\begin{aligned}
x_E &= l_1 \cos(\chi_1) + l_2 \cos(\chi_1 + \chi_2) + l_3 \cos(\chi_1 + \chi_2 + \chi_3) \\
y_E &= l_1 \sin(\chi_1) + l_2 \sin(\chi_1 + \chi_2) + l_3 \sin(\chi_1 + \chi_2 + \chi_3)
\end{aligned}
$$

Cấu hình này đưa vào **tính dư thừa động học** (kinematic redundancy), cho phép linh hoạt hơn trong việc đạt được một điểm mục tiêu, và cho phép tối ưu hóa cho các mục tiêu bổ sung như tránh chướng ngại vật hoặc giảm thiểu nỗ lực khớp.

---

### Động học nghịch của Robot phẳng 3R

{% include figure.html
    src=site.data.images.planar_robot_3r.src
    alt=site.data.images.planar_robot_3r.alt
    caption=site.data.images.planar_robot_3r.caption
%}

Vì robot có **ba bậc tự do** trong một **không gian 2D**, hệ thống này mang tính **dư thừa** — nghĩa là có vô số tổ hợp của $$ (\chi_1, \chi_2, \chi_3) $$ đạt được cùng một tư thế điểm tác động cuối. Nói cách khác, chúng ta có thể định vị không chỉ vị trí $$ (x_E, y_E) $$ mà còn cả hướng $\theta_E$ của điểm tác động cuối.

Để tìm một nghiệm, chúng ta có thể áp dụng cách tiếp cận sau:

1. **Chọn một hướng mong muốn so với khung đế** $$ \theta_E $$ cho điểm tác động cuối (có thể được cho trước hoặc chọn tùy ý).
2. Tính:
   $$
   \chi_3 = \theta_E - (\chi_1 + \chi_2)
   $$

3. Xác định vị trí cổ tay (wrist position) $$ (x_W, y_W) = (x_{O_3}, y_{O_3})$$ là:

$$
\begin{align}
x_W &= x_E - l_3 \cos(\theta_E) \\
y_W &= y_E - l_3 \sin(\theta_E)
\end{align}
$$

Điều này đưa bài toán về việc giải động học nghịch cho một robot 2R để đạt được vị trí cổ tay với các thanh nối $$ l_1, l_2 $$. Như đã xây dựng ở phần trước, chúng ta có:

<div class="post-intro-toc">
<strong>Cấu hình khuỷu tay xuống (Elbow-down)</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_W, x_W) - \arccos \left(\dfrac{x_W^2 + y_W^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_W^2 + y_W^2}}\right),\\
    \chi_2 &= \arccos \left(\dfrac{x_W^2 + y_W^2  - l_1^2 - l_2^2}{2l_1 l_2}\right),\\
    \chi_3 &= \theta_E - (\chi_1 + \chi_2).
\end{align}
$$

<strong>Cấu hình khuỷu tay lên (Elbow-up)</strong>
$$
\begin{align}
    \chi_1 &= \text{arctan2 }(y_W, x_W) + \arccos \left(\dfrac{x_W^2 + y_W^2  +l_1^2 - l_2^2}{2l_1 \sqrt{x_W^2 + y_W^2}}\right),\\
    \chi_2 &= -\arccos \left(\dfrac{x_W^2 + y_W^2  - l_1^2 - l_2^2}{2l_1 l_2}\right),\\
    \chi_3 &= \theta_E - (\chi_1 + \chi_2).
\end{align}
$$

</div>

---

## Động học thuận của một Robot phẳng $$N$$-R

Động học thuận của một robot phẳng với $$N$$ khớp quay có thể được biểu diễn dưới dạng tổng quát và thu gọn. Mỗi thanh nối đóng góp vào vị trí điểm tác động cuối dựa trên các góc khớp tích lũy tính đến thanh nối đó:

$$
\begin{aligned}
x_E &= \sum_{i=1}^{N} l_i \cos\left( \sum_{j=1}^{i} \chi_j \right), \\
y_E &= \sum_{i=1}^{N} l_i \sin\left( \sum_{j=1}^{i} \chi_j \right).
\end{aligned}
$$

Công thức này tính đến sự quay tuần tự của mỗi khớp và tính chất tích lũy của các góc trong các chuỗi hở phẳng.

## Tóm tắt

Trong bài viết này, chúng ta đã khám phá động học của các robot phẳng với 2 và 3 khớp quay.

- **Động học** mô tả cách một robot di chuyển mà không đề cập đến lực. Chúng ta đã xem xét cả **Động học thuận (FK)** và **Động học nghịch (IK)**.
- Đối với **robot phẳng 2R**, chúng ta đã xây dựng các biểu thức phân tích cho cả FK và IK. Bài toán IK cho ra **hai cấu hình khả thi**: **khuỷu tay lên** và **khuỷu tay xuống**.
- Đối với **robot phẳng 3R**, chúng ta đã giới thiệu **tính dư thừa**. Robot có ba bậc tự do trong không gian 2D, cho phép nó đạt được cùng một điểm với vô số tổ hợp các góc khớp. Bằng cách chọn một hướng mong muốn cho điểm tác động cuối, chúng ta đưa bài toán về **bài toán IK 2R** cho vị trí cổ tay.
- Cách tiếp cận này thường được sử dụng trong thực tế và có thể được mở rộng để tối ưu hóa cho các mục tiêu phụ như giảm thiểu dịch chuyển khớp hoặc tránh chướng ngại vật.

Nghiên cứu này cung cấp một nền tảng vững chắc để hiểu về mô hình hóa động học của các cánh tay máy phẳng. Trong các phần tiếp theo, chúng ta sẽ tổng quát hóa các phương pháp này bằng các kỹ thuật như **tham số Denavit–Hartenberg (DH)** và công thức **Tích các ma trận mũ (PoE)** cho các cơ cấu không gian phức tạp hơn.
