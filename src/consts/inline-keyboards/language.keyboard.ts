import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';

export const LanguageKeyboard: InlineKeyboardButton[][] = [
  [
    {
      'text': `🇺🇦 Ukrainian`,
      'callback_data': `${CALLBACK_DATA.SETTINGS_SET_LANGUAGE}_ua`,
    },
  ],
  [
    {
      'text': '🏴󠁧󠁢󠁥󠁮󠁧󠁿 English',
      'callback_data': `${CALLBACK_DATA.SETTINGS_SET_LANGUAGE}_en`,
    },
  ],
];
