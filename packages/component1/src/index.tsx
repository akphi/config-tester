import { useState } from 'react';
import { helloworld } from '@akphi/lib1';
import { Button } from '@material-ui/core';
import './component1.css';

export function Component1() {
  const a = useState(1);
  helloworld();
  return <Button variant="outlined">triel</Button>;
}

export function Component2() {
  helloworld();
  console.log('check');

  return <div className="blue">triel</div>;
}
