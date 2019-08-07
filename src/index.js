import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import MainRouter from './routes'
import reducer from './modules/main/main.reducer';
const middlewareTouse = applyMiddleware(thunk);

const composedEnhancer = compose(middlewareTouse,window.devToolsExtension?window.devToolsExtension():f=>f);
const store = createStore(combineReducers({reducer}),composedEnhancer);
ReactDOM.render(
    <Provider store={store}>
        <MainRouter />
    </Provider>
, document.getElementById("root"));
