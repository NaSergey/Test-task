import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const { i18n, t } = useTranslation();

  // Загрузка темы из localStorage при загрузке компонента
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle("dark", newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Переключение языка
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="flex w-full justify-between items-center p-2 bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="text-xl font-bold">{t("headerTitle")}</div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {i18n.language === "en" ? "RU" : "EN"}
        </button>
      </div>
    </header>
  );
}
