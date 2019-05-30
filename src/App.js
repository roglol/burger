import React, { Component } from 'react';
import { createStore} from 'redux';
import {Provider} from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reducer from './store/reducer';


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
 

  render() {
   return (
      <div>
        <Provider store={store}>
        <BrowserRouter>
        <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
        </Layout>
        </BrowserRouter>
        </Provider>
      </div>
   )
  }


}

export default App;
