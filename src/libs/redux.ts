export const createStore = (
  reducer: (state: any, action: any) => any,
  preloadedState?: any
) => {
  let state = preloadedState;
  let listeners: (() => void)[] = [];
  const getState = () => state;
  const dispatch = (action: any) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({ type: "@@INIT_HUY" });
  return { getState, dispatch, subscribe };
};
