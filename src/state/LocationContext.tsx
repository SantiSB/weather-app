'use client'
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Location } from "../types/location";

type Action =
  | { type: "SET_LOCATION"; payload: Location }
  | { type: "CLEAR_LOCATION" };

type Dispatch = (action: Action) => void;
type State = { location: Location | null };
type LocationProviderProps = { children: ReactNode };

const initialState: State = {
  location: null,
};

const LocationStateContext = createContext<State | undefined>(undefined);
const LocationDispatchContext = createContext<Dispatch | undefined>(undefined);

function locationReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "CLEAR_LOCATION":
      return { ...state, location: null };
    default:
      return state;
  }
}

const LocationProvider = ({ children }: LocationProviderProps) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  return (
    <LocationStateContext.Provider value={state}>
      <LocationDispatchContext.Provider value={dispatch}>
        {children}
      </LocationDispatchContext.Provider>
    </LocationStateContext.Provider>
  );
};

function useLocationState() {
  const context = useContext(LocationStateContext);
  if (context === undefined) {
    throw new Error("useLocationState must be used within a LocationProvider");
  }
  return context;
}

function useLocationDispatch() {
  const context = useContext(LocationDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useLocationDispatch must be used within a LocationProvider"
    );
  }
  return context;
}

export { LocationProvider, useLocationState, useLocationDispatch };
