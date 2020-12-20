import { helloworld } from "@config-tester/lib1";
import './component1.css';

export function Component1() {
  helloworld();
  console.log('check');

  return (
    <div className="blue">triel</div>
  );
}

export function Component2() {
  helloworld();
  console.log('check');

  return (
    <div className="blue">triel</div>
  );
}