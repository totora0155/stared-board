const pagePath = chrome.extension.getURL('index.html');

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({url: pagePath});
});
