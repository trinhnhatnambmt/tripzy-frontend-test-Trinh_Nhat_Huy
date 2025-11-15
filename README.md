# Tripzy
-   Link deploy: https://tripzy-frontend-test-trinh-nhat-huy.vercel.app/

## 🚀 Hướng dẫn chạy project

### Yêu cầu hệ thống

-   Node.js >= 18.x
-   npm, yarn, hoặc pnpm

### Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# Sử dụng yarn
yarn install

# Sử dụng pnpm
pnpm install
```

### Chạy development server

```bash
# Sử dụng npm
npm run dev

# Sử dụng yarn
yarn dev

# Sử dụng pnpm
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

### Build cho production

```bash
# Sử dụng npm
npm run build

# Sử dụng yarn
yarn build

# Sử dụng pnpm
pnpm build
```

### Chạy production server

```bash
# Sử dụng npm
npm start

# Sử dụng yarn
yarn start

# Sử dụng pnpm
pnpm start
```

### Linting

```bash
# Sử dụng npm
npm run lint

# Sử dụng yarn
yarn lint

# Sử dụng pnpm
pnpm lint
```

## 📁 Kiến trúc project

### Cấu trúc thư mục

```
tripzy/
├── components/          # React components
│   ├── contents/        # Content components (BusContent, etc.)
│   ├── forms/           # Form components (DatePicker, PassengerSelector, etc.)
│   └── ui/              # UI components từ shadcn/ui
├── lib/                 # Utility functions và validation
├── public/              # Static assets (images, icons)
└── src/
    ├── app/             # Next.js App Router
    │   ├── (root)/      # Route group cho main pages
    │   │   ├── page.tsx # Trang chủ
    │   │   └── search/  # Trang tìm kiếm
    │   ├── layout.tsx   # Root layout
    │   └── globals.css  # Global styles
    └── apis/            # API mocks và data
```

### Kiến trúc chính

-   **Next.js App Router**: Sử dụng App Router của Next.js 16 với file-based routing
-   **Route Groups**: Sử dụng `(root)` để nhóm các routes liên quan
-   **Component-based Architecture**: Tách biệt components theo chức năng
-   **Client & Server Components**: Kết hợp client components (`"use client"`) và server components
-   **Context API**: Sử dụng React Context cho shared state (DatePickerContext)
-   **Form Management**: React Hook Form cho form handling và validation
-   **URL State Management**: Query parameters trong URL để quản lý state tìm kiếm

## 📚 Thư viện đã chọn

### Core Framework

-   **Next.js 16.0.3**: React framework với App Router, SSR, và routing
-   **React 19.2.0**: UI library
-   **TypeScript 5**: Type safety và developer experience

### Styling

-   **Tailwind CSS 4**: Utility-first CSS framework
-   **shadcn/ui**: Component library dựa trên Radix UI và Tailwind CSS
-   **Geist Font**: Font family từ Vercel

### UI Components & Libraries

-   **@radix-ui/react-popover**: Accessible popover component
-   **@radix-ui/react-slot**: Flexible component composition
-   **lucide-react**: Icon library
-   **react-day-picker**: Date picker component
-   **class-variance-authority**: Variant management cho components
-   **clsx & tailwind-merge**: Utility cho className management

### Form & Validation

-   **react-hook-form**: Form state management và validation
-   **date-fns**: Date manipulation và formatting

### UX & Notifications

-   **sonner**: Toast notification library

## 🔧 Các quyết định kỹ thuật chính

### 1. Next.js App Router

-   **Lý do**: App Router cung cấp routing hiện đại, server components, và layout nesting
-   **Lợi ích**: Better performance, improved developer experience, và built-in optimizations

### 2. TypeScript với Strict Mode

-   **Lý do**: Type safety giúp phát hiện lỗi sớm và cải thiện code quality
-   **Cấu hình**: Strict mode enabled trong `tsconfig.json`

### 3. Path Aliases (`@/*`)

-   **Lý do**: Import paths ngắn gọn và dễ maintain
-   **Cấu hình**: `@/*` trỏ đến root directory

### 4. shadcn/ui Components

-   **Lý do**: Accessible, customizable, và copy-paste friendly
-   **Style**: New York style với neutral base color
-   **Lợi ích**: Full control over components, không phụ thuộc vào npm package

### 5. React Hook Form

-   **Lý do**: Performance tốt với uncontrolled components và validation mạnh mẽ
-   **Tích hợp**: Custom validation logic trong `lib/busValidation.ts`

### 6. URL Query Parameters cho State

-   **Lý do**: Shareable URLs, browser back/forward support, và SEO friendly
-   **Format**: `/search?mode=bus&from=...&to=...&dep=2025-01-03&ret=...&pax=2`
-   **Lợi ích**: State được lưu trong URL, dễ dàng bookmark và share

### 7. Context API cho DatePicker

-   **Lý do**: Shared state giữa các DatePicker components
-   **Implementation**: `DatePickerContext` để quản lý calendar state

### 8. Client Components Strategy

-   **Lý do**: Components cần interactivity (forms, date pickers, toasts)
-   **Pattern**: Sử dụng `"use client"` directive cho components cần client-side features

### 9. Date Formatting với date-fns

-   **Lý do**: Lightweight, tree-shakeable, và type-safe
-   **Usage**: Format dates cho display và URL parameters

### 10. Toast Notifications với Sonner

-   **Lý do**: Modern, accessible, và customizable toast system
-   **Integration**: Toaster component trong root layout

## 🛠️ Scripts có sẵn

-   `dev`: Chạy development server
-   `build`: Build project cho production
-   `start`: Chạy production server
-   `lint`: Chạy ESLint để kiểm tra code quality

## 📝 Notes

-   Project sử dụng Next.js 16 với React 19
-   TypeScript strict mode enabled
-   Tailwind CSS 4 với PostCSS
-   ESLint configuration từ `eslint-config-next`
