console.info('shortcuts.js begin', window?.location?.href);

import { getStorageItems } from '@ahstream/hx-lib';
import { initShortcutsPage, mountShortcutsPage } from '@ahstream/hx-chrome-lib';

initShortcutsPage();
const VALID_URLS = null;

getStorageItems(['options']).then((storage) => {
  mountShortcutsPage(VALID_URLS, [
    {
      cmd: 'close-tabs',
      callback: () => {
        chrome.runtime.sendMessage({ cmd: 'closeTabsButOne', url: storage.options.CLOSE_BUT_ONE_URL });
      },
    },
    {
      cmd: 'close-window',
      callback: () => {
        chrome.runtime.sendMessage({ cmd: 'closeWindow' });
      },
    },
    {
      cmd: 'close-tabs-minimize-window',
      callback: () => {
        chrome.runtime.sendMessage({ cmd: 'closeTabsButOneMinimizeWindow', url: storage.options.CLOSE_BUT_ONE_URL });
      },
    },
    {
      cmd: 'minimize-window',
      callback: () => {
        chrome.runtime.sendMessage({ cmd: 'minimizeWindow' });
      },
    },
  ]);
});
