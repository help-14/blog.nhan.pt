---
layout: page.njk
title: Virtual machine trên Truenas Scale không vào được LAN
description: Sửa lỗi máy ảo trên Truenas Scale không kết nối được vào mạng LAN
cover: https://www.truenas.com/wp-content/uploads/2022/02/SCALE-Dashboard.jpg
author: Phan Nhan
time: 02/24/2023
timestamp: 1677255645296
tags:
  - linux
  - truenas
---

Đợt vừa rồi cải tổ lại đống homelab ở nhà, mình chuyển qua dùng tập trung trên TrueNas chứ không còn sử dụng Proxmox nữa vì nhu cầu không đến và cần truy cập trực tiếp lên dữ liệu trong nas. Chủ yếu là mình chạy Docker trong K3s của TrueNas và 1 con VM cho cloud print và Proxy, tuy nhiên Proxy thử cả Wireguard và V2ray đều không vào được các IP trong Lan (và các pod Docker).

## Tạo một interface Bridge cho Truenas

Mặc định sau khi cài xong TrueNas, mục Network của bạn sẽ trông như thế này:

![Truenas scale network](https://i.imgur.com/oBtl7bh.jpg)

Mặc định sau khi tạo VM hay Docker pod, mạng của bạn cũng sẽ được trỏ thẳng vào đây, dẫn tới conflict và không thể phân giải được IP trong local. Cách fix khá đơn giản như sau:

* Dừng toàn bộ VM và Docker đang chạy lại nếu không sẽ không thực hiện được các bước dưới.

* Edit interface mạng hiện có, bỏ chọn DHCP và xoá IP nếu có *

![edit interface](https://i.imgur.com/8ZRxwlA.png)

* Tạo một interface bridge (ví dụ tên là br0), chọn bridge vào mạng gốc ở trên và set IP vào giống mạng gốc *

![new interface](https://i.imgur.com/73kJrCW.png)

* Try và Apply thay đổi *

Nếu thực hiện đúng Truenas sẽ thử mạng tầm 10-20 giây và cho phép thay đổi mạng của bạn. Lúc này bạn hãy restart lại Truenas nhé, rất quan trọng đó.

* Sau khi restart thì hãy sửa lại Global Configuration nhé vì nó sẽ mất *

![Edit Global Configuration](https://i.imgur.com/R5bqWJV.png)

## Sửa mạng cho Virtual Machine

Sau khi hoàn thành bước trên, bạn cần sửa lại NIC của VM và trỏ về bridge br0 vừa tạo.

![Edit VM devices](https://i.imgur.com/goAbejK.png)

![Edit VM NIC](https://i.imgur.com/ZRN0AzX.png)

![Edit VM NIC Bridge](https://i.imgur.com/4xx75Qc.png)

## Sửa mạng cho Docker

Sau khi tạo bridge br0, Docker của bạn sẽ không chạy được do Kubernetes Settings mất thông tin mạng. Bạn cần chỉnh sửa lại như sau để Docker hoạt động bình thường.

![Edit Kubernetes Settings](https://i.imgur.com/yzhXQIT.png)

![Edit Kubernetes network](https://i.imgur.com/YyNAA9h.png)


Như vậy là Truenas của bạn sẽ hoạt động trở lại bình thường, VM sẽ có thể truy cập vào Docker và ngược lại. Hẹn gặp lại các bạn sau khi mình gặp lỗi mới :)))