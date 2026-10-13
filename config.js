/**
 * КОНФИГУРАЦИЯ ИНТЕРНЕТ-МАГАЗИНА СЕТЕВОГО ОБОРУДОВАНИЯ
 */
const CONFIG = {
  // Название магазина
  storeName: "LUXNET | Сетевое оборудование",
  storeTagline: "Официальные поставки TP-Link, Mercusys, MikroTik в Узбекистане",

  // Контакты
  phone: "+998977707220",
  telegramManager: "jbnmedia", // Ваш Telegram юзернейм (без @)
  address: "г. Ташкент, ТЦ Малика / Юнусабад",

  // ПАРОЛЬ АДМИНИСТРАТОРА (для скрытой панели управления таблицей)
  // Обычные покупатели не видят настройки таблицы.
  // Вы можете войти через ссылку site.uz/?admin или нажав Ctrl+Shift+A
  adminPassword: "admin", 

  // Валюта и курс
  currency: "UZS", // UZS или USD
  usdRate: 12850,  // Курс доллара к суму для автоматической конвертации

  // GOOGLE SHEETS ИНТЕГРАЦИЯ:
  // ID таблицы можно указать здесь или в закрытой админ-панели (он сохранится в браузере)
  googleSheetId: "1QuPHtTYS5Dvz6PgBMEZjFikAUqwq7AoQ2cTnYAzxExw", // Например: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
  googleSheetName: "Товары", // Название вкладки таблицы

  // TELEGRAM БОТ ДЛЯ ЗАКАЗОВ (Опционально):
  telegramBotToken: "",
  telegramChatId: ""
};
