import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import image1 from '../../assets/CK-LOGO-1.png'
import './style.css'
import {alpha,InputBase, styled} from "@mui/material";
import routes from '../../common/Router.jsx'
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import SideMenu from '../../components/sidebar/sidemenu.jsx'
import Alert from "@mui/material/Alert";
import {useAuth} from "../../data/useAuth.jsx";



export default function NavBar({cartItems, warning}){


    const {  logout, user } = useAuth();
    // console.log(user.slice(0,1).toUpperCase())
    // const name = (user.slice(0,1).toUpperCase());

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();



    return(
        <AppBar position="static" sx={{backgroundColor:'black'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to={'/home'} sx={{display: { md: 'none' }}} className={'logo-1'}>
                        <img  src={image1}  className="logo-1 " alt="CK logo" />
                    </Link>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>

                    <Box sx={{position: 'absolute',right: '200px', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {routes.map((val, index) => (
                            <Button
                                key={index}
                                onClick={()=>navigate(val.path)}
                                sx={{ color: 'white', display: 'block' }}
                            >
                                {val.name}
                            </Button>
                        ))}
                    </Box>
                   <Box sx={{ flexGrow: 0,position: 'absolute',right: '50px'}}>
                        <SideMenu cartItems={cartItems} warning={warning} />
                        <span style={{ fontSize:'12px',position:'absolute'}}>{(cartItems || []).length}</span>
                        {
                            warning && <Alert style={{position:'fixed', zIndex:10, color:'white', backgroundColor:'#76d300'}} variant="filled"  > Item is already added to your cart </Alert>
                        }

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu } sx={{ml:5 , p: 0 }}>
                                <Avatar style={{backgroundColor:'#e22137', color:'white'}}>{user}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                        <MenuItem style={{display:'flex', flexDirection:'column'}} onClick={handleCloseUserMenu}>
                            <Link to={'/myProfile'} style={{textDecoration:'none', textAlign:'center', color:'black', marginBottom:'10px'}} >Profile</Link>
                            <Link to={'/home'} onClick={logout} style={{textDecoration:'none', textAlign:'center', color:'black'}} >Logout</Link>
                        </MenuItem>

                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>

    )

}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
}));