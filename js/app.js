/**
 * NETCOM - Основной JavaScript движок интернет-магазина
 * Поддержка Google Sheets API, JSONP (для работы без сервера), фильтрации, корзины и Telegram.
 */

// Встроенная база сетевых устройств (работает сразу даже без сервера и при открытии через двойной клик)
const DEFAULT_PRODUCTS = [
  {
    "id": 1,
    "brand": "TP-Link",
    "category": "Wi-Fi Роутеры",
    "title": "TP-Link Archer AX55 (AX3000 Wi-Fi 6)",
    "price": 780000,
    "oldPrice": 890000,
    "badge": "ХИТ ПРОДАЖ",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "Wi-Fi 6 (802.11ax), до 2976 Мбит/с, 4 антенны, 4x Gigabit LAN, 1x USB 3.0, OneMesh, HomeShield",
    "description": "Двухдиапазонный гигабитный маршрутизатор Wi-Fi 6 Archer AX55 обеспечивает скорость до 2402 Мбит/с на 5 ГГц и до 574 Мбит/с на 2,4 ГГц. Оснащен процессором Qualcomm и технологией OFDMA для стабильного подключения множества устройств без задержек."
  },
  {
    "id": 2,
    "brand": "TP-Link",
    "category": "Wi-Fi 7",
    "title": "TP-Link Archer BE800 (BE19000 Wi-Fi 7)",
    "price": 6450000,
    "oldPrice": 7200000,
    "badge": "ФЛАГМАН WI-FI 7",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "Трехдиапазонный Wi-Fi 7, до 19 Гбит/с, 2 порта 10G WAN/LAN, 4 порта 2.5G LAN, LED-экран, EasyMesh",
    "description": "Ультрасовременный роутер новейшего стандарта Wi-Fi 7 с пропускной способностью до 19 Гбит/с, каналами 320 МГц и революционной технологией Multi-Link Operation (MLO). Оборудован 10-гигабитными портами SFP+ и RJ45 для максимальной производительности."
  },
  {
    "id": 3,
    "brand": "TP-Link",
    "category": "Mesh-системы",
    "title": "TP-Link Deco X50 (AX3000 Mesh, комплект 2 шт.)",
    "price": 1420000,
    "oldPrice": 1600000,
    "badge": "ЛУЧШИЙ ВЫБОР ДЛЯ ДОМА",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "AX3000 Wi-Fi 6, покрытие до 420 м², 3x Gigabit порта на каждом модуле, AI-роуминг, до 150 устройств",
    "description": "Домашняя Mesh-система стандарта Wi-Fi 6. Позволяет создать единую бесшовную сеть по всему дому или офису. Интеллектуальный роуминг переключает устройства незаметно без разрыва связи."
  },
  {
    "id": 4,
    "brand": "MikroTik",
    "category": "Маршрутизаторы MikroTik",
    "title": "MikroTik hEX S (RB760iGS)",
    "price": 850000,
    "oldPrice": 920000,
    "badge": "В НАЛИЧИИ",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "5x Gigabit Ethernet, 1x SFP (1.25G), 2 ядра 880 МГц, 256 МБ RAM, microSD, аппаратный IPsec, RouterOS L4",
    "description": "Компактный гигабитный 5-портовый маршрутизатор для требовательных пользователей и малого бизнеса. Поддерживает аппаратное шифрование IPsec (~470 Мбит/с), имеет слот SFP и сервер The Dude."
  },
  {
    "id": 5,
    "brand": "MikroTik",
    "category": "Wi-Fi Роутеры",
    "title": "MikroTik hAP ax² (C52iG-5HaxD2HaxD-TC)",
    "price": 1250000,
    "oldPrice": 1390000,
    "badge": "НОВИНКА",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "Wi-Fi 6 ax, 4-ядерный CPU 864 МГц, 1 ГБ RAM, 5x Gigabit Ethernet, PoE-in / PoE-out, RouterOS v7 L4",
    "description": "Мощный двухдиапазонный маршрутизатор нового поколения с поддержкой Wi-Fi 6. Выдающаяся скорость беспроводной передачи и знаменитая гибкость операционной системы RouterOS v7."
  },
  {
    "id": 6,
    "brand": "MikroTik",
    "category": "Маршрутизаторы MikroTik",
    "title": "MikroTik RB5009UG+S+IN",
    "price": 2750000,
    "oldPrice": 3100000,
    "badge": "ПРОФЕССИОНАЛЬНЫЙ",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "7x 1G Ethernet, 1x 2.5G Ethernet, 1x 10G SFP+, 4 ядра 1.4 ГГц, 1 ГБ DDR4 RAM, RouterOS v7 L5",
    "description": "Тяжелая артиллерия для серверных стоек и офисов. Обеспечивает почти четырехкратный прирост производительности по сравнению с предыдущими моделями. Металлический корпус с эффективным пассивным охлаждением."
  },
  {
    "id": 7,
    "brand": "Mercusys",
    "category": "Wi-Fi Роутеры",
    "title": "Mercusys MR80X (AX3000 Wi-Fi 6)",
    "price": 490000,
    "oldPrice": 560000,
    "badge": "ТОП ЦЕНА",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "Wi-Fi 6 (2402+574 Мбит/с), 4 антенны 5 дБи с Beamforming, 3x Gigabit LAN, 1x Gigabit WAN, OFDMA, MU-MIMO",
    "description": "Доступный и скоростной маршрутизатор Wi-Fi 6 от Mercusys. Прекрасное решение для квартир со скоростными тарифами провайдеров. Поддерживает протокол безопасности WPA3 и Smart Connect."
  },
  {
    "id": 8,
    "brand": "Mercusys",
    "category": "Mesh-системы",
    "title": "Mercusys Halo H80X (AX3000 Mesh, комплект 2 шт.)",
    "price": 1050000,
    "oldPrice": 1200000,
    "badge": "ВЫГОДНЫЙ MESH",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "AX3000 Wi-Fi 6, покрытие до 460 м², 3x Gigabit порта на блок с автоопределением WAN/LAN, до 150 устройств",
    "description": "Единая Wi-Fi сеть для всего дома без мертвых зон и буферизации. Быстрая настройка через фирменное мобильное приложение MERCUSYS за 2 минуты."
  },
  {
    "id": 9,
    "brand": "TP-Link",
    "category": "Коммутаторы",
    "title": "TP-Link TL-SG108 (8-Port Gigabit Switch)",
    "price": 260000,
    "oldPrice": 295000,
    "badge": "В НАЛИЧИИ",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "8 гигабитных портов 10/100/1000 Мбит/с, металлический прочный корпус, Plug and Play, 802.1p/DSCP QoS",
    "description": "Неуправляемый коммутатор в надежном стальном корпусе. Энергосберегающая технология Green Ethernet снижает энергопотребление до 82%."
  },
  {
    "id": 10,
    "brand": "TP-Link",
    "category": "Коммутаторы",
    "title": "TP-Link TL-SG3428X JetStream L2+ (24x 1G + 4x 10G SFP+)",
    "price": 4300000,
    "oldPrice": 4800000,
    "badge": "ENTERPRISE",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "24 порта Gigabit RJ45, 4 порта 10G SFP+, интеграция с Omada SDN, L2+ статическая маршрутизация, монтируется в стойку 19\"",
    "description": "Управляемый коммутатор уровня L2+ корпоративного класса. Поддерживает централизованное облачное управление через Omada SDN и расширенные политики безопасности (802.1X, ACL, DoS Defend)."
  },
  {
    "id": 11,
    "brand": "TP-Link",
    "category": "Точки доступа",
    "title": "TP-Link Omada EAP683 UR (AX6000 Ceiling Wi-Fi 6)",
    "price": 3150000,
    "oldPrice": 3500000,
    "badge": "ХИТ OMADA",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "AX6000 (4804 Мбит/с на 5 ГГц + 1148 Мбит/с на 2.4 ГГц), 1x 2.5G порт с 802.3at PoE+, потолочное крепление, Omada Mesh",
    "description": "Высокоскоростная потолочная точка доступа для коммерческих помещений, ресторанов, гостиниц и офисов с высокой плотностью клиентов. Бесшовный роуминг 802.11k/v/r."
  },
  {
    "id": 12,
    "brand": "MikroTik",
    "category": "Коммутаторы",
    "title": "MikroTik Cloud Smart Switch CSS326-24G-2S+RM",
    "price": 2100000,
    "oldPrice": 2350000,
    "badge": "В НАЛИЧИИ",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "24x 1G RJ45 порта, 2x 10G SFP+ порта, SwOS, управление через Web GUI, поддержка VLAN, изоляция портов, монтаж в стойку",
    "description": "Управляемый свитч на операционной системе SwOS. Превосходный выбор для организации скоростного ядра сети малого и среднего офиса с 10-гигабитными аплинками."
  },
  {
    "id": 13,
    "brand": "Mercusys",
    "category": "Коммутаторы",
    "title": "Mercusys MS108G (8-Port Gigabit Desktop)",
    "price": 155000,
    "oldPrice": 180000,
    "badge": "БЮДЖЕТНЫЙ",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "8 портов 10/100/1000 Мбит/с с автосогласованием, компактный настольный корпус, не требует настройки",
    "description": "Простое расширение проводной сети для дома или рабочего стола. Высокая энергоэффективность и мгновенная работа без драйверов."
  },
  {
    "id": 14,
    "brand": "TP-Link",
    "category": "Коммутаторы",
    "title": "TP-Link ES220GMP (PoE+ Easy Managed Switch)",
    "price": 950000,
    "oldPrice": 1100000,
    "badge": "ДЛЯ IP-КАМЕР",
    "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "8 гигабитных портов RJ45 с PoE+ (бюджет 65 Вт), 1 гигабитный Uplink порт, веб-интерфейс, приоритезация трафика",
    "description": "Идеальный коммутатор для систем видеонаблюдения и точек доступа. Позволяет передавать питание и данные по одному кабелю витая пара на расстояние до 250 метров."
  },
  {
    "id": 15,
    "brand": "MikroTik",
    "category": "Точки доступа",
    "title": "MikroTik cAP ax (CAPGi-5HaxD2HaxD)",
    "price": 1450000,
    "oldPrice": 1650000,
    "badge": "CAPSMAN WI-FI 6",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "Wi-Fi 6 ax, 2x Gigabit Ethernet с PoE-in и PoE-out, 4-ядерный процессор, элегантный корпус, RouterOS v7",
    "description": "Потолочная точка доступа Wi-Fi 6 с поддержкой централизованного контроллера CAPsMAN. Отличается высокой мощностью передатчика и надежностью 24/7."
  },
  {
    "id": 16,
    "brand": "MikroTik",
    "category": "Оптика & SFP",
    "title": "MikroTik SFP+ 10G Модуль S+85DLC03D (Multi-mode)",
    "price": 380000,
    "oldPrice": 420000,
    "badge": "ОПТИКА",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "specs": "10 Гбит/с, длина волны 850 нм, дальность до 300 м, разъем Dual LC, поддержка DDM мониторинга",
    "description": "Оптический трансивер SFP+ для высокоскоростных межсерверных соединений и линков между коммутаторами."
  }
];

