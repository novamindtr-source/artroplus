# Artroplus Masaüstü Uygulaması

Bu klasör, Artroplus'u Windows (.exe) veya macOS (.dmg) için kurulabilir bir masaüstü
uygulamasına dönüştürmek üzere hazırlanmış Electron projesidir.

## Gereksinim

- [Node.js](https://nodejs.org) (LTS sürüm, kurulumu birkaç dakika sürer)

## Kurulum dosyasını (.exe / .dmg) üretme

1. Bu `desktop-app` klasörünü bilgisayarına indir.
2. Klasörün içinde bir terminal/komut istemi aç.
3. Bağımlılıkları kur:

   ```
   npm install
   ```

4. Kurulum dosyasını üret:

   - **Windows'ta çalışıyorsan** (.exe üretmek için):
     ```
     npm run dist:win
     ```
   - **macOS'ta çalışıyorsan** (.dmg üretmek için):
     ```
     npm run dist:mac
     ```

5. Üretilen dosyalar `release` klasöründe oluşur:
   - Windows: `Artroplus Setup <sürüm>.exe` (kurulum sihirbazı) ve taşınabilir bir `.exe`
   - macOS: `Artroplus-<sürüm>.dmg`

6. Kurulum dosyasını çalıştırıp Artroplus'u normal bir masaüstü programı gibi kur.

## Otomatik Güncelleme

Uygulama artık gerçek bir masaüstü programı gibi çalışır: veriler ve arayüz
`app/index.html` içinde, bilgisayarda yerel olarak saklanır, internet
olmadan da açılır. Ayrıca **electron-updater** ile gerçek oto-güncelleme
alt yapısı hazır — program açılışta (ve her 4 saatte bir) yeni sürüm olup
olmadığını arka planda kontrol eder, bulursa indirir ve kullanıcıya sorup
kurar.

Bunun çalışması için yeni sürümlerin bir yerde "yayınlanmış" (published)
olması gerekiyor. `package.json` içinde bunun için GitHub üzerinde
**`novamindtr-source/artroplus-desktop-releases`** adında küçük, sadece
kurulum dosyalarını barındıracak (kaynak kodu içermeyen) **herkese açık**
bir depo kullanacak şekilde ayarladım — ama bu depoyu henüz oluşturmadım,
sizin onayınızı bekliyorum (aşağıya bakın).

Yeni bir sürüm yayınlamak istediğinizde (Windows'ta):

```
npm run publish:win
```

Bu komut hem `.exe` kurulum dosyasını üretir hem de doğrudan o depoya
yükler; kullanıcıların hiçbir şey yapmasına gerek kalmaz, programları
kendiliğinden güncellenir. `package.json` içindeki `"version"` alanını her
yayından önce bir artırmayı unutmayın (örn. 1.0.1 → 1.0.2).

## Diğer Notlar

- Tüm veriler bilgisayarındaki tarayıcı deposunda (localStorage) saklanır.
- Bulut senkronizasyonunu (Supabase) aktifleştirmek istersen `app/sync-config.js`
  dosyasını düzenle.
