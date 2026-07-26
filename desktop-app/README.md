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

## Güncelleme Bildirimi (sıfır riskli tasarım)

Uygulama gerçek bir masaüstü programı gibi çalışır: veriler ve arayüz
`app/index.html` içinde, bilgisayarda yerel olarak saklanır, internet
olmadan da açılır.

Güncelleme kontrolü **bilinçli olarak "sadece bildirim" şeklinde** kuruldu,
otomatik indirme/kurulum YAPMAZ — hiçbir üçüncü parti güncelleme paketi
(electron-updater vb.) kullanılmıyor, ek bir GitHub deposu gerekmiyor, ve
uygulama hiçbir zaman kendi kendine bir dosyayı indirip çalıştırmıyor. Bu,
"bir yerden otomatik indirilen kodun sessizce çalıştırılması" riskini
tamamen ortadan kaldırır:

1. Program açılışta, sizin kendi sitenizdeki (artroplusanel.com) küçük bir
   `desktop-version.json` dosyasını okur (sadece okur, `{"version":"1.0.2","url":"..."}`
   gibi düz metin).
2. Kayıtlı sürüm, kendi sürümünden yeniyse bir bildirim penceresi açar.
3. Kullanıcı "İndirme Sayfasını Aç" derse, tarayıcıda sizin kontrolünüzdeki
   indirme sayfası açılır — kurulum dosyasını indirip çalıştırmak tamamen
   kullanıcının elindedir, program adına otomatik hiçbir şey yapılmaz.

Yeni bir sürüm duyurmak istediğinizde, kendi site barındırmanıza (mevcut
artroplusanel.com alanına) şunları eklemeniz yeterli:
- Yeni `.exe` kurulum dosyası (herhangi bir klasöre)
- `desktop-version.json` adında küçük bir dosya, örnek içerik:
  ```json
  { "version": "1.0.2", "url": "https://artroplusanel.com/downloads/Artroplus-Setup-1.0.2.exe" }
  ```

`package.json` içindeki `"version"` alanını her yeni derlemede artırmayı
unutmayın (örn. 1.0.1 → 1.0.2) ki karşılaştırma doğru çalışsın.

## Diğer Notlar

- Tüm veriler bilgisayarındaki tarayıcı deposunda (localStorage) saklanır.
- Bulut senkronizasyonunu (Supabase) aktifleştirmek istersen `app/sync-config.js`
  dosyasını düzenle.
