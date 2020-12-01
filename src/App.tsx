import React, { useState } from 'react';

export const App: React.FC = () => {
  const [age, setAge] = useState(10);

  return (
    <div className="wrapper">
      <button onClick={(): void => setAge(age + 1)}>+</button>
      <div>Age: {age}</div>
    </div>
  );
};
