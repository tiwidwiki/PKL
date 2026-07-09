const rupiah = (value) => `Rp ${(value || 0).toLocaleString('id-ID')}`;

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const year = document.getElementById('year');
const drinkSelect = document.getElementById('drink-select');
const sizeSelect = document.getElementById('size-select');
const toppingSelect = document.getElementById('topping-select');
const summaryItem = document.getElementById('summary-item');
const summarySize = document.getElementById('summary-size');
const summaryTopping = document.getElementById('summary-topping');
const summaryTotal = document.getElementById('summary-total');
const orderMessage = document.getElementById('order-message');
const addOrderButton = document.getElementById('add-order-btn');
const cartCount = document.getElementById('cart-count');
const cartTrigger = document.getElementById('cart-trigger');
const checkoutTrigger = document.getElementById('checkout-trigger');
const clearCartButton = document.getElementById('clear-cart-btn');
const checkoutModal = document.getElementById('checkout-modal');
const modalClose = document.getElementById('modal-close');
const checkoutForm = document.getElementById('checkout-form');
const productGrid = document.getElementById('product-grid');
const subscribeForm = document.getElementById('subscribe-form');
const subscribeMessage = document.getElementById('subscribe-message');
const productModal = document.getElementById('product-modal');
const productModalTitle = document.getElementById('product-modal-title');
const productModalDesc = document.getElementById('product-modal-desc');
const productModalMeta = document.getElementById('product-modal-meta');
const productModalPrice = document.getElementById('product-modal-price');
const productModalImage = document.getElementById('product-modal-image');
const productModalAdd = document.getElementById('product-modal-add');
const productModalClose = document.getElementById('product-modal-close');
const productModalClose2 = document.getElementById('product-modal-close-2');
const catalogCategory = document.getElementById('catalog-category');
const catalogMood = document.getElementById('catalog-mood');
const catalogPrice = document.getElementById('catalog-price');
const catalogSort = document.getElementById('catalog-sort');
const cartList = document.getElementById('cart-list');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartDiscount = document.getElementById('cart-discount');
const cartDelivery = document.getElementById('cart-delivery');
const cartGrandTotal = document.getElementById('cart-grand-total');
const notificationMessage = document.getElementById('notification-message');
const fulfillmentSelect = document.getElementById('fulfillment-select');
const distanceSelect = document.getElementById('distance-select');
const cartPaymentSelect = document.getElementById('cart-payment-select');
const paymentSelect = document.getElementById('payment-select');
const paymentDetailBox = document.getElementById('payment-detail-box');
const checkoutPreview = document.getElementById('checkout-preview');
const modalSizeSelect = document.getElementById('modal-size-select');
const modalSugarSelect = document.getElementById('modal-sugar-select');
const modalIceSelect = document.getElementById('modal-ice-select');
const modalToppingSelect = document.getElementById('modal-topping-select');
const heroBestSellerButton = document.getElementById('hero-best-seller-btn');
const heroBestSellerImage = document.getElementById('hero-best-seller-image');
const heroBestSellerName = document.getElementById('hero-best-seller-name');
const heroBestSellerDesc = document.getElementById('hero-best-seller-desc');
const heroBestSellerPrice = document.getElementById('hero-best-seller-price');
const heroBestSellerSold = document.getElementById('hero-best-seller-sold');
let cartItems = 0;
let selectedProductId = '';

const PAYMENT_OPTIONS = ['e-wallet', 'cod', 'card'];

