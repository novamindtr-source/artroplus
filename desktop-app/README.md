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

## Notlar

- Uygulama açıldığında canlı siteyi (artroplusanel.com) kendi penceresinde
  gösterir. Bu sayede **otomatik güncellenir** — sitede yapılan her güncelleme
  bir sonraki açılışta otomatik olarak görünür, ayrıca bir işlem yapmana
  gerek yoktur.
- İnternet yoksa uygulama otomatik olarak bu klasördeki `app/index.html`
  yedek kopyasını açar (internetsiz de çalışmaya devam eder, ama o kopya
  ancak sen manuel güncellersen yeni özellikleri gösterir).
- Tüm veriler bilgisayarındaki tarayıcı deposunda (localStorage) saklanır.
- Bulut senkronizasyonunu (Supabase) aktifleştirmek istersen `app/sync-config.js`
  dosyasını düzenle.
