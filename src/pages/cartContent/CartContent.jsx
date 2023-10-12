import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Alert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Base_Url from '../../common/BaseURL.jsx'

export default function CartContent({cartItems, setCartItems, adding, removing}) {
    //console.log(cartItems)
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    useEffect(()=>{
        handlePrice();
    })


    const handleRemove = (id)=> {
        const arr = cartItems.filter((val)=> val.id !== id);
        setCartItems(arr);

    }

    const handlePrice = ()=>{
        let ans = 0;
        cartItems.map((item)=>(
            ans += item.nProduct * item.price
        ))
        setPrice(ans);
    }

    return (
        <>
            <List sx={{ maxWidth:700, margin:'auto', bgcolor: 'background.paper', marginTop:'50px', marginBottom:'300px' }}>
                {(cartItems || []).length === 0 && (
                    <div>
                        <Alert variant="filled" severity="success" >
                            Your cart is currently empty.
                        </Alert>
                        <Button style={{display:'block' , margin:'auto', marginTop:'20px', backgroundColor:'black', color:'white'}} onClick={()=>{navigate('/home')}}  variant="contained">Return to Home</Button>
                    </div>


                )}
                {cartItems.map((val, index) => (
                            <ListItemButton key={index} style={{marginBottom:'15px'}}   >
                                <ListItemIcon>
                                    <IconButton onClick={()=>handleRemove(val.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar
                                        style={{width:'70px', height:'70px'}}
                                        alt={'image'}
                                        src={`${Base_Url}${val.pro_image}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText style={{marginLeft:'20px',width:'100px'}}  primary={`${val.pro_name}`} />
                                <ListItemText style={{ textAlign:'start'}} primary={`${val.nProduct}`} />
                                <div>
                                    <Button className="shadow " onClick={()=>adding(val, +1)} variant="light">+</Button>
                                    <Button className="shadow" variant="light">{val.nProduct}</Button>
                                    <Button className="shadow" onClick={()=>removing(val, -1)} variant="light">-</Button>
                                </div>
                                <ListItemText style={{marginLeft:'20px',width:'100px'}} primary={`${val.price * val.nProduct}`} />
                            </ListItemButton>



                    )
                )}


                {(cartItems || []).length > 0 && (
                    <div>
                        <div style={{textAlign:'center', fontSize:'15px', fontWeight:'bold'}}>
                            <span>Subtotal of your Cart:</span>
                            <span style={{marginLeft:'5px'}}>Rs - {price} </span>
                        </div>
                        {/*<Button onClick={()=>updateCart( amount)} style={{display:'block', margin:'auto', backgroundColor:'Green', paddingInline:'25px', marginTop:'15px'}} variant="contained">Update Cart</Button>*/}
                        <Button onClick={()=>navigate('/orderinfo')} style={{display:'block', margin:'auto', backgroundColor:'black', paddingInline:'25px', marginTop:'15px', color:'white'}} variant="contained"><span><LockIcon/></span>Checkout</Button>
                    </div>

                )}
            </List>

        </>


    );
}