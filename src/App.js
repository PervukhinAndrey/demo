import React from 'react';
import './css/reset.css'
import './App.css'
import {Provider} from "react-redux";
import store from "./redux/resux-store";
import UsersContainer from "./components/Users/UsersContainer";



let App = () => {
    return (
        <Provider store={store}>
            <div className='App'>
                <UsersContainer/>
            </div>
        </Provider>
    )
}
export default App