// Извлечение чистого ID таблицы из ссылки любого формата
function cleanSheetId(input) {
  if (!input) return "";
  let val = input.trim();
  const match = val.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) return match[1];
  return val.replace(/[^a-zA-Z0-9-_]/g, '');
}

// Состояние приложения
const state = {
  products: [...DEFAULT_PRODUCTS],
  filteredProducts: [...DEFAULT_PRODUCTS],
  cart: [],
  selectedCategory: 'ALL',
  selectedBrand: 'ALL',
  searchQuery: '',
  sortOrder: 'popular',
  currency: CONFIG.currency || 'UZS',
  activeSource: 'default',
  sheetId: cleanSheetId(localStorage.getItem('netcom_sheet_id') || CONFIG.googleSheetId || ''),
  sheetName: localStorage.getItem('netcom_sheet_name') || CONFIG.googleSheetName || 'Товары',
  isAdmin: sessionStorage.getItem('netcom_is_admin') === 'true'
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initUIFromConfig();
  loadCartFromStorage();
  setupEventListeners();
  checkAdminStatusOnLoad();

  // Сразу мгновенно отрисовываем базовые товары, чтобы экран никогда не зависал на спиннере
  applyLoadedProducts(DEFAULT_PRODUCTS, 'Базовый каталог (16 товаров)');

  // Если настроен Google Sheets — синхронизируем данные
  if (state.sheetId && state.sheetId.trim() !== '') {
    loadCatalogData(false);
  } else {
    fetchLocalProducts();
  }
});

