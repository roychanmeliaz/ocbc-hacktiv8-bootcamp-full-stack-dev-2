import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import styles from './App.module.css'
// import styles from './AppStyles.js'
import styled from 'styled-components'

const PRed = styled.p`
  font-size: 10pt;
  color: #fc0
`;

const PBlue = styled.p`
  font-size: 30pt;
  color: #cf0
`;

function App() {

  const[placeholder, setPlaceholder] = useState('Hi');
  const [parStyle, setParStyle] = useState({
    backgroundColor: "#F00"
  })
  // const [parClass, setParClass] = useState("Paragraph Red")
  const [parClass, setParClass] = useState(styles.small)
  const [pState, setPState] = useState(true)

  useEffect(()=>{
    fetch('/hello')
    .then(res=>res.json())
    .then(data=>{
      setPlaceholder(data.result);
    });
  }, []);

  const changeStyle = () => setParStyle({
    backgroundColor: "#"+Math.floor(Math.random()*(999-100+1)+100)
  })

  // const changeClass = () => setParClass("Paragraph Blue")
  const changeClass = () => {
    if (parClass===styles.small) {
      setParClass(styles.large)
    } else {
      setParClass(styles.small)
    }
  }

  const changeStyled=()=>{}


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p style={parStyle}>Flask says {placeholder}</p>
        <p className={parClass}>Flask says {placeholder}</p>
        {/* <button onClick={setPState(!pState)}>Change style</button>
        {
          pState===true ?
          (<PRed>{ placeholder }</PRed>):
          (<PBlue>{ placeholder }</PBlue>)
        } */}
        <button onClick={changeStyle}>Change style</button>
        <button onClick={changeClass}>Change className</button>
        <button onClick={changeStyled}>Change styled-components</button>
      </header>
    </div>
  );
}

export default App;
