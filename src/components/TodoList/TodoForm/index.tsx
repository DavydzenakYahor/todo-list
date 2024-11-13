import { useState } from "react";
import { ITask } from "../../../typings";
import { UseMutationResult } from "@tanstack/react-query";

interface ITodoFormProps {
  addTask: UseMutationResult<unknown, Error, ITask, {
    prevTasks: ITask[] | undefined;
  }>;
}

export const TodoForm = ({ addTask }: ITodoFormProps) => {
  const [newTaskValues, setNewTaskValues] = useState<ITask>({ title: "", description: "", completed: false, id: 0 });

  const onChange = (value: string, name: keyof ITask) => setNewTaskValues({ ...newTaskValues, [name]: value });

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addTask.mutate({ ...newTaskValues, completed: false });
    setNewTaskValues({ title: "", description: "", completed: false, id: Math.random() });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-md">
        <input
          className="input-field"
          onChange={(e) => onChange(e.target.value, "title")}
          value={newTaskValues.title}
          placeholder="Enter the task"
        />
        <textarea
          rows={3}
          className="input-field"
          onChange={(e) => onChange(e.target.value, "description")}
          value={newTaskValues.description}
          placeholder="Add description"
        />
        <button
          className={`button-primary mt-4 ${!newTaskValues.title.length ? "disabled" : ""}`}
          type="submit"
          disabled={!newTaskValues.title.length}
        >
          Add todo
        </button>
      </div>
    </form>
  );
};