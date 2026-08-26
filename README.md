# Hastane Randevu Operasyon Paneli

AI destekli çağrı, randevu ve mikroservis akışlarını izlemek için geliştirilen React 18 tabanlı frontend uygulamasıdır. Panel salt okunurdur ve telefon numaralarını her zaman maskeli gösterir.

## Kurulum

Gereksinim: Node.js 20 veya üzeri.

```bash
npm install
cp .env.example .env
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır. `.env.example` içinde `VITE_USE_MOCKS=true` olduğu sürece backend gerektirmeden hastane demo verileri kullanılır.

Demo hesabı:

- E-posta: `operator@hastane.local`
- Şifre: `Demo123!`

## Docker ile çalıştırma

Docker Desktop açık ve Engine running durumundayken proje kökünde:

```bash
docker compose up --build -d
```

Uygulama `http://localhost:5173` adresinde demo verileriyle açılır. Container
Docker Desktop içinde `hastane-randevu-frontend` adıyla görüntülenir.

Çalışan API Gateway'e bağlanmak ve yalnızca backend'de henüz bulunmayan login
endpoint'ini taklit etmek için:

```bash
docker compose -f docker-compose.yml -f docker-compose.real.yml up --build -d
```

Bu modda Gateway'in host makinede `http://localhost:8080` adresinde çalışması
gerekir. Gamze'nin hastane randevu servisi de `http://localhost:8087` adresinde
çalışmalıdır. Hastane/şube kataloğu ve randevular 8087'deki servisten; çağrı,
sistem durumu ve log verileri Gateway sözleşmesinden gelir. Login, backend ekibi
`/api/v1/auth/login` endpoint'ini sağlayana kadar MSW üzerinden çalışır.

Logları izlemek için:

```bash
docker compose logs -f frontend
```

Container'ı durdurup kaldırmak için:

```bash
docker compose down
```

Docker imajı Node.js aşamasında production build alır ve oluşan statik dosyaları
Nginx üzerinden sunar. `/api` trafiği ileride gerçek backend bağlantısı için
host makinedeki `http://localhost:8080` Gateway adresine, `/hospital-api` trafiği
ise `http://localhost:8087` hastane servisine yönlendirilir.

## Gerçek backend bağlantısı

```dotenv
VITE_API_BASE_URL=/api/v1
VITE_API_PROXY_TARGET=http://localhost:8080
VITE_HOSPITAL_API_BASE_URL=/hospital-api/v1
VITE_HOSPITAL_API_PROXY_TARGET=http://localhost:8087
VITE_WS_ENDPOINT=/api/v1/stream
VITE_USE_MOCKS=false
VITE_USE_MOCK_AUTH=true
VITE_OPERATIONS_API_ENABLED=false
```

Çağrı ve operasyon REST istekleri Vite proxy üzerinden API Gateway'e, hastane
kataloğu ve tıbbi randevu istekleri yeni hastane servisine gider. Canlı olaylar
SockJS + STOMP ile `/topic/events` kanalından alınır. JWT/WebSocket el sıkışması
başarısız olursa panel otomatik olarak 5 saniyelik REST polling moduna geçer.

Yeni hastane servisi randevu listesini zorunlu `patientPhone` parametresiyle
sunduğu için randevu ekranında önce hasta telefonu girilir. Telefon URL'ye
yazılmaz ve sonuçlarda daima maskeli gösterilir. Backend'de henüz ID ile tekil
randevu okuma endpoint'i bulunmadığından detay, liste sonucuyla birlikte açılır.

`VITE_OPERATIONS_API_ENABLED=false` olduğunda çağrı, log, sistem sağlığı ve
WebSocket istekleri durdurulur; eksik backend modülleri için kullanıcıya
bilgilendirme ekranı gösterilir. API Gateway bu sözleşmeleri sağladığında değer
`true` yapılarak modüller yeniden etkinleştirilir.

Backend'de henüz `/api/v1/auth/login` bulunmadığından geliştirme ortamında
`VITE_USE_MOCK_AUTH=true` kullanılabilir. Üretimde bu değer `false` olmalı ve
planlanan LoginRequest/LoginResponse sözleşmesi backend tarafından sağlanmalıdır.

## Komutlar

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
npm run preview
```

## Ekranlar

- `/dashboard`: canlı çağrı sayaçları, filtre ve çağrı listesi
- `/calls/:callId`: çağrı, randevu, timeline ve transcript özeti
- `/appointments`: tarih/şube/durum filtreli randevu listesi
- `/appointments/:appointmentId`: salt okunur randevu detayı
- `/system`: servis sağlığı ve canlı log akışı

## Mimari

Sunucu verisi TanStack Query, oturum ve ortak UI durumu Zustand, form doğrulaması React Hook Form + Zod ile yönetilir. Backend DTO'ları `src/api/contracts.ts` dosyasında tutulur. `src/mocks` gerçek endpoint biçimlerini taklit eden MSW handler ve hastane fixture'larını içerir.
