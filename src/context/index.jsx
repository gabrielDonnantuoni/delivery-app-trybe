import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

const socket = io();

export const Context = createContext();

function ContextProvider({ children }) {
  const [oscillator, setOscillator] = useState(false);

  const obj = {
    socket,
    oscillator: { value: oscillator, set: setOscillator },
  };
  return (
    <Context.Provider value={obj}>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
