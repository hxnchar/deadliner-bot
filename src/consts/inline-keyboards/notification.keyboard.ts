import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { getLanguage } from 'helpers';
import { BotContext } from 'bot';

export const NotificationKeyboard =
  (ctx: BotContext): InlineKeyboardButton[][] => {
    const LANGUAGE = getLanguage(ctx);

    return [
      [
        {
          'text': LangData[LANGUAGE]['header'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_HEADER,
        },
        {
          'text': LangData[LANGUAGE]['body'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_BODY,
        },
      ],
      [
        {
          'text': LangData[LANGUAGE]['required'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_SET_REQUIRED,
        },
        {
          'text': LangData[LANGUAGE]['dispensable'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_SET_DISPENSABLE,
        },
      ],
      [
        {
          'text': LangData[LANGUAGE]['send-on'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_DATE,
        },
        {
          'text': LangData[LANGUAGE]['link-subject'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_SET_SUBJECT,
        },
        {
          'text': LangData[LANGUAGE]['deadline'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_DEADLINE,
        },
      ],
      [
        {
          'text': LangData[LANGUAGE]['discard'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_DISCARD,
        },
        {
          'text': LangData[LANGUAGE]['reset'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_RESET,
        },
        {
          'text': LangData[LANGUAGE]['save'],
          'callback_data': CALLBACK_DATA.NOTIFICATION_SAVE,
        },
      ],
    ];
  };
