import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export const NewSubjectKeyboard: InlineKeyboardButton[][] = [
  [
    {
      'text': '✏️ Name',
      'callback_data': 'Button 1',
    },
  ],
  [
    {
      'text': '🟢 General',
      'callback_data': 'Button 1',
    },
    {
      'text': '🟡 Non-general',
      'callback_data': 'Button 2',
    },
  ],
  [
    {
      'text': '↩️ Undo',
      'callback_data': 'Button 1',
    },
    {
      'text': '🛑 Discard',
      'callback_data': 'Button 2',
    },
    {
      'text': '↪️ Redo',
      'callback_data': 'Button 2',
    },
  ],
];
