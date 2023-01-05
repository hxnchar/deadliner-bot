import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const NewTaskKeyboard = (): InlineKeyboardButton[][] => {
  const LANGUAGE = BotService.language;

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
        'callback_data': CALLBACK_DATA.DISCARD,
      },
      {
        'text': LangData[LANGUAGE]['save'],
        'callback_data': CALLBACK_DATA.SAVE,
      },
    ],
  ];
};
