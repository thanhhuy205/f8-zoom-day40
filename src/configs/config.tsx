import TaskLayout from "@/layouts/TaskLayout";
import EditTask from "@/pages/EditTask";
import Home from "@/pages/Home";
import NewTasks from "@/pages/NewTask";
import TaskList from "@/pages/TaskList";

export const config = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/task",
    element: <TaskLayout />,
    children: [
      {
        index: true,
        element: <TaskList />,
      },
      {
        path: "new-task",
        element: <NewTasks />,
      },
      {
        path: ":id/edit",
        element: <EditTask />,
      },
    ],
  },
];
