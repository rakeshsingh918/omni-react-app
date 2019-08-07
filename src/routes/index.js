import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import MainContainer from '../modules/main/main.container';
const Routes =()=>(
<BrowserRouter >
<Route path="/" component={MainContainer}>
</Route>
</BrowserRouter>
);
export default Routes;