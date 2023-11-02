console.info('popup.js begin', window?.location?.href);

const CLOSE_BUT_ONE_URL = 'chrome://extensions/';

chrome.runtime.sendMessage({ cmd: 'closeTabsButOneMinimizeWindow', url: CLOSE_BUT_ONE_URL });
