import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { ITask } from "../../../../typings";
import { Action } from "../..";
import "../../styles.css";

interface ITaskProps {
  task: ITask;
  updateTask: UseMutationResult<unknown, Error, {
    id: number;
    action: Action;
  }, {
    prevTasks: ITask[] | undefined;
  }>
};

export const Task = ({ task, updateTask }: ITaskProps) => {
  const { completed, title, description, id } = task;
  const [isDescriptionVisible, setDescriptionVisible] = useState<boolean>(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <li className={`task-container ${completed ? "bg-green-100" : "bg-white"}`}>
      <div className="flex items-center justify-between">
        <h3 onClick={toggleDescription} className={`task-title ${completed ? "line-through text-gray-500" : "text-gray-800"
          }`}>
          {title}
        </h3>

        <div className="flex items-center space-x-2">
          <input
            className="w-5 h-5"
            type="checkbox"
            id={`${id}`}
            checked={completed}
            onChange={() => updateTask.mutate({ id, action: Action.Update })}
          />
          <button
            className="task-button"
            onClick={() => updateTask.mutate({ id, action: Action.Delete })}
          >
            Delete
          </button>
        </div>

      </div>
      {isDescriptionVisible && (
        <p className={`text-gray-600 mt-2 break-words ${completed ? "line-through" : ""}`}>
          {description}
        </p>
      )}
    </li>
  );
};