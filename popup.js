document.getElementById('generateButton').addEventListener('click', function() {
    const password = generatePassword(10);
    document.getElementById('password').textContent = password;
    document.getElementById('downloadButton').style.display = 'inline-block';
});

document.getElementById('downloadButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tab = tabs[0];
        const url = tab.url;
        const password = document.getElementById('password').textContent;
        const content = `Password: ${password}\nGenerated on: ${url}`;
        downloadPassword(content);
    });
});

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function downloadPassword(content) {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'password.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}