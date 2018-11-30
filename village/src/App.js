import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

const url = 'http://localhost:3333/smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get(url)
      .then(res => {
        console.log(res);
        this.setState({
          smurfs: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addNewSmurf = newSmurf => {
    axios
      .post(url, newSmurf)
      .then(res => {
        // console.log(res);
        this.setState({
          smurfs: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">

      <nav>
        <NavLink to='/'>
          Smurf Village
        </NavLink>
        <NavLink to='/smurf-form'>
          New Smurf Form
        </NavLink>
      </nav>

        <Route path='/smurf-form' 
          render={props => 
            <SmurfForm 
              {...props} 
              addSmurf={this.addNewSmurf} 
              addNewSmurf={this.addNewSmurf}
            />
          }
        />
        
        <Route exact path='/'
          render={props => 
            <Smurfs 
              {...props} 
              smurfs={this.state.smurfs} 
            />
          }
        />

      </div>
    );
  }
}

export default App;