const DEFAULT_PRODUCTS = [
  { id: 'berry', name: 'Berry Bliss', price: 24000, desc: 'Stroberi, blueberry, yogurt, dan aftertaste creamy.', category: 'smoothie', mood: 'happy', flavor: 'berry', stock: 15, rating: 4.8, sold: 240, createdAt: '2026-06-01', prep: 12, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80' },
  { id: 'lemon', name: 'Lemon Spark', price: 18000, desc: 'Lemon dingin, daun mint, dan soda ringan.', category: 'juice', mood: 'fresh', flavor: 'citrus', stock: 20, rating: 4.7, sold: 310, createdAt: '2026-06-10', prep: 8, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80' },
  { id: 'coral', name: 'Coral Sunrise', price: 20000, desc: 'Jeruk, nanas, dan madu dengan warna coral cerah.', category: 'juice', mood: 'happy', flavor: 'tropical', stock: 12, rating: 4.6, sold: 196, createdAt: '2026-05-21', prep: 10, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80' },
  { id: 'mint', name: 'Mint Chill Tea', price: 22000, desc: 'Tea latte dingin dengan aroma mint yang ringan.', category: 'tea', mood: 'relax', flavor: 'mint', stock: 18, rating: 4.8, sold: 170, createdAt: '2026-06-16', prep: 9, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80' },
  { id: 'espresso', name: 'Focus Coffee', price: 27000, desc: 'Espresso, susu dingin, dan caramel tipis untuk jam sibuk.', category: 'coffee', mood: 'focus', flavor: 'coffee', stock: 16, rating: 4.9, sold: 288, createdAt: '2026-06-18', prep: 7, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80' },
  { id: 'blend', name: 'Choco Ice Blend', price: 32000, desc: 'Cokelat blender, susu, dan whipped cream lembut.', category: 'ice-blend', mood: 'happy', flavor: 'chocolate', stock: 10, rating: 4.7, sold: 142, createdAt: '2026-06-22', prep: 14, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80' },
  { id: 'toast', name: 'Cheese Toast Snack', price: 19000, desc: 'Snack gurih pendamping minuman segar.', category: 'snack', mood: 'relax', flavor: 'savory', stock: 25, rating: 4.5, sold: 98, createdAt: '2026-06-12', prep: 11, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
  { id: 'green', name: 'Green Detox Juice', price: 29000, desc: 'Apel hijau, timun, lemon, dan bayam untuk mood sehat.', category: 'juice', mood: 'fresh', flavor: 'green', stock: 14, rating: 4.9, sold: 221, createdAt: '2026-06-24', prep: 10, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=900&q=80' },
  { id: 'blue-ocean', name: 'Blue Ocean Spark', price: 26000, desc: 'Mocktail soda biru dengan lemon segar dan sensasi sparkling.', category: 'ice-blend', mood: 'fresh', flavor: 'citrus', stock: 18, rating: 4.8, sold: 205, createdAt: '2026-07-09', prep: 8, image: 'assets/products/blue-ocean-spark.webp' },
  { id: 'potato-wedges', name: 'Potato Wedges', price: 21000, desc: 'Kentang wedges gurih dengan taburan herbs dan saus cocol.', category: 'snack', mood: 'relax', flavor: 'savory', stock: 22, rating: 4.7, sold: 132, createdAt: '2026-07-09', prep: 12, image: 'assets/products/potato-wedges.webp' },
  { id: 'cheese-fries', name: 'Cheese Fries', price: 23000, desc: 'French fries hangat dengan saus keju creamy dan bumbu tipis.', category: 'snack', mood: 'happy', flavor: 'savory', stock: 20, rating: 4.8, sold: 148, createdAt: '2026-07-09', prep: 10, image: 'assets/products/cheese-fries.webp' },
  { id: 'honey-toast', name: 'Honey Toast', price: 24000, desc: 'Toast manis renyah dengan topping crumble dan es krim lembut.', category: 'snack', mood: 'happy', flavor: 'sweet', stock: 16, rating: 4.9, sold: 166, createdAt: '2026-07-09', prep: 13, image: 'assets/products/honey-toast.jpeg' }
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

function normalizeProduct(product, index) {
  const fallback = DEFAULT_PRODUCTS[index % DEFAULT_PRODUCTS.length];
  return {
    rating: fallback.rating,
    sold: fallback.sold,
    mood: fallback.mood,
    flavor: fallback.flavor,
    createdAt: fallback.createdAt,
    prep: fallback.prep,
    image: fallback.image,
    stock: 10,
    ...product
  };
}

function getProducts() {
  const stored = readStore('mood_products', null);
  if (!stored || !Array.isArray(stored)) {
    writeStore('mood_products', DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS.slice();
  }
  const merged = DEFAULT_PRODUCTS.reduce((products, defaultProduct) => {
    return products.some((product) => product.id === defaultProduct.id) ? products : [...products, defaultProduct];
  }, stored);
  if (merged.length !== stored.length) writeStore('mood_products', merged);
  return merged.map(normalizeProduct);
}

function saveProducts(products) {
  writeStore('mood_products', products);
}

function getBestSellerProduct() {
  return getProducts()
    .filter((product) => product.stock > 0)
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))[0] || getProducts()[0];
}

function renderBestSeller() {
  const product = getBestSellerProduct();
  if (!product) return;
  if (heroBestSellerImage) {
    heroBestSellerImage.src = product.image;
    heroBestSellerImage.alt = product.name;
  }
  if (heroBestSellerName) heroBestSellerName.textContent = product.name;
  if (heroBestSellerDesc) heroBestSellerDesc.textContent = product.desc;
  if (heroBestSellerPrice) heroBestSellerPrice.textContent = rupiah(product.price);
  if (heroBestSellerSold) heroBestSellerSold.textContent = `${product.sold || 0}x dibeli • Rating ${product.rating}/5`;
}

function recordProductSales(items) {
  if (!items.length) return;
  const soldById = items.reduce((totals, item) => {
    totals[item.id] = (totals[item.id] || 0) + (item.qty || 1);
    return totals;
  }, {});
  const updatedProducts = getProducts().map((product) => ({
    ...product,
    sold: (product.sold || 0) + (soldById[product.id] || 0)
  }));
  saveProducts(updatedProducts);
}

function getCart() {
  return readStore('mood_cart', []);
}

function saveCart(cart) {
  writeStore('mood_cart', cart);
}

function getTransactions() {
  return readStore('mood_transactions', []);
}

function getUser() {
  return readStore('mood_user', null);
}

function getUserStoreKey(baseKey) {
  const email = getUser()?.email;
  return email ? `${baseKey}_${email}` : baseKey;
}

function getProfile() {
  return readStore(getUserStoreKey('mood_profile'), {});
}

function getCheckoutContact() {
  return readStore(getUserStoreKey('mood_checkout_contact'), {});
}

function isLoggedIn() {
  const user = getUser();
  return Boolean(user?.email);
}

function estimateDistanceFromAddress(address) {
  const text = String(address || '').toLowerCase();
  if (!text) return 'near';
  if (text.includes('luar kota') || text.includes('kabupaten') || text.includes('perumahan') || text.length > 80) return 'far';
  if (text.includes('jalan') || text.includes('jl') || text.includes('komplek') || text.length > 45) return 'mid';
  return 'near';
}

function getSavedCheckoutDetails() {
  const profile = getProfile();
  const contact = getCheckoutContact();
  const address = profile.address || contact.address || '';
  return {
    name: profile.name || contact.name || '',
    phone: profile.phone || contact.phone || '',
    address,
    distance: profile.distance || contact.distance || estimateDistanceFromAddress(address),
    fulfillment: contact.fulfillment || 'delivery',
    payment: contact.payment || 'e-wallet',
    paymentDetail: contact.paymentDetail || {}
  };
}

function getDeliveryFee() {
  if (fulfillmentSelect?.value === 'pickup') return 0;
  return { near: 8000, mid: 12000, far: 18000 }[distanceSelect?.value || 'near'] || 8000;
}

function getCartTotals() {
  const cart = getSelectedCart();
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  const discount = subtotal >= 75000 ? 10000 : 0;
  const delivery = cart.length ? getDeliveryFee() : 0;
  return { subtotal, discount, delivery, total: Math.max(0, subtotal - discount + delivery) };
}

function getSelectedCart() {
  return getCart().filter((item) => item.selected !== false);
}

function getValidPayment(value) {
  return PAYMENT_OPTIONS.includes(value) ? value : 'e-wallet';
}

function addToCart(item) {
  const cart = getCart();
  const key = `${item.id}-${item.size}-${item.topping}-${item.sugar || 'normal'}-${item.ice || 'normal'}`;
  const existing = cart.find((cartItem) => cartItem.key === key);
  if (existing) {
    existing.qty = (existing.qty || 1) + (item.qty || 1);
    existing.selected = true;
  } else {
    cart.push({ key, qty: 1, selected: true, ...item });
  }
  saveCart(cart);
}

function changeCartQty(key, delta) {
  const next = getCart()
    .map((item) => item.key === key ? { ...item, qty: (item.qty || 1) + delta } : item)
    .filter((item) => item.qty > 0);
  saveCart(next);
}

function toggleCartSelection(key, selected) {
  const next = getCart().map((item) => item.key === key ? { ...item, selected } : item);
  saveCart(next);
}

function removeSelectedCartItems() {
  const next = getCart().filter((item) => item.selected === false);
  saveCart(next);
}

function clearCart() {
  saveCart([]);
}

function productMatchesPrice(product) {
  const price = product.price || 0;
  if (catalogPrice?.value === 'under-20000') return price < 20000;
  if (catalogPrice?.value === '20000-30000') return price >= 20000 && price <= 30000;
  if (catalogPrice?.value === 'above-30000') return price > 30000;
  return true;
}

function getFilteredProducts() {
  const products = getProducts()
    .filter((product) => !catalogCategory?.value || product.category === catalogCategory.value)
    .filter((product) => !catalogMood?.value || product.mood === catalogMood.value)
    .filter(productMatchesPrice);

  return products.sort((a, b) => {
    if (catalogSort?.value === 'new') return new Date(b.createdAt) - new Date(a.createdAt);
    if (catalogSort?.value === 'price-low') return a.price - b.price;
    if (catalogSort?.value === 'price-high') return b.price - a.price;
    if (catalogSort?.value === 'rating') return b.rating - a.rating;
    return b.sold - a.sold;
  });
}

function renderProducts() {
  if (!productGrid) return;
  const products = getFilteredProducts();
  productGrid.innerHTML = products.length ? '' : '<p class="mini-note">Belum ada produk yang cocok dengan filter ini.</p>';
  products.forEach((product) => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.dataset.id = product.id;
    const stockStatus = product.stock > 0 ? `Stok: ${product.stock}` : 'Habis';
    article.innerHTML = `
      <img class="product-thumb" src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-meta">
        <span class="tag">${product.category}</span>
        <span class="tag">Mood ${product.mood}</span>
        <span class="tag">${product.rating}/5</span>
      </div>
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <span>${rupiah(product.price)}</span>
      <p class="mini-note">${stockStatus} • ${product.prep} menit</p>
      <div style="display:flex;gap:8px;margin-top:8px;">
        <button class="btn btn-secondary view-btn" type="button" ${product.stock <= 0 ? 'disabled' : ''}>Detail</button>
        <button class="btn btn-primary add-btn" type="button" ${product.stock <= 0 ? 'disabled' : ''}>Tambah</button>
      </div>
    `;
    productGrid.appendChild(article);
  });
}

function renderDrinkOptions() {
  if (!drinkSelect) return;
  const categorySelect = document.getElementById('category-select');
  const selectedCategory = categorySelect?.value || '';
  const products = getProducts().filter((product) => product.stock > 0 && (!selectedCategory || product.category === selectedCategory));
  drinkSelect.innerHTML = '<option value="">-- Pilih minuman --</option>' + products
    .map((product) => `<option value="${product.id}">${product.name}</option>`)
    .join('');
}

function updateSummary() {
  const products = getProducts();
  const selected = products.find((product) => product.id === drinkSelect?.value) || products[0];
  const sizePrice = { regular: 0, large: 4000 }[sizeSelect?.value] || 0;
  const toppingPrice = { none: 0, boba: 3000, cream: 5000, jelly: 4000 }[toppingSelect?.value] || 0;
  const total = (selected?.price || 0) + sizePrice + toppingPrice;

  if (summaryItem) summaryItem.textContent = `Minuman: ${selected?.name || '-'}`;
  if (summarySize) summarySize.textContent = `Ukuran: ${sizeSelect?.value === 'large' ? 'Large' : 'Reguler'}`;
  if (summaryTopping) summaryTopping.textContent = `Topping: ${getToppingLabel(toppingSelect?.value)}`;
  if (summaryTotal) summaryTotal.textContent = `Total: ${rupiah(total)}`;
}

function getToppingLabel(value) {
  return { boba: 'Boba', cream: 'Whipped Cream', jelly: 'Fruit Jelly', none: 'Tanpa topping' }[value || 'none'] || 'Tanpa topping';
}

function updateCartCount() {
  cartItems = getCart().reduce((sum, item) => sum + (item.qty || 0), 0);
  if (cartCount) cartCount.textContent = cartItems;
}

function renderCart() {
  const cart = getCart();
  if (cartList) {
    cartList.innerHTML = cart.length ? '' : '<p class="mini-note">Keranjang masih kosong. Pilih minuman dari katalog dulu.</p>';
    cart.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <label class="cart-select">
          <input class="cart-select-input" data-key="${item.key}" type="checkbox" ${item.selected !== false ? 'checked' : ''} />
          <span>Pilih</span>
        </label>
        <div>
          <strong>${item.name}</strong>
          <p class="mini-note">${item.size || 'regular'} • ${getToppingLabel(item.topping)} • gula ${item.sugar || 'normal'} • es ${item.ice || 'normal'}</p>
          <strong>${rupiah((item.price || 0) * (item.qty || 1))}</strong>
        </div>
        <div class="cart-actions">
          <button class="qty-btn" data-action="minus" data-key="${item.key}" type="button">-</button>
          <strong>${item.qty || 1}</strong>
          <button class="qty-btn" data-action="plus" data-key="${item.key}" type="button">+</button>
        </div>
      `;
      cartList.appendChild(row);
    });
  }

  const totals = getCartTotals();
  if (cartSubtotal) cartSubtotal.textContent = rupiah(totals.subtotal);
  if (cartDiscount) cartDiscount.textContent = `- ${rupiah(totals.discount)}`;
  if (cartDelivery) cartDelivery.textContent = rupiah(totals.delivery);
  if (cartGrandTotal) cartGrandTotal.textContent = rupiah(totals.total);
  const selectedCount = getSelectedCart().reduce((sum, item) => sum + (item.qty || 1), 0);
  if (checkoutPreview) checkoutPreview.textContent = `Total ${selectedCount} item dipilih: ${rupiah(totals.total)}`;
}

function fillCheckoutFromSavedDetails() {
  if (!checkoutForm) return;
  const details = getSavedCheckoutDetails();
  const fields = checkoutForm.elements;
  if (fields.name) fields.name.value = details.name;
  if (fields.phone) fields.phone.value = details.phone;
  if (fields.address) fields.address.value = details.address;
  if (fields.fulfillment) fields.fulfillment.value = details.fulfillment;
  if (fields.distance) fields.distance.value = details.distance;
  const selectedPayment = getValidPayment(cartPaymentSelect?.value || details.payment);
  if (fields.payment) fields.payment.value = selectedPayment;
  if (cartPaymentSelect) cartPaymentSelect.value = selectedPayment;
  updatePaymentFields();
}

function getPaymentDetail(formData) {
  const payment = formData.get('payment');
  if (payment === 'e-wallet') {
    return {
      qrisCode: 'QRIS-MOODDRINK-2026'
    };
  }
  if (payment === 'card') return { method: 'card' };
  return {};
}

function validatePaymentDetail(formData) {
  const payment = formData.get('payment');
  if (payment === 'cod' || payment === 'card') return true;
  const detail = getPaymentDetail(formData);
  if (payment === 'e-wallet') return Boolean(detail.qrisCode);
  return false;
}

function updatePaymentFields() {
  if (!checkoutForm || !paymentSelect) return;
  const selectedPayment = paymentSelect.value;
  const paymentInputs = paymentDetailBox?.querySelectorAll('input, select') || [];
  paymentInputs.forEach((input) => {
    input.required = false;
  });
  paymentDetailBox?.querySelectorAll('[data-payment-fields]').forEach((section) => {
    const isActive = section.dataset.paymentFields === selectedPayment;
    section.hidden = !isActive;
    if (isActive && selectedPayment === 'e-wallet') {
      section.querySelectorAll('input, select').forEach((input) => {
        input.required = true;
      });
    }
  });
}

function openCheckout() {
  if (!getCart().length) {
    if (notificationMessage) notificationMessage.textContent = 'Keranjang masih kosong. Tambahkan menu favoritmu dulu.';
    return;
  }
  if (!getSelectedCart().length) {
    if (notificationMessage) notificationMessage.textContent = 'Pilih minimal 1 item di keranjang sebelum checkout.';
    return;
  }
  fillCheckoutFromSavedDetails();
  renderCart();
  checkoutModal?.classList.add('active');
  checkoutModal?.setAttribute('aria-hidden', 'false');
}

function openCartReview() {
  renderCart();
  document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (!getCart().length && notificationMessage) {
    notificationMessage.textContent = 'Keranjang masih kosong. Tambahkan menu favoritmu dulu.';
  }
}

function closeCheckout() {
  checkoutModal?.classList.remove('active');
  checkoutModal?.setAttribute('aria-hidden', 'true');
}

function openProductModal(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;
  selectedProductId = product.id;
  if (productModalTitle) productModalTitle.textContent = product.name;
  if (productModalDesc) productModalDesc.textContent = product.desc;
  if (productModalMeta) productModalMeta.textContent = `Mood ${product.mood} • ${product.prep} menit • Rating ${product.rating}/5`;
  if (productModalPrice) productModalPrice.innerHTML = `<strong>${rupiah(product.price)}</strong>`;
  if (productModalImage) {
    productModalImage.src = product.image;
    productModalImage.alt = product.name;
  }
  productModal?.classList.add('active');
  productModal?.setAttribute('aria-hidden', 'false');
}

function closeProductModal() {
  productModal?.classList.remove('active');
  productModal?.setAttribute('aria-hidden', 'true');
}

function getConfiguredProduct(product, source = 'modal') {
  const size = source === 'modal' ? modalSizeSelect?.value || 'regular' : sizeSelect?.value || 'regular';
  const topping = source === 'modal' ? modalToppingSelect?.value || 'none' : toppingSelect?.value || 'none';
  const sugar = source === 'modal' ? modalSugarSelect?.value || 'normal' : 'normal';
  const ice = source === 'modal' ? modalIceSelect?.value || 'normal' : 'normal';
  const sizePrice = size === 'large' ? 4000 : 0;
  const toppingPrice = { none: 0, boba: 3000, cream: 5000, jelly: 4000 }[topping] || 0;
  return { id: product.id, name: product.name, price: product.price + sizePrice + toppingPrice, size, topping, sugar, ice };
}

function saveTransaction(formData) {
  const cart = getSelectedCart();
  const totals = getCartTotals();
  const promo = String(formData.get('promo') || '').trim().toUpperCase();
  const promoDiscount = promo === 'MOODDAY' ? 12000 : promo === 'TOPPING' ? 5000 : 0;
  const transaction = {
    id: `MD-${Date.now()}`,
    userEmail: getUser()?.email || '',
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    fulfillment: formData.get('fulfillment'),
    distance: formData.get('distance'),
    payment: formData.get('payment'),
    paymentDetail: getPaymentDetail(formData),
    promo,
    items: cart,
    subtotal: totals.subtotal,
    discount: totals.discount + promoDiscount,
    delivery: totals.delivery,
    total: Math.max(0, totals.subtotal - totals.discount - promoDiscount + totals.delivery),
    status: 'baru',
    handled: false,
    createdAt: new Date().toISOString()
  };
  const savedProfile = getProfile();
  const savedContact = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    distance: formData.get('distance') || estimateDistanceFromAddress(formData.get('address')),
    fulfillment: formData.get('fulfillment'),
    payment: formData.get('payment'),
    paymentDetail: getPaymentDetail(formData)
  };
  writeStore(getUserStoreKey('mood_profile'), {
    ...savedProfile,
    ...savedContact,
    taste: savedProfile.taste || 'fresh'
  });
  writeStore(getUserStoreKey('mood_checkout_contact'), savedContact);
  recordProductSales(cart);
  writeStore('mood_transactions', [...getTransactions(), transaction]);
  return transaction;
}

function renderProfile() {
  const profile = getProfile();
  const user = getUser();
  const checkoutNameInput = checkoutForm?.elements?.name;
  if (checkoutNameInput && user?.email && !checkoutNameInput.value) {
    checkoutNameInput.value = profile.name || user.email.split('@')[0];
  }
  fillCheckoutFromSavedDetails();
}

function refresh() {
  renderBestSeller();
  renderProducts();
  renderDrinkOptions();
  updateSummary();
  updateCartCount();
  renderCart();
}

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('active')));
}

if (year) year.textContent = new Date().getFullYear();

[drinkSelect, sizeSelect, toppingSelect].forEach((element) => element?.addEventListener('change', updateSummary));
[catalogCategory, catalogMood, catalogPrice, catalogSort].forEach((element) => element?.addEventListener('change', renderProducts));
[fulfillmentSelect, distanceSelect].forEach((element) => element?.addEventListener('change', renderCart));
paymentSelect?.addEventListener('change', updatePaymentFields);
cartPaymentSelect?.addEventListener('change', () => {
  if (paymentSelect) paymentSelect.value = getValidPayment(cartPaymentSelect.value);
  cartPaymentSelect.value = getValidPayment(cartPaymentSelect.value);
  updatePaymentFields();
});
checkoutForm?.elements?.address?.addEventListener('change', (event) => {
  if (distanceSelect) distanceSelect.value = estimateDistanceFromAddress(event.target.value);
  renderCart();
});

document.getElementById('category-select')?.addEventListener('change', () => {
  renderDrinkOptions();
  updateSummary();
});

productGrid?.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  const card = button?.closest('.product-card');
  if (!button || !card) return;
  const product = getProducts().find((item) => item.id === card.dataset.id);
  if (!product) return;

  if (button.classList.contains('view-btn')) openProductModal(product.id);
  if (button.classList.contains('add-btn')) {
    addToCart(getConfiguredProduct(product, 'quick'));
    if (orderMessage) orderMessage.textContent = `${product.name} ditambahkan ke keranjang.`;
  }
});

cartList?.addEventListener('click', (event) => {
  const button = event.target.closest('.qty-btn');
  if (!button) return;
  changeCartQty(button.dataset.key, button.dataset.action === 'plus' ? 1 : -1);
});

cartList?.addEventListener('change', (event) => {
  if (!event.target.classList.contains('cart-select-input')) return;
  toggleCartSelection(event.target.dataset.key, event.target.checked);
});

addOrderButton?.addEventListener('click', () => {
  const selected = getProducts().find((product) => product.id === drinkSelect?.value) || getProducts()[0];
  addToCart(getConfiguredProduct(selected, 'quick'));
  if (orderMessage) orderMessage.textContent = 'Pesanan berhasil ditambahkan ke keranjang.';
  openCheckout();
});

heroBestSellerButton?.addEventListener('click', () => {
  const bestSeller = getBestSellerProduct();
  if (!bestSeller) return;
  addToCart(getConfiguredProduct(bestSeller, 'quick'));
  if (notificationMessage) notificationMessage.textContent = `${bestSeller.name} masuk keranjang.`;
  openCheckout();
});

productModalAdd?.addEventListener('click', () => {
  const product = getProducts().find((item) => item.id === selectedProductId);
  if (!product) return;
  addToCart(getConfiguredProduct(product, 'modal'));
  closeProductModal();
  if (notificationMessage) notificationMessage.textContent = `${product.name} masuk keranjang.`;
});

cartTrigger?.addEventListener('click', openCartReview);
checkoutTrigger?.addEventListener('click', openCheckout);
clearCartButton?.addEventListener('click', clearCart);
modalClose?.addEventListener('click', closeCheckout);
checkoutModal?.addEventListener('click', (event) => {
  if (event.target === checkoutModal) closeCheckout();
});
productModalClose?.addEventListener('click', closeProductModal);
productModalClose2?.addEventListener('click', closeProductModal);
productModal?.addEventListener('click', (event) => {
  if (event.target === productModal) closeProductModal();
});

checkoutForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!getSelectedCart().length) {
    alert('Pilih minimal 1 item untuk checkout.');
    return;
  }
  const formData = new FormData(checkoutForm);
  if (!validatePaymentDetail(formData)) {
    alert('Lengkapi detail pembayaran terlebih dulu.');
    updatePaymentFields();
    return;
  }
  const transaction = saveTransaction(formData);
  removeSelectedCartItems();
  closeCheckout();
  checkoutForm.reset();
  if (notificationMessage) notificationMessage.textContent = `Pesanan ${transaction.id} diterima. Status: baru.`;
  alert('Pesanan berhasil dikonfirmasi.');
});

subscribeForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (subscribeMessage) subscribeMessage.textContent = 'Terima kasih, emailmu sudah terdaftar untuk promo MoodDrink.';
  subscribeForm.reset();
});

window.addEventListener('storage', refresh);

renderProfile();
updatePaymentFields();
refresh();
