import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';

export const NotificationKeyboard: InlineKeyboardButton[][] = [
  [
    {
      'text': '✏️ Header',
      'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_HEADER,
    },
    {
      'text': '📖 Body',
      'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_BODY,
    },
  ],
  [
    {
      'text': '🔴 Required',
      'callback_data': CALLBACK_DATA.NOTIFICATION_SET_REQUIRED,
    },
    {
      'text': '🟡 Dispensable',
      'callback_data': CALLBACK_DATA.NOTIFICATION_SET_DISPENSABLE,
    },
  ],
  [
    {
      'text': '📅 Send ON',
      'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_DATE,
    },
    {
      'text': '🔗 Subject',
      'callback_data': CALLBACK_DATA.NOTIFICATION_SET_SUBJECT,
    },
    {
      'text': '📅 Deadline',
      'callback_data': CALLBACK_DATA.NOTIFICATION_CHANGE_DEADLINE,
    },
  ],
  [
    {
      'text': '↩️ Undo',
      'callback_data': CALLBACK_DATA.NOTIFICATION_UNDO,
    },
    {
      'text': '🔄 Reset',
      'callback_data': CALLBACK_DATA.NOTIFICATION_RESET,
    },
    {
      'text': '↪️ Redo',
      'callback_data': CALLBACK_DATA.NOTIFICATION_REDO,
    },
  ],
  [
    {
      'text': '🛑 Discard',
      'callback_data': CALLBACK_DATA.NOTIFICATION_DISCARD,
    },
    {
      'text': '✅ Save',
      'callback_data': CALLBACK_DATA.NOTIFICATION_SAVE,
    },
  ],
];
