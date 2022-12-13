import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { getLanguage } from 'helpers';
import { BotContext } from 'bot/index';

export const NewTaskKeyboard = (ctx: BotContext): InlineKeyboardButton[][] => {
  const LANGUAGE = getLanguage(ctx);

  return [
    [
      {
        'text': LangData[LANGUAGE]['task'],
        'callback_data': CALLBACK_DATA.DEADLINE_CHANGE_TASK,
      },
      {
        'text': LangData[LANGUAGE]['deadline'],
        'callback_data': CALLBACK_DATA.DEADLINE_CHANGE_DATE,
      },
    ],
    [
      {
        'text': LangData[LANGUAGE]['link-subject'],
        'callback_data': CALLBACK_DATA.DEADLINE_SET_SUBJECT,
      },
    ],
    [
      {
        'text': LangData[LANGUAGE]['discard'],
        'callback_data': CALLBACK_DATA.DEADLINE_DISCARD,
      },
      {
        'text': LangData[LANGUAGE]['save'],
        'callback_data': CALLBACK_DATA.DEADLINE_SAVE,
      },
    ],
  ];
};
