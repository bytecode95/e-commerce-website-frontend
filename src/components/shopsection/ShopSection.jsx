import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState} from "react";
import Container from "@mui/material/Container";
import instance from '../../service/AxiosOrder.js'
import {Button} from "@mui/material";
import Rating from "@mui/material/Rating";



export default function ShopSection({addtoCart}) {

    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    //console.log(product)

    useEffect(()=>{
        getproductData()
    }, [])

    const getproductData = ()=>{
        instance.get('/getdetails')
            .then(function (response) {
                // handle success
                setProduct(response.data);
                //console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }



    return (
        <>
            <h2 style={{textAlign: 'center', marginBottom: 2, marginTop: '15px'}}>Product Details</h2>
            <Container  className="d-flex align-items-center justify-content-around flex-wrap">

                {product.map((val, index) => (
                        <Card  style={{cursor:'pointer'}} key={index} sx={{ width: 300, margin: 2 }}>
                            <div onClick={()=>{navigate(`/productdetails/${val.id}`)}}>
                                <img src={`http://192.168.8.187:4000/uploads/${val.pro_image}`} style={{borderRadius:'5px 5px', boxShadow:'5px', display:'flex', margin:'auto', padding:'5px'}} className={'product'} alt="img" />
                                <Typography style={{marginTop:'2px', fontSize:'18px', fontWeight:'bold', paddingLeft:'10px'}} >
                                    {val.pro_name}
                                </Typography>

                                <Typography  style={{marginTop:'2px', fontSize:'15px', fontWeight:'bold', paddingLeft:'10px'}} >
                                   LKR: {val.price}
                                </Typography>
                            </div>
                            <CardContent>
                                  <Button onClick={() => {
                                      addtoCart(val)
                                  }} className="d-flex m-auto" style={{backgroundColor:'#76d300', color:'black', fontWeight:'bold'}}   variant="contained">Add to Cart</Button>
                            </CardContent>
                        </Card>

                    ))
                }

            </Container>

        </>
    )
}