function initUIFromConfig() {
  if (CONFIG.storeName) {
    document.getElementById('headerStoreName').textContent = CONFIG.storeName.split('|')[0].trim();
    document.getElementById('footerStoreName').textContent = CONFIG.storeName.split('|')[0].trim();
  }
  if (CONFIG.phone) {
    document.getElementById('topPhone').textContent = CONFIG.phone;
    document.getElementById('topPhoneLink').href = `tel:${CONFIG.phone.replace(/\s+/g, '')}`;
    document.getElementById('footerPhone').textContent = CONFIG.phone;
    document.getElementById('footerPhone').href = `tel:${CONFIG.phone.replace(/\s+/g, '')}`;
  }
  if (CONFIG.telegramManager) {
    document.getElementById('topTgLink').href = `https://t.me/${CONFIG.telegramManager}`;
    document.getElementById('footerTg').textContent = `@${CONFIG.telegramManager}`;
    document.getElementById('footerTg').href = `https://t.me/${CONFIG.telegramManager}`;
  }
  if (CONFIG.address) {
    document.getElementById('footerAddress').textContent = CONFIG.address;
  }
  updateCurrencyButtonLabel();
}

function checkAdminStatusOnLoad() {
  updateAdminUI();
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('admin')) {
    if (state.isAdmin) {
      openSettingsModal();
    } else {
      openAdminLoginModal();
    }
  }
}

function updateAdminUI() {
  const adminBtn = document.getElementById('adminHeaderBtn');
  if (adminBtn) {
    adminBtn.style.display = state.isAdmin ? 'inline-flex' : 'none';
  }
}

async function loadCatalogData(isManualSync = false) {
  const syncIcon = document.getElementById('adminSyncIcon');
  if (syncIcon && isManualSync) syncIcon.classList.add('fa-spin');

  const cleanId = cleanSheetId(state.sheetId);
  if (cleanId) {
    const success = await fetchFromGoogleSheets(cleanId, state.sheetName);
    if (syncIcon) syncIcon.classList.remove('fa-spin');
    if (success) {
      if (isManualSync) showToast('✅ Каталог обновлен из Google Таблицы!', 'success');
      return;
    } else {
      if (isManualSync) showToast('⚠️ Ошибка Google Таблицы. Проверьте доступ («Все, у кого есть ссылка — Читатель»)', 'error');
    }
  } else {
    if (isManualSync) showToast('⚠️ ID Google Таблицы не указан. Загружен стандартный каталог.', 'warning');
  }

  await fetchLocalProducts();
  if (syncIcon) syncIcon.classList.remove('fa-spin');
}

