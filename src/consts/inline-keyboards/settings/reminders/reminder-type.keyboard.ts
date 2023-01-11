import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const ReminderTypeKeyboard = (): InlineKeyboardButton[][] => {
  const LANG = BotService.language;

  const keyboard: InlineKeyboardButton[][] = [
    [
      {
        'text': LangData[LANG]['remind-by-bot'],
        'callback_data': `${CALLBACK_DATA.REMINDER_TYPE}_${CALLBACK_DATA.BOT}`,
      },
    ],
    [
      {
        'text': LangData[LANG]['remind-by-calendar'],
        'callback_data': `${CALLBACK_DATA.REMINDER_TYPE}_${CALLBACK_DATA.CALENDAR}`,
      },
    ],
    [
      {
        'text': LangData[LANG]['remind-by-email'],
        'callback_data': `${CALLBACK_DATA.REMINDER_TYPE}_${CALLBACK_DATA.EMAIL}`,
      },
    ],
    [
      {
        'text': LangData[LANG]['discard'],
        'callback_data': CALLBACK_DATA.DISCARD_REMINDER_TYPE,
      },
    ],
  ];
  return keyboard;
};
