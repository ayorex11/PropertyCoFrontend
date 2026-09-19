"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/lib/store";
import { persistStore } from "redux-persist";
import { useEffect } from "react";
import { logoutUser } from "@/lib/features/auth/authSlice";
import { verifyTokenApi } from "@/lib/api/authApi";
const persistor = persistStore(store);

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const verify = async () => {
      const token = store.getState().auth.access;
      if (token) {
        try {
          await verifyTokenApi(token);
        } catch {
          store.dispatch(logoutUser());
        }
      }
    };
    verify();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
