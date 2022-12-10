import { Task } from 'services/task/task.service';
import { TaskModel } from 'services/task/task.model';

const TaskController = {

  async save(task: Task) {
    const taskModel =
      new TaskModel(task.convertToObject());
    await taskModel.save();
  },

  async getAll() {
    const tasks = await TaskModel.find();
    const parsedTasks = [];

    for (const task of tasks) {
      parsedTasks.push(await Task.parse(task));
    }

    return parsedTasks;
  },

};

export { TaskController };
