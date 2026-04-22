---
layout: post
title:  "NMPC thích nghi dựa trên mạng thần kinh nhân tạo cho hoạt động chiết tách-rửa Uranium trong quy trình xử lý nhiên liệu hạt nhân đã qua sử dụng"
author: ductri
categories: [Control System]
tags: [featured]
image: /assets/images/ann-based-mpc-paper.png
ref: ann-based-adaptive-mpc
lang: vi
permalink: /vi/dieu-khien-du-bao-thich-nghi-dua-tren-mang-than-kinh-nhan-tao-chiet-tach-uranium/
---

**Tóm tắt:** Nghiên cứu này tập trung vào các thách thức trong việc tối ưu hóa điều khiển chiết tách và rửa uranium trong quy trình PUREX. Mục tiêu là duy trì hệ thống ở mức bão hòa dung môi mục tiêu trong khi tuân thủ các ràng buộc vận hành, quản lý nhiễu và điều chỉnh theo các thay đổi điểm đặt. Ủy ban Năng lượng Nguyên tử và Năng lượng Thay thế Pháp (CEA) đã phát triển một bộ mô phỏng chuyên dụng mang tên PAREX để mô hình hóa quá trình chiết tách lỏng-lỏng trong quy trình PUREX. Tuy nhiên, mô hình toán học cơ bản rất phức tạp, bao gồm các phương trình đại số-vi phân phi tuyến bậc cao (DAE). Do đó, việc áp dụng trực tiếp các phương pháp điều khiển tối ưu sẽ dẫn đến các bài toán lập trình phi tuyến quy mô lớn, tính toán chuyên sâu. Để khắc phục điều này, chúng tôi đề xuất huấn luyện một mạng thần kinh để dự báo đầu ra của quá trình dựa trên các phép đo lịch sử. Kiến trúc mạng này kết hợp các mạng bộ nhớ ngắn hạn dài (LSTM), hồi quy tuyến tính và hồi quy logistic, giúp giảm hiệu quả số lượng biến trạng thái và đơn giản hóa bài toán tối ưu hóa. Hơn nữa, chúng tôi thiết lập và giải quyết các bài toán điều khiển dự báo mô hình phi tuyến (NMPC) và ước lượng chân trời di động (MHE) bằng thuật toán Tối ưu hóa Bầy đàn (PSO). Kết quả mô phỏng chứng minh tính hiệu quả của phương pháp điều khiển tối ưu thích nghi này trong việc đáp ứng các mục tiêu điều khiển, cho thấy tiềm năng triển khai trong thực tế.

[Tải bài báo]({{site.baseurl}}/assets/publications/ANN-Based-Adaptive-NMPC-for-Uranium-Extraction-Scrubbing-Operation-in-Spent-Nuclear-Fuel-Treatment-Process.pdf)

<!-- # Giới thiệu

## Động lực

Quy trình PUREX, viết tắt của "Plutonium, Uranium, Reduction, EXtraction," được phát triển để thu hồi uranium và plutonium từ nhiên liệu hạt nhân đã qua sử dụng, bao gồm 95% uranium, 1% plutonium và 4% chất thải độc hại phóng xạ cao (chất thải cuối cùng). Quy trình này mang lại khả năng thu hồi và tái chế U-Pu có độ tinh khiết cao, giảm thể tích chất thải cuối cùng và do đó góp phần phát triển năng lượng hạt nhân bền vững. Mục tiêu điều khiển tổng thể là nhanh chóng đưa quá trình đạt được mức bão hòa dung môi mong muốn, đảm bảo các ràng buộc, xử lý các nhiễu và các biến động điểm đặt.

