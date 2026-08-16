# Mini Haber Portalı

Modern, sade ve profesyonel mini haber sitesi projesi.

## Sistem Mimarisi

```text
yusacoder.com
      ↓
    Vercel
      ↓
  Frontend
      ↓
api.yusacoder.com
      ↓
    Render
      ↓
   Node.js
      ↓
   Supabase
      ↓
 PostgreSQL
```

## Klasör Yapısı

```text
.
├── frontend/
│   ├── index.html
│   ├── haber.html
│   ├── kategori.html
│   ├── script.js
│   └── style.css
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   ├── routes/
│   │   ├── news.js
│   │   └── categories.js
│   ├── controllers/
│   │   └── newsController.js
│   └── services/
│       └── supabase.js
│
├── vercel.json
├── .gitignore
└── README.md
```

---

## Adım Adım Kurulum ve Yayınlama (Deployment) Rehberi

### 1. GitHub Repository Oluşturma
1. GitHub hesabınıza giriş yapın ve yeni bir **Public** veya **Private** repository oluşturun.
2. Yerel projenizi bu repository'ye bağlayın ve push edin:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Mini Haber Portal"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
   git push -u origin main
   ```

---

### 2. Supabase Database Oluşturma & SQL Tabloları
1. [Supabase](https://supabase.com) paneline giriş yapıp yeni bir proje oluşturun.
2. Dashboard üzerinden **SQL Editor** bölümüne gidin.
3. Aşağıdaki SQL sorgusunu çalıştırarak `news` tablosunu ve örnek verileri oluşturun:

```sql
-- Create news table
CREATE TABLE news (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) DEFAULT 'YusaCoder',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Sample Data
INSERT INTO news (title, slug, description, content, image_url, category, author, published)
VALUES
(
  'Yeni Teknoloji Duyuruldu',
  'yeni-teknoloji-duyuruldu',
  'Yeni teknoloji hakkında kısa açıklama.',
  'Haberin detaylı içeriği burada bulunacak. Yeni nesil işlemciler ve yapay zeka entegrasyonu ile performans iki katına çıkıyor.',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'Teknoloji',
  'YusaCoder',
  true
),
(
  'Süper Lig''de Şampiyonluk Yarışı Kızışıyor',
  'super-ligde-sampiyonluk-yarisi-kizisiyor',
  'Ligin son haftalarına girilirken heyecan zirvede.',
  'Takımlar son haftalarda puan kaybı yaşamamak için sahaya tüm güçleriyle çıkıyor.',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2',
  'Spor',
  'YusaCoder',
  true
),
(
  'Anime Dünyasında Yeni Sezon Müjdesi',
  'anime-dunyasinda-yeni-sezon-mujdesi',
  'Popüler anime serisinin yeni sezon yayın tarihi belli oldu.',
  'Merakla beklenen yeni sezon önümüzdeki ay izleyicilerle buluşacak.',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477',
  'Anime',
  'YusaCoder',
  true
);
```

4. **Project Settings -> API** adımlarına giderek `SUPABASE_URL` ve `anon` `SUPABASE_KEY` değerlerinizi kopyalayın.

---

### 3. Render Web Service (Backend) Kurulumu
1. [Render](https://render.com) paneline girip **New + -> Web Service** seçin.
2. GitHub repository'nizi bağlayın.
3. Ayarları şu şekilde yapın:
   - **Name**: `yusacoder-news-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables** bölümüne şu değişkenleri ekleyin:
   - `SUPABASE_URL` = `(Supabase URL adresiniz)`
   - `SUPABASE_KEY` = `(Supabase anon key değeriniz)`
5. Servisi oluşturun (Deploy).

---

### 4. Custom Domain (`api.yusacoder.com`) Ekleme
1. Render paneline gidin, oluşturduğunuz Web Service içerisinden **Settings -> Custom Domains** kısmına gelin.
2. `api.yusacoder.com` alan adını ekleyin.
3. Render size yönlendirme için bir **CNAME** adresi verecektir (Örn: `yusacoder-news-backend.onrender.com`).

---

### 5. Squarespace DNS Ayarları
1. Squarespace / Domain sağlayıcı panelinize girin.
2. **DNS Settings** bölümüne gidin.
3. Yeni bir **CNAME Record** ekleyin:
   - **Host / Name**: `api`
   - **Type**: `CNAME`
   - **Data / Target**: `(Render'ın verdiği *.onrender.com adresi)`
4. Kaydedip DNS yayılımını (propagation) bekleyin.

---

### 6. Frontend Deployment (Vercel)
1. [Vercel](https://vercel.com) paneline giriş yapın ve **Add New -> Project** seçin.
2. GitHub repository'nizi seçin.
3. **Root Directory** olarak `frontend` klasörünü seçin.
4. Framework Preset: **Other / Static HTML**
5. **Deploy** butonuna tıklayın.
6. Vercel panelinden isteğe bağlı olarak ana domaininizi (`yusacoder.com`) Vercel projenize bağlayın.

---

### 7. Test Etme
1. `https://api.yusacoder.com/api/health` adresine giderek backend servisinizin `{"status":"ok"}` verdiğini doğrulayın.
2. `https://api.yusacoder.com/api/news` adresine giderek haber listesinin JSON olarak döndüğünü doğrulayın.
3. Frontend sitenize girerek haberlerin listelendiğini, arama özelliğinin ve detay sayfalarının çalıştığını test edin.
