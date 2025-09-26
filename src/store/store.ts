import { createStore } from "../libs/redux";
import { taskReducer } from "./reducers/taskReducer";
export const store = createStore(taskReducer);
