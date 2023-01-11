import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const OffsetKeyboard = (): InlineKeyboardButton[][] => {
  const LANG = BotService.language;
  const decreaseIcon = '◀️',
        increaseIcon = '▶️';
  const keyboard: InlineKeyboardButton[][] = [
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.YEARS}`,
      },
      {
        'text': LangData[LANG]['years'],
        'callback_data': CALLBACK_DATA.YEARS,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.YEARS}`,
      },
    ],
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.MONTHS}`,
      },
      {
        'text': LangData[LANG]['months'],
        'callback_data': CALLBACK_DATA.MONTHS,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.MONTHS}`,
      },
    ],
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.WEEKS}`,
      },
      {
        'text': LangData[LANG]['weeks'],
        'callback_data': CALLBACK_DATA.WEEKS,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.WEEKS}`,
      },
    ],
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.DAYS}`,
      },
      {
        'text': LangData[LANG]['days'],
        'callback_data': CALLBACK_DATA.DAYS,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.DAYS}`,
      },
    ],
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.HOURS}`,
      },
      {
        'text': LangData[LANG]['hours'],
        'callback_data': CALLBACK_DATA.HOURS,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.HOURS}`,
      },
    ],
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.MINUTES}`,
      },
      {
        'text': LangData[LANG]['minutes'],
        'callback_data': CALLBACK_DATA.MINUTES,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.MINUTES}`,
      },
    ],
    [
      {
        'text': decreaseIcon,
        'callback_data': `${CALLBACK_DATA.DECREASE}_${CALLBACK_DATA.SECONDS}`,
      },
      {
        'text': LangData[LANG]['seconds'],
        'callback_data': CALLBACK_DATA.SECONDS,
      },
      {
        'text': increaseIcon,
        'callback_data': `${CALLBACK_DATA.INCREASE}_${CALLBACK_DATA.SECONDS}`,
      },
    ],
    [
      {
        'text': LangData[LANG]['save'],
        'callback_data': CALLBACK_DATA.SAVE,
      },
    ],
  ];
  return keyboard;
};
