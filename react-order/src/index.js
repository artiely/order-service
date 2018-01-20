import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers   from './redux/index.redux'
import AuthRouter from './component/authrouter'
import HomeRouter from './component/homerouter'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Login from './views/login'
import Register from './views/register'
import './assets/cover.css'
const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():_=>_
))

ReactDOM.render((
<Provider store={store}>
  <Router>
    <div>
    <AuthRouter></AuthRouter>
    <Switch>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route component={HomeRouter}></Route>
    </Switch>
    </div>
  </Router>
</Provider>
), document.getElementById('root'));
registerServiceWorker();
