import { Task } from 'services/task/service';
import { TaskModel } from 'services/task/model';

const TaskController = {

  async save(task: Task) {
    const model = new TaskModel(task.convertToObject());
    await model.save();
  },

  async getAll() {
    const models = await TaskModel.find(),
          tasks = [];

    for (const model of models) {
      tasks.push(await Task.parse(model));
    }

    return tasks;
  },

};

export { TaskController };
