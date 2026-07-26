const { app, BrowserWindow, Menu, shell, dialog } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let mainWindow;

function setupAutoUpdate() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox(mainWindow, {
        type: "info",
        title: "Güncelleme Hazır",
        message: "Yeni bir Artroplus sürümü indirildi. Şimdi yeniden başlatıp kuralım mı?",
        buttons: ["Şimdi Yeniden Başlat", "Daha Sonra"],
        defaultId: 0,
        cancelId: 1,
      })
      .then((result) => {
        if (result.response === 0) autoUpdater.quitAndInstall();
      });
  });

  autoUpdater.on("error", (err) => {
    console.error("Güncelleme kontrolü başarısız:", err);
  });

  autoUpdater.checkForUpdates();
  setInterval(() => autoUpdater.checkForUpdates(), 4 * 60 * 60 * 1000);
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
          {
            label: "Güncellemeleri Kontrol Et",
            click: () => {
              if (app.isPackaged) autoUpdater.checkForUpdates();
              else dialog.showMessageBox(mainWindow, { message: "Güncelleme kontrolü sadece kurulu (paketlenmiş) uygulamada çalışır." });
            },
          },
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
  if (app.isPackaged) setupAutoUpdate();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
