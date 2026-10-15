(() => {
  "use strict";

  // 1. ИЗОЛЯЦИЯ КОНФИГУРАЦИИ И ЗАЩИТА ПАРОЛЯ ОТ КОНСОЛИ
  const RAW_CFG = window.__LUXNET_INIT_CFG__ || window.CONFIG || {};
  try {
    delete window.__LUXNET_INIT_CFG__;
    delete window.CONFIG;
  } catch (e) {}

  const PRIVATE_CONFIG = Object.freeze({
    storeName: RAW_CFG.storeName || "LUXNET",
    phone: RAW_CFG.phone || "+998977707220",
    phoneFormatted: RAW_CFG.phoneFormatted || "+998 97 770 72 20",
    telegramManager: RAW_CFG.telegramManager || "jbnmedia",
    address:
      typeof RAW_CFG.address === "object"
        ? RAW_CFG.address
        : {
            ru: "г. Ташкент, ТЦ Малика / Юнусабад",
            uz: "Toshkent sh., Malika savdo majmuasi / Yunusobod",
            en: "Tashkent, Malika Tech Mall / Yunusabad"
          },
    securitySalt: RAW_CFG.securitySalt || "LUXNET_SEC_2026_SALT_v2#",
    adminPasswordHash:
      localStorage.getItem("luxnet_custom_admin_hash") ||
      RAW_CFG.adminPasswordHash ||
      "31c974d5897f560e9bf697388889fa47e38bcefb4f38f1104a74b1a50b621340",
    enableConsoleProtection: RAW_CFG.enableConsoleProtection !== false,
    defaultUsdRate: Number(RAW_CFG.usdRate) || 12850,
    defaultSheetId: RAW_CFG.googleSheetId || "",
    defaultSheetName: RAW_CFG.googleSheetName || "Товары",
    geminiApiKey: localStorage.getItem("luxnet_gemini_key") || RAW_CFG.geminiApiKey || ""
  });

  Object.defineProperty(window, "CONFIG", {
    get() {
      return Object.freeze({ protected: true });
    },
    configurable: false
  });

  if (PRIVATE_CONFIG.enableConsoleProtection) {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.metaKey && e.altKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
        return false;
      }
    });
  }

  // 2. ПОЛНЫЙ СЛОВАРЬ МУЛЬТИЯЗЫЧНОСТИ (RU / UZ / EN) — ИСПРАВЛЕНЫ ВСЕ КЛЮЧИ ФУТЕРА И АДМИНКИ
  const I18N = {
    ru: {
      top_delivery: "Быстрая доставка по Ташкенту и всем регионам Узбекистана",
      top_tg: "Telegram Консультант",
      logo_subtitle: "СЕТЕВЫЕ РЕШЕНИЯ",
      search_placeholder: "Поиск роутеров, коммутаторов, моделей (напр. AX55, hEX S, Omada)...",
      admin_btn: "Админ",
      fav_btn: "Избранное",
      cart_btn: "Корзина",
      hero_chip: "100% Оригинальное оборудование в Ташкенте",
      hero_title: "Профессиональное сетевое оборудование для дома и бизнеса в Узбекистане",
      hero_desc: "Официальная гарантия, консультации сертифицированных специалистов, оптовые и розничные поставки роутеров Wi-Fi 6/7, Mesh-систем, коммутаторов и оптики с ТЦ Малика.",
      ask_ai_btn: "Помощь ИИ в подборе",
      trust_1_title: "Официальная гарантия",
      trust_1_desc: "Сервисная поддержка от 1 года на всю технику",
      trust_2_title: "Доставка по Ташкенту и РУз",
      trust_2_desc: "По Ташкенту за 2 часа, в регионы через BTS / СДЭК",
      trust_3_title: "Оплата и перечисление с НДС",
      trust_3_desc: "Договоры и ЭСФ (Didox), Click, Payme, наличные",
      cat_all: "Все товары",
      cat_featured: "★ Избранные хиты",
      cat_favorites: "Моё избранное",
      cat_routers: "Wi-Fi Роутеры",
      cat_wifi7: "Wi-Fi 7",
      cat_mesh: "Mesh-системы",
      cat_switches: "Коммутаторы (Switches)",
      cat_ap: "Точки доступа",
      cat_mikrotik: "MikroTik RouterOS",
      cat_sfp: "Оптика & SFP",
      brand_label: "Бренд:",
      brand_all: "Все",
      sort_popular: "Сначала избранные и хиты",
      sort_price_asc: "Сначала дешевле",
      sort_price_desc: "Сначала дороже",
      sort_name_asc: "По названию (А-Я)",
      found_prefix: "Найдено:",
      found_suffix: "товаров",
      loading_catalog: "Загрузка каталога сетевого оборудования...",
      no_results_title: "Ничего не найдено",
      no_results_desc: "Попробуйте изменить поисковый запрос или сбросить фильтры.",
      reset_filters: "Сбросить все фильтры",
      in_stock: "В наличии",
      out_of_stock: "Под заказ",
      add_to_cart: "В корзину",
      details_btn: "Подробнее",
      featured_ribbon: "★ ИЗБРАННЫЙ",
      specs_title: "Технические характеристики",
      desc_title: "Описание модели",
      cart_title: "Корзина заказов",
      cart_empty_title: "Ваша корзина пуста",
      cart_empty_sub: "Выберите сетевое оборудование из каталога или спросите ИИ-помощника",
      cart_total_label: "Сумма заказа:",
      checkout_title: "Данные получателя",
      checkout_name_ph: "Ваше имя / Компания *",
      checkout_tg_ph: "Telegram (@username) или адрес доставки",
      pay_cash: "Оплата при получении (Наличные)",
      pay_card: "Перевод / Click / Payme",
      pay_bank: "Перечисление для юрлиц с НДС (Счет-фактура)",
      checkout_submit: "Отправить заказ в Telegram",
      admin_login_title: "Вход в панель управления",
      admin_login_sub: "Защищено SHA-256 криптографией",
      admin_pass_label: "Пароль администратора:",
      admin_login_btn: "Войти",
      footer_subtitle: "Сетевые решения в Узбекистане",
      footer_desc: "Официальные поставки оборудования TP-Link, Mercusys, MikroTik. Сертифицированная продукция, гарантия, настройка и монтаж сетей под ключ.",
      footer_cat_title: "Категории",
      footer_link_routers: "Роутеры Wi-Fi 6 и 7",
      footer_link_mesh: "Бесшовные Mesh-системы",
      footer_link_switches: "Свитчи и PoE коммутаторы",
      footer_contacts_title: "Контакты и склад",
      footer_hours_title: "График работы",
      footer_hours_1: "Пн — Сб: 09:00 – 19:00",
      footer_hours_2: "Воскресенье: 10:00 – 17:00",
      footer_hours_3: "Поддержка в Telegram: 24/7",
      footer_copy: "© 2026 LUXNET. Все права защищены.",
      footer_distributor: "Официальный дистрибьютор сетевых технологий в РУз",
      seo_title: "Купить сетевое оборудование TP-Link, MikroTik и Mercusys в Ташкенте (ТЦ Малика)",
      seo_p1: "Интернет-магазин LUXNET — официальный поставщик сетевого оборудования в Узбекистане. У нас на складе в Ташкенте (ТЦ Малика / Юнусабад) представлены гигабитные роутеры Wi-Fi 6 и Wi-Fi 7, бесшовные Mesh-системы TP-Link Deco и Mercusys Halo, PoE+ коммутаторы для IP-камер, точки доступа Omada и маршрутизаторы MikroTik.",
      ai_fab_title: "ИИ-Консультант",
      ai_fab_sub: "Подбор оборудования 24/7",
      ai_status: "Сетевой инженер-ассистент",
      ai_input_placeholder: "Опишите задачу (напр.: роутер для квартиры 90 м²)...",
      ai_welcome: "Здравствуйте! Я ИИ-инженер **LUXNET**. Помогу подобрать роутер, Mesh-систему, коммутатор для камер или MikroTik под ваш бюджет и площадь. Что вы ищете?",
      ai_prompts: [
        "Роутер для квартиры до 1 млн сум",
        "Mesh-система для большого дома",
        "Коммутатор PoE для IP-камер",
        "Надежный роутер для офиса (MikroTik)"
      ]
    },
    uz: {
      top_delivery: "Toshkent va O‘zbekistonning barcha hududlariga tezkor yetkazib berish",
      top_tg: "Telegram Maslahatchi",
      logo_subtitle: "TARMOQ YECHIMLARI",
      search_placeholder: "Router, kommutator va modellarni qidirish (masalan: AX55, hEX S, Omada)...",
      admin_btn: "Admin",
      fav_btn: "Sevimlilar",
      cart_btn: "Savat",
      hero_chip: "Toshkentda 100% Original tarmoq uskunalari",
      hero_title: "O‘zbekistonda uy va biznes uchun professional tarmoq uskunalari",
      hero_desc: "Rasmiy kafolat, mutaxassislar maslahati, Malika savdo majmuasidan Wi-Fi 6/7 routerlar, Mesh-tizimlar, PoE kommutatorlarning ulgurji va chakana savdosi.",
      ask_ai_btn: "AI yordamida tanlash",
      trust_1_title: "Rasmiy kafolat",
      trust_1_desc: "Barcha qurilmalarga kamida 1 yillik servis kafolati",
      trust_2_title: "Toshkent va viloyatlarga yetkazish",
      trust_2_desc: "Toshkentda 2 soat ichida, viloyatlarga BTS orqali",
      trust_3_title: "QQS bilan pul o‘tkazish",
      trust_3_desc: "Didox shartnoma va hisobvaraq-faktura, Click, Payme",
      cat_all: "Barcha mahsulotlar",
      cat_featured: "★ Tanlangan xitlar",
      cat_favorites: "Sevimlilarim",
      cat_routers: "Wi-Fi Routerlar",
      cat_wifi7: "Wi-Fi 7",
      cat_mesh: "Mesh-tizimlar",
      cat_switches: "Kommutatorlar (Switch)",
      cat_ap: "Kirish nuqtalari (AP)",
      cat_mikrotik: "MikroTik RouterOS",
      cat_sfp: "Optika va SFP",
      brand_label: "Brend:",
      brand_all: "Barchasi",
      sort_popular: "Avval tanlangan va xitlar",
      sort_price_asc: "Avval arzonlari",
      sort_price_desc: "Avval qimmatlari",
      sort_name_asc: "Nomi bo‘yicha (A-Z)",
      found_prefix: "Topildi:",
      found_suffix: "ta mahsulot",
      loading_catalog: "Katalog yuklanmoqda...",
      no_results_title: "Hech narsa topilmadi",
      no_results_desc: "Qidiruv so‘zini o‘zgartirib ko‘ring yoki filtrlarni tiklang.",
      reset_filters: "Filtrlarni tozalash",
      in_stock: "Sotuvda bor",
      out_of_stock: "Buyurtma asosida",
      add_to_cart: "Savatga",
      details_btn: "Batafsil",
      featured_ribbon: "★ TANLANGAN",
      specs_title: "Texnik xususiyatlari",
      desc_title: "Model tavsifi",
      cart_title: "Buyurtmalar savati",
      cart_empty_title: "Savatingiz bo‘sh",
      cart_empty_sub: "Katalogdan qurilma tanlang yoki AI-maslahatchidan so‘rang",
      cart_total_label: "Jami summa:",
      checkout_title: "Buyurtmachi ma’lumotlari",
      checkout_name_ph: "Ismingiz / Kompaniya *",
      checkout_tg_ph: "Telegram (@username) yoki yetkazib berish manzili",
      pay_cash: "Qabul qilganda to‘lov (Naqd)",
      pay_card: "Karta orqali / Click / Payme",
      pay_bank: "Yuridik shaxslar uchun pul o‘tkazish (QQS bilan)",
      checkout_submit: "Buyurtmani Telegramga yuborish",
      admin_login_title: "Boshqaruv paneliga kirish",
      admin_login_sub: "SHA-256 kriptografiyasi bilan himoyalangan",
      admin_pass_label: "Administrator paroli:",
      admin_login_btn: "Kirish",
      footer_subtitle: "O‘zbekistonda tarmoq yechimlari",
      footer_desc: "TP-Link, Mercusys, MikroTik uskunalarini rasmiy yetkazib berish. Sertifikatlangan mahsulotlar, kafolat va tarmoqlarni o‘rnatish.",
      footer_cat_title: "Kategoriyalar",
      footer_link_routers: "Wi-Fi 6 va 7 routerlar",
      footer_link_mesh: "Uzluksiz Mesh-tizimlar",
      footer_link_switches: "Svitch va PoE kommutatorlar",
      footer_contacts_title: "Aloqa va ombor",
      footer_hours_title: "Ish vaqti",
      footer_hours_1: "Du — Sha: 09:00 – 19:00",
      footer_hours_2: "Yakshanba: 10:00 – 17:00",
      footer_hours_3: "Telegram orqali yordam: 24/7",
      footer_copy: "© 2026 LUXNET. Barcha huquqlar himoyalangan.",
      footer_distributor: "O‘zRda tarmoq texnologiyalarining rasmiy distribyutori",
      seo_title: "Toshkentda (Malika bozori) TP-Link, MikroTik va Mercusys uskunalarini xarid qilish",
      seo_p1: "LUXNET internet-do‘koni — O‘zbekistonda tarmoq uskunalarining rasmiy yetkazib beruvchisi. Toshkentdagi omborimizda Wi-Fi 6 va Wi-Fi 7 routerlar, TP-Link Deco va Mercusys Halo Mesh-tizimlar, IP-kameralar uchun PoE+ kommutatorlar hamda MikroTik mavjud.",
      ai_fab_title: "AI-Maslahatchi",
      ai_fab_sub: "24/7 uskuna tanlash",
      ai_status: "Tarmoq muhandisi (AI)",
      ai_input_placeholder: "Vazifani yozing (masalan: 3 xonali uyga router)...",
      ai_welcome: "Assalomu alaykum! Men **LUXNET** AI-muhandisiman. Uy yoki ofis maydoni va byudjetingizga mos Wi-Fi router, Mesh-tizim, PoE kommutator yoki MikroTik tanlab beraman!",
      ai_prompts: [
        "Kvartira uchun hamyonbop Wi-Fi 6 router",
        "Katta hovli/uy uchun Mesh-tizim",
        "IP-kameralar uchun PoE kommutator",
        "Ofis uchun ishonchli MikroTik"
      ]
    },
    en: {
      top_delivery: "Fast delivery across Tashkent and all regions of Uzbekistan",
      top_tg: "Telegram Consultant",
      logo_subtitle: "NETWORK SOLUTIONS",
      search_placeholder: "Search routers, switches, models (e.g. AX55, hEX S, Omada)...",
      admin_btn: "Admin",
      fav_btn: "Favorites",
      cart_btn: "Cart",
      hero_chip: "100% Genuine Networking Hardware in Tashkent",
      hero_title: "Professional Networking Equipment for Home & Business in Uzbekistan",
      hero_desc: "Official warranty, certified engineer consultations, wholesale & retail supply of Wi-Fi 6/7 routers, Mesh systems, PoE switches, and fiber optics from Malika Tech Mall.",
      ask_ai_btn: "AI Hardware Advisor",
      trust_1_title: "Official Warranty",
      trust_1_desc: "1+ year service support on all networking hardware",
      trust_2_title: "Tashkent & Uzbekistan Delivery",
      trust_2_desc: "2-hour delivery in Tashkent, nationwide via BTS/CDEK",
      trust_3_title: "B2B & Corporate VAT",
      trust_3_desc: "Bank wire transfer with VAT, contracts, Click & Payme",
      cat_all: "All Products",
      cat_featured: "★ Featured Hits",
      cat_favorites: "My Favorites",
      cat_routers: "Wi-Fi Routers",
      cat_wifi7: "Wi-Fi 7",
      cat_mesh: "Mesh Systems",
      cat_switches: "Network Switches",
      cat_ap: "Access Points",
      cat_mikrotik: "MikroTik RouterOS",
      cat_sfp: "Fiber & SFP",
      brand_label: "Brand:",
      brand_all: "All",
      sort_popular: "Featured & Best Selling",
      sort_price_asc: "Price: Low to High",
      sort_price_desc: "Price: High to Low",
      sort_name_asc: "Name (A–Z)",
      found_prefix: "Found:",
      found_suffix: "items",
      loading_catalog: "Loading networking catalog...",
      no_results_title: "No matching products",
      no_results_desc: "Try adjusting your search query or resetting filters.",
      reset_filters: "Reset All Filters",
      in_stock: "In Stock",
      out_of_stock: "Pre-order",
      add_to_cart: "Add to Cart",
      details_btn: "Details",
      featured_ribbon: "★ FEATURED",
      specs_title: "Technical Specifications",
      desc_title: "Product Description",
      cart_title: "Shopping Cart",
      cart_empty_title: "Your cart is empty",
      cart_empty_sub: "Pick hardware from the catalog or ask our AI Advisor",
      cart_total_label: "Order Total:",
      checkout_title: "Customer Details",
      checkout_name_ph: "Your Name / Company *",
      checkout_tg_ph: "Telegram (@username) or delivery address",
      pay_cash: "Cash on Delivery",
      pay_card: "Card Transfer / Click / Payme",
      pay_bank: "Corporate Wire Transfer (with VAT)",
      checkout_submit: "Send Order via Telegram",
      admin_login_title: "Admin Control Panel Login",
      admin_login_sub: "Protected by SHA-256 Cryptography",
      admin_pass_label: "Administrator Password:",
      admin_login_btn: "Sign In",
      footer_subtitle: "Network Solutions in Uzbekistan",
      footer_desc: "Official supply of TP-Link, Mercusys, and MikroTik hardware. Certified equipment, warranty, configuration, and turnkey network installation.",
      footer_cat_title: "Categories",
      footer_link_routers: "Wi-Fi 6 & Wi-Fi 7 Routers",
      footer_link_mesh: "Seamless Mesh Systems",
      footer_link_switches: "Switches & PoE Hardware",
      footer_contacts_title: "Contacts & Warehouse",
      footer_hours_title: "Working Hours",
      footer_hours_1: "Mon — Sat: 09:00 – 19:00",
      footer_hours_2: "Sunday: 10:00 – 17:00",
      footer_hours_3: "Telegram Support: 24/7",
      footer_copy: "© 2026 LUXNET. All rights reserved.",
      footer_distributor: "Official Networking Hardware Distributor in Uzbekistan",
      seo_title: "Buy TP-Link, MikroTik & Mercusys Networking Gear in Tashkent (Malika Mall)",
      seo_p1: "LUXNET is an official networking hardware supplier in Uzbekistan. Our Tashkent warehouse stocks Gigabit Wi-Fi 6 & Wi-Fi 7 routers, TP-Link Deco & Mercusys Halo Mesh systems, PoE+ switches for IP cameras, Omada access points, and MikroTik routers.",
      ai_fab_title: "AI Advisor",
      ai_fab_sub: "24/7 Hardware Picker",
      ai_status: "AI Network Engineer",
      ai_input_placeholder: "Describe your need (e.g. Wi-Fi for 100 sqm apartment)...",
      ai_welcome: "Hello! I am the **LUXNET AI Network Engineer**. Tell me about your apartment size, office setup, IP cameras, or budget, and I will recommend the best routers or switches!",
      ai_prompts: [
        "Best Wi-Fi 6 router for an apartment",
        "Mesh system for a 2-story house",
        "PoE switch for IP cameras",
        "Reliable MikroTik router for office"
      ]
    }
  };

  const CATEGORY_TRANSLATIONS = {
    "Wi-Fi Роутеры": { ru: "Wi-Fi Роутеры", uz: "Wi-Fi Routerlar", en: "Wi-Fi Routers" },
    "Wi-Fi 7": { ru: "Wi-Fi 7", uz: "Wi-Fi 7", en: "Wi-Fi 7" },
    "Mesh-системы": { ru: "Mesh-системы", uz: "Mesh-tizimlar", en: "Mesh Systems" },
    "Коммутаторы": { ru: "Коммутаторы", uz: "Kommutatorlar", en: "Switches" },
    "Точки доступа": { ru: "Точки доступа", uz: "Kirish nuqtalari", en: "Access Points" },
    "Маршрутизаторы MikroTik": { ru: "Маршрутизаторы MikroTik", uz: "MikroTik Routerlar", en: "MikroTik Routers" },
    "Оптика & SFP": { ru: "Оптика & SFP", uz: "Optika va SFP", en: "Fiber & SFP" }
  };

  const FALLBACK_GALLERY = [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=600&q=80"
  ];

  // Кеш прозрачных изображений + дедупликация параллельных запросов + реестр предзагрузки
  const transparentImageCache = new Map();
  const inFlightCanvasPromises = new Map();
  const preloadedUrls = new Set();

  // Утилита для фоновых задач без блокировки интерфейса
  const scheduleIdleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));

  // 3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
  let state = {
    products: [],
    filteredProducts: [],
    activeCategory: "ALL",
    activeBrand: "ALL",
    searchQuery: "",
    sortBy: "popular",
    currency: localStorage.getItem("luxnet_currency") || "UZS",
    usdRate: Number(localStorage.getItem("luxnet_usd_rate")) || PRIVATE_CONFIG.defaultUsdRate,
    sheetId: localStorage.getItem("luxnet_sheet_id") ?? PRIVATE_CONFIG.defaultSheetId,
    sheetName: localStorage.getItem("luxnet_sheet_name") || PRIVATE_CONFIG.defaultSheetName,
    autoBgRemove: localStorage.getItem("luxnet_auto_bg_remove") !== "false",
    geminiKey: localStorage.getItem("luxnet_gemini_key") || PRIVATE_CONFIG.geminiApiKey,
    lang: localStorage.getItem("luxnet_lang") || "ru",
    theme: localStorage.getItem("luxnet_theme") || "dark",
    cart: JSON.parse(localStorage.getItem("luxnet_cart") || "[]"),
    favorites: JSON.parse(localStorage.getItem("luxnet_favorites") || "[]"),
    cardSlideIndex: {},
    isAdmin: sessionStorage.getItem("luxnet_admin_session") === "verified_sha256",
    loginAttempts: Number(sessionStorage.getItem("luxnet_login_attempts") || "0"),
    lockoutUntil: Number(sessionStorage.getItem("luxnet_lockout_until") || "0"),
    dataSource: "Локальная база (products.json)"
  };

  // 4. СИСТЕМА УМНОЙ ПРЕДЗАГРУЗКИ ФОТОГРАФИЙ ПО РЕКОМЕНДАЦИЯМ И НАВЕДЕНИЮ
  function preloadImageUrl(url, highPriority = false) {
    if (!url || preloadedUrls.has(url) || url.startsWith("data:")) return;
    preloadedUrls.add(url);

    const img = new Image();
    if (highPriority && "fetchPriority" in img) {
      img.fetchPriority = "high";
    }
    img.decoding = "async";
    img.src = url;
  }

  // Предзагрузка фото рекомендуемых товаров (Featured Хиты + рекомендации ИИ)
  function preloadRecommendedProductPhotos(products) {
    if (!Array.isArray(products) || !products.length) return;

    // 1. Сначала мгновенно предзагружаем первые 4 товара (видимый первый экран LCP)
    const topVisible = products.slice(0, 4);
    topVisible.forEach((p) => {
      const mainImg = p.images?.[0] || p.image;
      preloadImageUrl(mainImg, true);
    });

    // 2. В режиме простоя браузера предзагружаем все рекомендуемые хиты (featured) и топ каждой категории для ИИ
    scheduleIdleTask(() => {
      const recommended = products.filter((p) => p.featured);
      recommended.forEach((p) => {
        if (Array.isArray(p.images)) {
          p.images.slice(0, 2).forEach((u) => preloadImageUrl(u, false));
        }
      });
    });
  }

  // Предзагрузка остальных ракурсов (2, 3, 4 фото) при наведении мыши или касании карточки
  window.preloadProductGalleryOnHover = function (productId) {
    const product = state.products.find((p) => p.id === Number(productId));
    if (!product || !Array.isArray(product.images)) return;
    product.images.forEach((url) => preloadImageUrl(url, false));
  };

  // 5. ОПТИМИЗИРОВАННОЕ УДАЛЕНИЕ БЕЛОГО ФОНА ЧЕРЕЗ CANVAS (С ДЕДУПЛИКАЦИЕЙ И INTERSECTION OBSERVER)
  function computeTransparentDataUrl(originalSrc) {
    if (transparentImageCache.has(originalSrc)) {
      return Promise.resolve(transparentImageCache.get(originalSrc));
    }
    if (inFlightCanvasPromises.has(originalSrc)) {
      return inFlightCanvasPromises.get(originalSrc);
    }

    const promise = new Promise((resolve) => {
      const workImg = new Image();
      workImg.crossOrigin = "Anonymous";
      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(originalSrc)}&w=500&output=png`;

      workImg.onload = () => {
        scheduleIdleTask(() => {
          try {
            const w = workImg.naturalWidth || workImg.width;
            const h = workImg.naturalHeight || workImg.height;
            if (!w || !h) {
              resolve(null);
              return;
            }

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(workImg, 0, 0, w, h);

            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;

            const isLightPixel = (idx) => {
              const r = data[idx], g = data[idx + 1], b = data[idx + 2];
              const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
              return r > 218 && g > 218 && b > 218 && maxDiff < 26;
            };

            const corners = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + (w - 1)) * 4];
            const lightCorners = corners.filter((c) => isLightPixel(c)).length;

            if (lightCorners >= 2) {
              const visited = new Uint8Array(w * h);
              const queue = new Int32Array(w * h);
              let head = 0, tail = 0;

              for (let x = 0; x < w; x++) {
                const topIdx = x;
                const botIdx = (h - 1) * w + x;
                if (isLightPixel(topIdx * 4)) { visited[topIdx] = 1; queue[tail++] = topIdx; }
                if (isLightPixel(botIdx * 4)) { visited[botIdx] = 1; queue[tail++] = botIdx; }
              }
              for (let y = 1; y < h - 1; y++) {
                const leftIdx = y * w;
                const rightIdx = y * w + (w - 1);
                if (isLightPixel(leftIdx * 4)) { visited[leftIdx] = 1; queue[tail++] = leftIdx; }
                if (isLightPixel(rightIdx * 4)) { visited[rightIdx] = 1; queue[tail++] = rightIdx; }
              }

              while (head < tail) {
                const p = queue[head++];
                const p4 = p * 4;
                const brightness = (data[p4] + data[p4 + 1] + data[p4 + 2]) / 3;
                data[p4 + 3] = brightness > 238 ? 0 : Math.max(0, Math.round((238 - brightness) * 8));

                const x = p % w;
                const y = (p / w) | 0;

                if (x > 0) {
                  const n = p - 1;
                  if (!visited[n] && isLightPixel(n * 4)) { visited[n] = 1; queue[tail++] = n; }
                }
                if (x < w - 1) {
                  const n = p + 1;
                  if (!visited[n] && isLightPixel(n * 4)) { visited[n] = 1; queue[tail++] = n; }
                }
                if (y > 0) {
                  const n = p - w;
                  if (!visited[n] && isLightPixel(n * 4)) { visited[n] = 1; queue[tail++] = n; }
                }
                if (y < h - 1) {
                  const n = p + w;
                  if (!visited[n] && isLightPixel(n * 4)) { visited[n] = 1; queue[tail++] = n; }
                }
              }

              ctx.putImageData(imgData, 0, 0);
              const dataUrl = canvas.toDataURL("image/png");
              transparentImageCache.set(originalSrc, dataUrl);
              resolve(dataUrl);
              return;
            }
            transparentImageCache.set(originalSrc, null);
            resolve(null);
          } catch (e) {
            resolve(null);
          }
        });
      };

      workImg.onerror = () => resolve(null);
      workImg.src = proxyUrl;
    }).finally(() => {
      inFlightCanvasPromises.delete(originalSrc);
    });

    inFlightCanvasPromises.set(originalSrc, promise);
    return promise;
  }

  function processTransparentImage(imgEl) {
    if (!state.autoBgRemove || !imgEl) return;
    const originalSrc = imgEl.getAttribute("data-raw-src") || imgEl.src;
    if (!originalSrc || originalSrc.startsWith("data:image/")) return;

    if (transparentImageCache.has(originalSrc)) {
      const cached = transparentImageCache.get(originalSrc);
      if (cached) {
        imgEl.src = cached;
        imgEl.classList.add("bg-processed");
      }
      return;
    }

    computeTransparentDataUrl(originalSrc).then((dataUrl) => {
      if (dataUrl && imgEl.getAttribute("data-raw-src") === originalSrc) {
        imgEl.src = dataUrl;
        imgEl.classList.add("bg-processed");
      }
    });
  }

  let bgObserver = null;
  function runAutoBackgroundRemovalOnDOM() {
    if (!state.autoBgRemove) return;

    if ("IntersectionObserver" in window) {
      if (!bgObserver) {
        bgObserver = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                processTransparentImage(entry.target);
                obs.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "200px 0px" }
        );
      }
      document.querySelectorAll("img.auto-transparent-img:not(.bg-processed)").forEach((img) => {
        bgObserver.observe(img);
      });
    } else {
      document.querySelectorAll("img.auto-transparent-img").forEach(processTransparentImage);
    }
  }

  // 6. КРИПТОГРАФИЯ SHA-256
  async function computeSha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(PRIVATE_CONFIG.securitySalt + text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // 7. ИНИЦИАЛИЗАЦИЯ
  document.addEventListener("DOMContentLoaded", () => {
    setPreloadBarState("loading");
    initTheme();
    initLanguage();
    initContacts();
    initEventListeners();
    checkAdminAccessTrigger();
    updateFavoritesUI();
    updateCartUI();
    loadCatalogData(false);
    initAiAssistant();
  });

  function setPreloadBarState(status) {
    const bar = document.getElementById("sitePreloadBar");
    if (!bar) return;
    if (status === "loading") {
      bar.className = "site-preload-bar loading";
    } else {
      bar.className = "site-preload-bar done";
    }
  }

  function initTheme() {
    applyTheme(state.theme);
    document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("luxnet_theme", state.theme);
      applyTheme(state.theme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("themeIcon");
    if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  function t(key) {
    const dict = I18N[state.lang] || I18N.ru;
    return dict[key] || I18N.ru[key] || key;
  }

  function translateCategory(cat) {
    return CATEGORY_TRANSLATIONS[cat]?.[state.lang] || cat;
  }

  function initLanguage() {
    applyLanguage(state.lang);
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const newLang = btn.getAttribute("data-lang");
        if (newLang && I18N[newLang]) {
          state.lang = newLang;
          localStorage.setItem("luxnet_lang", newLang);
          applyLanguage(newLang);
          renderProducts();
          updateCartUI();
          renderAiQuickPrompts();
        }
      });
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key));
    });
    const footerAddr = document.getElementById("footerAddress");
    if (footerAddr) footerAddr.textContent = PRIVATE_CONFIG.address[lang] || PRIVATE_CONFIG.address.ru;
    updateCurrencyButtonLabel();
  }

  function initContacts() {
    const topPhone = document.getElementById("topPhone");
    const topPhoneLink = document.getElementById("topPhoneLink");
    const footerPhone = document.getElementById("footerPhone");
    if (topPhone) topPhone.textContent = PRIVATE_CONFIG.phoneFormatted;
    if (topPhoneLink) topPhoneLink.href = `tel:${PRIVATE_CONFIG.phone}`;
    if (footerPhone) {
      footerPhone.textContent = PRIVATE_CONFIG.phoneFormatted;
      footerPhone.href = `tel:${PRIVATE_CONFIG.phone}`;
    }
    updateCurrencyButtonLabel();
  }

  function formatPrice(priceUzs) {
    const numeric = Number(priceUzs) || 0;
    if (state.currency === "USD") {
      const usd = numeric / (state.usdRate || 12850);
      return `$${usd.toFixed(usd >= 100 ? 0 : 1)}`;
    }
    const suffix = state.lang === "uz" ? "so'm" : state.lang === "en" ? "UZS" : "сум";
    return `${numeric.toLocaleString("ru-RU")} ${suffix}`;
  }

  function updateCurrencyButtonLabel() {
    const lbl = document.getElementById("currencyLabel");
    if (lbl) lbl.textContent = state.currency === "UZS" ? "UZS" : "USD ($)";
  }

  // 8. НОРМАЛИЗАЦИЯ МАССИВА ИЗ 3–4 ФОТОГРАФИЙ ДЛЯ КАЖДОГО ТОВАРА
  function buildProductImages(rawProduct) {
    let urls = [];
    if (Array.isArray(rawProduct.images)) {
      urls.push(...rawProduct.images);
    }
    if (rawProduct.image) {
      String(rawProduct.image)
        .split(/[|;,]/)
        .map((s) => s.trim())
        .filter((s) => s.startsWith("http") || s.startsWith("img/") || s.startsWith("data:"))
        .forEach((u) => urls.push(u));
    }
    ["image2", "image3", "image4"].forEach((key) => {
      if (rawProduct[key] && String(rawProduct[key]).trim().length > 4) {
        urls.push(String(rawProduct[key]).trim());
      }
    });

    urls = [...new Set(urls)];
    for (const fb of FALLBACK_GALLERY) {
      if (urls.length >= 4) break;
      if (!urls.includes(fb)) urls.push(fb);
    }
    return urls.slice(0, 4);
  }

  // 9. СВЕРХБЫСТРАЯ ЗАГРУЗКА КАТАЛОГА (STALE-WHILE-REVALIDATE + КЕШ)
  window.loadCatalogData = async function (forceRefresh = false) {
    const syncIcon = document.getElementById("adminSyncIcon");
    if (syncIcon) syncIcon.classList.add("fa-spin");
    setPreloadBarState("loading");

    // Шаг 1: Мгновенный рендер из кеша localStorage (если не нажато принудительное обновление)
    if (!forceRefresh) {
      try {
        const cachedRaw = localStorage.getItem("luxnet_catalog_cache_v1");
        const cachedSource = localStorage.getItem("luxnet_catalog_source_v1");
        if (cachedRaw) {
          const cachedProducts = JSON.parse(cachedRaw);
          if (Array.isArray(cachedProducts) && cachedProducts.length > 0) {
            state.products = cachedProducts;
            state.dataSource = cachedSource || `Кеш (${cachedProducts.length})`;
            applyFiltersAndSort();
            preloadRecommendedProductPhotos(state.products);
            setPreloadBarState("done");
          }
        }
      } catch (e) {}
    }

    // Шаг 2: Если кеша еще нет, мгновенно загружаем предзагруженный локальный products.json
    if (state.products.length === 0) {
      try {
        const res = await fetch("products.json");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            state.products = json.map((p) => ({
              ...p,
              featured: Boolean(p.featured ?? [1, 2, 3, 6, 11].includes(p.id)),
              images: buildProductImages(p)
            }));
            state.dataSource = `products.json (${state.products.length})`;
            applyFiltersAndSort();
            preloadRecommendedProductPhotos(state.products);
            setPreloadBarState("done");
          }
        }
      } catch (e) {}
    }

    // Шаг 3: Фоновая синхронизация с Google Sheets (не блокирует интерфейс пользователя)
    if (state.sheetId && state.sheetId.trim().length > 10) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);
        const csvUrl = `https://docs.google.com/spreadsheets/d/${state.sheetId.trim()}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(state.sheetName)}`;
        const res = await fetch(csvUrl, {
          cache: forceRefresh ? "no-store" : "default",
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const csvText = await res.text();
          const parsed = parseCSVToProducts(csvText);
          if (parsed.length > 0) {
            state.products = parsed;
            state.dataSource = `Google Sheets (${parsed.length})`;
            localStorage.setItem("luxnet_catalog_cache_v1", JSON.stringify(parsed));
            localStorage.setItem("luxnet_catalog_source_v1", state.dataSource);
            applyFiltersAndSort();
            preloadRecommendedProductPhotos(state.products);
          }
        }
      } catch (err) {
        // При оффлайне или таймауте остаёмся на быстрой локальной/кешированной базе
      }
    }

    if (syncIcon) syncIcon.classList.remove("fa-spin");
    setPreloadBarState("done");
    updateAdminStatusUI();
    injectProductSchemaJsonLd();
  };

  function parseCSVToProducts(csvText) {
    const rows = [];
    let current = "";
    let inQuotes = false;
    let row = [];

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const next = csvText[i + 1];
      if (char === '"' && inQuotes && next === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(current.trim());
        current = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (current || row.length > 0) {
          row.push(current.trim());
          rows.push(row);
          row = [];
          current = "";
        }
      } else {
        current += char;
      }
    }
    if (current || row.length > 0) {
      row.push(current.trim());
      rows.push(row);
    }

    if (rows.length < 2) return [];
    const headers = rows[0].map((h) => h.replace(/^"|"$/g, "").trim().toLowerCase());
    const products = [];

    for (let r = 1; r < rows.length; r++) {
      const vals = rows[r];
      if (vals.length < 3) continue;
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = vals[idx] || "";
      });
      const title = obj.title || obj["название"] || "";
      if (!title) continue;

      const id = Number(obj.id) || r;
      const rawFeatured = String(obj.featured || obj["избранный"] || "").toLowerCase();
      const isFeatured =
        ["1", "true", "да", "хит", "star"].includes(rawFeatured) ||
        (!obj.featured && [1, 2, 3, 6, 11].includes(id));

      const item = {
        id,
        brand: obj.brand || obj["бренд"] || "TP-Link",
        category: obj.category || obj["категория"] || "Wi-Fi Роутеры",
        title,
        price: Number(String(obj.price || obj["цена"] || "0").replace(/[^\d.]/g, "")) || 0,
        oldPrice: Number(String(obj.oldprice || obj["старая цена"] || "0").replace(/[^\d.]/g, "")) || 0,
        badge: obj.badge || obj["бейдж"] || "",
        featured: isFeatured,
        image: obj.image || obj["фото"] || FALLBACK_GALLERY[0],
        image2: obj.image2 || obj["фото2"] || "",
        image3: obj.image3 || obj["фото3"] || "",
        image4: obj.image4 || obj["фото4"] || "",
        inStock: !["false", "0", "нет"].includes(String(obj.instock || "true").toLowerCase()),
        specs: obj.specs || obj["характеристики"] || "",
        description: obj.description || obj["описание"] || ""
      };
      item.images = buildProductImages(item);
      products.push(item);
    }
    return products;
  }

  function injectProductSchemaJsonLd() {
    const el = document.getElementById("schemaOrgProducts");
    if (!el || !state.products.length) return;
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": state.products.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": p.title,
          "image": p.images,
          "description": p.description || p.specs,
          "brand": { "@type": "Brand", "name": p.brand },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "UZS",
            "price": p.price,
            "availability": p.inStock ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            "seller": { "@type": "Organization", "name": "LUXNET Tashkent" }
          }
        }
      }))
    };
    el.textContent = JSON.stringify(itemList);
  }

  // 10. ИЗБРАННОЕ ПОЛЬЗОВАТЕЛЯ (WISHLIST ❤️)
  window.toggleFavorite = function (id, event) {
    if (event) event.stopPropagation();
    const numId = Number(id);
    const idx = state.favorites.indexOf(numId);
    if (idx > -1) {
      state.favorites.splice(idx, 1);
    } else {
      state.favorites.push(numId);
    }
    localStorage.setItem("luxnet_favorites", JSON.stringify(state.favorites));
    updateFavoritesUI();

    if (state.activeCategory === "FAVORITES") {
      applyFiltersAndSort();
    } else {
      document.querySelectorAll(`.fav-card-btn[data-id="${numId}"]`).forEach((btn) => {
        btn.classList.toggle("active", state.favorites.includes(numId));
      });
    }
  };

  function updateFavoritesUI() {
    const count = state.favorites.length;
    const headerCount = document.getElementById("favCount");
    const navCount = document.getElementById("navFavCount");
    if (headerCount) headerCount.textContent = count;
    if (navCount) navCount.textContent = count;
  }

  // 11. ПЕРЕКЛЮЧЕНИЕ 3–4 ФОТОГРАФИЙ В КАРТОЧКЕ ТОВАРА
  window.changeCardSlide = function (productId, newIndex, event) {
    if (event) event.stopPropagation();
    const product = state.products.find((p) => p.id === Number(productId));
    if (!product || !product.images) return;
    const total = product.images.length;
    const normalized = ((newIndex % total) + total) % total;
    state.cardSlideIndex[productId] = normalized;

    // Предзагружаем соседний слайд заранее
    preloadImageUrl(product.images[(normalized + 1) % total], false);

    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!card) return;
    const imgEl = card.querySelector(".card-main-photo");
    if (imgEl) {
      imgEl.classList.remove("bg-processed");
      imgEl.setAttribute("data-raw-src", product.images[normalized]);
      imgEl.src = product.images[normalized];
      processTransparentImage(imgEl);
    }
    card.querySelectorAll(".card-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === normalized);
    });
  };

  // 12. ФИЛЬТРАЦИЯ И ОТРИСОВКА КАТАЛОГА
  function applyFiltersAndSort() {
    const q = state.searchQuery.trim().toLowerCase();

    let list = state.products.filter((p) => {
      let matchCat = true;
      if (state.activeCategory === "FAVORITES") {
        matchCat = state.favorites.includes(p.id);
      } else if (state.activeCategory === "FEATURED") {
        matchCat = Boolean(p.featured);
      } else if (state.activeCategory !== "ALL") {
        matchCat = p.category === state.activeCategory;
      }

      const matchBrand =
        state.activeBrand === "ALL" ||
        (p.brand && p.brand.toLowerCase() === state.activeBrand.toLowerCase());
      const matchQuery =
        !q ||
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.specs && p.specs.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));
      return matchCat && matchBrand && matchQuery;
    });

    if (state.sortBy === "popular") {
      list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    } else if (state.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "name-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    state.filteredProducts = list;
    renderProducts();
  }

  function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const noResults = document.getElementById("noResults");
    const counter = document.getElementById("productsCount");
    if (!grid) return;

    if (counter) {
      counter.textContent = `${t("found_prefix")} ${state.filteredProducts.length} ${t("found_suffix")}`;
    }

    if (state.filteredProducts.length === 0) {
      grid.innerHTML = "";
      if (noResults) noResults.style.display = "block";
      return;
    }

    if (noResults) noResults.style.display = "none";

    grid.innerHTML = state.filteredProducts
      .map((p, cardIndex) => {
        const imgs = p.images && p.images.length ? p.images : [p.image];
        const curIdx = state.cardSlideIndex[p.id] || 0;
        const activeImg = imgs[curIdx] || imgs[0];
        const isFav = state.favorites.includes(p.id);

        // Первые 4 карточки на экране грузятся с высоким приоритетом (LCP), остальные — лениво
        const isHighPriority = cardIndex < 4;
        const loadingAttr = isHighPriority ? "eager" : "lazy";
        const priorityAttr = isHighPriority ? 'fetchpriority="high"' : 'fetchpriority="low"';

        const specsList = (p.specs || "")
          .split(",")
          .slice(0, 3)
          .map((s) => `<span class="spec-chip">${escapeHtml(s.trim())}</span>`)
          .join("");

        const dotsHtml = imgs
          .map(
            (_, idx) =>
              `<button type="button" class="card-dot ${idx === curIdx ? "active" : ""}" onclick="changeCardSlide(${p.id}, ${idx}, event)" aria-label="Фото ${idx + 1}"></button>`
          )
          .join("");

        return `
        <article class="product-card ${p.featured ? "is-featured-card" : ""}" data-product-id="${p.id}" onmouseenter="preloadProductGalleryOnHover(${p.id})" ontouchstart="preloadProductGalleryOnHover(${p.id})" onclick="openProductModal(${p.id})">
          <div class="product-image-wrap">
            <div class="card-badges-top">
              ${p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ""}
            </div>

            <button type="button" class="fav-card-btn ${isFav ? "active" : ""}" data-id="${p.id}" onclick="toggleFavorite(${p.id}, event)" title="В избранное">
              <i class="fa-solid fa-heart"></i>
            </button>

            <span class="product-brand-tag">${escapeHtml(p.brand)}</span>

            <button type="button" class="card-slider-arrow prev" onclick="changeCardSlide(${p.id}, ${(curIdx - 1 + imgs.length) % imgs.length}, event)">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button type="button" class="card-slider-arrow next" onclick="changeCardSlide(${p.id}, ${(curIdx + 1) % imgs.length}, event)">
              <i class="fa-solid fa-chevron-right"></i>
            </button>

            <div class="product-img-stage">
              <img class="card-main-photo auto-transparent-img" width="240" height="180" loading="${loadingAttr}" ${priorityAttr} decoding="async" data-raw-src="${escapeHtml(activeImg)}" src="${escapeHtml(activeImg)}" alt="${escapeHtml(p.title)}">
            </div>

            <div class="card-slider-dots" onclick="event.stopPropagation()">
              ${dotsHtml}
            </div>
          </div>

          <div class="product-body">
            <div class="product-category">${escapeHtml(translateCategory(p.category))}</div>
            <h3 class="product-title">${escapeHtml(p.title)}</h3>
            <div class="product-specs-chips">${specsList}</div>
            <div class="product-footer" onclick="event.stopPropagation()">
              <div class="price-block">
                ${p.oldPrice > p.price ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
                <span class="current-price">${formatPrice(p.price)}</span>
              </div>
              <button class="add-cart-btn" onclick="addToCart(${p.id})">
                <i class="fa-solid fa-cart-plus"></i> <span>${t("add_to_cart")}</span>
              </button>
            </div>
          </div>
        </article>`;
      })
      .join("");

    runAutoBackgroundRemovalOnDOM();
  }

  // 13. МОДАЛЬНОЕ ОКНО С ПОЛНОЙ ГАЛЕРЕЕЙ НА 3–4 ФОТО
  window.openProductModal = function (id) {
    const product = state.products.find((p) => p.id === Number(id));
    if (!product) return;
    const modal = document.getElementById("productModalOverlay");
    const body = document.getElementById("productModalBody");
    if (!modal || !body) return;

    const imgs = product.images && product.images.length ? product.images : [product.image];
    imgs.forEach((u) => preloadImageUrl(u, true));
    const isFav = state.favorites.includes(product.id);

    const thumbsHtml = imgs
      .map(
        (imgUrl, idx) => `
        <button type="button" class="modal-thumb-btn ${idx === 0 ? "active" : ""}" data-photo-url="${escapeHtml(imgUrl)}" onclick="switchModalPhoto(this)">
          <img class="auto-transparent-img" decoding="async" data-raw-src="${escapeHtml(imgUrl)}" src="${escapeHtml(imgUrl)}" alt="Фото ${idx + 1}">
        </button>`
      )
      .join("");

    const specsItems = (product.specs || "")
      .split(",")
      .map((s) => `<li><i class="fa-solid fa-check"></i> ${escapeHtml(s.trim())}</li>`)
      .join("");

    body.innerHTML = `
      <div class="modal-gallery-col">
        <div class="modal-main-img-stage">
          <img id="modalMainPhoto" class="auto-transparent-img" fetchpriority="high" decoding="async" data-raw-src="${escapeHtml(imgs[0])}" src="${escapeHtml(imgs[0])}" alt="${escapeHtml(product.title)}">
        </div>
        <div class="modal-thumbs-row">
          ${thumbsHtml}
        </div>
      </div>

      <div class="modal-product-info">
        <div class="modal-meta-row">
          <span class="modal-brand">${escapeHtml(product.brand)}</span>
          <span class="modal-stock ${product.inStock ? "in" : "out"}">
            <i class="fa-solid fa-circle-check"></i> ${product.inStock ? t("in_stock") : t("out_of_stock")}
          </span>
        </div>
        <h2>${escapeHtml(product.title)}</h2>
        <div class="modal-price-box">
          <span class="modal-price">${formatPrice(product.price)}</span>
          ${product.oldPrice > product.price ? `<span class="modal-old-price">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
        <h4>${t("specs_title")}:</h4>
        <ul class="modal-specs-list">${specsItems}</ul>
        <h4>${t("desc_title")}:</h4>
        <p class="modal-desc">${escapeHtml(product.description)}</p>
        <div class="modal-actions">
          <button class="btn-primary" onclick="addToCart(${product.id}); closeProductModal();">
            <i class="fa-solid fa-cart-plus"></i> ${t("add_to_cart")}
          </button>
          <button class="btn-secondary fav-modal-btn ${isFav ? "active" : ""}" onclick="toggleFavorite(${product.id}); this.classList.toggle('active');">
            <i class="fa-solid fa-heart"></i> ${t("fav_btn")}
          </button>
          <button class="btn-secondary" onclick="askAiAboutProduct(${product.id})">
            <i class="fa-solid fa-robot"></i> ИИ
          </button>
        </div>
      </div>
    `;
    modal.classList.add("open");
    runAutoBackgroundRemovalOnDOM();
  };

  window.switchModalPhoto = function (btnEl) {
    if (!btnEl) return;
    const url = btnEl.getAttribute("data-photo-url");
    const mainImg = document.getElementById("modalMainPhoto");
    if (mainImg && url) {
      mainImg.classList.remove("bg-processed");
      mainImg.setAttribute("data-raw-src", url);
      mainImg.src = url;
      processTransparentImage(mainImg);
    }
    document.querySelectorAll(".modal-thumb-btn").forEach((b) => b.classList.remove("active"));
    btnEl.classList.add("active");
  };

  window.closeProductModal = function () {
    document.getElementById("productModalOverlay")?.classList.remove("open");
  };

  window.filterByCategory = function (category) {
    state.activeCategory = category;
    document.querySelectorAll(".category-pill").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-category") === category);
    });
    applyFiltersAndSort();
  };

  window.filterByBrand = function (brand) {
    state.activeBrand = brand;
    document.querySelectorAll(".brand-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-brand") === brand);
    });
    applyFiltersAndSort();
  };

  window.resetFilters = function () {
    state.activeCategory = "ALL";
    state.activeBrand = "ALL";
    state.searchQuery = "";
    const input = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    if (input) input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    document.querySelectorAll(".category-pill").forEach((b) => b.classList.toggle("active", b.dataset.category === "ALL"));
    document.querySelectorAll(".brand-btn").forEach((b) => b.classList.toggle("active", b.dataset.brand === "ALL"));
    applyFiltersAndSort();
  };

  // 14. КОРЗИНА И ЗАКАЗ В TELEGRAM
  window.addToCart = function (id) {
    const product = state.products.find((p) => p.id === Number(id));
    if (!product) return;
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) existing.qty += 1;
    else state.cart.push({ id: product.id, title: product.title, price: product.price, image: product.images?.[0] || product.image, qty: 1 });
    localStorage.setItem("luxnet_cart", JSON.stringify(state.cart));
    updateCartUI();
  };

  window.changeCartQty = function (id, delta) {
    const idx = state.cart.findIndex((i) => i.id === Number(id));
    if (idx === -1) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    localStorage.setItem("luxnet_cart", JSON.stringify(state.cart));
    updateCartUI();
  };

  function updateCartUI() {
    const totalCount = state.cart.reduce((acc, i) => acc + i.qty, 0);
    const totalPrice = state.cart.reduce((acc, i) => acc + i.price * i.qty, 0);

    const badge = document.getElementById("cartCount");
    const drawerBadge = document.getElementById("drawerCartCount");
    const listEl = document.getElementById("cartItemsList");
    const footerEl = document.getElementById("cartFooter");
    const totalEl = document.getElementById("cartTotalPrice");

    if (badge) badge.textContent = totalCount;
    if (drawerBadge) drawerBadge.textContent = totalCount;
    if (totalEl) totalEl.textContent = formatPrice(totalPrice);
    if (!listEl) return;

    if (state.cart.length === 0) {
      if (footerEl) footerEl.style.display = "none";
      listEl.innerHTML = `<div class="empty-cart-state"><i class="fa-solid fa-cart-plus"></i><p>${t("cart_empty_title")}</p><span>${t("cart_empty_sub")}</span></div>`;
      return;
    }

    if (footerEl) footerEl.style.display = "block";
    listEl.innerHTML = state.cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async">
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(item.title)}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        </div>
        <div class="cart-qty-controls">
          <button type="button" onclick="changeCartQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button type="button" onclick="changeCartQty(${item.id}, 1)">+</button>
        </div>
      </div>`
      )
      .join("");
  }

  window.handleCheckout = function (e) {
    e.preventDefault();
    if (state.cart.length === 0) return;
    const name = document.getElementById("orderName").value.trim();
    const phone = document.getElementById("orderPhone").value.trim();
    const tg = document.getElementById("orderTelegram").value.trim();
    const payment = document.getElementById("orderPayment").value;
    const totalUzs = state.cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    const itemsLines = state.cart.map((i, idx) => `${idx + 1}. ${i.title} × ${i.qty} шт. = ${formatPrice(i.price * i.qty)}`).join("\n");

    const message =
      `🛒 *НОВЫЙ ЗАКАЗ — LUXNET*\n\n` +
      `👤 *Клиент:* ${name}\n📞 *Телефон:* ${phone}\n📍 *Адрес/TG:* ${tg || "—"}\n💳 *Оплата:* ${payment}\n\n` +
      `📦 *Товары:*\n${itemsLines}\n\n💰 *ИТОГО:* ${formatPrice(totalUzs)}`;

    window.open(`https://t.me/${PRIVATE_CONFIG.telegramManager}?text=${encodeURIComponent(message)}`, "_blank");
    state.cart = [];
    localStorage.setItem("luxnet_cart", "[]");
    updateCartUI();
    document.getElementById("cartOverlay").classList.remove("open");
  };

  // 15. ИИ-ПОМОЩНИК (LUXNET AI) С ПРЕДЗАГРУЗКОЙ РЕКОМЕНДУЕМЫХ ФОТО
  function initAiAssistant() {
    renderAiQuickPrompts();
    const msgBox = document.getElementById("aiChatMessages");
    if (msgBox && msgBox.children.length === 0) appendAiMessage(t("ai_welcome"), "bot");
  }

  function renderAiQuickPrompts() {
    const box = document.getElementById("aiQuickPrompts");
    if (!box) return;
    box.innerHTML = (t("ai_prompts") || [])
      .map((p) => `<button type="button" class="ai-prompt-chip" data-prompt="${escapeHtml(p)}" onclick="sendQuickAiPrompt(this.getAttribute('data-prompt'))">${escapeHtml(p)}</button>`)
      .join("");
  }

  window.toggleAiChat = function (forceState) {
    const win = document.getElementById("aiChatWindow");
    if (!win) return;
    const isOpen = typeof forceState === "boolean" ? forceState : !win.classList.contains("open");
    win.classList.toggle("open", isOpen);
    if (isOpen) {
      preloadRecommendedProductPhotos(state.products);
    }
  };

  window.clearAiChat = function () {
    const msgBox = document.getElementById("aiChatMessages");
    if (msgBox) {
      msgBox.innerHTML = "";
      appendAiMessage(t("ai_welcome"), "bot");
    }
  };

  window.sendQuickAiPrompt = function (text) {
    const input = document.getElementById("aiChatInput");
    if (input) input.value = text;
    handleAiSubmit(new Event("submit"));
  };

  window.askAiAboutProduct = function (productId) {
    const product = state.products.find((p) => p.id === Number(productId));
    if (!product) return;
    closeProductModal();
    toggleAiChat(true);
    sendQuickAiPrompt(`Расскажи про ${product.title}`);
  };

  window.handleAiSubmit = async function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("aiChatInput");
    const userText = input?.value.trim();
    if (!userText) return;
    input.value = "";
    appendAiMessage(userText, "user");
    const reply = await generateSmartAiResponse(userText);
    // Предзагружаем фото рекомендованных ИИ товаров
    if (Array.isArray(reply.recommendations)) {
      reply.recommendations.forEach((p) => preloadImageUrl(p.images?.[0] || p.image, true));
    }
    appendAiMessage(reply.text, "bot", reply.recommendations);
  };

  function appendAiMessage(text, sender, recommendations = []) {
    const msgBox = document.getElementById("aiChatMessages");
    if (!msgBox) return;
    const div = document.createElement("div");
    div.className = `ai-msg ai-msg-${sender}`;
    const formatted = escapeHtml(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
    const recsHtml = recommendations.length
      ? `<div class="ai-rec-list">` +
        recommendations
          .map(
            (p) => `
          <div class="ai-rec-card" onmouseenter="preloadProductGalleryOnHover(${p.id})">
            <img src="${escapeHtml(p.images?.[0] || p.image)}" alt="${escapeHtml(p.title)}" decoding="async">
            <div class="ai-rec-info">
              <div class="ai-rec-title">${escapeHtml(p.title)}</div>
              <div class="ai-rec-price">${formatPrice(p.price)}</div>
              <div class="ai-rec-btns">
                <button type="button" onclick="openProductModal(${p.id})">${t("details_btn")}</button>
                <button type="button" class="primary" onclick="addToCart(${p.id})"><i class="fa-solid fa-cart-plus"></i></button>
              </div>
            </div>
          </div>`
          )
          .join("") +
        `</div>`
      : "";
    div.innerHTML = `<div class="ai-msg-bubble">${formatted}${recsHtml}</div>`;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  async function generateSmartAiResponse(query) {
    const q = query.toLowerCase();

    // Поиск конкретного товара по названию
    const matchedProduct = state.products.find((p) => q.includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(q.replace("расскажи про ", "").trim()));
    if (matchedProduct && q.length > 5) {
      return {
        text: `**${matchedProduct.title}** — отличный выбор от бренда **${matchedProduct.brand}**.\nХарактеристики: ${matchedProduct.specs}.\n${matchedProduct.description}`,
        recommendations: [matchedProduct]
      };
    }

    if (q.includes("mesh") || q.includes("меш") || q.includes("дом") || q.includes("hovli") || q.includes("этаж")) {
      return {
        text: "Для большого дома или двухэтажного коттеджа рекомендую бесшовные **Mesh-системы Wi-Fi 6** (единая сеть без мертвых зон):",
        recommendations: state.products.filter((p) => p.category === "Mesh-системы").slice(0, 2)
      };
    }
    if (q.includes("камер") || q.includes("poe") || q.includes("свитч") || q.includes("коммутатор")) {
      return {
        text: "Для IP-камер видеонаблюдения и точек доступа лучшее решение — **PoE+ коммутаторы** (передача питания и данных до 250 м):",
        recommendations: state.products.filter((p) => p.category === "Коммутаторы").slice(0, 2)
      };
    }
    if (q.includes("офис") || q.includes("mikrotik") || q.includes("микротик") || q.includes("omada")) {
      return {
        text: "Для офиса, бизнеса и высокой нагрузки рекомендую профессиональное оборудование **MikroTik** и потолочные точки **TP-Link Omada**:",
        recommendations: state.products.filter((p) => p.brand === "MikroTik" || p.category === "Точки доступа").slice(0, 3)
      };
    }
    return {
      text: "Рекомендую наши избранные хиты продаж **Wi-Fi 6 и Wi-Fi 7** для скоростного интернета:",
      recommendations: state.products.filter((p) => p.featured).slice(0, 3)
    };
  }

  // 16. АДМИН-ПАНЕЛЬ, ЗАЩИТА ОТ БРУТФОРСА И СОБЫТИЯ
  function checkAdminAccessTrigger() {
    if (state.isAdmin) {
      const btn = document.getElementById("adminHeaderBtn");
      if (btn) btn.style.display = "inline-flex";
    }
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toUpperCase() === "A") {
        e.preventDefault();
        state.isAdmin ? openSettingsModal() : document.getElementById("adminLoginModalOverlay")?.classList.add("open");
      }
      if (e.key === "Escape") {
        closeProductModal();
        document.getElementById("cartOverlay")?.classList.remove("open");
        document.getElementById("adminLoginModalOverlay")?.classList.remove("open");
        document.getElementById("settingsModalOverlay")?.classList.remove("open");
      }
    });
    let clicks = 0, timer = null;
    document.getElementById("adminSecretTrigger")?.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      if (clicks >= 3) {
        clicks = 0;
        state.isAdmin ? openSettingsModal() : document.getElementById("adminLoginModalOverlay")?.classList.add("open");
      } else timer = setTimeout(() => (clicks = 0), 700);
    });
  }

  window.handleAdminLogin = async function (e) {
    e.preventDefault();
    const errBox = document.getElementById("adminLoginError");
    const errMsg = document.getElementById("adminLoginErrorMsg");

    if (Date.now() < state.lockoutUntil) {
      const secLeft = Math.ceil((state.lockoutUntil - Date.now()) / 1000);
      if (errBox && errMsg) {
        errMsg.textContent = `Слишком много попыток. Подождите ${secLeft} сек.`;
        errBox.style.display = "block";
      }
      return;
    }

    const inputPass = document.getElementById("adminPasswordInput").value;
    const inputHash = await computeSha256(inputPass);
    const activeHash = localStorage.getItem("luxnet_custom_admin_hash") || PRIVATE_CONFIG.adminPasswordHash;

    if (inputHash === activeHash) {
      state.isAdmin = true;
      state.loginAttempts = 0;
      sessionStorage.setItem("luxnet_admin_session", "verified_sha256");
      sessionStorage.setItem("luxnet_login_attempts", "0");
      if (errBox) errBox.style.display = "none";
      document.getElementById("adminPasswordInput").value = "";
      document.getElementById("adminLoginModalOverlay").classList.remove("open");
      document.getElementById("adminHeaderBtn").style.display = "inline-flex";
      openSettingsModal();
    } else {
      state.loginAttempts += 1;
      sessionStorage.setItem("luxnet_login_attempts", String(state.loginAttempts));
      if (state.loginAttempts >= 5) {
        state.lockoutUntil = Date.now() + 60000;
        sessionStorage.setItem("luxnet_lockout_until", String(state.lockoutUntil));
      }
      if (errBox && errMsg) {
        errMsg.textContent = "Неверный пароль!";
        errBox.style.display = "block";
      }
    }
  };

  window.openSettingsModal = function () {
    if (!state.isAdmin) return;
    document.getElementById("settingsSheetId").value = state.sheetId;
    document.getElementById("settingsSheetName").value = state.sheetName;
    document.getElementById("settingsUsdRate").value = state.usdRate;
    document.getElementById("settingsAutoBgRemove").checked = state.autoBgRemove;
    const geminiInput = document.getElementById("settingsGeminiKey");
    if (geminiInput) geminiInput.value = state.geminiKey || "";
    updateAdminStatusUI();
    document.getElementById("settingsModalOverlay").classList.add("open");
  };

  function updateAdminStatusUI() {
    const detail = document.getElementById("adminSourceDetail");
    if (detail) detail.textContent = state.dataSource;

    const linkRow = document.getElementById("adminSheetLinkRow");
    const extLink = document.getElementById("openExternalSheetLink");
    if (linkRow && extLink) {
      if (state.sheetId && state.sheetId.trim().length > 10) {
        linkRow.style.display = "block";
        extLink.href = `https://docs.google.com/spreadsheets/d/${state.sheetId.trim()}/edit`;
      } else {
        linkRow.style.display = "none";
      }
    }
  }

  window.generateNewPasswordHash = async function () {
    const newPass = document.getElementById("newAdminPassInput").value.trim();
    if (newPass.length < 4) return alert("Минимум 4 символа");
    const newHash = await computeSha256(newPass);
    localStorage.setItem("luxnet_custom_admin_hash", newHash);
    const out = document.getElementById("generatedHashOutput");
    if (out) {
      out.style.display = "block";
      out.value = newHash;
    }
  };

  window.logoutAdmin = function () {
    state.isAdmin = false;
    sessionStorage.removeItem("luxnet_admin_session");
    document.getElementById("adminHeaderBtn").style.display = "none";
    document.getElementById("settingsModalOverlay").classList.remove("open");
  };

  function initEventListeners() {
    // Поиск с debounce (120 мс) + работающая кнопка очистки
    let searchDebounce = null;
    const searchInput = document.getElementById("searchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");

    searchInput?.addEventListener("input", (e) => {
      const val = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = val.length > 0 ? "block" : "none";
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.searchQuery = val;
        applyFiltersAndSort();
      }, 120);
    });

    clearSearchBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      clearSearchBtn.style.display = "none";
      state.searchQuery = "";
      applyFiltersAndSort();
    });

    document.querySelectorAll(".category-pill").forEach((btn) => {
      btn.addEventListener("click", () => filterByCategory(btn.getAttribute("data-category")));
    });
    document.querySelectorAll(".brand-btn").forEach((btn) => {
      btn.addEventListener("click", () => filterByBrand(btn.getAttribute("data-brand")));
    });
    document.getElementById("sortSelect")?.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      applyFiltersAndSort();
    });
    document.getElementById("currencyToggleBtn")?.addEventListener("click", () => {
      state.currency = state.currency === "UZS" ? "USD" : "UZS";
      localStorage.setItem("luxnet_currency", state.currency);
      updateCurrencyButtonLabel();
      renderProducts();
      updateCartUI();
    });

    // Открытие и закрытие модальных окон (включая клик по фону)
    document.getElementById("openCartBtn")?.addEventListener("click", () => document.getElementById("cartOverlay").classList.add("open"));
    document.getElementById("closeCartBtn")?.addEventListener("click", () => document.getElementById("cartOverlay").classList.remove("open"));
    document.getElementById("closeProductModalBtn")?.addEventListener("click", closeProductModal);
    document.getElementById("closeAdminLoginBtn")?.addEventListener("click", () => document.getElementById("adminLoginModalOverlay").classList.remove("open"));
    document.getElementById("closeSettingsModalBtn")?.addEventListener("click", () => document.getElementById("settingsModalOverlay").classList.remove("open"));

    ["productModalOverlay", "cartOverlay", "adminLoginModalOverlay", "settingsModalOverlay"].forEach((overlayId) => {
      const el = document.getElementById(overlayId);
      el?.addEventListener("click", (e) => {
        if (e.target === el) el.classList.remove("open");
      });
    });

    // Сохранение настроек админ-панели
    document.getElementById("saveSettingsBtn")?.addEventListener("click", () => {
      state.sheetId = document.getElementById("settingsSheetId").value.trim();
      state.sheetName = document.getElementById("settingsSheetName").value.trim() || "Товары";
      state.usdRate = Number(document.getElementById("settingsUsdRate").value) || 12850;
      state.autoBgRemove = document.getElementById("settingsAutoBgRemove").checked;
      state.geminiKey = document.getElementById("settingsGeminiKey")?.value.trim() || "";

      localStorage.setItem("luxnet_sheet_id", state.sheetId);
      localStorage.setItem("luxnet_sheet_name", state.sheetName);
      localStorage.setItem("luxnet_usd_rate", String(state.usdRate));
      localStorage.setItem("luxnet_auto_bg_remove", String(state.autoBgRemove));
      localStorage.setItem("luxnet_gemini_key", state.geminiKey);

      loadCatalogData(true);
      document.getElementById("settingsModalOverlay").classList.remove("open");
    });

    // Кнопка сброса на демо-базу (products.json)
    document.getElementById("resetToDefaultBtn")?.addEventListener("click", () => {
      state.sheetId = "";
      localStorage.setItem("luxnet_sheet_id", "");
      localStorage.removeItem("luxnet_catalog_cache_v1");
      document.getElementById("settingsSheetId").value = "";
      loadCatalogData(true);
      document.getElementById("settingsModalOverlay").classList.remove("open");
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
