import { Task } from 'services/task/service';
import { TaskModel } from 'services/task/model';
import { SubjectController } from 'services/subject/controller';

const TaskController = {

  async parse(object: any): Promise<Task> {
    const { id, body, deadline, subject } = object;

    const parsedSubject = await SubjectController.getByID(subject._id);
    const task = new Task(body, deadline, parsedSubject);
    task.id = id;

    return task;
  },

  async save(task: Task) {
    const model = new TaskModel(task.mongooseObject);
    return model.save();
  },

  async returnSaved(task: Task): Promise<Task | undefined> {
    const model = await this.save(task);
    if (!model) return undefined;

    return this.parse(model);
  },

  async getAll() {
    const models = await TaskModel.find(),
          tasks = [];

    for (const model of models) {
      tasks.push(await this.parse(model));
    }

    return tasks;
  },

};

export { TaskController };
