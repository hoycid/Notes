import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import Notes from './components/Notes';
import NotesModal from './components/NotesModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <NotesModal />
            <Notes />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
