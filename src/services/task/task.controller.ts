import { Task } from 'services/task/task.service';
import { TaskModel } from 'services/task/task.model';

const TaskController = {

  async save(task: Task) {
    const taskModel =
      new TaskModel(task.convertToObject());
    await taskModel.save();
  },

  //async getAll(): Deadline

};

export { TaskController };
