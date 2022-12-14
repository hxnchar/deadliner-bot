import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { BotService } from 'services';

export const LanguageKeyboard = (): InlineKeyboardButton[][] => {
  const LANG = BotService.language;
  const keyboard: InlineKeyboardButton[][] = [];
  const langKeys = Object.keys(LangData);
  langKeys.forEach((key) => {
    const languageName = LangData[key]['language-name'],
          languageCode = LangData[key]['language-code'];
    keyboard.push([
      {
        'text': languageName,
        'callback_data': `${CALLBACK_DATA.SETTINGS_SET_LANGUAGE}_${languageCode}`,
      },
    ]);
  });
  return keyboard;
};
