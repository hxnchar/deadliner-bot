import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const RemindersKeyboard = (): InlineKeyboardButton[][] => {
  const LANG = BotService.language;

  const keyboard: InlineKeyboardButton[][] = [
    [
      {
        'text': LangData[LANG]['add'],
        'callback_data': CALLBACK_DATA.ADD,
      },
      {
        'text': LangData[LANG]['remove'],
        'callback_data': CALLBACK_DATA.REMOVE,
      },
    ],
    [
      {
        'text': LangData[LANG]['discard'],
        'callback_data': CALLBACK_DATA.DISCARD,
      },
    ],
  ];
  return keyboard;
};
