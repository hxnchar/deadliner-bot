import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';

export const NewSubjectKeyboard: InlineKeyboardButton[][] = [
  [
    {
      'text': '✏️ Name',
      'callback_data': CALLBACK_DATA.SUBJECT_CHANGE_NAME,
    },
  ],
  [
    {
      'text': '🟢 General',
      'callback_data': CALLBACK_DATA.SUBJECT_MAKE_GENERAL,
    },
    {
      'text': '🟡 Non-general',
      'callback_data': CALLBACK_DATA.SUBJECT_MAKE_NON_GENERAL,
    },
  ],
  [
    {
      'text': '↩️ Undo',
      'callback_data': CALLBACK_DATA.SUBJECT_UNDO,
    },
    {
      'text': '🔄 Reset',
      'callback_data': CALLBACK_DATA.SUBJECT_RESET,
    },
    {
      'text': '↪️ Redo',
      'callback_data': CALLBACK_DATA.SUBJECT_REDO,
    },
  ],
  [
    {
      'text': '🛑 Discard',
      'callback_data': CALLBACK_DATA.SUBJECT_DISCARD,
    },
    {
      'text': '✅ Save',
      'callback_data': CALLBACK_DATA.SUBJECT_SAVE,
    },
  ],
];
