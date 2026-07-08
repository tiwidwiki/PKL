const rupiah = (value) => `Rp ${(value || 0).toLocaleString('id-ID')}`;

const customerLogin = document.getElementById('customer-login');
const customerPanel = document.getElementById('customer-panel');
const loginForm = document.getElementById('customer-login-form');
const loginMessage = document.getElementById('customer-login-msg');
const logoutButton = document.getElementById('customer-logout-btn');
const customerStatus = document.getElementById('customer-status');
const profileForm = document.getElementById('profile-form');
const profileMessage = document.getElementById('profile-message');
const historyList = document.getElementById('history-list');
const pointsSummary = document.getElementById('points-summary');
const loyaltyBadge = document.getElementById('loyalty-badge');
const notificationCount = document.getElementById('notification-count');
const notificationList = document.getElementById('notification-list');

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('storage'));
}

function getUser() {
  return readStore('mood_user', null);
}

function getUserStoreKey(baseKey) {
  const email = getUser()?.email;
  return email ? `${baseKey}_${email}` : baseKey;
}

function getTransactions() {
  const email = getUser()?.email;
  const transactions = readStore('mood_transactions', []);
  if (!email) return [];
  return transactions.filter((transaction) => transaction.userEmail === email);
}

function saveAllTransactions(transactions) {
  writeStore('mood_transactions', transactions);
}

function estimateDistanceFromAddress(address) {
  const text = String(address || '').toLowerCase();
  if (!text) return 'near';
  if (text.includes('luar kota') || text.includes('kabupaten') || text.includes('perumahan') || text.length > 80) return 'far';
  if (text.includes('jalan') || text.includes('jl') || text.includes('komplek') || text.length > 45) return 'mid';
  return 'near';
}

function showLogin(message = '') {
  if (customerLogin) customerLogin.style.display = 'grid';
  if (customerPanel) customerPanel.style.display = 'none';
  profileForm?.reset();
  if (loginMessage) loginMessage.textContent = message;
}

function showPanel() {
  const user = getUser();
  if (!user?.email) {
    showLogin();
    return;
  }
  if (customerLogin) customerLogin.style.display = 'none';
  if (customerPanel) customerPanel.style.display = 'grid';
  if (customerStatus) customerStatus.textContent = `Login sebagai ${user.email}.`;
  renderProfile();
  renderNotifications();
  renderHistory();
}

function renderProfile() {
  const profile = readStore(getUserStoreKey('mood_profile'), {});
  const user = getUser();
  if (!profileForm) return;
  profileForm.profileName.value = profile.name || user?.email?.split('@')[0] || '';
  profileForm.profilePhone.value = profile.phone || '';
  profileForm.profileAddress.value = profile.address || '';
  profileForm.profileDistance.value = profile.distance || estimateDistanceFromAddress(profile.address);
  profileForm.profileTaste.value = profile.taste || 'fresh';
}

function renderHistory() {
  const transactions = getTransactions().slice().reverse();
  const points = transactions.reduce((sum, item) => sum + Math.floor((item.total || 0) / 10000), 0);
  const level = points >= 80 ? 'MoodMaster' : points >= 35 ? 'Gold' : 'Silver';
  if (pointsSummary) pointsSummary.textContent = `${points} poin reward`;
  if (loyaltyBadge) loyaltyBadge.textContent = level;
  if (!historyList) return;
  historyList.innerHTML = transactions.length ? '' : '<p class="mini-note">Belum ada riwayat pesanan.</p>';
  transactions.slice(0, 5).forEach((transaction) => {
    const row = document.createElement('div');
    row.className = 'history-item';
    row.innerHTML = `
      <div>
        <strong>${transaction.id}</strong>
        <p class="mini-note">${new Date(transaction.createdAt).toLocaleString('id-ID')} - ${transaction.status || 'baru'}${transaction.notificationUnread ? ' - notifikasi baru' : ''}</p>
      </div>
      <strong>${rupiah(transaction.total)}</strong>
    `;
    historyList.appendChild(row);
  });
}

function renderNotifications() {
  const transactions = getTransactions()
    .filter((transaction) => transaction.notificationUpdatedAt)
    .sort((a, b) => new Date(b.notificationUpdatedAt) - new Date(a.notificationUpdatedAt));
  const unreadCount = transactions.filter((transaction) => transaction.notificationUnread).length;
  if (notificationCount) notificationCount.textContent = `${unreadCount} baru`;
  if (!notificationList) return;
  notificationList.innerHTML = transactions.length ? '' : '<p class="mini-note">Belum ada notifikasi pesanan.</p>';

  transactions.slice(0, 5).forEach((transaction) => {
    const item = document.createElement('div');
    item.className = `notification-item${transaction.notificationUnread ? ' unread' : ''}`;
    item.innerHTML = `
      <div>
        <strong>${transaction.notificationMessage || `Status ${transaction.id} diperbarui.`}</strong>
        <p class="mini-note">${new Date(transaction.notificationUpdatedAt).toLocaleString('id-ID')}</p>
      </div>
      <button class="btn btn-secondary notification-read-btn" data-id="${transaction.id}" type="button" ${transaction.notificationUnread ? '' : 'disabled'}>Dibaca</button>
    `;
    notificationList.appendChild(item);
  });
}

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = String(formData.get('loginEmail') || '').trim().toLowerCase();
  if (!email) return;
  writeStore('mood_user', { email, loggedInAt: new Date().toISOString() });
  loginForm.reset();
  profileForm?.reset();
  showPanel();
});

logoutButton?.addEventListener('click', () => {
  localStorage.removeItem('mood_user');
  showLogin('Kamu sudah logout.');
});

profileForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(profileForm);
  const address = String(formData.get('profileAddress') || '').trim();
  writeStore(getUserStoreKey('mood_profile'), {
    name: formData.get('profileName'),
    phone: formData.get('profilePhone'),
    address,
    distance: formData.get('profileDistance') || estimateDistanceFromAddress(address),
    taste: formData.get('profileTaste')
  });
  if (profileMessage) profileMessage.textContent = 'Profil berhasil disimpan.';
});

profileForm?.profileAddress?.addEventListener('change', () => {
  if (profileForm.profileDistance) {
    profileForm.profileDistance.value = estimateDistanceFromAddress(profileForm.profileAddress.value);
  }
});

notificationList?.addEventListener('click', (event) => {
  const button = event.target.closest('.notification-read-btn');
  if (!button) return;
  const transactions = readStore('mood_transactions', []);
  const index = transactions.findIndex((transaction) => transaction.id === button.dataset.id);
  if (index === -1) return;
  transactions[index].notificationUnread = false;
  transactions[index].notificationReadAt = new Date().toISOString();
  saveAllTransactions(transactions);
  renderNotifications();
  renderHistory();
});

window.addEventListener('storage', () => {
  if (getUser()?.email) showPanel();
  else showLogin();
});

if (getUser()?.email) showPanel();
else showLogin();
