import tseslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'], // Замените на ваши tsconfig-файлы
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    react: {
      version: 'detect', // Автоматическое определение версии React
    },
  },
  plugins: {
    react, // Подключение плагина для React
  },
  rules: {
    ...react.configs.recommended.rules, // Рекомендованные правила для React
    ...react.configs['jsx-runtime'].rules, // Правила для JSX Runtime
    ...tseslint.configs.recommendedTypeChecked.rules, // Типовые проверки TypeScript
  },
});
