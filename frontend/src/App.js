import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import MenuAppBar from "./component/TopBar";
import Index from "./component/Index";
import SignInSide from "./component/Login";
import SignUp from "./component/SignUP";
import ForgetPasswd from "./component/ForgetPasswd";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
    const [loginStatus,setLoginStatus] = useState(false)
    const [userName,setUserName] = useState('')
    const [openError, setOpenError] = React.useState(false)
    const [errorMsg, setErrorMsg] = useState()
    const [openSuccess, setOpenSuccess] = React.useState(false)
    const [successMsg, setSuccessMsg] = useState()

    useEffect(()=>{
        if (localStorage.getItem("loginStatus")=="ture"){
            setLoginStatus(true)
            if (localStorage.getItem("userName")!=""){
                setUserName(localStorage.getItem("userName"))
            }
        }else{
            setLoginStatus(false)
        }
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenError(false)
        setErrorMsg("")
    }
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSuccess(false)
        setSuccessMsg("")
    }

    if(!loginStatus){
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/login' element={<SignInSide
                            openError={openError}
                            setOpenError={setOpenError}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            openSuccess={openSuccess}
                            setOpenSuccess={setOpenSuccess}
                            successMsg={successMsg}
                            setSuccessMsg={setSuccessMsg}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setUserName={setUserName}
                        />}/>
                        <Route exact path='/signup' element={<SignUp
                            openError={openError}
                            setOpenError={setOpenError}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            openSuccess={openSuccess}
                            setOpenSuccess={setOpenSuccess}
                            successMsg={successMsg}
                            setSuccessMsg={setSuccessMsg}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setUserName={setUserName}
                        />}/>
                        <Route exact path='/forgetPasswd' element={<ForgetPasswd
                            openError={openError}
                            setOpenError={setOpenError}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            openSuccess={openSuccess}
                            setOpenSuccess={setOpenSuccess}
                            successMsg={successMsg}
                            setSuccessMsg={setSuccessMsg}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setUserName={setUserName}
                        />}/>
                        <Route exact path='/' element={<SignInSide
                            openError={openError}
                            setOpenError={setOpenError}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            openSuccess={openSuccess}
                            setOpenSuccess={setOpenSuccess}
                            successMsg={successMsg}
                            setSuccessMsg={setSuccessMsg}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setUserName={setUserName}
                        />}/>
                    </Routes>
                </BrowserRouter>
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                        {successMsg}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </div>
        )
    }else{
        return (
            <div>
                <BrowserRouter>
                    <MenuAppBar
                        openError={openError}
                        setOpenError={setOpenError}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                        openSuccess={openSuccess}
                        setOpenSuccess={setOpenSuccess}
                        successMsg={successMsg}
                        setSuccessMsg={setSuccessMsg}
                        loginStatus={loginStatus}
                        setLoginStatus={setLoginStatus}
                        userName={userName}
                        setUserName={setUserName}
                    />
                    <Routes>
                        <Route exact path='/' element={<Index
                            openError={openError}
                            setOpenError={setOpenError}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            openSuccess={openSuccess}
                            setOpenSuccess={setOpenSuccess}
                            successMsg={successMsg}
                            setSuccessMsg={setSuccessMsg}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setUserName={setUserName}
                        />}/>
                        <Route path='/' element={<Index
                            openError={openError}
                            setOpenError={setOpenError}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            openSuccess={openSuccess}
                            setOpenSuccess={setOpenSuccess}
                            successMsg={successMsg}
                            setSuccessMsg={setSuccessMsg}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setUserName={setUserName}
                        />}/>
                    </Routes>
                </BrowserRouter>
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                        {successMsg}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default App;
