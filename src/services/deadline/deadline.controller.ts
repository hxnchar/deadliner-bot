import { Deadline } from 'services/deadline/deadline.service';
import { DeadlineModel } from 'services/deadline/deadline.model';

const DeadlineController = {

  async save(deadline: Deadline) {
    const deadlineModel =
      new DeadlineModel(deadline.convertToObject());
    console.log(deadlineModel);
    await deadlineModel.save();
    console.log('saved');
  },

};

export { DeadlineController };
