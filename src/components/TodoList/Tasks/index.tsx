import { UseMutationResult } from "@tanstack/react-query";
import { ITask } from "../../../typings";
import { Task } from "./Task";
import { Action } from "..";

interface ITasksProps {
  tasks: ITask[];
  updateTask: UseMutationResult<unknown, Error, {
    id: number;
    action: Action;
  }, {
    prevTasks: ITask[] | undefined;
  }>
};

export const Tasks = ({ tasks, updateTask }: ITasksProps) => {
  return (
    <ul className="w-full max-w-md mt-task-spacing h-[calc(100vh-275px)] overflow-y-auto">
      {tasks.map(task => <Task updateTask={updateTask} key={task.id} task={task} />)}
    </ul>
  );
};