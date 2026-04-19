---
layout: post-sidebar
title:  "Điều khiển phân cấp sử dụng các quan hệ mô phỏng xấp xỉ"
author: ductri
categories: [Control System]
tags: [featured]
image: "https://i.imgur.com/NEcje0J.png"
# font: vietnamese-font
# description: "Test latex."
toc: true
side_toc: True
lang: vi
permalink: /vi/dieu-khien-phan-cap-su-dung-quan-he-mo-phong-xap-xi/
intro: >
    Bạn có tò mò về cách các hệ thống phức tạp có thể được điều khiển bằng các mô hình đơn giản hơn không? Trong bài viết này, tôi sẽ giới thiệu cho bạn một phương pháp thú vị được gọi là điều khiển phân cấp sử dụng các quan hệ mô phỏng xấp xỉ. Bạn sẽ tìm thấy một bản tóm tắt rõ ràng, dễ hiểu về bài báo năm 2006 của Girard, cùng với những hiểu biết về cách phương pháp này hoạt động, nó đã phát triển như thế nào trong các nghiên cứu gần đây và nơi nó đang được áp dụng ngày nay - từ điều khiển chuyển động của robot đến các hệ thống đa tác tử. Ngoài ra, tôi đã bao gồm mã triển khai của riêng mình để bạn có thể tự mình dùng thử!

description: Bạn có tò mò về cách các hệ thống phức tạp có thể được điều khiển bằng các mô hình đơn giản hơn không? Trong bài viết này, tôi sẽ giải mã một phương pháp tinh tế được gọi là điều khiển phân cấp sử dụng các quan hệ mô phỏng xấp xỉ.
---

## Tóm tắt bài báo

Bài báo {% cite Girard2006 %} giới thiệu một khung điều khiển phân cấp cho các hệ thống phức tạp bằng cách xấp xỉ chúng bằng các mô hình đơn giản hơn, tạo điều kiện thuận lợi cho việc thiết kế bộ điều khiển. Trung tâm của phương pháp này là các khái niệm về *quan hệ mô phỏng xấp xỉ* (approximate simulation relations), xác định mức độ bám sát của các đầu ra $$\mathbf{y}$$ và $$\mathbf{y}'$$ của hệ thống cụ thể $$\Sigma$$ và hệ thống trừu tượng $$\Sigma'$$. Các mối quan hệ này được xây dựng bằng cách sử dụng các *hàm mô phỏng* (simulation functions), là các hàm dương giới hạn sự khác biệt giữa các đầu ra của hai hệ thống và đảm bảo rằng các giới hạn này không tăng trong quá trình tiến hóa song song của chúng.

Kiến trúc của khung bao gồm hai lớp chính: *hệ thống cụ thể* (concrete system) $$\Sigma$$, đại diện cho mô hình chi tiết và phức tạp của đối tượng, và *hệ thống trừu tượng* (abstract system) $$\Sigma'$$[^1], một mô hình đơn giản hóa được đặc trưng bằng cách sử dụng các quan hệ mô phỏng xấp xỉ để đơn giản hóa việc thiết kế điều khiển tại *Bộ điều khiển hệ thống trừu tượng*. Các lớp này được kết nối thông qua một *giao diện điều khiển* (control interface), giúp tổng hợp các đầu vào điều khiển cho hệ thống cụ thể.

{% include figure.html
    src=site.data.images.herarchical_control_girard.src
    alt=site.data.images.herarchical_control_girard.alt
    caption=site.data.images.herarchical_control_girard.caption
%}

Xem xét một bài toán điều khiển cho hệ thống cụ thể với các thuộc tính bất biến (invariance) và khả năng đạt tới (reachability) cụ thể. Phần III chứng minh rằng kiến trúc điều khiển đề xuất đảm bảo rằng đầu ra $$\mathbf{y}$$ của $$\Sigma$$ thỏa mãn các thuộc tính mong muốn này, miễn là đáp ứng các điều kiện sau:

- $$\Sigma'$$ là một *hệ thống con xấp xỉ hoàn chỉnh của* $$\Sigma$$ *với độ chính xác* $$\delta$$, nghĩa là đối với mọi trạng thái ban đầu $$\mathbf{x}_0$$ của $$\Sigma$$, tồn tại một trạng thái ban đầu tương ứng $$\mathbf{z}_0$$ của $$\Sigma'$$ sao cho, bắt đầu từ các điều kiện ban đầu này, các đầu ra được giới hạn, nghĩa là $$\|\mathbf{h}(\mathbf{x}) - \mathbf{k}(\mathbf{z})\| \leq \delta$$ cho mọi $$t \geq 0$$;[^3]
- $$\Sigma'$$ thỏa mãn các thuộc tính bất biến và khả năng đạt tới trong một lề an toàn $$\delta$$.

