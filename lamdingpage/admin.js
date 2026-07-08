(function(){
  const LOGIN_PW = 'tiwicantik';
  const rupiah = (value) => `Rp ${(value || 0).toLocaleString('id-ID')}`;

  const loginBtn = document.getElementById('admin-login-btn');
  const pwInput = document.getElementById('admin-password');
  const loginMsg = document.getElementById('admin-login-msg');
  const adminPanel = document.getElementById('admin-panel');
  const adminLogin = document.getElementById('admin-login');
  const addForm = document.getElementById('admin-add-form');
  const adminList = document.getElementById('admin-list');
  const adminStats = document.getElementById('admin-stats');
  const pName = document.getElementById('p-name');
  const pPrice = document.getElementById('p-price');
  const pDesc = document.getElementById('p-desc');
  const pCategory = document.getElementById('p-category');
  const pMood = document.getElementById('p-mood');
  const pImage = document.getElementById('p-image');
  const pStock = document.getElementById('p-stock');
  const logoutBtn = document.getElementById('admin-logout-btn');

  let isLoggedIn = localStorage.getItem('mood_admin_logged_in') === 'true';

  const DEFAULT_PRODUCTS = [
    { id: 'berry', name: 'Berry Bliss', price: 24000, desc: 'Stroberi, blueberry, yogurt, dan aftertaste creamy.', category: 'smoothie', mood: 'happy', flavor: 'berry', stock: 15, rating: 4.8, sold: 240, createdAt: '2026-06-01', prep: 12, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80' },
    { id: 'lemon', name: 'Lemon Spark', price: 18000, desc: 'Lemon dingin, daun mint, dan soda ringan.', category: 'juice', mood: 'fresh', flavor: 'citrus', stock: 20, rating: 4.7, sold: 310, createdAt: '2026-06-10', prep: 8, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80' },
    { id: 'coral', name: 'Coral Sunrise', price: 20000, desc: 'Jeruk, nanas, dan madu dengan warna coral cerah.', category: 'juice', mood: 'happy', flavor: 'tropical', stock: 12, rating: 4.6, sold: 196, createdAt: '2026-05-21', prep: 10, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80' },
    { id: 'mint', name: 'Mint Chill Tea', price: 22000, desc: 'Tea latte dingin dengan aroma mint yang ringan.', category: 'tea', mood: 'relax', flavor: 'mint', stock: 18, rating: 4.8, sold: 170, createdAt: '2026-06-16', prep: 9, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80' }
  ];

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

  function getProducts() {
    const products = readStore('mood_products', null);
    if (!Array.isArray(products) || products.length === 0) {
      writeStore('mood_products', DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS.slice();
    }
    return products.map((product, index) => ({ rating: 4.7, sold: 0, prep: 10, createdAt: '2026-06-01', image: DEFAULT_PRODUCTS[index % DEFAULT_PRODUCTS.length].image, mood: 'fresh', ...product }));
  }

  function saveProducts(products) {
    writeStore('mood_products', products);
  }

  function getTransactions() {
    return readStore('mood_transactions', []);
  }

  function saveTransactions(transactions) {
    writeStore('mood_transactions', transactions);
  }

  function showLogin() {
    adminLogin.style.display = 'block';
    adminPanel.style.display = 'none';
  }

  function showPanel() {
    adminLogin.style.display = 'none';
    adminPanel.style.display = 'block';
    loginMsg.textContent = '';
    renderAll();
  }

  function requireLogin() {
    if (!isLoggedIn) {
      loginMsg.textContent = 'Silakan login dulu.';
      showLogin();
      return false;
    }
    return true;
  }

  function setLoggedIn(state) {
    isLoggedIn = state;
    if (state) localStorage.setItem('mood_admin_logged_in', 'true');
    else localStorage.removeItem('mood_admin_logged_in');
  }

  function renderStats() {
    if (!adminStats) return;
    const products = getProducts();
    const transactions = getTransactions();
    const revenue = transactions.reduce((sum, transaction) => sum + (transaction.total || 0), 0);
    const incoming = transactions.filter((transaction) => (transaction.status || 'baru') !== 'selesai').length;
    const lowStock = products.filter((product) => (product.stock || 0) <= 5).length;
    adminStats.innerHTML = `
      <div><strong>${incoming}</strong><span>Pesanan aktif</span></div>
      <div><strong>${rupiah(revenue)}</strong><span>Total penjualan</span></div>
      <div><strong>${lowStock}</strong><span>Stok menipis</span></div>
    `;
  }

  function renderList() {
    const products = getProducts();
    adminList.innerHTML = '';
    if (products.length === 0) {
      adminList.textContent = 'Belum ada produk.';
      return;
    }

    products.forEach((product, index) => {
      const row = document.createElement('div');
      row.style.display = 'grid';
      row.style.gridTemplateColumns = '72px 1fr auto';
      row.style.alignItems = 'center';
      row.style.gap = '12px';
      row.style.marginBottom = '10px';
      row.style.border = '1px solid var(--border)';
      row.style.borderRadius = '16px';
      row.style.padding = '10px';
      row.innerHTML = `
        <img src="${product.image || ''}" alt="${product.name}" style="width:72px;height:72px;object-fit:cover;border-radius:14px;" />
        <div>
          <strong>${product.name}</strong> - ${rupiah(product.price)}
          <div style="font-size:0.95rem;color:#556">${product.desc || ''}</div>
          <div style="font-size:0.9rem;color:#667">${product.category} | Mood ${product.mood || 'fresh'} | Stok: ${product.stock || 0} | Rating ${product.rating || 4.7}</div>
        </div>
      `;
      const actions = document.createElement('div');
      const edit = document.createElement('button');
      edit.className = 'btn btn-secondary';
      edit.textContent = 'Edit';
      const del = document.createElement('button');
      del.className = 'btn btn-secondary';
      del.textContent = 'Hapus';
      actions.appendChild(edit);
      actions.appendChild(del);
      row.appendChild(actions);
      adminList.appendChild(row);

      edit.addEventListener('click', () => {
        if (!requireLogin()) return;
        pName.value = product.name;
        pPrice.value = product.price;
        pDesc.value = product.desc || '';
        pCategory.value = product.category || 'juice';
        pMood.value = product.mood || 'fresh';
        pImage.value = product.image || '';
        pStock.value = product.stock || 0;
        const next = getProducts();
        next.splice(index, 1);
        saveProducts(next);
        renderAll();
      });

      del.addEventListener('click', () => {
        if (!requireLogin()) return;
        if (!confirm('Hapus produk ini?')) return;
        const next = getProducts();
        next.splice(index, 1);
        saveProducts(next);
        renderAll();
      });
    });
  }

  function renderTransactions() {
    const container = document.getElementById('admin-transactions');
    if (!container) return;
    const transactions = getTransactions().slice().reverse();
    container.innerHTML = '';
    if (transactions.length === 0) {
      container.textContent = 'Belum ada pesanan.';
      return;
    }

    transactions.forEach((transaction) => {
      const row = document.createElement('div');
      row.className = 'admin-order-row';
      row.style.border = '1px solid var(--border)';
      row.style.borderRadius = '16px';
      row.style.padding = '12px';
      row.style.marginBottom = '10px';
      row.style.display = 'grid';
      row.style.gridTemplateColumns = 'minmax(0, 1fr) 150px';
      row.style.gap = '12px';
      const itemsHtml = (transaction.items || [])
        .map((item) => `${item.qty || 1}x ${item.name} (${item.size || 'regular'}, ${item.topping || 'none'})`)
        .join('<br/>');
      const paymentDetail = transaction.paymentDetail || {};
      const paymentInfo = transaction.payment === 'e-wallet'
        ? `E-Wallet QRIS | ${paymentDetail.qrisCode || 'QRIS-MOODDRINK-2026'}`
        : transaction.payment === 'card'
          ? 'Kartu'
          : 'COD';
      row.innerHTML = `
        <div>
          <strong>${transaction.id || 'Pesanan'}</strong>
          <div style="font-size:0.95rem;color:#666">${transaction.name || '-'} | ${transaction.phone || '-'} | ${new Date(transaction.createdAt).toLocaleString('id-ID')}</div>
          <div style="font-size:0.95rem;color:#666">${transaction.fulfillment || 'delivery'} | ${transaction.payment || '-'} | ${transaction.address || '-'}</div>
          <div style="font-size:0.95rem;color:#666">Pembayaran: ${paymentInfo}</div>
          <div style="margin-top:8px">${itemsHtml}</div>
          <strong>${rupiah(transaction.total)}</strong>
        </div>
      `;
      const actions = document.createElement('div');
      actions.style.display = 'grid';
      actions.style.gap = '8px';
      actions.style.alignContent = 'start';
      const status = document.createElement('select');
      status.className = 'admin-order-control';
      ['baru', 'sedang diproses', 'siap kirim', 'selesai'].forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        status.appendChild(option);
      });
      status.value = transaction.status || 'baru';
      const save = document.createElement('button');
      save.className = 'btn btn-primary admin-order-control';
      save.textContent = 'Update';
      const del = document.createElement('button');
      del.className = 'btn btn-secondary admin-order-control';
      del.textContent = 'Hapus';
      actions.appendChild(status);
      actions.appendChild(save);
      actions.appendChild(del);
      row.appendChild(actions);
      container.appendChild(row);

      save.addEventListener('click', () => {
        if (!requireLogin()) return;
        const next = getTransactions();
        const index = next.findIndex((item) => item.id === transaction.id);
        if (index === -1) return;
        next[index].status = status.value;
        next[index].handled = status.value === 'selesai';
        next[index].notificationUnread = true;
        next[index].notificationMessage = `Pesanan ${next[index].id} sekarang ${status.value}.`;
        next[index].notificationUpdatedAt = new Date().toISOString();
        saveTransactions(next);
        renderAll();
      });

      del.addEventListener('click', () => {
        if (!requireLogin()) return;
        if (!confirm('Hapus pesanan ini?')) return;
        saveTransactions(getTransactions().filter((item) => item.id !== transaction.id));
        renderAll();
      });
    });
  }

  function renderAll() {
    renderStats();
    renderList();
    renderTransactions();
  }

  function initializeAdminState() {
    isLoggedIn = localStorage.getItem('mood_admin_logged_in') === 'true';
    if (isLoggedIn) showPanel();
    else showLogin();
  }

  loginBtn.addEventListener('click', () => {
    if ((pwInput.value || '') === LOGIN_PW) {
      setLoggedIn(true);
      showPanel();
    } else {
      loginMsg.textContent = 'Password salah.';
    }
  });

  logoutBtn?.addEventListener('click', () => {
    setLoggedIn(false);
    pwInput.value = '';
    showLogin();
    loginMsg.textContent = 'Anda telah logout.';
  });

  pwInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      loginBtn.click();
    }
  });

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!requireLogin()) return;
    const name = pName.value.trim();
    const price = parseInt(pPrice.value, 10) || 0;
    if (!name || !price || !pCategory.value) {
      alert('Isi nama, harga, dan kategori.');
      return;
    }
    const products = getProducts();
    products.push({
      id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name,
      price,
      desc: pDesc.value.trim(),
      category: pCategory.value,
      mood: pMood.value || 'fresh',
      stock: parseInt(pStock.value, 10) || 0,
      image: pImage.value.trim() || 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
      rating: 4.7,
      sold: 0,
      prep: 10,
      createdAt: new Date().toISOString()
    });
    saveProducts(products);
    addForm.reset();
    renderAll();
  });

  window.addEventListener('storage', renderAll);

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeAdminState);
  } else {
    initializeAdminState();
  }
})();
