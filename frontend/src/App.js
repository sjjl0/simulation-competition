import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import MenuAppBar from "./component/TopBar";
import Index from "./component/Index";

function App() {
    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        if (localStorage.getItem("loginStatus")!=""){
            setLoginStatus(localStorage.getItem("loginStatus"))
        }
    })

    return (
        <div>
            <MenuAppBar
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
            />
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Index
                        loginStatus={loginStatus}
                        setLoginStatus={setLoginStatus}
                    />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
