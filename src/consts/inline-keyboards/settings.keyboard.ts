import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';

export const SettingsKeyboard: InlineKeyboardButton[][] = [
  [
    {
      'text': '📝 Subject list',
      'callback_data': CALLBACK_DATA.SETTINGS_SUBJECTS,
    },
  ],
  [
    {
      'text': '📅 Calendar',
      'callback_data': CALLBACK_DATA.SETTINGS_CALENDAR,
    },
  ],
  [
    {
      'text': '🛑 Discard',
      'callback_data': CALLBACK_DATA.SETTINGS_DISCARD,
    },
    {
      'text': '✅ Save',
      'callback_data': CALLBACK_DATA.SETTINGS_SAVE,
    },
  ],
];
