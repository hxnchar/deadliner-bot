import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { Subject } from 'services/subject';

const PeekSubject = async () => {
  let subjects = await Subject.getAll();
  subjects = subjects.sort((a, b) => a.isGeneral && b.isGeneral? 0 :
      !a.isGeneral && b.isGeneral ? 1 : -1)
  const keyboard: InlineKeyboardButton[][] = [];
  subjects.forEach(subject => {
    keyboard.push([
      {
        'text': subject.buttonText(),
        'callback_data': `LINK_SUBJECTID_${subject.id}`,
      },
    ]);
  })
  return keyboard;
}

export { PeekSubject };
