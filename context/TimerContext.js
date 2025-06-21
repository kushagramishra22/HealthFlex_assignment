import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerContext = createContext();

const initialState = {
  timers: [],
  history: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(t => (t.id === action.payload.id ? action.payload : t))
      };
    case 'REMOVE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(t => t.id !== action.payload)
      };
    case 'ADD_HISTORY':
      return {
        ...state,
        history: [...state.history, action.payload]
      };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      const timers = JSON.parse(await AsyncStorage.getItem('timers')) || [];
      const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
      dispatch({ type: 'LOAD_STATE', payload: { timers, history } });
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('timers', JSON.stringify(state.timers));
    AsyncStorage.setItem('history', JSON.stringify(state.history));
  }, [state.timers, state.history]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
