import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import MenuAppBar from "./component/TopBar";
import Index from "./component/Index";
import SignInSide from "./component/Login";
import SignUp from "./component/SignUP";
import ForgetPasswd from "./component/ForgetPasswd";

function App() {
    const [loginStatus,setLoginStatus] = useState(false)
    useEffect(()=>{
        if (localStorage.getItem("loginStatus")!=""){
            setLoginStatus(localStorage.getItem("loginStatus"))
        }
    })

    if(!loginStatus){
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/login' element={<SignInSide/>}/>
                        <Route exact path='/signup' element={<SignUp/>}/>
                        <Route exact path='/forgetPasswd' element={<ForgetPasswd/>}/>
                        <Route exact path='/' element={<SignInSide/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }else{
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
        )
    }
}

export default App;
