# Next.js + Strapi Blog Projesi

Bu proje Next.js frontend ve Strapi backend kullanarak oluşturulmuş modern bir blog uygulamasıdır.

## 🚀 Proje Yapısı

```
├── blog-frontend/          # Next.js Frontend
│   ├── app/
│   │   ├── Blog/          # Blog sayfaları
│   │   ├── About/         # Hakkımda sayfası
│   │   └── layout.tsx     # Ana layout
│   └── components/        # React bileşenleri
│
└── my-project/            # Strapi Backend
    ├── src/api/           # API endpoints
    ├── config/            # Strapi konfigürasyonu
    └── public/uploads/    # Yüklenen dosyalar
```

## 🛠️ Kurulum

### Backend (Strapi) Kurulumu
```bash
cd my-project
npm install
npm run develop
```

### Frontend (Next.js) Kurulumu
```bash
cd blog-frontend
npm install
npm run dev
```

## 📋 Özellikler

- ✅ Modern dark theme tasarım
- ✅ Blog yazıları listeleme ve detay sayfaları
- ✅ Dinamik hakkımda sayfası
- ✅ Responsive tasarım
- ✅ Strapi CMS entegrasyonu
- ✅ TypeScript desteği

## 🌐 API Endpoints

- `GET /api/blogs` - Tüm blog yazıları
- `GET /api/blogs/:id` - Tek blog yazısı
- `GET /api/abouts` - Hakkımda bilgileri

## 📱 Sayfalar

- **Ana Sayfa**: Hoş geldin mesajı
- **Blog**: Blog yazıları listesi
- **Blog Detay**: Tek blog yazısı görüntüleme
- **Hakkımda**: Dinamik hakkımda sayfası

## 🎨 Teknolojiler

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Strapi 4, Node.js
- **Database**: SQLite (geliştirme)

## 📞 İletişim

- **GitHub**: [asinamli](https://github.com/asinamli)
- **Instagram**: [@asinamli](https://instagram.com/asinamli)
- **Email**: asinlamli@gmail.com