async function fetchFromGoogleSheets(sheetId, sheetName) {
  updateAdminStatus(true, 'Подключение к Google Sheets...');

  // Попытка 1: Fetch с указанным именем вкладки
  try {
    const url1 = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName || '')}`;
    const res = await fetch(url1);
    if (res.ok) {
      const text = await res.text();
      const parsed = parseGvizRawText(text);
      if (parsed && parsed.length > 0) {
        applyLoadedProducts(parsed, `Google Таблица (${parsed.length} шт.)`);
        return true;
      }
    }
  } catch (e) {
    console.warn('Fetch 1 не удался, пробуем 1-ю вкладку:', e);
  }

  // Попытка 2: Fetch без указания имени листа (Google отдает 1-ю вкладку по умолчанию)
  try {
    const url2 = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:json`;
    const res = await fetch(url2);
    if (res.ok) {
      const text = await res.text();
      const parsed = parseGvizRawText(text);
      if (parsed && parsed.length > 0) {
        applyLoadedProducts(parsed, `Google Таблица (${parsed.length} шт.)`);
        return true;
      }
    }
  } catch (e) {
    console.warn('Fetch 2 не удался, пробуем JSONP:', e);
  }

  // Попытка 3: JSONP (работает даже на локальных файлах file:/// без веб-сервера)
  try {
    const jsonpData = await fetchGoogleSheetsJsonp(sheetId, sheetName);
    if (jsonpData && jsonpData.length > 0) {
      applyLoadedProducts(jsonpData, `Google Таблица JSONP (${jsonpData.length} шт.)`);
      return true;
    }
  } catch (e) {
    console.warn('JSONP не удался:', e);
  }

  // Попытка 4: CSV
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/export?format=csv`;
    const res = await fetch(csvUrl);
    if (res.ok) {
      const csvText = await res.text();
      const parsed = parseCSVText(csvText);
      if (parsed && parsed.length > 0) {
        applyLoadedProducts(parsed, `Google Таблица CSV (${parsed.length} шт.)`);
        return true;
      }
    }
  } catch (e) {
    console.warn('CSV не удался:', e);
  }

  updateAdminStatus(false, 'Ошибка доступа к таблице (проверьте права)');
  return false;
}

function fetchGoogleSheetsJsonp(sheetId, sheetName) {
  return new Promise((resolve, reject) => {
    const callbackName = 'googleSheetsCb_' + Math.round(100000 * Math.random());
    const script = document.createElement('script');
    
    let timer = setTimeout(() => {
      cleanup();
      reject(new Error('JSONP timeout'));
    }, 8000);

    function cleanup() {
      if (timer) clearTimeout(timer);
      if (script.parentNode) script.parentNode.removeChild(script);
      delete window[callbackName];
    }

    window[callbackName] = function(json) {
      cleanup();
      if (json && json.table) {
        const items = parseGvizTable(json.table);
        resolve(items);
      } else {
        reject(new Error('Неверная структура JSONP'));
      }
    };

    script.src = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=responseHandler:${callbackName}&sheet=${encodeURIComponent(sheetName || '')}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('Ошибка загрузки JSONP'));
    };

    document.head.appendChild(script);
  });
}

function parseGvizRawText(text) {
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) {
    try {
      const rawJson = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
      return parseGvizTable(rawJson.table);
    } catch (e) {
      return null;
    }
  }
  return null;
}

async function fetchLocalProducts() {
  try {
    const res = await fetch('products.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        applyLoadedProducts(data, `Локальная база (${data.length} шт.)`);
        return;
      }
    }
  } catch (e) {}

  applyLoadedProducts(DEFAULT_PRODUCTS, `Базовый каталог (${DEFAULT_PRODUCTS.length} шт.)`);
}

function applyLoadedProducts(items, sourceName) {
  if (!items || items.length === 0) {
    items = DEFAULT_PRODUCTS;
  }

  state.products = items.map((p, idx) => ({
    id: p.id || idx + 1,
    brand: p.brand || 'TP-Link',
    category: p.category || 'Сетевое оборудование',
    title: p.title || 'Товар без названия',
    price: Number(p.price) || 0,
    oldPrice: Number(p.oldPrice) || 0,
    badge: p.badge || '',
    image: p.image && p.image.trim() !== '' ? p.image : 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    inStock: p.inStock === undefined ? true : (p.inStock === true || p.inStock === 1 || p.inStock === '1' || p.inStock === 'true' || p.inStock === 'Да'),
    specs: p.specs || '',
    description: p.description || 'Подробное описание уточняйте у менеджера.'
  }));

  state.activeSource = sourceName.includes('Google') ? 'google' : 'default';
  updateAdminStatus(true, sourceName);
  applyFiltersAndRender();
}

function updateAdminStatus(isActive, text) {
  const ind = document.getElementById('adminSourceIndicator');
  const txt = document.getElementById('adminSourceDetail');
  if (ind) {
    ind.className = `source-indicator ${isActive ? 'active' : ''}`;
    ind.style.backgroundColor = isActive ? '#10b981' : '#ef4444';
  }
  if (txt) {
    txt.textContent = text;
  }

  const linkRow = document.getElementById('adminSheetLinkRow');
  const link = document.getElementById('openExternalSheetLink');
  const cleanId = cleanSheetId(state.sheetId);
  if (linkRow && link) {
    if (cleanId) {
      linkRow.style.display = 'block';
      link.href = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(cleanId)}/edit`;
    } else {
      linkRow.style.display = 'none';
    }
  }
}

