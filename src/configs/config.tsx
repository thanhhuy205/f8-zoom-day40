import EditTask from "@/pages/EditTask";
import NewTasks from "@/pages/NewTask";
import TaskList from "@/pages/TaskList";

export const config = [
  {
    path: "/",
    element: <TaskList />,
  },
  {
    path: "/:id/edit",
    element: <EditTask />,
  },
  {
    path: "/new-task",
    element: <NewTasks />,
  },
];
