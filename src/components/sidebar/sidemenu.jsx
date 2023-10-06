
import { Drawer } from 'antd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import image1 from "../../assets/shopping-cart.png";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import routes from '../../common/SubRoutes.jsx'
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Alert from "@mui/material/Alert";
import Table from '@mui/material/Table';

const SideMenu = ({cartItems}) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    //console.log(cartItems);


    return (
        <>
            <IconButton value={'right'} onChange={()=>{setPlacement('right')}} onClick={showDrawer}  aria-label="cart" size="large" sx={{padding:'0px', color:'white'}}  >
                    <ShoppingCartIcon  />
            </IconButton>


            <Drawer
                placement={placement}
                onClose={onClose}
                open={open}
            >
                <h4>Your Cart Summary</h4>
                <img src={image1} style={{width:'400px', opacity:'0.05', position:'absolute'}} alt="cart" />
                {(cartItems || []).length === 0 && (
                    <Alert variant="filled" severity="success" style={{padding:'0px'}}>
                        No items are added!
                    </Alert>
                )}
            <Table>
                {(cartItems || []).length > 0 && (
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">price/item</TableCell>
                        </TableRow>
                    </TableHead>
                )}

                <TableBody>
                    {cartItems.map((val, index) => (
                        <TableRow
                            key={index}
                            sx={{ border: 0 }}
                        >
                            <TableCell align="left">{val.pro_name}</TableCell>
                            <TableCell align="center">{val.nProduct}</TableCell>
                            <TableCell align="right">{val.price}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>






                <div style={{position:'fixed', bottom:'20px', right:'75px'}}>
                    {routes.map((val, index) => (
                        <Button
                            style={{backgroundColor: val.backgroundColor}}
                            key={index}
                            onClick={()=>navigate(val.path)}
                            sx={{color:'white', display: 'block', margin:'10px', width:'200px' }}
                        >
                            {val.icon}
                            {val.name}
                        </Button>
                    ))}
                </div>



            </Drawer>
        </>
    );
};
export default SideMenu;