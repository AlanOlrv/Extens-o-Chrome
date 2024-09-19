document.getElementById('passwordForm').addEventListener('submit', savePassword);

function savePassword(e) {
  e.preventDefault();
  let website = document.getElementById('website').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  chrome.storage.sync.get(['passwords'], function(result) {
    let passwords = result.passwords || [];
    passwords.push({ website, username, password });
    chrome.storage.sync.set({ passwords }, function() {
      alert('Senha salva com sucesso!');
      listPasswords();
    });
  });

  document.getElementById('passwordForm').reset();
}

function listPasswords() {
  chrome.storage.sync.get(['passwords'], function(result) {
    let passwords = result.passwords || [];
    let passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';
    passwords.forEach(function(item, index) {
      let li = document.createElement('li');
      li.textContent = `${item.website} - ${item.username} - ${item.password}`;
      passwordList.appendChild(li);
    });
  });
}

document.addEventListener('DOMContentLoaded', listPasswords);
