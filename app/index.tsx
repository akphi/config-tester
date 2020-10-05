
import { makeObservable, observable } from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';

const root = ((): Element => {
  let rootEl = document.getElementsByTagName('root').length ? document.getElementsByTagName('root')[0] : undefined;
  if (!rootEl) {
    rootEl = document.createElement('root');
    document.body.appendChild(rootEl);
  }
  return rootEl;
})();

class Animal {
  name!: unknown;
}

class Person extends Animal {
  declare name: string;
  age!: number;

  constructor() {
    super();
    makeObservable(this, {
      age: observable
    });
  }
}

const App: React.FC = () => {
  const person = new Person();
  return (
    <div>
      Age: {person.age ?? 19}
    </div>
  );
};

ReactDOM.render((
  <App />
), root);
