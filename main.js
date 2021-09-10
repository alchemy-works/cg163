const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 840,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    const loadURLPromise = mainWindow.loadURL('https://cg.163.com/')

    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})