# 🍁 KAZUHA VIBE PORTFOLIO - MASTER ARCHITECTURE & EXECUTION PLAN

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW & AESTHETICS)
- **Mục tiêu:** Xây dựng trang Portfolio cá nhân thể hiện tư duy logic, điềm tĩnh nhưng linh hoạt và sáng tạo. Phục vụ mục đích giới thiệu bản thân, kỹ năng và các dự án đến các nhà tuyển dụng, đặc biệt trong lĩnh vực An toàn Thông tin (Information Security).
- **Vibe/Chủ đề:** Phong cách "Kazuha" - Lãng khách, gió, lá phong rơi. Tinh tế, gọn gàng, mang lại cảm giác bình yên nhưng chuyên nghiệp.
- **Màu sắc chủ đạo (RAG Context):** - Nền tối (Dark Mode default): `#0a0a0a` hoặc xanh đen sâu thẳm.
  - Điểm nhấn (Accent): Xanh ngọc bích nhạt (Pastel Green - `#a8e6cf`), Đỏ phong, Cam hoàng hôn.
  - Hiệu ứng vật liệu: Kính mờ (Glassmorphism) cho các thành phần nổi (Navbar, Buttons).
- **Bố cục (Layout):** Hệ thống dạng Thẻ (Card-based UI) bo góc mềm mại, hiển thị mượt mà trên cả PC và Mobile. Căn giữa màn hình chính.

## 2. KIẾN TRÚC DỮ LIỆU TẬP TRUNG (CENTRALIZED DATA ARCHITECTURE)
**Quy tắc tối thượng:** Tuyệt đối KHÔNG hardcode văn bản, đường dẫn ảnh, hay cấu hình hạt vào bên trong các React Components. 
- Mọi dữ liệu có thể thay đổi phải được quản lý tại một tệp duy nhất: `src/config/site.ts` (hoặc `.json`).
- **Cấu trúc `site.ts` cần có:**
  - `profile`: Tên, Avatar, Bio ngắn, Chuyên môn.
  - `socialLinks`: Github, LinkedIn, Email...
  - `sections`: Nội dung cho các khối Story, Arsenal (Kỹ năng), Gallery, Values.
  - `particlesConfig`: Mảng chứa đường dẫn các file ảnh lá phong (vd: `['/assets/leaf1.png', '/assets/leaf2.png']`), giới hạn số lượng hạt, tốc độ gió.
- **Mục đích:** Giúp chủ dự án dễ dàng thay đổi nội dung, ảnh bìa, vật thể rơi chỉ bằng cách sửa text trong file config mà không cần chạm vào logic UI.

## 3. KHUNG NHIỆM VỤ CHO AI AGENT (AIKAF FRAMEWORK)
Bất kỳ Agent nào thực thi dự án này phải tuân thủ vai trò sau:
- **Actor:** Senior Frontend Engineer & UI/UX Expert. Chuyên gia về Next.js 14 (App Router), Tailwind CSS, Framer Motion và tsParticles.
- **Intent:** Viết code module hóa cao, tách biệt rõ Data và UI. Đảm bảo giao diện 60FPS.
- **Knowledge:** Chỉ sử dụng cấu hình Tailwind bằng mã Hex (không dùng hsl). Sử dụng tsParticles v3 syntax (`shape.type: "image"`). Navbar phải dùng `fixed z-[9999]`.
- **Audience:** Người xem là các chuyên gia kỹ thuật, nhà tuyển dụng. Cần sự chỉn chu, không lỗi vặt, responsive hoàn hảo.
- **Format:** Code sạch, xuất ra toàn bộ nội dung file cần tạo/sửa. Bắt buộc có comment giải thích luồng dữ liệu.

## 4. QUY TRÌNH TỰ ĐỘNG HÓA & PROMPT CHAINING (WORKFLOW)
Dự án được chia thành 4 Phase để Agent thực thi tuần tự, tránh tràn bộ nhớ (Context Window):
- **Phase 1 - Foundation & Config:** Khởi tạo Next.js, thiết lập chính xác `postcss.config.js`, `tailwind.config.ts`, `globals.css` và tạo tệp trung tâm `src/config/site.ts`.
- **Phase 2 - UI Skeleton & Layout:** Dựng Navbar (glassmorphism, z-index cao), cấu trúc Card layout dựa trên dữ liệu từ `site.ts`. Xử lý Responsive (Mobile/PC).
- **Phase 3 - The Wind (tsParticles):** Tích hợp hiệu ứng lá phong rơi, cấu hình xoay ngẫu nhiên, tự động điều chỉnh số lượng hạt dựa trên thiết bị (Mobile ít hạt hơn PC để chống lag).
- **Phase 4 - Features (i18n & Theme):** Hoàn thiện logic đa ngôn ngữ (VI/EN) và chuyển đổi Sáng/Tối với hiệu ứng mượt mà.

## 5. CƠ CHẾ TỰ PHÊ BÌNH & TỐI ƯU HÓA (SELF-CRITIQUE & QA)
Trước khi xuất code cho mỗi Phase, Agent BẮT BUỘC phải chạy luồng tự kiểm tra (Self-QA):
1. **Kiểm tra Hardcode:** "Tôi có lỡ gõ cứng đoạn text nào vào thẻ HTML không? Nếu có, chuyển ngay vào `site.ts`."
2. **Kiểm tra Layout/Z-index:** "Navbar có nguy cơ bị particles đè lên không? (Phải có `z-[9999]`). Các nút bấm có bị chặn sự kiện click không? (Dùng `pointer-events-auto`)."
3. **Kiểm tra Tương phản (Accessibility):** "Màu chữ trên các khối kính mờ có đọc được ở cả Dark Mode và Light Mode không?"
4. **Kiểm tra Lỗi tiềm ẩn:** "Cú pháp tsParticles đã đúng chuẩn v3 chưa? Tailwind đã trỏ đúng vào thư mục `src/` chưa?"

## 6. TRIỂN KHAI THỰC TẾ (CI/CD INTEGRATION)
- **GitHub:** Code phải được commit thường xuyên. Tệp `.gitignore` phải chuẩn bị sẵn sàng để loại bỏ `node_modules` và `.next`.
- **Vercel/API:** Hệ thống phải đảm bảo build thành công (`npm run build` không có lỗi Type/ESLint) để Vercel tự động deploy mỗi khi nhánh `main` được cập nhật.