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

## Gerçek backend bağlantısı

```dotenv
VITE_API_BASE_URL=/api/v1
VITE_API_PROXY_TARGET=http://localhost:8080
VITE_WS_ENDPOINT=/api/v1/stream
VITE_USE_MOCKS=false
```

REST istekleri Vite proxy üzerinden API Gateway'e gider. Canlı olaylar SockJS + STOMP ile `/topic/events` kanalından alınır. JWT/WebSocket el sıkışması başarısız olursa panel otomatik olarak 5 saniyelik REST polling moduna geçer.

Backend'de henüz `/api/v1/auth/login` bulunmadığından gerçek ortam login entegrasyonu için planlanan LoginRequest/LoginResponse sözleşmesi backend tarafından sağlanmalıdır.

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
