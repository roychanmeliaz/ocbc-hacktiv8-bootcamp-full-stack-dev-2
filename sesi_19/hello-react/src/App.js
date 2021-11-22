import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'

export default class App extends Component {

  constructor() {
    super()
    this.state= {
      title : "Session 19 - React Js",
      name : "Roy",
      scope: {
        project : "Frontend React",
        founded : 2021
      }
    }
  }

  changeTitle = () => {
    this.setState({
      title: "Final Project"
    })
  }

  changeTitleBind () {
    this.setState({
      title: "Final Project Bind"
    })
  }

  changeTitleEvent = (event) => {
    console.log(event)
    this.setState({
      title: "Final Project Event"
    })
  }

  getScope() {
    return this.state.scope
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>{this.state.title} by {this.state.name}</h2>
          <h3>Project {this.getScope().project} founded on {this.getScope().founded}. Score: {this.props.score}</h3>
          <button
            className="App-link"
            onClick = {this.changeTitle}
          >
            Change Title
          </button>
          <button
            className="App-link"
            onClick = {this.changeTitleBind.bind(this)}
          >
            Change Title Bind
          </button>
          <button
            className="App-link"
            onClick = {(e) => this.changeTitleEvent(e)}
          >
            Change Title Event
          </button>
        </div>
        <p className="App-intro">
        Saya belajar dengan tekun supaya bisa menjadi website developer yang hebat.
        </p>

      </div> 

    )
  }
}

App.propTypes = {
  score: PropTypes.string
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
