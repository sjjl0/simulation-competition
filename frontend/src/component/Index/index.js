import * as React from 'react';

import MainPage from "../Main";
import {useEffect, useState} from "react";

export default function Index(props){
    const {loginStatus, setLoginStatus} = props

    if(loginStatus){
        return (
            <div>
                <MainPage/>
            </div>
        )
    }else{
        return (
            <div>
            </div>
        )
    }
}