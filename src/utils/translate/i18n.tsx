import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // Загружает переводы
  .use(LanguageDetector) // Определяет язык
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: "en", // Язык по умолчанию
    debug: true, // Для отладки
    interpolation: {
      escapeValue: false, // Отключение экранирования
    },
    backend: {
        loadPath: "/locales/{{lng}}/translation.json", // Путь до файлов переводов
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"], // Кэширование языка
    },
  });

export default i18n;
