import React from 'react';
import logo from './logo.svg';
import { TopNav } from './layout';
import Button from "react-bootstrap/Button";

function App() {
  return (
    <>
      <TopNav />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button variant="primary">Primary</Button>
        </header>
      </div>
    </>
  );
}

export default App;
