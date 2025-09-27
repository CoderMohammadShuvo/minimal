"use client"

import type React from "react"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/lib/store"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
// loading={<div>Loading...</div>}