function parseGvizTable(table) {
  if (!table || !table.cols || !table.rows) return null;
  const colKeys = table.cols.map(c => (c.label || c.id || '').trim().toLowerCase());
  
  return table.rows.map((row, rIdx) => {
    const obj = {};
    if (row && row.c) {
      row.c.forEach((cell, cIdx) => {
        const key = colKeys[cIdx] || `col_${cIdx}`;
        const val = cell ? (cell.v !== undefined ? cell.v : cell.f) : '';
        obj[key] = val;
      });
    }

    return {
      id: obj.id || rIdx + 1,
      brand: obj.brand || obj['бренд'] || 'TP-Link',
      category: obj.category || obj['категория'] || 'Сетевое оборудование',
      title: obj.title || obj['название'] || obj['товар'] || '',
      price: obj.price || obj['цена'] || 0,
      oldPrice: obj.oldprice || obj['старая цена'] || 0,
      badge: obj.badge || obj['бейдж'] || '',
      image: obj.image || obj['картинка'] || obj['фото'] || '',
      inStock: obj.instock !== undefined ? obj.instock : (obj['наличие'] !== undefined ? obj['наличие'] : true),
      specs: obj.specs || obj['характеристики'] || '',
      description: obj.description || obj['описание'] || ''
    };
  }).filter(p => p.title && String(p.title).trim() !== '');
}

function parseCSVText(csv) {
  const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) return null;

  const headers = parseCSVRow(lines[0]).map(h => h.trim().toLowerCase());
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);
    if (!values || values.length === 0) continue;
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });

    if (obj.title || obj['название']) {
      results.push({
        id: obj.id || i,
        brand: obj.brand || obj['бренд'] || 'TP-Link',
        category: obj.category || obj['категория'] || 'Сетевое оборудование',
        title: obj.title || obj['название'] || '',
        price: obj.price || obj['цена'] || 0,
        oldPrice: obj.oldprice || obj['старая цена'] || 0,
        badge: obj.badge || obj['бейдж'] || '',
        image: obj.image || obj['картинка'] || '',
        inStock: obj.instock || obj['наличие'] || 1,
        specs: obj.specs || obj['характеристики'] || '',
        description: obj.description || obj['описание'] || ''
      });
    }
  }
  return results;
}

function parseCSVRow(row) {
  const values = [];
  let cur = '';
  let insideQuote = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"' || char === "'") {
      if (insideQuote && row[i+1] === char) {
        cur += char;
        i++;
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      values.push(cur);
      cur = '';
    } else {
      cur += char;
    }
  }
  values.push(cur);
  return values;
}

function applyFiltersAndRender() {
  let list = [...state.products];

  if (state.selectedCategory !== 'ALL') {
    list = list.filter(p => p.category.toLowerCase().trim() === state.selectedCategory.toLowerCase().trim());
  }

  if (state.selectedBrand !== 'ALL') {
    list = list.filter(p => p.brand.toLowerCase().trim() === state.selectedBrand.toLowerCase().trim());
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q)
    );
  }

  if (state.sortOrder === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortOrder === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortOrder === 'name-asc') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  state.filteredProducts = list;
  renderProductsGrid(list);
  
  const counter = document.getElementById('productsCount');
  if (counter) {
    counter.textContent = `Найдено: ${list.length} ${getNounPlural(list.length, 'товар', 'товара', 'товаров')}`;
  }
  
  const noRes = document.getElementById('noResults');
  if (noRes) {
    noRes.style.display = list.length === 0 ? 'block' : 'none';
  }
}

