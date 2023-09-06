```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "activateRule" || request.message === "deactivateRule") {
    let url = `https://${request.domain}-admin.okta.com/api/v1/groups/rules/${request.ruleId}/lifecycle/${request.message === "activateRule" ? "activate" : "deactivate"}`;
    fetch(url, {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "x-okta-xsrftoken": request.token,
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": `https://${request.domain}-admin.okta.com/admin/groups`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    }).then(response => {
      if (response.ok) {
        sendResponse({status: 'success'});
      } else {
        sendResponse({status: 'error'});
      }
    }).catch(error => {
      sendResponse({status: 'error', error: error});
    });
    return true;  // Will respond asynchronously.
  }
});
```