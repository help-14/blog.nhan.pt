---
layout: page.njk
title: Sử dụng Domain Email miễn phí bằng Cloudflare Email Routing
description: Tạo miễn phí email cá nhân bằng tên miền có sẵn của bạn hoàn toàn miễn phí
cover: https://www.macobserver.com/wp-content/uploads/2021/09/cloudflare-email-wizard.jpg
author: Phan Nhan
time: 01/04/2024
timestamp: 1704338094683
tags:
  - it
---
Hiện tại mình đang có sửa dụng 3 email trên Cloudflare, chắc không cần nói thêm nhiều về dịch vụ Cloudflare nữa rồi nhỉ, vừa bảo vệ ddos cho website của bạn, vừa quản lý domain, chi phí domain rẻ, dịch vụ phần lớn là miễn phí. Cloudflare hiện tại cho phép bạn forward Email bất kỳ gửi đến tên miền của bạn tới một email cá nhân khác hoàn toàn miễn phí nhưng không cho phép gửi Email đi. Trong bài viết này mình sẽ hướng dẫn bạn cách cài đặt Cloudflare là Gmail để có thể gửi nhận Email hai chiều y như dịch vụ trả tiền Google Workspace vậy.

## Cài đặt Cloudflare Email Routing

Công việc đầu tiên là bạn phải setup tên miền của bạn trên Cloudflare, cái này cơ bản nên mình sẽ bỏ qua nhé.

Tiếp theo, chọn vào mục quản lý tên miền của bạn và chọn `Email` > `Email Routing`.

![C](https://i.imgur.com/10ROBXu.png)

Ở đây nếu là lần đầu sẽ có hướng dẫn setup, bạn làm theo hướng dẫn là được, chủ yếu ấn `Next` thôi.

Sau khi setup xong sẽ có giao diện giống như thế này:

![](https://i.imgur.com/SERbqLf.png)

Tại mục `Destination Address` sẽ là nơi bạn setup Gmail cá nhân để nhận và gửi email.

![](https://i.imgur.com/SXU7K4U.png)

Giờ quay lại `Domain` > `DNS` > `Records`. Tìm TXT record có giá trị bắt đầu là `v=spf1`.

![](https://i.imgur.com/jwxCUn4.png)

Chỉnh sửa nó theo định dạng sau, ví dụ domain của mình ở đây là `nhan.pt`, các bạn sửa theo domain của các bạn nhé.

Giá trị gốc sẽ giống như này:

```
v=spf1 include:_spf.mx.cloudflare.net ~all
```

Hãy thêm vào giá trị của Gmail:

```
v=spf1 a mx include:_spf.google.com include:_spf.mx.cloudflare.net ~all
```

Sau đó ấn `Save` là được.

## Cài đặt Gmail allias

Trên trang Gmail, hãy ấn vào nút bánh răng bên phải và chọn `See all settings`.

![](https://i.imgur.com/9ZfMHga.png)

Tại mục `Accounts and Import` > `Send mail as` chọn `Add another email address`, ở đây bạn hãy điền Email bạn muốn mà đã setup trên Cloudflare.

![](https://i.imgur.com/yEJL48g.png)

Sẽ có một Email gửi đến bạn để verify, sau khi verify xong mình đặt làm mặt định ở mục `make default` luôn để không cần phải chọn mỗi khi gửi mail.

Vậy là xong, mình đã dùng Email này để gửi và nhận mail trong một năm nay ko có vấn đề gì cả, mọi người cứ yên tâm :D

![](https://i.imgur.com/XJSluve.png)

## Một số lưu ý

- Không để gửi email cho chính email Gmail gốc được.
- Nếu không nhận đc email verify khi cài đặt Gmail alias, có thể lên Cloudflare Email setup routing sang một email khác.
- Khi link với các app mail như Apple Mail, bạn phải điền mail mặc định mà bạn muốn gửi đi như trong hình nhé.

![](https://i.imgur.com/YqaiH3m.png)