function renderProductsGrid(items) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = items.map(product => {
    const formattedPrice = formatCurrency(product.price);
    const formattedOldPrice = product.oldPrice > product.price ? formatCurrency(product.oldPrice) : '';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="card-image-box" onclick="openProductModal(${product.id})">
          <img class="card-img" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'">
          ${product.badge ? `<span class="card-badge">${escapeHtml(product.badge)}</span>` : ''}
          <span class="card-brand-tag">${escapeHtml(product.brand)}</span>
        </div>

        <div class="card-content">
          <span class="card-category">${escapeHtml(product.category)}</span>
          <h3 class="card-title" onclick="openProductModal(${product.id})" title="${escapeHtml(product.title)}">
            ${escapeHtml(product.title)}
          </h3>
          <p class="card-specs">${escapeHtml(product.specs || product.description)}</p>

          <div class="card-price-row">
            <span class="card-current-price">${formattedPrice}</span>
            ${formattedOldPrice ? `<span class="card-old-price">${formattedOldPrice}</span>` : ''}
          </div>

          <div class="card-actions-row">
            <button class="btn-card-cart" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus"></i> В корзину
            </button>
            <button class="btn-card-view" onclick="openProductModal(${product.id})" title="Подробнее">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function formatCurrency(amount) {
  const num = Number(amount) || 0;
  if (state.currency === 'USD') {
    const rate = CONFIG.usdRate || 12850;
    const usd = (num / rate).toFixed(0);
    return `$${usd}`;
  }
  return `${num.toLocaleString('ru-RU')} сум`;
}

function toggleCurrency() {
  state.currency = state.currency === 'UZS' ? 'USD' : 'UZS';
  updateCurrencyButtonLabel();
  applyFiltersAndRender();
  renderCartItems();
}

function updateCurrencyButtonLabel() {
  const label = document.getElementById('currencyLabel');
  if (label) {
    label.textContent = state.currency === 'UZS' ? 'UZS (сум)' : 'USD ($)';
  }
}

function openProductModal(productId) {
  const product = state.products.find(p => p.id == productId);
  if (!product) return;

  const modalBody = document.getElementById('productModalBody');
  const formattedPrice = formatCurrency(product.price);
  const formattedOldPrice = product.oldPrice > product.price ? formatCurrency(product.oldPrice) : '';

  modalBody.innerHTML = `
    <div class="modal-product-media">
      <img class="modal-product-img" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" onerror="this.src='https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'">
    </div>
    <div class="modal-product-info">
      <span class="modal-product-brand">${escapeHtml(product.brand)} • ${escapeHtml(product.category)}</span>
      <h2 class="modal-product-title">${escapeHtml(product.title)}</h2>

      <div class="modal-price-box">
        <span class="modal-current-price">${formattedPrice}</span>
        ${formattedOldPrice ? `<span class="card-old-price">${formattedOldPrice}</span>` : ''}
      </div>

      ${product.specs ? `
        <div class="modal-specs-list">
          <b><i class="fa-solid fa-microchip"></i> Основные характеристики:</b><br>
          ${escapeHtml(product.specs)}
        </div>
      ` : ''}

      <div class="modal-product-desc">
        ${escapeHtml(product.description)}
      </div>

      <div class="modal-actions-row" style="margin-top:auto; display:flex; gap:12px;">
        <button class="btn-card-cart" style="padding:14px; font-size:16px;" onclick="addToCart(${product.id}); closeProductModal();">
          <i class="fa-solid fa-cart-plus"></i> Добавить в корзину
        </button>
        <button class="btn-secondary" style="padding:14px;" onclick="directTelegramAsk('${escapeHtml(product.title)}')">
          <i class="fa-brands fa-telegram"></i> Задать вопрос в TG
        </button>
      </div>
    </div>
  `;

  document.getElementById('productModalOverlay').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModalOverlay').classList.remove('active');
}

function directTelegramAsk(productTitle) {
  const text = encodeURIComponent(`Здравствуйте! Интересует наличие и цена на: ${productTitle}`);
  const tgUser = CONFIG.telegramManager || 'jbnmedia';
  window.open(`https://t.me/${tgUser}?text=${text}`, '_blank');
}

function addToCart(productId) {
  const product = state.products.find(p => p.id == productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id == productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartBadge();
  animateCartBtn();
  showCartDrawer();
}

function changeCartQty(productId, delta) {
  const item = state.cart.find(i => i.id == productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id != productId);
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartItems();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id != productId);
  saveCartToStorage();
  updateCartBadge();
  renderCartItems();
}

function renderCartItems() {
  const list = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartFooter');
  const drawerCount = document.getElementById('drawerCartCount');
  const totalPriceElem = document.getElementById('cartTotalPrice');

  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  drawerCount.textContent = totalCount;

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-cart-plus"></i>
        <p>Ваша корзина пуста</p>
        <span>Выберите сетевое оборудование из каталога выше</span>
      </div>
    `;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';

  let grandTotal = 0;
  list.innerHTML = state.cart.map(item => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    return `
      <div class="cart-item-card">
        <img class="cart-item-img" src="${escapeHtml(item.image)}" alt="" onerror="this.src='https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80'">
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(item.title)}</div>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeCartQty(${item.id}, -1)">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Удалить"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
  }).join('');

  totalPriceElem.textContent = formatCurrency(grandTotal);
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalCount;
}

function animateCartBtn() {
  const btn = document.getElementById('openCartBtn');
  btn.style.transform = 'scale(1.15)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

function showCartDrawer() {
  renderCartItems();
  document.getElementById('cartOverlay').classList.add('active');
}

function hideCartDrawer() {
  document.getElementById('cartOverlay').classList.remove('active');
}

function saveCartToStorage() {
  localStorage.setItem('netcom_cart', JSON.stringify(state.cart));
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('netcom_cart');
    if (saved) state.cart = JSON.parse(saved);
    updateCartBadge();
  } catch (e) {
    state.cart = [];
  }
}

