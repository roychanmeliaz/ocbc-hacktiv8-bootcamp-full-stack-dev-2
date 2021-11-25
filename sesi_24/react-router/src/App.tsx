import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import {Outlet} from 'react-router-dom'

import { 
  useDispatch,  //dipakai untuk melempar action
  useSelector   //ambil state dari sebuah store
} from 'react-redux'

function App() {
  const state:any = useSelector((state)=>state)
  const dispatch = useDispatch()

  const incrementCounter = () => {dispatch({ type: "INCREMENT" })}
  const decrementCounter = () => {dispatch({ type: "DECREMENT" })}
  const customCounter = (value=10) => {dispatch({ type: "SET_COUNTER", payload: state.counter+value })}

  return (
    <div className="App">
      <nav>
        <ul>
          <li>Testmenu</li>
          <li>Testmenu</li>
          <li>Testmenu</li>
          <li>Testmenu</li>
          <li>Testmenu</li>
        </ul>
      </nav>

      <div>
        <h3>Counter Time!</h3>
        <h3>{state.counter}</h3>
        <button onClick={incrementCounter}>Add by 1</button>
        <button onClick={decrementCounter}>Substract by 1</button>
        <button onClick={()=>customCounter(10)}>Add by 60</button>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
