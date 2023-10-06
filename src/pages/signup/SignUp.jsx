import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import instance from '../../service/AxiosOrder.js'
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import BadgeIcon from '@mui/icons-material/Badge';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    styled,
    TextField
} from "@mui/material";

import { Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#76d300'),
    backgroundColor: '#76d300',
    '&:hover': {
        backgroundColor: '#76d300',
    },
}));



export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(email === "" && password ==="" && username===""){
            alert('all fields are mandatory');
        }else{
            instance.post('/user/signup', {
                username: username,
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    navigate('/login')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }





    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{display: 'flex', maxWidth: 800, backgroundColor:'white', margin:'auto',marginTop:'50px', marginBottom:'50px' }}>
                <Box style={{margin: 'auto', display:'block'}}>
                    <CardContent style={{textAlign:'center'}} >
                        <Typography  style={{fontSize: '40px', fontWeight:'bold', textAlign:'center'}} >
                            Welcome to Ceylon Spices! Please Signup.
                        </Typography>

                        <Typography style={{fontSize: '15px'}} >
                            Username
                        </Typography>
                        <TextField
                            onChange={(val)=>{setUserName(val.target.value)}}
                            size="small"
                            style={{padding:'15px'}}

                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />

                        <Typography htmlFor="standard-adornment-password" style={{fontSize: '15px'}} >
                            Email
                        </Typography>
                        <TextField
                            onChange={(val)=>{setEmail(val.target.value)}}
                            size="small"
                            style={{padding:'15px'}}
                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
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
                            size="small"
                            style={{padding:'15px'}}
                            type={showPassword ? 'text' : 'password'}
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

                        />
                    </CardContent>
                    <CardActions>
                        <ColorButton type={'submit'}   style={{width:'200px', padding: '10px', borderRadius:'20px', margin:'auto', marginBottom:'20px', fontWeight:'bold'}} variant="contained">Sign UP</ColorButton>
                    </CardActions>

                </Box>

            </Card>
        </form>

    );
}