async function handleCheckout(event) {
  event.preventDefault();

  if (state.cart.length === 0) {
    showToast('Ваша корзина пуста!', 'warning');
    return;
  }

  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const telegram = document.getElementById('orderTelegram').value.trim();
  const payment = document.getElementById('orderPayment').value;

  const paymentLabels = {
    cash: 'Наличные при получении',
    card: 'Перевод / Click / Payme',
    bank: 'Перечисление для юрлиц (с НДС)'
  };

  let grandTotal = 0;
  let itemsText = state.cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;
    return `${idx + 1}. ${item.title} — ${item.quantity} шт. × ${item.price.toLocaleString('ru-RU')} = ${itemTotal.toLocaleString('ru-RU')} сум`;
  }).join('\n');

  const orderMessage = 
`⚡️ НОВЫЙ ЗАКАЗ С САЙТА LUXNET:
--------------------------------
👤 Клиент: ${name}
📞 Телефон: ${phone}
✈️ Telegram: ${telegram || 'не указан'}
💳 Оплата: ${paymentLabels[payment]}
--------------------------------
📦 СОСТАВ ЗАКАЗА:
${itemsText}
--------------------------------
ИТОГО К ОПЛАТЕ: ${grandTotal.toLocaleString('ru-RU')} сум
Дата: ${new Date().toLocaleString('ru-RU')}`;

  if (CONFIG.telegramBotToken && CONFIG.telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${CONFIG.telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CONFIG.telegramChatId,
          text: orderMessage
        })
      });
      showToast('Заказ успешно отправлен менеджеру!', 'success');
      state.cart = [];
      saveCartToStorage();
      updateCartBadge();
      hideCartDrawer();
      return;
    } catch (e) {
      console.warn('Ошибка отправки в бота, переход в Telegram:', e);
    }
  }

  const tgUser = CONFIG.telegramManager || 'jbnmedia';
  const url = `https://t.me/${tgUser}?text=${encodeURIComponent(orderMessage)}`;
  window.open(url, '_blank');

  state.cart = [];
  saveCartToStorage();
  updateCartBadge();
  hideCartDrawer();
}

function openAdminLoginModal() {
  const err = document.getElementById('adminLoginError');
  if (err) err.style.display = 'none';
  const input = document.getElementById('adminPasswordInput');
  if (input) input.value = '';
  document.getElementById('adminLoginModalOverlay').classList.add('active');
  setTimeout(() => { if (input) input.focus(); }, 100);
}

function closeAdminLoginModal() {
  document.getElementById('adminLoginModalOverlay').classList.remove('active');
}

function handleAdminLogin(event) {
  event.preventDefault();
  const input = document.getElementById('adminPasswordInput').value;
  const validPassword = CONFIG.adminPassword || 'admin';

  if (input === validPassword) {
    state.isAdmin = true;
    sessionStorage.setItem('netcom_is_admin', 'true');
    closeAdminLoginModal();
    updateAdminUI();
    openSettingsModal();
  } else {
    document.getElementById('adminLoginError').style.display = 'block';
  }
}

function openSettingsModal() {
  if (!state.isAdmin) {
    openAdminLoginModal();
    return;
  }
  document.getElementById('settingsSheetId').value = state.sheetId;
  document.getElementById('settingsSheetName').value = state.sheetName;
  document.getElementById('settingsUsdRate').value = CONFIG.usdRate || 12850;
  updateAdminStatus(state.activeSource === 'google', state.activeSource === 'google' ? `Google Таблица (${state.products.length} поз.)` : `Базовый каталог (${state.products.length} поз.)`);
  document.getElementById('settingsModalOverlay').classList.add('active');
}

function closeSettingsModal() {
  document.getElementById('settingsModalOverlay').classList.remove('active');
}

function saveSettings() {
  if (!state.isAdmin) return;

  const rawInput = document.getElementById('settingsSheetId').value.trim();
  const cleanId = cleanSheetId(rawInput);
  const newName = document.getElementById('settingsSheetName').value.trim() || 'Товары';
  const newRate = Number(document.getElementById('settingsUsdRate').value) || 12850;

  state.sheetId = cleanId;
  state.sheetName = newName;
  CONFIG.usdRate = newRate;

  localStorage.setItem('netcom_sheet_id', cleanId);
  localStorage.setItem('netcom_sheet_name', newName);

  closeSettingsModal();
  loadCatalogData(true);
}

function resetToDefault() {
  if (!state.isAdmin) return;
  if (!confirm('Вернуться к стандартному каталогу?')) return;

  state.sheetId = '';
  state.sheetName = 'Товары';
  localStorage.removeItem('netcom_sheet_id');
  localStorage.removeItem('netcom_sheet_name');
  closeSettingsModal();
  applyLoadedProducts(DEFAULT_PRODUCTS, `Базовый каталог (${DEFAULT_PRODUCTS.length} шт.)`);
  showToast('Возвращен стандартный каталог сетевых устройств', 'info');
}

