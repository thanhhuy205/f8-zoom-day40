import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { store } from "../store/store";

type Store = {
  getState: () => any;
  subscribe: (listener: () => void) => () => void;
  dispatch: (action: any) => void;
};

const ReduxContext = createContext<Store | null>(null);

interface ReduxProps {
  store: Store;
  children: ReactNode;
}

const Provider = ({ store, children }: ReduxProps) => {
  return (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
  );
};
function useStore() {
  const store = useContext(ReduxContext);
  if (!store) {
    throw new Error("useStore need store by Provider =))");
  }
  return store;
}

function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

type RootState = ReturnType<typeof store.getState>;
function useSelector<T>(selector: (state: RootState) => T): T {
  const store = useStore();
  const [state, setState] = useState<T>(() => {
    return selector(store.getState());
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()));
    });
    return unsubscribe;
  }, [selector, state, store]);

  return state;
}

export { Provider, useDispatch, useSelector, useStore };
