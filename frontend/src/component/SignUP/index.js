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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CopyRight from "../CopyRight";
import {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp(props) {
    const {openError,setOpenError,errorMsg,setErrorMsg} = props
    const {openSuccess,setOpenSuccess,successMsg,setSuccessMsg} = props
    const {loginStatus,setLoginStatus,userName,setUserName} = props
    const [known,setKnown] = useState(false)
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!known){
            setOpen(true)
        }else{
            setOpen(false)
            axios({
                method:'post',
                url:'http://localhost:8000/signup',
                data:data,
            }).then((m)=>{
                console.log(m)
                let msg = m.data
                if(msg[0]=='T'){
                    setSuccessMsg("注册成功")
                    navigate('/')
                    setOpenSuccess(true)
                    setLoginStatus(true)
                    setUserName(data.get('uName'))
                    localStorage.setItem("loginStatus","ture")
                    localStorage.setItem("userName",data.get('uName'))
                }else{
                    setErrorMsg(msg.slice(1,msg.length))
                    setOpenError(true)
                }
            }).catch((e)=>{
                setErrorMsg("服务器请求异常")
                setOpenError(true)
            })
        }
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
                        注  册
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="密码"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="我已知晓仿真实验的使用相关规则，并允许采集实验成绩用于后续比对分析"
                                    onChange={(e)=>{
                                        setKnown(e.target.checked)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            注  册
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="login" variant="body2">
                                    已经有账号了？点此登录
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <CopyRight sx={{ mt: 5 }} />
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    请勾选同意以继续注册
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}