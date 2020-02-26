import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import './App.css';
import NotesBoard from "./components/notes"
import Edit from "./components/edit"
import Create from "./components/create"

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="" target="_blank">
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Notes App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/notes" className="nav-link">Notes</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Notes</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/edit/:id" className="nav-link">Edit Notes</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/notes" exact component={NotesBoard} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/create" component={Create} />
        </div>
      </Router>
    );
  }
}

export default App;
