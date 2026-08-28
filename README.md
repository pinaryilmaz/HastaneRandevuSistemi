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

Gamze'nin gerçek hastane backend'ine bağlanmak için:

```bash
docker compose -f docker-compose.yml -f docker-compose.real.yml up --build -d
```

Bu modda hastane randevu servisi host makinede `http://localhost:8087` adresinde
çalışmalıdır. Gerçek login, hastane/şube kataloğu, randevular, çağrılar, sistem
durumu, merkezi loglar ve WebSocket olayları bu servisten gelir.

Yerel gerçek backend hesabı:

- E-posta: `operator@hastane.local`
- Şifre: `password`

Logları izlemek için:

```bash
docker compose logs -f frontend
```

Container'ı durdurup kaldırmak için:

```bash
docker compose down
```

Docker imajı Node.js aşamasında production build alır ve oluşan statik dosyaları
Nginx üzerinden sunar. `/hospital-api` trafiği host makinedeki
`http://localhost:8087` hastane servisine yönlendirilir. `/api` yolu sistem
durumu, log ve SockJS/STOMP trafiğini aynı servise yönlendirir.

## Gerçek backend bağlantısı

```dotenv
VITE_API_BASE_URL=/api/v1
VITE_API_PROXY_TARGET=http://localhost:8087
VITE_HOSPITAL_API_BASE_URL=/hospital-api/v1
VITE_HOSPITAL_API_PROXY_TARGET=http://localhost:8087
VITE_WS_ENDPOINT=/api/v1/stream
VITE_USE_MOCKS=false
VITE_USE_MOCK_AUTH=false
VITE_CALLS_API_ENABLED=true
VITE_OBSERVABILITY_API_ENABLED=true
```

Login, çağrı, hastane kataloğu, tıbbi randevu, log ve sistem durumu istekleri
yeni hastane servisine gider. Çağrılar canlı olaylarla güncellenir; bağlantı
kesildiğinde 5 saniyelik REST polling otomatik olarak devreye girer.

Randevular Spring sayfalama, şube, durum ve tarih filtreleriyle listelenir.
Telefon araması isteğe bağlıdır; kullanıldığında E.164 biçimi doğrulanır, güvenli
`POST /medical-appointments/search` endpoint'ine gönderilir ve adres çubuğuna
yazılmaz. Detay sayfası randevuyu ID ile yeniden yükleyebilir.

`VITE_CALLS_API_ENABLED` çağrı panelini, `VITE_OBSERVABILITY_API_ENABLED` ise
merkezi log, sistem sağlığı ve WebSocket isteklerini ayrı ayrı kontrol eder.

Gerçek modda `/api/v1/auth/login` kullanılır. Bağımsız frontend geliştirmesinde
`VITE_USE_MOCK_AUTH=true` ile MSW login sözleşmesi kullanılabilir.

Docker Compose varsayılan olarak gerçek backend modunda derlenir. Backend
olmadan yalnızca arayüz geliştirmek için `VITE_USE_MOCKS=true` ve
`VITE_USE_MOCK_AUTH=true` değerleriyle ayrı bir geliştirme build'i alınabilir.

## Komutlar

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run test:e2e:real
npm run build
npm run preview
```

`test:e2e:real`, Docker ile çalışan frontend ve gerçek backend üzerinde Chrome kullanarak giriş,
çağrı detayı, randevu detayı ve sistem ekranını uçtan uca doğrular.

## Ekranlar

- `/dashboard`: canlı çağrı sayaçları, filtre ve çağrı listesi
- `/calls/:callId`: çağrı, randevu, timeline ve transcript özeti
- `/appointments`: tarih/şube/durum filtreli randevu listesi
- `/appointments/:appointmentId`: salt okunur randevu detayı
- `/system`: servis sağlığı ve canlı log akışı

## Mimari

Sunucu verisi TanStack Query, oturum ve ortak UI durumu Zustand, form doğrulaması React Hook Form + Zod ile yönetilir. Backend DTO'ları `src/api/contracts.ts` dosyasında tutulur. `src/mocks` gerçek endpoint biçimlerini taklit eden MSW handler ve hastane fixture'larını içerir.
