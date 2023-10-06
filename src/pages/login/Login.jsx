import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './style.css'
import instance from '../../service/AxiosOrder.js'
import Typography from '@mui/material/Typography';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    styled,
    TextField
} from "@mui/material";

import { Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../data/useAuth.jsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from "@mui/material/Alert";




const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#76d300'),
    backgroundColor: '#76d300',
    '&:hover': {
        backgroundColor: '#76d300',
    },
}));



export default function Login() {
    const navigate = useNavigate();

    const { login} = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    const [warning, setWarning] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === "" && password ===""){
            alert("All fields are mandatory");
        }else{
            //send login data to server
            instance.post('/user/login', {
                username: username,
                password: password
            })
                .then( (response)=> {
                    console.log(response.data);

                    if(!response.data.error){

                        login(response.data)
                        navigate('/orderinfo');
                    }else{
                        setWarning(true);
                        setTimeout(() => {
                            setWarning(false);
                        }, 3000);
                    }

                })
                .catch( (error) => {
                    console.log(error);
                });
        }

    };



    // const clearFields = () => {
    //     setUsername('');
    //     setPassword('');
    // };


    return (
        <form onSubmit={handleSubmit}>
            {
                warning && <Alert style={{color:'white', backgroundColor:'#76d300', textAlign: 'center'}} variant="filled"  >You Don't have an Account! please Check your username & password </Alert>
            }

            <Card style={{display: 'flex', maxWidth:'800px' , backgroundColor:'#ffffff', margin:'auto', marginTop:'50px', marginBottom:'50px' }}>
                <Box style={{margin: 'auto', display:'block'}}>
                    <CardContent style={{textAlign:'center'}} >
                        <Typography  style={{fontSize: '40px', fontWeight:'bold', textAlign:'center'}} >
                            Welcome to Ceylon Spices! Please login.
                        </Typography>

                        <Typography  style={{fontSize: '10px',fontWeight:'bold', textAlign:'center', marginBottom:'20px'}} >
                            if you dont have an account please register first
                            <Link style={{marginLeft:'5px', textDecoration:'none'}} to={'/signup'}>SignUP</Link>
                        </Typography>

                        <Typography style={{fontSize: '15px'}} >
                            Username
                        </Typography>
                        <TextField
                            onChange={(val)=>{setUsername(val.target.value)}}
                            style={{padding:'15px'}}
                            size="small"
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />

                        <Typography style={{fontSize: '15px'}} >
                            Password
                        </Typography>
                        <TextField

                            onChange={(val)=>{setPassword(val.target.value)}}
                            style={{padding:'15px'}}
                            size="small"
                            type = {showPassword ? 'text' : 'password'}
                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </CardContent>
                    <CardActions>
                        <ColorButton  type={'submit'}  style={{width:'200px', padding: '10px', borderRadius:'20px', margin:'auto', marginBottom:'10px', fontWeight:'bold'}} variant="contained">Login</ColorButton>
                    </CardActions>

                </Box>

            </Card>
        </form>

    );
}


