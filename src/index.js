import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { searchRobots } from './reducers';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import App from './containers/App';

// Creating new Redux store
// Note: Ideally it should have the main root reducer passed in,
//       but in this case we have just one reducer - searchRobots
// const store = createStore(reducerRoot)
const store = createStore(searchRobots)

ReactDOM.render(
  <React.StrictMode>

    {/* Provider enables the store to be passed on to all the components through the chain
    instead of having to pass it individually to each of them */}
    <Provider store={ store }>
      
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
