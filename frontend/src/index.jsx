import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/app'
import Thunk from 'redux-thunk'

import  { createStore, applyMiddleware } from 'redux'
import  { Provider } from 'react-redux'
import  promise from 'redux-promise'
import  multi from 'redux-multi'

import Reducers from './main/reduces'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(Thunk,multi,promise)(createStore)(Reducers,devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
     document.getElementById('app'))