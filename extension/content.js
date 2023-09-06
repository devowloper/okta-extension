```javascript
function injectCheckboxes() {
    const rulesTable = document.querySelector('[data-se="data-list-table"]');
    const rulesRows = rulesTable.querySelectorAll('tbody tr');

    rulesRows.forEach((row) => {
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkboxCell.appendChild(checkbox);
        row.prepend(checkboxCell);
    });
}

function createBulkActionButton() {
    const toolbar = document.querySelector('[data-se="data-list-toolbar"]');
    const bulkActionButton = document.createElement('button');
    bulkActionButton.textContent = 'Bulk Action';
    toolbar.appendChild(bulkActionButton);

    bulkActionButton.addEventListener('click', () => {
        const checkedRules = document.querySelectorAll('[data-se="data-list-table"] tbody tr input[type="checkbox"]:checked');
        const ruleIds = Array.from(checkedRules).map(checkbox => checkbox.closest('tr').querySelector('[data-se^="group-rule"]').getAttribute('data-se').split('-')[2]);
        chrome.runtime.sendMessage({ type: 'bulkActivate', ruleIds });
    });
}

function fetchRuleData(ruleId) {
    return fetch(`https://<DOMAIN>-admin.okta.com/api/v1/groups/rules/${ruleId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-okta-xsrftoken': '<TOKEN>',
        },
    }).then(response => response.json());
}

function updateRuleStatus(ruleId, status) {
    return fetch(`https://<DOMAIN>-admin.okta.com/api/v1/groups/rules/${ruleId}/lifecycle/${status}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-okta-xsrftoken': '<TOKEN>',
        },
    }).then(response => response.json());
}

injectCheckboxes();
createBulkActionButton();
```