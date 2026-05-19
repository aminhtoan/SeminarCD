# Fullstack E-Commerce Web Application (Microservices)

Dự án được ứng dụng kiến trúc Microservices cho BE sử dụng Spring Boot và Frontend React/Vite. Toàn bộ các dịch vụ đã được chuẩn bị sẵn `docker-compose.yml` để chạy chỉ với một lệnh.

## 🚀 Hướng Dẫn Chạy Dự Án Bằng Docker

Yêu cầu máy tính của bạn đã cài đặt **Docker** và **Docker Compose**. 

**1. Mở Terminal (PowerShell / Command Prompt)**
Vào thư mục chứa source code của dự án:
```sh
cd Tuan_9/Fullstack-E-commerce-web-application
```

**2. Khởi tạo toàn bộ dự án**
Chạy lệnh khởi động Docker, tham số `--build` giúp hệ thống đóng gói các thay đổi mới nhất của BE và FE thành các docker images tương ứng:
```sh
docker-compose up --build -d
```
> `Lưu ý`: Lần build đầu tiên diễn ra hơi lâu một chút vì Docker cần tải và cài đặt các file thư viện cho Java, tải Node.js phục vụ build Vite React. Từ những lần sau sẽ rất nhanh chóng. Cờ `-d` giúp trả lại terminal sau khi chạy ngầm thành công.

**3. Xem logs (tùy chọn)**
Để theo dõi quá trình chạy của một service nào đó, ví dụ `service-registry`:
```sh
docker logs -f ecom_service_registry
```
Hoặc xem toàn bộ log:
```sh
docker-compose logs -f
```

---

## 🔗 Các Liên Kết Tuy cập (Links)

Sau khi hệ thống khởi động và chạy ổn định toàn bộ các module (Service Registry, API Gateway, các modules, và React), bạn có thể truy cập các thành phần theo đường link sau:

### Tầng Ứng Dung Front-end
- **🌐 Giao Diện Người Dùng (Frontend):** [http://localhost:5173](http://localhost:5173)

### Tầng Quản Lý Chung Backend
- **🔭 Service Registry (Eureka Dashboard):** [http://localhost:8761](http://localhost:8761) 
  *(Vào đây để kiểm tra xem các service backend như auth-service, product-service... đã đăng ký thành công chưa).*
- **🚪 API Gateway:** [http://localhost:8080](http://localhost:8080)
  *(Frontend sẽ gọi API thông qua cổng này, ví dụ gọi API Authentication qua `http://localhost:8080/api/auth-service/`).*
  
### Tầng Database
- **🗄️ MongoDB URI (Dùng kết nối từ db tools ngoài như Compass):** `mongodb://localhost:27017`

### Các Microservices Nội Bộ (Chạy Ẩn Bên Trong)
Nếu muốn gọi trực tiếp (chỉ để mục đích test bằng Postman thay vì gọi qua API Gateway), bạn có thể gọi vào các cổng sau:
- **Auth Service:** [http://localhost:9030](http://localhost:9030)
- **User Service:** [http://localhost:9050](http://localhost:9050)
- **Product Service:** [http://localhost:9010](http://localhost:9010)
- **Category Service:** [http://localhost:9000](http://localhost:9000)
- **Cart Service:** [http://localhost:9060](http://localhost:9060)
- **Order Service:** [http://localhost:9070](http://localhost:9070)
- **Notification Service:** [http://localhost:9020](http://localhost:9020)

---

## 🛑 Cách Dừng Và Xóa Môi Trường
Khi bạn code xong hoặc muốn tắt toàn bộ containers của bộ máy Microservice này đi:
```sh
docker-compose down
```

Nếu muốn xóa toàn bộ data trong database Mongo (làm mới project từ đầu):
```sh
docker-compose down -v
```