PAREX là một chương trình mô phỏng được phát triển bởi Ủy ban Năng lượng Nguyên tử và Năng lượng Thay thế Pháp (CEA). Nó có thể mô phỏng các hoạt động chiết tách lỏng-lỏng trong quy trình PUREX. Như đã báo cáo trong \cite{Bisson2016}, PAREX hiện đang được sử dụng trong ngành tái chế nhiên liệu hạt nhân để tối ưu hóa quy trình, xử lý sự cố và phân tích an toàn. PAREX cung cấp những hiểu biết quý giá về động lực học quy trình và cho phép áp dụng các phương pháp điều khiển dựa trên mô hình.

Công việc này tiếp tục các nghiên cứu về phát triển Điều khiển Dự báo Mô hình Phi tuyến (NMPC) thích nghi cho hoạt động chiết tách-rửa uranium trong quy trình PUREX (\cite{vo2023}) và (\cite{Vo2023a}). Chúng tôi mong muốn khai thác lợi ích của bộ mô phỏng PAREX đã được kiểm chứng trong sơ đồ điều khiển để đáp ứng các mục tiêu và ràng buộc điều khiển đã nêu ở trên. Tuy nhiên, nó đòi hỏi các kiểm soát an ninh cấp cao khi phát triển một bản sao ANN của PAREX vì PAREX và dữ liệu của nó được bảo vệ nghiêm ngặt. Do đó, trong nghiên cứu đầu tiên này, chúng tôi đề xuất một mô hình toán học nắm bắt các động lực chính của quá trình, sau đó sử dụng nó để minh họa và nghiên cứu chiến lược điều khiển đã phát triển trong nhiều mô phỏng. Lưu ý rằng thuật toán đề xuất có thể được tổng quát hóa cho PAREX mà không có bất kỳ hạn chế nào.

Trong các nghiên cứu trước đây của chúng tôi (\cite{vo2023} và \cite{Vo2023a}), một mô hình quá trình bậc cao với 128 biến trạng thái đã được sử dụng. Tuy nhiên, lưu ý rằng từ quan điểm thực tế, chỉ có hai biến trạng thái đóng vai trò quan trọng trong bài toán điều khiển. Do đó, nếu chúng ta có thể giảm số lượng biến trong mô hình quá trình, chúng ta có thể giảm độ phức tạp của bài toán điều khiển, đó là động lực của bài báo này.

Ý tưởng chính của chúng tôi là phát triển một mạng thần kinh nhân tạo (ANN) để dự đoán các biến trạng thái thiết yếu dựa trên các phép đo có sẵn. Sau đó, ANN được nhúng như một bộ dự báo trong sơ đồ Điều khiển Dự báo Mô hình Phi tuyến (NMPC) và như một bộ ước lượng trong chiến lược Ước lượng Chân trời Di động (MHE). Hơn nữa, việc tích hợp NMPC và MHE cho phép chúng ta có một sơ đồ điều khiển thích nghi, trong đó bất kỳ nhiễu không đo được nào cũng có thể được ước tính và cập nhật cho bộ điều khiển. Để giải các bài toán tối ưu hóa NMPC và MHE, chúng tôi sử dụng thuật toán Tối ưu hóa Bầy đàn (PSO) cải tiến được phát triển trong công việc trước đây của chúng tôi (\cite{Vo2023a}).

Mạng thần kinh Bộ nhớ ngắn hạn dài (LSTM), được đề xuất lần đầu bởi \cite{Hochreiter}, là một lựa chọn phổ biến cho các ứng dụng dự báo chuỗi thời gian. Do đó, nó đại diện cho một phương pháp ứng cử viên tốt để xấp xỉ động lực học hệ thống, cho phép áp dụng các kỹ thuật điều khiển dựa trên mô hình như NMPC. Khả năng áp dụng của LSTM trong NMPC đã được thảo luận toàn diện bởi \cite{JUNG2023106226}. Lưu ý rằng kiến trúc ANN đề xuất của chúng tôi dựa trên LSTM và các mạng hồi quy tuyến tính và logistic. Như sẽ được thảo luận sau trong bài báo, ANN được thiết kế dựa trên các đặc thù của bài toán điều khiển.  -->
