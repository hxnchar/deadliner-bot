import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';

export const NewDeadlineKeyboard: InlineKeyboardButton[][] = [
  [
    {
      'text': '✏️ Task',
      'callback_data': CALLBACK_DATA.DEADLINE_CHANGE_TASK,
    },
    {
      'text': '📅 Date',
      'callback_data': CALLBACK_DATA.DEADLINE_CHANGE_DATE,
    },
  ],
  [
    {
      'text': '🔗 Subject',
      'callback_data': CALLBACK_DATA.DEADLINE_SET_SUBJECT,
    },
  ],
  [
    {
      'text': '🛑 Discard',
      'callback_data': CALLBACK_DATA.DEADLINE_DISCARD,
    },
    {
      'text': '✅ Save',
      'callback_data': CALLBACK_DATA.DEADLINE_SAVE,
    },
  ],
];
