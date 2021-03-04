const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.once('ready-to-show', () => {
		autoUpdater.checkForUpdatesAndNotify();
	});

	autoUpdater.on('update-available', () => {
		win.webContents.send('update_available');
	});

	autoUpdater.on('update-downloaded', () => {
		win.webContents.send('update_downloaded');
	});

	ipcMain.on('restart_app', () => {
		autoUpdater.quitAndInstall();
	});

	win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows.length === 0) {
		createWindow();
	}
});

ipcMain.on('app_version', (e) => {
	e.sender.send('app_version', { version: app.getVersion() });
});
