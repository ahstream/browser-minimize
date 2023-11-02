console.info('serviceWorker.js begin');

import { defaultOptions, overrideOptions } from '../config/config';
import { initStorageWithOptions, getStorageData } from '@ahstream/hx-lib';

chrome.runtime.onInstalled.addListener(() => {
  initStorageWithOptions(defaultOptions, overrideOptions);
  console.info('Extension successfully installed!');
});

chrome.action.onClicked.addListener(async (tab) => {
  console.log('tab', tab);
  const storage = await getStorageData();
  if (storage.options.CLOSE_TABS_BUT_ME) {
    return closeTabsButOneMinimizeWindow(tab.id);
  }
  if (storage.options.CLOSE_TABS_BUT_ONE_MINIMIZE) {
    return closeTabsButOneMinimizeWindow(tab.id, storage.options.CLOSE_BUT_ONE_URL);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.info('Received message; request, sender:', request, sender);
  switch (request.cmd) {
    default:
      break;
  }
  sendResponse();
});

// HELPER FUNCTIONS

function closeTabsButOneMinimizeWindow(senderTabId, url) {
  closeTabsButOne(senderTabId, url);
  minimizeCurrentWindow();
  return true;
}

function closeTabsButOne(senderTabId, url) {
  if (url) {
    chrome.tabs.update(senderTabId, { url });
  }
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      console.log('tab', tab);
      if (senderTabId === tab.id) {
        return;
      }
      chrome.tabs.remove(tab.id, () => console.log(`Close tab: ${tab.url}`));
    });
  });
  return true;
}

function minimizeCurrentWindow() {
  chrome.windows.getCurrent((win) => {
    console.log(win);
    chrome.windows.update(win.id, { state: 'minimized' });
  });
}
