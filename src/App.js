import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import CartScreen from './component/CartScreen';

import Login from './component/Login';
import Navbar from './component/Navbar';
import Register from './component/Register';
import View from './component/View';
// import Register from './component/Register';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
          <Route exact path="/" component={View} />
          <Route exact path='/cart' component={CartScreen} />
      </Switch>
    </Router>
  );
}

export default App;
