const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: `${__dirname}/preload.js`,
		},
	});

	mainWindow.loadFile('index.html');
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', () => {
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform === 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('app_version', (e) => {
	e.sender.send('app_version', { version: app.getVersion() });
});
