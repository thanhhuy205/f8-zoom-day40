import type { store } from "../store";
import {
  ADD_TASK,
  DELETE_TASK,
  SET_ERROR,
  SET_LOADING,
  SET_TASKS,
  UPDATE_TASK,
} from "./actionType/taskReducerAction";

type RootState = ReturnType<typeof store.getState>;

export interface Task {
  id: number;
  title: string;
}
export const setTasks = (tasks: Task[]) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const addTask = (task: Task) => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (task: Task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (taskId: number) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: boolean) => ({
  type: SET_ERROR,
  payload: error,
});

const initState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = (
  state: RootState = initState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        error: null,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: Task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
        loading: false,
        error: null,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: Task) => task.id !== action.payload),
        loading: false,
        error: null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
