const { ipcRenderer } = window.require('electron');
const version = document.getElementById('version');

ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, { version }) => {
	ipcRenderer.removeAllListeners('app_version');
	version.innerText = 'Version ' + version;
});
