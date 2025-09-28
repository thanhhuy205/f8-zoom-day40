import TaskItem from "@/components/TaskItem";
import { useDispatch, useSelector } from "@/libs/react-redux";
import {
  deleteTask,
  setError,
  setLoading,
  setTasks,
  type Task,
} from "@/store/reducers/taskReducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [del, setDel] = useState<boolean>(false);
  const { tasks, loading, error } = useSelector((state: any) => state);
  console.log("TaskList render", tasks);

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));
      dispatch(setError(false));
      try {
        const response = await fetch("http://localhost:3001/tasks");
        const data = await response.json();
        dispatch(setTasks(data));
      } catch (error) {
        dispatch(setError(true));
      } finally {
        dispatch(setLoading(false));
      }
    };
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    const cfm = confirm("Bạn có chắc muốn xoá task này");
    if (cfm) {
      setDel(true);
      try {
        await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
        dispatch(deleteTask(id));
      } catch (error) {
        dispatch(setError(true));
      } finally {
        setDel(false);
      }
    } else {
      setDel(false);
    }
  };

  const handleEdit = (task: Task) => {
    navigate(`/task/${task.id}/edit`);
  };

  if (loading)
    return (
      <>
        <div>Loading...</div>
      </>
    );
  if (tasks.length === 0)
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-lg font-medium border-2 border-dashed border-gray-300 rounded-lg">
        Chưa có task nào
      </div>
    );

  return (
    <div className="card">
      <button
        onClick={() => navigate("/task/new-task")}
        className="btn-primary w-full mb-4"
      >
        Create New Task
      </button>

      <div className="space-y-3">
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={del}
          />
        ))}
      </div>

      {error && (
        <div className="alert-error text-center">Error fetching tasks!</div>
      )}
    </div>
  );
};

export default TaskList;
