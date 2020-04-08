import React from 'react';
import './app.scss';
import { GENDER } from 'Const';

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div>{GENDER.FEMALE} 123</div>
      <div>{GENDER.MALE} 123</div>
    </div>
  );
};

