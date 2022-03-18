import React from 'react';
import icon from '../../../assets/icon.svg';
import { openDesktop } from '../../config/ipc';
const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react</h1>
    </div>
  );
};
export default Hello;
