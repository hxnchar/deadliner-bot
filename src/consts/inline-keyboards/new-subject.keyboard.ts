import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { getLanguage } from 'helpers';
import { BotContext } from 'bot/index';

export const NewSubjectKeyboard =
  (ctx: BotContext): InlineKeyboardButton[][] => {
    const LANGUAGE = getLanguage(ctx);

    return [
      [
        {
          'text': LangData[LANGUAGE]['name'],
          'callback_data': CALLBACK_DATA.SUBJECT_CHANGE_NAME,
        },
      ],
      [
        {
          'text': LangData[LANGUAGE]['general'],
          'callback_data': CALLBACK_DATA.SUBJECT_MAKE_GENERAL,
        },
        {
          'text': LangData[LANGUAGE]['non-general'],
          'callback_data': CALLBACK_DATA.SUBJECT_MAKE_NON_GENERAL,
        },
      ],
      [
        {
          'text': LangData[LANGUAGE]['undo'],
          'callback_data': CALLBACK_DATA.SUBJECT_UNDO,
        },
        {
          'text': LangData[LANGUAGE]['reset'],
          'callback_data': CALLBACK_DATA.SUBJECT_RESET,
        },
        {
          'text': LangData[LANGUAGE]['redo'],
          'callback_data': CALLBACK_DATA.SUBJECT_REDO,
        },
      ],
      [
        {
          'text': LangData[LANGUAGE]['discard'],
          'callback_data': CALLBACK_DATA.SUBJECT_DISCARD,
        },
        {
          'text': LangData[LANGUAGE]['save'],
          'callback_data': CALLBACK_DATA.SUBJECT_SAVE,
        },
      ],
    ];
  };

