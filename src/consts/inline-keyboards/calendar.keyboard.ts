import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const CalendarKeyboard = (): InlineKeyboardButton[][] => {
  const LANG = BotService.language;

  const keyboard: InlineKeyboardButton[][] = [
    [
      {
        'text': LangData[LANG]['calendar-id'],
        'callback_data': CALLBACK_DATA.SETTINGS_SET_CALENDAR_ID,
      },
    ],
    [
      {
        'text': LangData[LANG]['save'],
        'callback_data': CALLBACK_DATA.SETTINGS_CALENDAR_SAVE,
      },
    ],
  ];
  return keyboard;
};
