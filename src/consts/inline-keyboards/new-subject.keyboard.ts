import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const NewSubjectKeyboard =
  (): InlineKeyboardButton[][] => {
    const LANG = BotService.language;

    return [
      [
        {
          'text': LangData[LANG]['name'],
          'callback_data': CALLBACK_DATA.SUBJECT_CHANGE_NAME,
        },
      ],
      [
        {
          'text': LangData[LANG]['general'],
          'callback_data': CALLBACK_DATA.SUBJECT_MAKE_GENERAL,
        },
        {
          'text': LangData[LANG]['non-general'],
          'callback_data': CALLBACK_DATA.SUBJECT_MAKE_NON_GENERAL,
        },
      ],
      [
        {
          'text': LangData[LANG]['undo'],
          'callback_data': CALLBACK_DATA.SUBJECT_UNDO,
        },
        {
          'text': LangData[LANG]['reset'],
          'callback_data': CALLBACK_DATA.SUBJECT_RESET,
        },
        {
          'text': LangData[LANG]['redo'],
          'callback_data': CALLBACK_DATA.SUBJECT_REDO,
        },
      ],
      [
        {
          'text': LangData[LANG]['discard'],
          'callback_data': CALLBACK_DATA.SUBJECT_DISCARD,
        },
        {
          'text': LangData[LANG]['save'],
          'callback_data': CALLBACK_DATA.SUBJECT_SAVE,
        },
      ],
    ];
  };

