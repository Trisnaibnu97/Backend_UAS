# 🚀 Backend API - Bang IB Shop (Online Store UTS)

Repository ini khusus memuat layanan REST API Backend untuk aplikasi e-commerce **Bang IB Shop** berbasis Node.js, Express, dan MySQL.

---

## 📁 Struktur Folder Backend
```text
backend/
├── config/             # Konfigurasi koneksi database MySQL & inisialisasi tabel
├── controllers/        # Logika bisnis (Produk, Pesanan, Kategori, Pengaturan Toko)
├── routes/             # Routing endpoint REST API (/api/products, /api/orders, dll)
├── data/               # Data dummy & berkas statis cadangan
├── server.js           # Entry point utama Express server
├── package.json        # Dependensi Node.js
└── tektok_shop_db.sql  # Dump database MySQL
```

---

## 🛠️ Cara Menjalankan Secara Lokal (Local Development)

1. **Install Dependensi:**
   ```bash
   npm install
   ```

2. **Konfigurasi Environment Variable (`.env`):**
   Salin berkas `.env.example` menjadi `.env` lalu sesuaikan konfigurasi database MySQL lokal kamu (XAMPP/MAMP/laragon):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=tektok_shop
   ```

3. **Jalankan Server:**
   ```bash
   npm start
   ```
   Server akan berjalan di `http://localhost:5000`.

---

## ☁️ Deployment ke Railway (Repository Terpisah)

Jika repository `backend` ini di-upload ke GitHub terpisah dari frontend:

1. Buat **Project Baru** di [Railway.app](https://railway.app/).
2. Tambahkan database **MySQL** dari katalog Railway.
3. Hubungkan repository GitHub backend kamu.
4. Di bagian **Variables** pada service backend, tambahkan variabel berikut (ambil dari tab *Connect* MySQL Railway):
   * `MYSQLHOST`
   * `MYSQLUSER`
   * `MYSQLPASSWORD`
   * `MYSQLDATABASE`
   * `MYSQLPORT`
5. Setelah di-deploy, buka endpoint otomatis berikut di browser untuk menginisialisasi tabel & 70 produk dummy:
   ```text
   https://[URL-RAILWAY-KAMU]/api/init-db
   ```
