import { observer } from 'mobx-react-lite';
import React from 'react';
import ReactDOM from 'react-dom';
import { Person } from './Person';

const root = ((): Element => {
  let rootEl = document.getElementsByTagName('root').length ? document.getElementsByTagName('root')[0] : undefined;
  if (!rootEl) {
    rootEl = document.createElement('root');
    document.body.appendChild(rootEl);
  }
  return rootEl;
})();

const person = new Person();

const App: React.FC = observer(() => {
  // const person = createPerson();
  console.log('age: ', person.age, person.hashCode);
  return (
    <div>
      Age: {person.age !== undefined ? person.age : 19}
      <button onClick={(): void => person.incrementAge()}>+</button>
    </div>
  );
});

ReactDOM.render((
  <App />
), root);
