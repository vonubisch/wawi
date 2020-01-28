const overlay = document.querySelector('.wawi-ui-overlay');
overlay.addEventListener('click', function () {
    chrome.runtime.sendMessage('hide_ui');
});