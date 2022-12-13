import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { LangData } from 'consts';
import { getLanguage } from 'helpers';
import { BotContext } from 'bot';
import { Subject, SubjectController } from 'services';

const PeekSubject = async (ctx: BotContext) => {
  const LANGUAGE = getLanguage(ctx);

  let subjects = await SubjectController.getAll();
  subjects = subjects.sort((a, b) => a.isGeneral && b.isGeneral ? 0
    : !a.isGeneral && b.isGeneral ? 1 : -1);
  const keyboard: InlineKeyboardButton[][] = [];
  subjects.forEach((subject) => {
    keyboard.push([
      {
        'text': subject.buttonText(),
        'callback_data': `${CALLBACK_DATA.LINK_SUBJECT}_${subject.id}`,
      },
    ]);
  });
  keyboard.push([
    {
      'text': LangData[LANGUAGE]['remove-subject'],
      'callback_data': CALLBACK_DATA.REMOVE_SUBJECT,
    },
    {
      'text': LangData[LANGUAGE]['discard'],
      'callback_data': CALLBACK_DATA.DISCARD_PEEK_SUBJECT,
    },
  ]);
  return keyboard;
};

const PeekPersonalSubject = async (
  ctx: BotContext,
  subscribedTo: Subject[]) => {

  const LANGUAGE = getLanguage(ctx);

  let subjects = await SubjectController.getAll();
  subjects =
    subjects.filter((subject) => !subject.isGeneral)
      .sort((a, b) => a.name!.localeCompare(b.name!));
  ctx.session.subjectsFromDB = subjects;
  const keyboard: InlineKeyboardButton[][] = [];
  subjects.forEach((subject) => {
    const buttonText = `${Subject.listIncludes(subscribedTo, subject) ? '✅' : '❌'}${subject.buttonText()}`;
    keyboard.push([{
      'text': buttonText,
      'callback_data': `${CALLBACK_DATA.SUBJECT_SWITCH_PERSONAL}_${subject.id}`,
    }]);
  });

  keyboard.push([
    {
      'text': LangData[LANGUAGE]['save'],
      'callback_data': CALLBACK_DATA.SUBJECT_SAVE_PERSONAL_LIST,
    },
  ]);

  return keyboard;
};

export { PeekSubject, PeekPersonalSubject };
