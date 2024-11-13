import { Action } from "./components/TodoList";
import { ITask } from "./typings";

export const getTasks = async () => {
  return new Promise<ITask[]>((res) => {
    setTimeout(() => {
      res([
        { id: 1, title: "Title 1", description: "Description 1", completed: false },
        { id: 2, title: "Title 2", description: "Description 2", completed: true },
        { id: 3, title: "Title 3", description: "Description 3", completed: false },
      ])
    }, 1000);
  });
};

export const addTaskRequest = async (newTask: ITask) => new Promise((res) => {
  setTimeout(() => res({ ...newTask, id: Date.now() }), 500);
});

export const updateTaskRequest = async ({ id, action }: { id: number, action: Action }) => new Promise((res) => {
  setTimeout(() => res({ id, action }), 500);
});