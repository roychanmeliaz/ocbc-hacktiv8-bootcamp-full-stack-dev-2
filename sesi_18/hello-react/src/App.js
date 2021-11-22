import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';

export default class App extends Component {

  constructor() {
    super()
    this.state= {
      title : "Welcome to React"
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>{this.state.title}</h2>
        </div>
        <p className="App-intro">
        Saya belajar dengan tekun supaya bisa menjadi website developer yang hebat.
        </p>
      </div> 

    )
  }
}




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
