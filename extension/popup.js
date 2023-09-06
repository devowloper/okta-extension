```javascript
document.addEventListener('DOMContentLoaded', function() {
    let activateButton = document.getElementById('activate');
    let deactivateButton = document.getElementById('deactivate');

    activateButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "activateRule"});
        });
    });

    deactivateButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "deactivateRule"});
        });
    });
});
```