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

- Uygulama, `app/index.html` dosyasını kendi penceresinde açar; tüm veriler
  bilgisayarındaki tarayıcı deposunda (localStorage) saklanır, internet gerekmez.
- Uygulamayı güncellemek istediğinde, `app/index.html` dosyasının yeni halini bu
  klasördeki `app/index.html` ile değiştirip 4. adımı tekrar çalıştırman yeterli.
- Bulut senkronizasyonunu (Supabase) aktifleştirmek istersen `app/sync-config.js`
  dosyasını düzenle.