function logoutAdmin() {
  state.isAdmin = false;
  sessionStorage.removeItem('netcom_is_admin');
  updateAdminUI();
  closeSettingsModal();
  showToast('Вы вышли из панели администратора', 'info');
}

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:9999; display:flex; flex-direction:column; gap:8px; pointer-events:none;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#0284c7'
  };

  toast.style.cssText = `background:${bgColors[type] || '#0f172a'}; color:#fff; padding:12px 20px; border-radius:10px; font-size:14px; font-weight:600; box-shadow:0 8px 20px rgba(0,0,0,0.4); animation:slideUpToast 0.3s ease; pointer-events:auto; display:flex; align-items:center; gap:8px; max-width:380px;`;
  toast.textContent = message;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function resetFilters() {
  state.selectedCategory = 'ALL';
  state.selectedBrand = 'ALL';
  state.searchQuery = '';
  state.sortOrder = 'popular';

  document.querySelectorAll('.category-pill').forEach(btn => btn.classList.remove('active'));
  const allCatBtn = document.querySelector('.category-pill[data-category="ALL"]');
  if (allCatBtn) allCatBtn.classList.add('active');

  document.querySelectorAll('.brand-btn').forEach(btn => btn.classList.remove('active'));
  const allBrandBtn = document.querySelector('.brand-btn[data-brand="ALL"]');
  if (allBrandBtn) allBrandBtn.classList.add('active');

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.style.display = 'none';

  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.value = 'popular';

  applyFiltersAndRender();
}

function filterByCategory(category) {
  state.selectedCategory = category;
  document.querySelectorAll('.category-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category.toLowerCase() === category.toLowerCase());
  });
  applyFiltersAndRender();
  window.scrollTo({ top: 380, behavior: 'smooth' });
}

function filterByBrand(brand) {
  state.selectedBrand = brand;
  document.querySelectorAll('.brand-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.brand.toLowerCase() === brand.toLowerCase());
  });
  applyFiltersAndRender();
  window.scrollTo({ top: 380, behavior: 'smooth' });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getNounPlural(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) return five;
  n %= 10;
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return two;
  return five;
}

function setupEventListeners() {
  document.getElementById('categoriesNav').addEventListener('click', (e) => {
    const btn = e.target.closest('.category-pill');
    if (!btn) return;
    document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.selectedCategory = btn.dataset.category;
    applyFiltersAndRender();
  });

  document.getElementById('brandFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('.brand-btn');
    if (!btn) return;
    document.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.selectedBrand = btn.dataset.brand;
    applyFiltersAndRender();
  });

  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      applyFiltersAndRender();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      applyFiltersAndRender();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortOrder = e.target.value;
      applyFiltersAndRender();
    });
  }

  const curBtn = document.getElementById('currencyToggleBtn');
  if (curBtn) curBtn.addEventListener('click', toggleCurrency);

  const openCart = document.getElementById('openCartBtn');
  if (openCart) openCart.addEventListener('click', showCartDrawer);
  
  const closeCart = document.getElementById('closeCartBtn');
  if (closeCart) closeCart.addEventListener('click', hideCartDrawer);
  
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'cartOverlay') hideCartDrawer();
    });
  }

  const closeProd = document.getElementById('closeProductModalBtn');
  if (closeProd) closeProd.addEventListener('click', closeProductModal);
  
  const prodOverlay = document.getElementById('productModalOverlay');
  if (prodOverlay) {
    prodOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'productModalOverlay') closeProductModal();
    });
  }

  const closeSettings = document.getElementById('closeSettingsModalBtn');
  if (closeSettings) closeSettings.addEventListener('click', closeSettingsModal);
  
  const setOverlay = document.getElementById('settingsModalOverlay');
  if (setOverlay) {
    setOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'settingsModalOverlay') closeSettingsModal();
    });
  }

  const saveSet = document.getElementById('saveSettingsBtn');
  if (saveSet) saveSet.addEventListener('click', saveSettings);
  
  const resetDef = document.getElementById('resetToDefaultBtn');
  if (resetDef) resetDef.addEventListener('click', resetToDefault);

  const closeAdmin = document.getElementById('closeAdminLoginBtn');
  if (closeAdmin) closeAdmin.addEventListener('click', closeAdminLoginModal);
  
  const adminOverlay = document.getElementById('adminLoginModalOverlay');
  if (adminOverlay) {
    adminOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'adminLoginModalOverlay') closeAdminLoginModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
      e.preventDefault();
      if (state.isAdmin) {
        openSettingsModal();
      } else {
        openAdminLoginModal();
      }
    }
  });

  const trigger = document.getElementById('adminSecretTrigger');
  let clickCount = 0;
  let clickTimer = null;
  if (trigger) {
    trigger.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);
      if (clickCount >= 3) {
        clickCount = 0;
        if (state.isAdmin) openSettingsModal();
        else openAdminLoginModal();
      } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 800);
      }
    });
  }
}

