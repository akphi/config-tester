import ReactDOM from 'react-dom';
import { App } from './App';

const root = ((): Element => {
  let rootElement = document.getElementsByTagName('root').length
    ? document.getElementsByTagName('root')[0]
    : undefined;
  if (!rootElement) {
    rootElement = document.createElement('root');
    document.body.appendChild(rootElement);
  }
  return rootElement;
})();

ReactDOM.render(<App />, root);
