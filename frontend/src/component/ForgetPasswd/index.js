import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CopyRight from "../CopyRight";
import {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MuiAlert from "@mui/material/Alert";

const theme = createTheme();

export default function ForgetPasswd(props) {
    const [open, setOpen] = React.useState(false)
    const [passwd, setPasswd] = React.useState('')
    const {openError,setOpenError,errorMsg,setErrorMsg} = props
    const {openSuccess,setOpenSuccess,successMsg,setSuccessMsg} = props
    const {loginStatus,setLoginStatus,userName,setUserName} = props
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios({
            method:'post',
            url:'http://localhost:8000/forget',
            data:data,
        }).then((m)=>{
            console.log(m)
            let msg = m.data
            if(msg[0]=='T'){
                setPasswd(msg.slice(1,msg.length))
                setOpen(true)
            }else{
                setErrorMsg(msg.slice(1,msg.length))
                setOpenError(true)
            }
        }).catch((e)=>{
            setErrorMsg("服务器请求异常")
            setOpenError(true)
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        找回密码
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="姓名"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="sName"
                                    label="学校名"
                                    name="sName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="uName"
                                    label="用户名"
                                    name="uName"
                                    autoComplete="uName"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            输入注册信息找回密码
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="login" variant="body2">
                                    想起密码了？点此登录
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <CopyRight sx={{ mt: 5 }} />
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"已找回密码"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        您的密码如下：{passwd}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        我已记住密码，点击关闭
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}