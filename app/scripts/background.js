'use strict';

var pagePath = chrome.extension.getURL('index.html');

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: pagePath });
});