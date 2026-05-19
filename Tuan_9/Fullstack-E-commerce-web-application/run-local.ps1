# Script chạy toàn bộ dự án Local

Write-Host "1. Khởi động MongoDB qua Docker..." -ForegroundColor Green
docker-compose -f docker-compose-infra.yml up -d

Write-Host "2. Đợi MongoDB khởi động..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

$backendDir = "microservice-backend"

# Chạy Eureka Server đầu tiên!
Write-Host "3. Khởi động Service Registry (Eureka)..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd $backendDir\service-registry; ./mvnw spring-boot:run"
Write-Host "Đợi 15s cho Eureka Server sẵn sàng..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Danh sách các Backend Services
$services = @(
    "auth-service",
    "user-service",
    "product-service",
    "category-service",
    "cart-service",
    "order-service",
    "notification-service"
)

# Chạy các Microservices
Write-Host "4. Khởi động các Microservices..." -ForegroundColor Green
foreach ($service in $services) {
    Write-Host "Starting $service..." -ForegroundColor Cyan
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd $backendDir\$service; ./mvnw spring-boot:run"
    # Delay nhẹ để tránh bị quá tải CPU cùng lúc
    Start-Sleep -Seconds 8
}

# Chạy API Gateway cuối cùng cùng ở Backend
Write-Host "5. Khởi động API Gateway..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd $backendDir\api-gateway; ./mvnw spring-boot:run"
Start-Sleep -Seconds 10

# Chạy Frontend Vite
Write-Host "6. Khởi động Frontend..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm run dev"

Write-Host "Đã mở tất cả các cửa sổ Terminal cho từng Service. Kiểm tra các cửa sổ để xem log!" -ForegroundColor Green