import React from 'react';
import './app.scss';
import { GENDER } from 'Const';
import { assertNonNullable } from '../utils';

export const App: React.FC = () => {
  return (
    <div>{GENDER.MALE} 123</div>
  );
};

