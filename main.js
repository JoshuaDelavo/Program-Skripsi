//impor modul app untuk lifecycle aplikasi dan modul browserwindow untuk mengelola jendela aplikasi
const { app, BrowserWindow } = require('electron')
//menyertakan modul Node.js 'path'
const path = require('path')

//fungsi untuk memuat index.html ke browserwindow
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

//memanggil fungsi createWindow untuk membuka jendela
app.whenReady().then(() => {
  createWindow()
})

//memanggil fungsi quit untuk pengguna yang tidak menggunakan macOs (darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


