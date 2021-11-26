import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar(props) {
    const {openError,setOpenError,errorMsg,setErrorMsg} = props
    const {openSuccess,setOpenSuccess,successMsg,setSuccessMsg} = props
    const {loginStatus,setLoginStatus,userName,setUserName} = props
    const [anchorEl, setAnchorEl] = React.useState(null)
    const navigate = useNavigate()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleAccount = () => {
        setAnchorEl(null)
    }
    const Logout = () => {
        setAnchorEl(null)
        setSuccessMsg("退出登录")
        navigate('/')
        setOpenSuccess(true)
        setLoginStatus(false)
        setUserName('')
        localStorage.setItem("loginStatus","false")
        localStorage.setItem("userName",'')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        美学区即刻种植CBL
                    </Typography>
                    {loginStatus && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleAccount}>
                                    我的历史成绩（开发中不可用）
                                </MenuItem>
                                <MenuItem onClick={Logout}>
                                    退出登录
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