Phương pháp này được minh họa thông qua một ứng dụng trong điều khiển chuyển động của robot. Các tác giả đã sử dụng mô hình động học bậc nhất của robot làm $$\Sigma'$$ để xấp xỉ mô hình động lực học bậc hai của robot, được coi là $$\Sigma$$. Sử dụng hàm mô phỏng được đề xuất trong Mệnh đề 4.1, các điều kiện và độ chính xác mà $$\Sigma'$$ trở thành một hệ thống con xấp xỉ hoàn chỉnh của $$\Sigma$$ được tính toán dưới dạng hàm của các giới hạn trên $$\|\mathbf{u}\|$$ và $$\|\mathbf{v}\|$$, như được trình bày chi tiết trong Định lý 4.3. Cuối cùng, ứng dụng của kiến trúc này cho các robot tự hành được khám phá trong phần sau của bài báo, cho thấy tính thực tế và hiệu quả của nó.[^4]

## Các đánh giá về điều khiển phân cấp dựa trên quan hệ mô phỏng xấp xỉ

Trong {% cite Kurtz2020 %}, kiến trúc được thể hiện trong Hình 1 đã được mở rộng để tính đến các nhiễu trong hệ thống cụ thể bằng cách giới thiệu *Hàm mô phỏng bền vững* (Robust Simulation Function) và *Quan hệ mô phỏng xấp xỉ bền vững* (Robust Approximate Simulation Relation). Sau đó, trong {% cite Wooding2023 %}, một hàm giao diện cho các nhiễu đã được tích hợp vào cùng một kiến trúc, cho phép hệ thống trừu tượng xử lý các nhiễu đáng kể trong hệ thống cụ thể. Xây dựng trên nền tảng này, {% cite Firouzmand2024 %} đã kết hợp một bộ quan sát để ước tính trạng thái của hệ thống cụ thể, cho phép các *Quan hệ mô phỏng xấp xỉ bền vững mở rộng* (Extended Robust Approximate Simulation Relations) cho các hệ thống tuyến tính.

Nghiên cứu về các hệ thống điều khiển phân cấp cũng đã phát triển theo các hướng khác. Trong {% cite Yang2017 %}, các hàm mô phỏng vector đã được sử dụng để phân tích các hệ thống điều khiển phân cấp quy mô lớn. Trong khi đó, {% cite Tang2012 %} đã khám phá điều khiển phân cấp cho một lớp các hệ thống phi tuyến bằng cách sử dụng các quan hệ mô phỏng xấp xỉ. Công việc này đã được mở rộng cho các hệ thống đa tác tử phân tán trong {% cite Tang2018 %} và được áp dụng xa hơn cho cân bằng Nash của các hệ thống đa tác tử phân tán trong {% cite Tang2023 %}.

## Bình luận

Kiến trúc điều khiển phân cấp dựa trên các quan hệ mô phỏng xấp xỉ đưa ra một góc nhìn thú vị, chủ yếu vì nền tảng của tôi là về điều khiển quá trình, nơi điều khiển phân cấp thường được coi là một cấu trúc đa tầng hoạt động ở các thang thời gian khác nhau (xem {% cite SCATTOLINI2009723 %}). Trong bối cảnh đó, mỗi tầng thường tập trung vào việc điều khiển một hệ thống con hơn là giải quyết việc điều khiển và trừu tượng hóa hệ thống cụ thể như được trình bày trong bài báo {% cite Girard2006 %}.

## Tài liệu tham khảo

{% bibliography --cited %}

## Chú thích

[^1]: Phương pháp đặc trưng cho hệ thống trừu tượng $$\Sigma'$$ trong bối cảnh các hệ thống tuyến tính $$\Sigma$$ được trình bày chi tiết trong một bài báo tiếp theo của tác giả {% cite Girard2009 %}.

[^2]: Tôi đã thêm *Bộ điều khiển hệ thống trừu tượng* để làm rõ cơ chế điều khiển: chúng ta cũng cần thiết kế bộ điều khiển cho hệ thống trừu tượng.
[^3]: Độ chính xác $$\delta$$ có thể được tính từ hàm mô phỏng bằng phương trình (6) trong {% cite Girard2006 %}.
[^4]: Tôi đã cố gắng tái hiện các kết quả mô phỏng, có sẵn tại liên kết này: [Google Colab](https://colab.research.google.com/drive/16XZ5cDuYZwOKxt4M3upsC4mEnaYfyiv6?usp=sharing)
