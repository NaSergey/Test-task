export default function UsageGuide() {
    return (
      <div className="flex flex-col items-start justify-center h-full">
        <h1 className="text-2xl font-bold text-center py-4 text-gray-900 dark:text-white">Руководство по использованию списка задач</h1>
        <ul className="list-disc pl-5 space-y-3">
          <li className="text-gray-900 dark:text-white">
            <span className="font-semibold">Добавление новой задачи:</span> Введите текст задачи в текстовое поле в верхней части приложения и нажмите кнопку "Добавить".
          </li>
          <li className="text-gray-900 dark:text-white">
            <span className="font-semibold">Изменение состояния задачи:</span> Щёлкните на чекбокс рядом с задачей, чтобы отметить её как выполненную.
          </li>
          <li className="text-gray-900 dark:text-white">
            <span className="font-semibold">Фильтрация задач:</span> Используйте фильтры (например, "Всё", "Активные", "Выполненные"), чтобы отобразить только нужные задачи.
          </li>
          <li className="text-gray-900 dark:text-white">
            <span className="font-semibold">Удаление списка:</span> Что бы удалить список задач, нужно выполнить все задачи в этом списке и нажать на кнопку "Отчистить".
          </li>
          <li className="text-gray-900 dark:text-white">
            <span className="font-semibold">Сохранение данных:</span> Ваши задачи сохраняются автоматически и будут доступны даже после перезагрузки страницы.
          </li>
        </ul>
        <p className="pt-6 text-sm text-gray-500 dark:text-gray-400">
          Если у вас есть вопросы, обратитесь к документации или свяжитесь с разработчиком.
        </p>
      </div>
    );
  }
  