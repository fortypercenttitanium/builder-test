const { ipcRenderer } = require('electron');

ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, { version }) => {
	const versionContainer = document.getElementById('version');
	ipcRenderer.removeAllListeners('app_version');
	versionContainer.textContent = 'Version ' + version;
});

const notification = document.querySelector('.notification');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart-button');
const closeButton = document.querySelector('.close-btn');

closeButton.addEventListener('click', () => {
	notification.classList.add('hidden');
});

restartButton.addEventListener('click', () => {
	ipcRenderer.send('restart_app');
});

ipcRenderer.on('update_available', () => {
	ipcRenderer.removeAllListeners('update_available');
	message.textContent = 'A new update is available. Downloading...';
	notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
	ipcRenderer.removeAllListeners('update_downloaded');
	message.textContent =
		'Update downloaded. It will be installed on restart. Restart now?';
	restartButton.classList.remove('hidden');
	notification.classList.remove('hidden');
});
