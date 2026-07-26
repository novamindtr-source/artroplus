const { app, BrowserWindow, Menu, shell, dialog } = require("electron");
const path = require("path");
const https = require("https");

let mainWindow;

const VERSION_CHECK_URL = "https://artroplusanel.com/desktop-version.json";

function compareVersions(a, b) {
  const pa = String(a).split(".").map(Number);
  const pb = String(b).split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 8000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error("HTTP " + res.statusCode));
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("timeout")));
  });
}

// Sadece kontrol eder ve bildirir; hiçbir dosya otomatik indirilip
// çalıştırılmaz. Kullanıcı "İndir" derse tarayıcıda kendi indirdiği
// sayfaya (artroplusanel.com üzerinde, sizin kontrolünüzde) yönlendirilir.
async function checkForUpdateNotifyOnly() {
  try {
    const info = await fetchJson(VERSION_CHECK_URL);
    const current = app.getVersion();
    if (info && info.version && compareVersions(info.version, current) > 0) {
      const result = await dialog.showMessageBox(mainWindow, {
        type: "info",
        title: "Yeni Sürüm Mevcut",
        message: `Yeni bir Artroplus sürümü (${info.version}) yayınlandı. Şu an ${current} sürümünü kullanıyorsunuz.`,
        detail: "İndirme sayfası tarayıcınızda açılacak; kurulum dosyasını indirip her zamanki gibi kurabilirsiniz.",
        buttons: ["İndirme Sayfasını Aç", "Daha Sonra"],
        defaultId: 0,
        cancelId: 1,
      });
      if (result.response === 0 && info.url) shell.openExternal(info.url);
    }
  } catch (e) {
    console.warn("Güncelleme kontrolü başarısız (önemli değil, uygulama normal çalışır):", e.message);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    icon: path.join(__dirname, "build", "icon.png"),
    title: "Artroplus",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.setMenu(
    Menu.buildFromTemplate([
      {
        label: "Artroplus",
        submenu: [
          { role: "reload", label: "Yenile" },
          { label: "Güncellemeleri Kontrol Et", click: () => checkForUpdateNotifyOnly() },
          { role: "toggleDevTools", label: "Geliştirici Araçları" },
          { type: "separator" },
          { role: "quit", label: "Çıkış" },
        ],
      },
      {
        label: "Görünüm",
        submenu: [
          { role: "resetZoom", label: "Yakınlaştırmayı Sıfırla" },
          { role: "zoomIn", label: "Yakınlaştır" },
          { role: "zoomOut", label: "Uzaklaştır" },
          { type: "separator" },
          { role: "togglefullscreen", label: "Tam Ekran" },
        ],
      },
    ])
  );

  mainWindow.loadFile(path.join(__dirname, "app", "index.html"));

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();
  if (app.isPackaged) checkForUpdateNotifyOnly();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
