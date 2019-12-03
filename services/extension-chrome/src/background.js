chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "onIconClick.js"});
});

chrome.tabs.onUpdated.addListener(() => {
    console.log('Updated');
});