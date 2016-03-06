const pagePath = chrome.extension.getURL('index.html');

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.query({url: pagePath}, (tabs) => {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, {active: true});
    } else {
      chrome.tabs.create({url: pagePath});
    }
  });
});
