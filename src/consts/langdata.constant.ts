const LangData: { [lang_key: string]: { [phrase_key: string]: string }; } = {
  'en': {
    // Language data
    'language-name': '🏴󠁧󠁢󠁥󠁮󠁧󠁿 English',
    'language-code': 'en',

    /*
      Bot features
      First, we specify the name of the feature (will be displayed in bold)
      Second line is what this feature can do
      Third line is for hint (optional, will be displayed in italic)
    */
    'subscriptions-feature': 'Subscriptions🤩',
    'subscriptions-feature-data': 'Now every user can subscribe to the subjects he needs. This means that now everyone will see only his personal list of deadlines',
    'subscriptions-feature-hint': 'Also, implementing subscriptions means that everyone can see his personalized schedule. However, you need to subscribe to all of your subjects first',
    'ui-feature': 'Improved UI💻',
    'ui-feature-data': 'Use buttons instead of inline commands. Now interface is a bit more pretty and convenient. Tick completed tasks and track what else you have to do',
    'notifications-feature': 'Notifications📲',
    'notifications-feature-data': 'A particularly useful feature for group leaders. Now there is no need to pin your message in the chat or tag everyone. You can simply add notification (scheduled or not) and everyone will receive it',
    'view-deadlines-feature': 'View your deadlines👀',
    'view-deadlines-feature-data': 'View your deadlines in a list or flip them through',
    'google-calendar-feature': 'Google Calendar📆',
    'google-calendar-feature-data': 'Do not miss your deadlines with the Google Calendar synchronization',
    'google-calendar-feature-hint': 'You`ll be asked for some additional information',

    //Bot commands
    'bot-command-start': 'The basic command that you cannot avoid',
    'bot-command-new-subject': 'Creates a new subject',
    'bot-command-notification': 'Sends a notification to your classmates',
    'bot-command-new-task': 'Creates a new deadline',
    'bot-command-todolist': 'Shows all of your deadlines and notifications',
    'bot-command-todo': 'Shows your deadlines and notifications one by one, sorted by date',
    'bot-command-settings': 'Change your preferences here',
    'bot-command-help': 'Shows a list of available commands',

    // Command headers
    'command-start-header': 'Welcome to',
    'command-start-body': 'This bot may help you with tracking your deadlines. It has several features that make him more useful than the last one.',
    'command-new-subject-body': 'You\'re creating a new subject. Please, provide the following details',
    'command-new-task-body': 'You\'re creating a new deadline. Please, provide the following details',
    'command-new-notification-body': 'You\'re creating a new notification.',
    'will-be-sent': 'Will be sent on',
    'preview': 'Preview',
    'command-peek-personal': 'Pick subjects which you would like to subscribe to',
    'command-peek-language': 'Pick your language interface',
    'command-link-subject': 'Link a subject from the following list',
    'command-help': 'Here is the list of avaiable commands',
    'command-tune-calendar': 'Please, provide following information for tune Google Calendar',

    // Reminders
    'your-reminders': 'Your reminders',
    'reminder-type': 'Select the type of reminder',
    'remind-by-bot': '🤖 By bot',
    'remind-by-calendar': '🗓 From your calendar',
    'remind-by-email': '📧 Via email',
    'set-offset': 'How much time before the deadline would you like to receive reminders',
    'years': 'Years',
    'months': 'Months',
    'weeks': 'Weeks',
    'days': 'Days',
    'hours': 'Hours',
    'minutes': 'Minutes',
    'seconds': 'Seconds',

    // General buttons
    'delete': '🚫 Delete',
    'confirm': '✅ Confirm',
    'discard': '🛑 Discard',
    'save': '✅ Save',
    'reset': '🔄 Reset',
    'undo': '↩️ Undo',
    'redo': '↪️ Redo',
    'add': '➕ Add',
    'remove': '➖ Remove',

    // Other buttons
    'subject-list': '📝 Subject list',
    'calendar': '📅 Calendar',
    'remove-subject': '⛔️ Remove subject',
    'header': '✏️ Header',
    'body': '📖 Body',
    'required': '🔴 Required',
    'dispensable': '🟡 Dispensable',
    'send-on': '📅 Send on',
    'link-subject': '🔗 Subject',
    'deadline': '📅 Deadline',
    'name': '✏️ Name',
    'general': '🟢 General',
    'non-general': '🟡 Non-general',
    'task': '✏️ Task',
    'calendar-id': '🌐 Calendar ID',
    'calenadar-tuned': '✅ Calendar is ready',
    'calenadar-not-tuned': '❌ Calendar not tuned',
    'reminders': '🔔 Reminders',

    // General phrases
    'not-defined': 'Not provided',
    'please-provide-info-about': 'Please, provide information about',
    'list-is-empty': 'The list is empty',

  },
  'ua': {
    // Language data
    'language-name': '🇺🇦 Українська',
    'language-code': 'ua',

    /*
      Bot features
      First, we specify the name of the feature (will be displayed in bold)
      Second line is what this feature can do
      Third line is for hint (optional, will be displayed in italic)
    */
    'subscriptions-feature': 'Підписки🤩',
    'subscriptions-feature-data': 'Тепер кожен може підписатися на необхідні йому предмети. Також це значить, що тепер кожен буде бачити лише свої власні дедлайни',
    'subscriptions-feature-hint': 'Також, реалізація цієї функції зробить можливим відображення твого особистого розкладу, проте для цього спершу потрібно підписатися на усі необхідні предмети',
    'ui-feature': 'Покращений UI💻',
    'ui-feature-data': 'Використовуй кнопки замість однострокових команд. Тепер інтерфейс трохи приємніший та зручний. Відмічай виконані дедлайни та відстежуй, що ще необхідно зробити',
    'notifications-feature': 'Сповіщення📲',
    'notifications-feature-data': 'Особливо корисна фішка для старост. Тепер немає необхідності пінити повідомлення та тегати усю групу в чаті. Можна просто додати сповіщення (заплановане чи ні) і його отримає кожен',
    'view-deadlines-feature': 'Переглядай свої дедлайни👀',
    'view-deadlines-feature-data': 'Переглядай дедлайни у вигляді списку, або перегортуючи',
    'google-calendar-feature': 'Google Calendar📆',
    'google-calendar-feature-data': 'Не пропускай дедлайни завдяки синхронізації з Google Calendar',
    'google-calendar-feature-hint': 'Для цього потрібно буде надати деяку додаткову інформацію',

    //Bot commands
    'bot-command-start': 'Основна команда, яку ви не можете уникнути',
    'bot-command-new-subject': 'Створює новий предмет',
    'bot-command-notification': 'Надсилає сповіщення твоїм однокласникам',
    'bot-command-new-task': 'Створює новий дедлайн',
    'bot-command-todolist': 'Показує список усіх дедлайнів',
    'bot-command-todo': 'Показує усі дедлайни один за одним, сортировано по датам',
    'bot-command-settings': 'Змінює налаштування',
    'bot-command-help': 'Показує список доступних команд',

    // Command headers
    'command-start-header': 'Вас вітає',
    'command-start-body': 'Цей бот допоможе відстежувати ваші дедлайни. Він має кілька функцій, які роблять його трохи зручнішим за попереднього.',
    'command-new-subject-body': 'Ти створюєш новий предмет. Будь ласка, надайте наступні деталі',
    'command-new-task-body': 'Ти створюєш нове завдання. Будь ласка, надайте наступні деталі',
    'command-new-notification-body': 'Ти створюєш нове сповіщення.',
    'will-be-sent': 'Буде відправлено',
    'preview': 'Попередній перегляд',
    'command-peek-personal': 'Обери предмети, на які ти би хотів підписатися',
    'command-peek-language': 'Обери свою мову інтерфейсу',
    'command-link-subject': 'Під\'єднай предмет із списку нижче',
    'command-help': 'Перелік доступних команд',
    'command-tune-calendar': 'Будь ласка, надайте наступні дані для доступу до Google Calendar',

    // Reminders
    'your-reminders': 'Твої нагадування',
    'reminder-type': 'Оберіть тип нагадування',
    'remind-by-bot': '🤖 Ботом',
    'remind-by-calendar': '🗓 З календаря',
    'remind-by-email': '📧 Лист на пошту',
    'set-offset': 'За який час до дедлайну ви би хотіли отримувати нагадування',
    'years': 'Роки',
    'months': 'Місяці',
    'weeks': 'Тижні',
    'days': 'Дні',
    'hours': 'Години',
    'minutes': 'Хвилини',
    'seconds': 'Секунди',

    // General buttons
    'delete': '🚫 Видалити',
    'confirm': '✅ Підтвердити',
    'discard': '🛑 Відмінити',
    'save': '✅ Зберегти',
    'reset': '🔄 Скинути',
    'undo': '↩️ Відмінити',
    'redo': '↪️ Повторити',
    'add': '➕ Додати',
    'remove': '➖ Вилучити',

    // Other buttons
    'subject-list': '📝 Перелік предметів',
    'calendar': '📅 Календар',
    'remove-subject': '⛔️ Вилучити предмет',
    'header': '✏️ Заголовок',
    'body': '📖 Основна частина',
    'required': '🔴 Обов\'язковий',
    'dispensable': '🟡 Необов\'язковий',
    'send-on': '📅 Надіслати о',
    'link-subject': '🔗 Предмет',
    'deadline': '📅 Дедлайн',
    'name': '✏️ Назва',
    'general': '🟢 Загальний',
    'non-general': '🟡 Вибірковий',
    'task': '✏️ Завдання',
    'calendar-id': '🌐 ID календаря',
    'calenadar-tuned': '✅ Календар готовий',
    'calenadar-not-tuned': '❌ Календар не налаштовано',
    'reminders': '🔔 Нагадування',

    // General phrases
    'not-defined': 'Не вказано',
    'please-provide-info-about': 'Будь ласка, надайте інформацію про',
    'list-is-empty': 'Список порожній',

  },
};

export { LangData };
