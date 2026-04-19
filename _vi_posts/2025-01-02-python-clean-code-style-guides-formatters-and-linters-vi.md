---
layout: post-sidebar
title:  "Python Clean Code, Style Guides, Formatters, và Linters"
author: ductri
categories: [Programming]
tags: [featured, python]
image: /assets/images/python-clean-code-style-guides-formatters-linters.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: true
side_toc: True
lang: vi
permalink: /vi/python-clean-code-style-guides-formatters-linters/
intro: >
---

## Clean Code là gì?

Clean code (mã sạch) là yếu tố quan trọng để duy trì và mở rộng các dự án phần mềm. Nó nên:

- Dễ dàng bảo trì và thay đổi
- Dễ hiểu đối với người khác
- Bảo mật
- Chính xác (tức là "nó chạy đúng")
- Phù hợp với nhu cầu dự án, ví dụ: không có các tính năng không liên quan làm phình to mã nguồn

> **Quan trọng nhất: Clean code là mã nguồn dễ thay đổi!**

## PEP 8 và Google Python Style Guides

`Idiomatic code` (mã nguồn đặc trưng) là mã tuân thủ các quy ước phong cách phổ biến của ngôn ngữ đó. Đối với `Python` nói riêng, [PEP 8](https://peps.python.org/pep-0008/) và [Google Python Style Guides](https://google.github.io/styleguide/pyguide.html) đưa ra một tập hợp các quan điểm mà phần lớn mã nguồn Python hiện nay tuân theo.

## Các nguyên tắc lập trình

Có rất nhiều nguyên tắc lập trình mà bạn có thể tuân theo để viết mã tốt hơn, mỗi nguyên tắc đều có những ưu/nhược điểm và sự đánh đổi riêng. Bài viết này đề cập đến bốn nguyên tắc phổ biến nhất: DRY, KISS, SoC và SOLID:

- **DRY** (Don't repeat yourself - Đừng lặp lại chính mình)
- **KISS** (Keep it simple, stupid - Giữ cho nó đơn giản thôi)
- **SoC** (Separation of concerns - Phân tách các mối quan tâm)
- **SOLID:**
  - **S**ingle-responsibility principle (Nguyên tắc đơn trách nhiệm): "Một lớp chỉ nên có một, và chỉ một, lý do để thay đổi."
  - **O**pen–closed principle (Nguyên tắc Mở-Đóng): "Các thực thể nên mở cho việc mở rộng, nhưng đóng cho việc sửa đổi."
  - **L**iskov substitution principle (Nguyên tắc thay thế Liskov): "Các hàm sử dụng con trỏ hoặc tham chiếu đến các lớp cơ sở phải có thể sử dụng các đối tượng của các lớp dẫn xuất mà không cần biết về điều đó."
  - **I**nterface segregation principle (Nguyên tắc phân tách giao diện): "Một client không nên bị buộc phải triển khai một giao diện mà nó không sử dụng."
  - **D**ependency inversion principle (Nguyên tắc đảo ngược phụ thuộc): "Hãy phụ thuộc vào các trừu tượng, không phải các cụ thể."

[**Nguồn:** Clean Code in Python](https://testdriven.io/blog/clean-code-python/)

## Sự nhất quán ngu ngốc là bóng ma của những tâm trí hạn hẹp

- Một trong những hiểu biết quan trọng của Guido là mã nguồn được đọc thường xuyên hơn nhiều so với khi nó được viết. Các hướng dẫn được cung cấp ở đây nhằm cải thiện tính dễ đọc của mã nguồn và làm cho nó nhất quán trên phạm vi rộng của mã nguồn Python. Như [PEP 20](https://peps.python.org/pep-0020/) đã nói, `Readability counts` (Tính dễ đọc rất quan trọng).
- Một hướng dẫn về phong cách (style guide) là về sự nhất quán. Nhất quán với style guide này là quan trọng. Nhất quán trong một dự án còn quan trọng hơn. Nhất quán trong một module hoặc hàm là quan trọng nhất.
- Tuy nhiên, hãy biết khi nào nên không nhất quán – đôi khi các khuyến nghị của style guide đơn giản là không áp dụng được. Khi nghi ngờ, hãy sử dụng phán đoán tốt nhất của bạn. Hãy nhìn vào các ví dụ khác và quyết định cái nào trông tốt nhất. Và đừng ngần ngại hỏi!

> Đặc biệt: đừng phá vỡ khả năng tương thích ngược chỉ để tuân thủ PEP này!

Một số lý do chính đáng khác để bỏ qua một hướng dẫn cụ thể:

1. Khi áp dụng hướng dẫn sẽ làm cho mã nguồn khó đọc hơn, ngay cả đối với người đã quen đọc mã tuân theo PEP này.
2. Để nhất quán với mã nguồn xung quanh cũng vi phạm nó (có lẽ vì lý do lịch sử) – mặc đây cũng là cơ hội để dọn dẹp đống lộn xộn của người khác (theo phong cách XP thực thụ).
3. Vì mã nguồn đang xét có trước khi hướng dẫn được giới thiệu và không có lý do nào khác để sửa đổi mã đó.
4. Khi mã nguồn cần duy trì tương thích với các phiên bản Python cũ hơn không hỗ trợ tính năng mà style guide khuyến nghị.

[**Nguồn:** PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/#a-foolish-consistency-is-the-hobgoblin-of-little-minds)

## Code Review và Pull Request Best Practices

- Code review cho phép tổ chức của bạn chỉ chấp nhận các thay đổi mã nguồn nhận được sự đồng thuận phê duyệt, với mục tiêu duy trì mã nguồn chất lượng, hay còn gọi là "clean code".

- Các thành phần của chất lượng mã nguồn
  - Nó có chạy đúng không?
  - Tôi có hiểu nó không?
  - Nó có an toàn không?
  - Chúng ta có thực sự muốn điều này không?

- Giữ các pull request thật nhỏ và tập trung, với ít quyết định logic
  - Điều này giúp người xem dễ dàng trả lời bốn câu hỏi về Chất lượng mã nguồn được liệt kê ở trên.
  - Giảm thiểu các xung đột merge tiềm ẩn.
  - Cho phép các cộng tác viên thích ứng với những thay đổi của bạn.

- [**Ví dụ** về một pull request quá lớn](https://github.com/rootski-io/rootski/pull/56)

- Làm cho các cộng tác viên xem mã của bạn nhanh chóng dễ dàng nhất có thể
  - Trả lời rõ ràng bốn câu hỏi về Chất lượng mã nguồn:
    - Mã có chạy đúng không?
    - Mã có sạch không?
    - Mã có an toàn không?
    - Mã có được mong muốn không?

- Thời gian của máy móc ít giá trị hơn thời gian của con người
  - Sử dụng tự động hóa để cung cấp bằng chứng cho các câu trả lời của bạn cho những câu hỏi trên nhiều nhất có thể.
  - Các chi tiết khác về tự động hóa sẽ có trong các video tiếp theo.

- Các lựa chọn thay thế cho pull request
  - Pair programming (Lập trình cặp) - hai nhà phát triển làm việc cùng nhau để viết mã.
  - Mob programming (Lập trình nhóm) - ba hoặc nhiều nhà phát triển làm việc cùng nhau để viết mã.
  - Merge trực tiếp mã của bạn vào nhánh chính - hoạt động tốt nhất trong các nhóm có sự tin tưởng cao.

## Công cụ tự động định dạng (Auto-formatters)

- Auto-formatters tự động điều chỉnh khoảng cách và thực thi các quy ước trong mã nguồn của bạn.
- Tự động định dạng tạo ra một phong cách mã nhất quán trong một nhóm, miễn là tất cả các thành viên trong nhóm sử dụng cùng một công cụ định dạng và cài đặt.
- `Black` là một trong những công cụ tự động định dạng phổ biến nhất trong `Python`. Các lựa chọn khác bao gồm `autopep8` và `yapf`.

## PyLint

- Linters
  - Thực hiện phân tích tĩnh mã nguồn của bạn; chúng không chạy mã, nhưng chúng:
    - Quét lỗi
    - Thực thi các tiêu chuẩn mã
    - Tìm kiếm code smells (mã có mùi)
    - Đưa ra các gợi ý về cách tái cấu trúc mã
  - Pylint là một ví dụ về linter cho Python.
- Pylint thường được sử dụng trong Tích hợp liên tục (CI) để tự động phát hiện mã có vấn đề trong các Pull Request.

**Lưu ý:**

- Việc tuân thủ giáo điều, không khoan nhượng đối với bất kỳ quy tắc nào, bao gồm cả các quy tắc linting, đôi khi có thể gây hại; đôi khi bạn có thể có lý do chính đáng để bỏ qua một quy tắc linting.
- Các thông báo lỗi Pylint có thể được vô hiệu hóa cho một tệp cụ thể bằng tên quy tắc hoặc ID của nó - xem tài nguyên bên dưới để biết ví dụ.
  - Vô hiệu hóa các quy tắc trong terminal: `pylint --disable=<list-of-rules> <file-name>`
  - Vô hiệu hóa các quy tắc trong một tệp Python cụ thể thông qua comment: `# pylint: disable=rule-name`
  - Khuyến nghị không sử dụng ID quy tắc mà nên sử dụng tên quy tắc để dễ đọc.
- Tạo tệp cấu hình pylint trong terminal: `pylint --generate-rcfile > .pylintrc`

## Flake8

- `Darglint` là một linter và plugin của `flake8` giúp kiểm tra các đối số bên trong docstrings, đảm bảo chúng khớp với triển khai mã thực tế.
- Cài đặt `Darglint` bằng lệnh `pip install darglint` trong cùng môi trường ảo với `flake8`.
- Hầu hết các tiện ích mở rộng `flake8` có thể được cài đặt theo cách tương tự như `Darglint` - hãy kiểm tra danh sách các tiện ích mở rộng `flake8` trong tài nguyên bên dưới để tìm các tiện ích mở rộng bạn quan tâm.
- [Awesome Flake8 Extensions](https://github.com/DmytroLitvinov/awesome-flake8-extensions)

## Các chỉ số mã nguồn (Code metrics)

- Độ phức tạp Cyclomatic (CC) đề cập đến số lượng quyết định trong mã, hoặc số lượng các nhánh rẽ mà nó có.
- `Radon` là một công cụ phân tích CC phổ biến và có thể được cài đặt bằng `pip install radon`.
  - Tính CC của các hàm trong một tệp cho trước bằng lệnh terminal sau: `radon cc  file_name.py -s`
- Các công cụ phân tích độ phức tạp mã khác trong Python bao gồm `mccabe` và `xenon`, công cụ sau là một lớp bọc mỏng xung quanh `radon`.
- Việc cài đặt `flake8` và `radon` trong cùng một môi trường ảo sẽ kích hoạt radon như một tiện ích mở rộng của `flake8`, cho phép làm nổi bật cú pháp khi Độ phức tạp Cyclomatic quá cao.
  - Thêm nội dung này vào tệp cấu hình .flake8 của bạn để đặt điểm CC tối đa là 10: `radon-max-cc = 10`

## Darker: linting tăng trưởng cho các dự án cũ

- Linting làm cho mã dễ đọc hơn, nhưng nếu bạn có một mã nguồn lớn hiện có, việc thực thi tuân thủ linting 100% cùng một lúc có thể cực kỳ tốn thời gian.
- `darker` là một công cụ CLI dựa trên Python cho phép bạn chạy các công cụ linting như `flake8`, `pylint`, `ruff`, v.v. *chỉ* trên các dòng mã đã thay đổi trong kho lưu trữ của bạn. Nó thực hiện điều này bằng cách xem xét `git --diff` giữa hai commit.
- Vì vậy, trong quy trình Pull Request, bạn có thể sử dụng `darker` để chỉ làm thất bại `pylint` hoặc `ruff` đối với các lỗi được phát hiện trong các dòng đã sửa đổi giữa commit mới nhất trong nhánh tính năng của bạn và commit mới nhất trong nhánh chính.
- Các công cụ tương tự cũng tồn tại để thực thi độ bao phủ kiểm thử (test coverage). Nhưng chúng ta chưa nói về kiểm thử cho đến thời điểm này, vì vậy nếu nhận xét này chưa rõ ràng, nó sẽ rõ ràng sau.

## Ruff: linter Python cuối cùng?

- Ruff là một linter Python được triển khai bằng Rust, nổi tiếng với tốc độ và hiệu suất.
- Ruff nhằm mục đích tập hợp nhiều công cụ linting và phân tích tĩnh khác vào một công cụ thống nhất, ví dụ: `pylint`, `flake8`, `autoflake`, `isort`, v.v.
- `ruff` triển khai lại tất cả các công cụ phân tích tĩnh này bằng `rust` từ đầu!
- Ruff có thể tự động sửa một số lỗi mã với `ruff check --fix ./`
- Ruff có tiện ích mở rộng cho VS Code và tuân theo language server protocol.
- Cấu hình Ruff có thể được thực hiện thông qua các tệp như `pyproject.toml`.
- `darker` hỗ trợ sử dụng `darker --lint "ruff check" ./` để chỉ áp dụng các bản sửa lỗi `ruff` cho phần git diff giữa các commit.

![Screenshot from ruff repo](/assets/images/ruff-the-last-python-linter-ever.svg)
<p align="center">
  <i>Linting mã nguồn CPython từ đầu.</i>
</p>
- ⚡️ Nhanh hơn 10-100 lần so với các linters hiện có (như Flake8) và formatters (như Black)
- 🐍 Có thể cài đặt qua `pip`
- 🛠️ Hỗ trợ `pyproject.toml`
- 🤝 Tương thích với Python 3.13
- ⚖️ Tương đương hoàn toàn với [Flake8](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-flake8), isort, và [Black](https://docs.astral.sh/ruff/faq/#how-does-ruffs-formatter-compare-to-black)
- 📦 Tích hợp bộ nhớ đệm (caching), để tránh phân tích lại các tệp không thay đổi
- 🔧 Hỗ trợ sửa lỗi, để tự động sửa lỗi (ví dụ: tự động xóa các import không sử dụng)
- 📏 Hơn [800 quy tắc tích hợp](https://docs.astral.sh/ruff/rules/), với các triển khai bản địa của các plugins Flake8 phổ biến, như flake8-bugbear
- ⌨️ Các tích hợp trình soạn thảo (editor integrations) chính chủ cho [VS Code](https://github.com/astral-sh/ruff-vscode) và [nhiều hơn nữa](https://docs.astral.sh/ruff/editors/setup)
- 🌎 Thân thiện với Monorepo, với [cấu hình phân cấp và kế thừa](https://docs.astral.sh/ruff/configuration/#config-file-discovery)

[**Tham khảo:** Ruff Documentation](https://docs.astral.sh/ruff/)
