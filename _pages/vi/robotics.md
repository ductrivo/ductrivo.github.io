---
title: "Hướng dẫn Mô hình hóa, Điều khiển và Thiết kế Robot"
layout: post-sidebar
permalink: "/vi/robotics.html"
image: "/assets/images/screenshot.jpg"
comments: true
toc: false
side_toc: True
lang: vi
---
Chuỗi hướng dẫn này bắt đầu với một ý tưởng: [`EXPREDCO`](https://github.com/ductrivo/nextpredco), một khung điều khiển và tối ưu hóa linh hoạt. Từ đó, tôi chuyên môn hóa nó vào một nhóm ứng dụng *Mô hình hóa, Điều khiển và Thiết kế Robot*, bắt đầu với *cánh tay robot phẳng*, sau đó là *robot di động*, và cuối cùng mở rộng các khái niệm sang các hệ thống *robot công nghiệp*.

Chủ đề trung tâm rất đơn giản:

> Điều khiển là việc giải phóng toàn bộ tiềm năng của một hệ thống. Và để điều khiển hiệu quả, trước tiên chúng ta phải hiểu rõ hệ thống đó.

Đó là lý do tại sao mỗi mô-đun trong lộ trình này đều kết thúc bằng một phiên thực hành: *từ thiết kế cơ khí và điện đến lập trình và triển khai*. Ví dụ, một dự án cuối khóa sẽ bao gồm việc chế tạo và điều khiển một robot di động có tích hợp cánh tay robot.

Tôi hy vọng hướng dẫn này sẽ hữu ích cho bất kỳ ai muốn củng cố cả kỹ năng lý thuyết và thực hành trong lĩnh vực robot và hệ thống điều khiển.

**Lưu ý nhanh:** Nếu bạn gặp phải hiện tượng rung lắc hoặc độ chính xác kém, hãy xem xét việc kiểm tra *điều khiển động lực học* của hệ thống, cụ thể là kiểm tra *đặc tính mô-men xoắn và tốc độ của động cơ*.

💻 Mã nguồn được sử dụng trong hướng dẫn này hiện có sẵn tại đây:

👉 [https://github.com/ductrivo/robot-analysis-demo](https://github.com/ductrivo/robot-analysis-demo)

## CHƯƠNG 1: CÁNH TAY ROBOT PHẲNG

Chương này tập trung vào việc **mô hình hóa, điều khiển và mô phỏng các cánh tay robot chuỗi hở phẳng** bao gồm nhiều khớp quay (hệ thống N-DOF). Mục tiêu là phân tích cả **động học** và **động lực học** của các hệ thống này dưới các chiến lược điều khiển khác nhau, từ PID cơ bản đến Điều khiển Dự báo Mô hình (MPC) tiên tiến.

Hiện tại, dự án này hỗ trợ phân tích **cánh tay robot phẳng 2D** trong đó **khối lượng của mỗi khâu được giả định là tập trung tại các khớp**. Sự đơn giản hóa này cho phép nghiên cứu hiệu quả và sâu sắc về hành vi của robot trong cả mô phỏng và triển khai phần cứng.

<div align="center">
  <img src="https://i.imgur.com/QlCwtKa.png" alt="Một robot chuỗi hở phẳng 3R." width="70%">
  <p><strong>Hình: Một robot chuỗi hở phẳng 3R.</strong></p>
</div>

- **Ngôn ngữ:** `Python` và `Rust` cho hầu hết các mô phỏng và điều khiển; `C++` cho các hệ thống nhúng và `ROS2`.
- **Phần cứng:** `Arduino`, `STM32`, `ESP32`, encoder, động cơ, các khâu phẳng 2D.
- **Dự án cuối khóa:** Thiết kế và chế tạo Cánh tay Robot 3R truyền động bằng động cơ bước và sản xuất thông qua in 3D.

### Mô-đun 1: Mô hình hóa và Điều khiển Động học

1. [Động học sử dụng phương pháp lượng giác](/vi/kinematics-of-planar-robots-with-revolute-joints/)
2. Tạo quỹ đạo / Lập kế hoạch chuyển động
   - Nội suy không gian khớp/Cartesian
   - Quỹ đạo điểm-đến-điểm
   - Quỹ đạo đa thức (B-spline, Đường cong Bézier)
   - Tránh vật cản.
3. Điều khiển động học
   - Điều khiển Feedforward PID và hiệu chỉnh
   - Điều khiển dự báo mô hình (MPC)

---

### Mô-đun 2: Mô hình hóa và Điều khiển Động lực học

1. [Mô hình động lực học của Robot phẳng với hai khớp quay](/vi/dynamics-of-planar-robots-with-revolute-joints/)
2. Ảnh hưởng của động cơ đến điều khiển
   - Đường cong mô-men xoắn - tốc độ
3. Tạo quỹ đạo (Dựa trên động lực học)
   - Phương pháp dựa trên tối ưu hóa (tính đến động lực học của robot)
4. Điều khiển động lực học
   - Điều khiển vận tốc: Feedforward PID, MPC
   - Điều khiển mô-men xoắn tính toán (Computed Torque Control): PID, Sliding Mode, MPC

---

### Mô-đun 3: Độ chính xác và tính ổn định của Robot

1. Nhận dạng hệ thống / Hiệu chuẩn
2. Ước lượng trạng thái và tham số trực tuyến
3. Bù trừ dung sai cơ khí

---

### Mô-đun 4: Thực nghiệm – Nguyên lý cơ bản về điều khiển động cơ

1. Điều khiển động cơ bước
2. Nhận dạng và điều khiển động cơ DC
3. Ghi dữ liệu và truyền thông

---

### Mô-đun 5: Thực nghiệm – Thiết kế cánh tay Robot (với động cơ bước)

1. Mô tả nhiệm vụ & Thông số kỹ thuật
2. Thiết kế cơ khí
3. Thiết kế điện
4. Triển khai động học và điều khiển

---

## CHƯƠNG 2: ROBOT DI ĐỘNG

### Mô-đun 1: Động học và mô hình chuyển động

1. Các cấu hình robot di động
   - Truyền động vi sai (Differential drive)
   - Truyền động xe ba bánh (Tricycle drive)
   - Nền tảng đa hướng (Omnidirectional)
2. Động học thuận và nghịch
   - Ước lượng tư thế (Pose estimation)
   - Động học vận tốc
3. Các ràng buộc động học
   - Ràng buộc không holonomic (Nonholonomic)
   - Tập hợp chuyển động khả thi

---

### Mô-đun 2: Lập kế hoạch đường đi và tạo quỹ đạo

1. Lập kế hoạch đường đi toàn cục
   - Thuật toán A*, Dijkstra, D* Lite
2. Lập kế hoạch chuyển động dựa trên lấy mẫu
   - RRT, RRT*, PRM
3. Tạo quỹ đạo
   - Nội suy đa thức
   - Lập kế hoạch chuyển động tránh vật cản
   - Cấu hình vận tốc/gia tốc

---

### Mô-đun 3: Điều khiển chuyển động và phản hồi

1. Điều khiển cổ điển
   - Điều khiển PID
   - Cải tiến Feedforward
2. Bộ điều khiển bám đuổi
   - Pure Pursuit
   - Bộ điều khiển Stanley
3. Điều khiển nâng cao
   - Điều khiển dự báo mô hình (MPC)
   - Bám sát quỹ đạo
4. Điều hướng phản ứng
   - Thuật toán Bug
   - Biểu đồ trường vectơ (Vector Field Histogram)

---

### Mô-đun 4: Định vị và SLAM

1. Ước lượng trạng thái
   - Đo quãng đường (Odometry)
   - Hợp nhất cảm biến (Sensor fusion)
2. Các kỹ thuật lọc
   - Bộ lọc Kalman mở rộng (EKF)
   - Bộ lọc hạt (Particle Filter)
3. Triển khai SLAM
   - 2D SLAM: GMapping
   - Visual SLAM (tùy chọn)
4. Tích hợp ROS2
   - Navigation stack
   - Map server và các nút định vị

---

### Mô-đun 5: Thực nghiệm – Chế tạo nguyên mẫu robot di động

1. Thông số kỹ thuật và lập kế hoạch
2. Lắp ráp phần cứng
   - Động cơ, cảm biến, khung gầm, MCU
3. Lập trình nhúng
   - Điều khiển động cơ ESP32 / STM32
   - Truyền thông nối tiếp
4. Tích hợp và thử nghiệm ROS2
5. Đánh giá và hiệu chỉnh trong thực tế

---

## CHƯƠNG 3: ROBOT TỔNG QUÁT

### Mô-đun 1: Mô tả Robot thống nhất

1. Trích xuất tham số Denavit-Hartenberg
2. Mô hình hóa URDF với Xacro
3. Liên kết mô hình CAD với URDF
4. Mô tả robot trong ROS2

---

### Mô-đun 2: Động học và Động lực học thống nhất

1. Mô hình hóa động học
   - Phương pháp DH
   - Tích các số mũ (Screw Theory)
2. Mô hình hóa động lực học
   - Ma trận khối lượng, Coriolis, trọng trường
   - Các phương trình dựa trên lý thuyết vít (Screw Theory)

---

### Mô-đun 3: Tạo quỹ đạo thống nhất

1. Biểu diễn quỹ đạo
   - Các điểm trung gian (Waypoints)
   - Đường cong B-spline, Bézier
2. Lập kế hoạch quỹ đạo
   - Không gian khớp và không gian Cartesian
3. Tham số hóa thời gian
   - Ràng buộc vận tốc và gia tốc

---

### Mô-đun 4: Khung điều khiển thống nhất

1. Kiến trúc bộ điều khiển ROS2
   - Controller Manager
   - Joint State Publisher
2. Tích hợp MoveIt
   - Giao diện lập kế hoạch chuyển động
   - Cảnh lập kế hoạch và an toàn
3. Các chế độ điều khiển hỗn hợp
   - Điều khiển vị trí và vận tốc
   - Tích hợp phản hồi
4. Các lưu ý về điều khiển thời gian thực
   - Watchdogs
   - Xử lý ngoại lệ

---

### Mô-đun 5: Trực quan hóa và Mô phỏng

1. Trực quan hóa thời gian thực với RViz
2. Mô phỏng dựa trên vật lý sử dụng Gazebo
3. Ghi dữ liệu và phân tích ROS Bag
4. Giao diện GUI và điều khiển từ xa
