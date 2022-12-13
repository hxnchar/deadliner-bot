import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { getLanguage } from 'helpers';
import { BotContext } from 'bot';

export const SettingsKeyboard = (ctx: BotContext): InlineKeyboardButton[][] => {
  const LANGUAGE = getLanguage(ctx);

  return [
    [
      {
        'text': LangData[LANGUAGE]['subject-list'],
        'callback_data': CALLBACK_DATA.SETTINGS_SUBJECTS,
      },
    ],
    [
      {
        'text': LangData[LANGUAGE]['language-name'],
        'callback_data': CALLBACK_DATA.SETTINGS_LANGUAGE,
      },
      {
        'text': LangData[LANGUAGE]['calendar'],
        'callback_data': CALLBACK_DATA.SETTINGS_CALENDAR,
      },
    ],
    [
      {
        'text': LangData[LANGUAGE]['discard'],
        'callback_data': CALLBACK_DATA.SETTINGS_DISCARD,
      },
      {
        'text': LangData[LANGUAGE]['save'],
        'callback_data': CALLBACK_DATA.SETTINGS_SAVE,
      },
    ],
  ];
};
