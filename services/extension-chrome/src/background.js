chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "onIconClick.js"});
});

chrome.tabs.onUpdated.addListener(() => {
    console.log('Updated');
});

chrome.alarms.create({periodInMinutes: 1});
chrome.alarms.onAlarm.addListener(function() {
    console.log("Hello, world!", new Date())
});