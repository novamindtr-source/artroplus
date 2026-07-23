const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

let mainWindow;

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

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
