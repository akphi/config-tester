import { Component1, Component2 } from '@akphi/component1';
import { useState } from 'react';
import './index.scss';

export const App: React.FC = () => {
  const [age, setAge] = useState(10);

  return (
    <div className="wrapper">
      <Component1 />
      <button onClick={(): void => setAge(age + 1)}>+</button>
      <div>Age: {age}</div>
    </div>
  );
};
