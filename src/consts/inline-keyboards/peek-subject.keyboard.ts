import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CALLBACK_DATA } from 'consts/enums';
import { BotContext } from 'bot';
import { Subject, SubjectController } from 'services';

const PeekSubject = async () => {
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
      'text': '⛔️ Remove subject',
      'callback_data': CALLBACK_DATA.REMOVE_SUBJECT,
    },
    {
      'text': '🛑 Discard',
      'callback_data': CALLBACK_DATA.DISCARD_PEEK_SUBJECT,
    },
  ]);
  return keyboard;
};

const PeekPersonalSubject = async (
  ctx: BotContext,
  subscribedTo: Subject[]) => {
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
      'text': '✅ Save',
      'callback_data': CALLBACK_DATA.SUBJECT_SAVE_PERSONAL_LIST,
    },
  ]);

  return keyboard;
};

export { PeekSubject, PeekPersonalSubject };
