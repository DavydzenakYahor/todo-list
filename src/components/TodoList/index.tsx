import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../../typings";
import { addTaskRequest, getTasks, updateTaskRequest } from "../../api";
import { TodoForm } from "./TodoForm";
import { Tasks } from "./Tasks";

export enum Action {
  Delete = "Delete",
  Update = "Update",
};

export const TodoList = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery<ITask[]>({ queryKey: ["tasks"], queryFn: () => getTasks() });

  const addTask = useMutation({
    mutationFn: addTaskRequest,
    onMutate: async (newTask: ITask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const prevTasks = queryClient.getQueryData<ITask[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (oldTasks: ITask[]) => [...oldTasks, { ...newTask, id: Date.now() }]);
      return { prevTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.prevTasks);
    },
  });
  const updateTask = useMutation({
    mutationFn: updateTaskRequest,
    onMutate: async ({ id, action }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const prevTasks = queryClient.getQueryData<ITask[]>(["tasks"]);
      if (action === Action.Update) {
        queryClient.setQueryData(["tasks"], (oldTasks: ITask[]) => oldTasks.map(
          task => task.id === id ? ({ ...task, completed: !task.completed }) : task
        ))
      } else {
        queryClient.setQueryData(["tasks"], (oldTasks: ITask[]) => oldTasks.filter(task => task.id !== id))
      };
      return { prevTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks"], context?.prevTasks);
    },
  })

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <TodoForm addTask={addTask} />
          <Tasks
            updateTask={updateTask}
            tasks={tasks || []}
          />
        </>
      )}

    </div >
  );
};