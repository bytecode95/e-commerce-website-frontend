import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import instance from "../../service/AxiosOrder.js";
import {useAuth} from "../../data/useAuth.jsx";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import Base_Url from '../../common/BaseURL.jsx'


export default function PalceOrder() {


    const {id} = useAuth();
    const navigate = useNavigate();
    const [warning, setWarning] = useState(false);
    const [cartdetails, setCartDetails] = useState([]);
    const [price, setPrice] = useState(0);
    const [totalitems, setTotalItems] = useState(0);
    const [details, setDetails] = useState([])
    //console.log(cartdetails.length)
    //set address
    const [unitnumber, setUnitNumber] = useState('');
    const [line1, setLine1] = useState('')
    const [line2, setLine2] = useState('')
    const [city, setCity] = useState('')

    const shippingAddress = `${unitnumber}, ${line1}, ${line2}, ${city}`;


    useEffect(() => {
        // Get cart items from local storage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartDetails(storedCartItems);
        }

    }, []);


    // Run this effect whenever cartDetails changes
    useEffect(() => {
        handlePrice();
        handleTotalItems();
    }, [cartdetails]);

    // Run this effect whenever id changes
    useEffect(() => {
        const getDataByUserID = async () => {
            const {data} = await instance.get(`/getInfor/${id}`, {
                headers: {token: localStorage.getItem("token")}
            })
            //console.log(data[0]);
            setDetails(data[0]);
            setUnitNumber(data[0].Unit_number);
            setLine1(data[0].addressline_1);
            setLine2(data[0].addressline_2);
            setCity(data[0].city)
        }

        getDataByUserID();
    }, [id]);


    const handlePrice = () => {
        let ans = 0;
        cartdetails.map((item) => (
            ans += item.nProduct * item.price
        ))
        setPrice(ans)

    }
    const handleTotalItems = () => {
        let total = 0;
        for (let i = 0; i < (cartdetails.length); i++) {
            total += cartdetails[i].nProduct
        }
        setTotalItems(total);
    }

    const taxPrice = price * 0.15;
    const shippingPrice = price > 2000 ? 0 : 20;
    const totalPrice = price + taxPrice + shippingPrice;


    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        try {
            // Make an HTTP POST request to backend API
            const response = await instance.post(
                '/placeorder',
                {
                    total_amount: totalPrice,
                    shipping_address: shippingAddress,
                    orderItems: cartdetails,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            //console.log(response);
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 2000);



        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error);
        }
    }





    return (
        <>
            <h3 className="text-center fs-2 mt-3 fw-bold">Your Order</h3>

            <Container className="d-flex mt-5 mb-5">
                <Card className="m-auto " style={{width: '30rem'}}>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}>Order Items</Card.Title>
                    </Card.Body>
                    {cartdetails.map((val, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            width: '18rem',
                            flexDirection: 'row',
                            margin: 'auto',
                            padding: '20px',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Avatar alt="img" src={`${Base_Url}${val.pro_image}`}/>
                            <Typography>{`${val.pro_name}`}</Typography>
                            <Typography>{`${val.nProduct}`}</Typography>
                        </div>
                    ))}
                    <Card.Body style={{textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold'}}>
                        <Card.Text>
                            Total Items: {totalitems}
                        </Card.Text>
                        <Card.Text>
                            Total tax: {taxPrice}
                        </Card.Text>
                        <Card.Text>
                            Shipping Cost: {shippingPrice}
                        </Card.Text>

                        <Card.Text>
                            Grand Total: {totalPrice}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'center'}}>Delivery and Payment Summary</Card.Title>
                    </Card.Body>
                    <Card.Body className="list-group-flush">
                        <Card.Text>
                            Payment Method: <span>Cash On delivery</span>
                        </Card.Text>
                        <Card.Text>
                            Order By: <span>{details.first_name}</span><span className="ms-2">{details.last_name}</span>
                        </Card.Text>
                        <Card.Text>
                            Delivery Address:<br/>

                            <span style={{marginLeft: '120px'}}>{details.Unit_number}</span><br/>
                            <span style={{marginLeft: '120px'}}>{details.addressline_1}</span><br/>
                            <span style={{marginLeft: '120px'}}>{details.addressline_2}</span><br/>
                            <span style={{marginLeft: '120px'}}>{details.city}</span><br/>

                        </Card.Text>
                        <Card.Text>
                            Contact Number: <span>{details.phone_number}</span>
                        </Card.Text>

                    </Card.Body>
                </Card>


            </Container>
            <Card className="w-25 m-auto mb-3">
                <Card.Text style={{fontSize: '12px'}}>
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and for other purposes described in our privacy policy.
                </Card.Text>
            </Card>

            {(totalPrice)> 20 ? (
                <Button onClick={handlePlaceOrder} className="d-block m-auto mb-5 w-25 border-0" style={{backgroundColor:'#000000'}} type="submit">
                    Confirm Order
                </Button>

            ): ( <Alert style={{color: 'black', backgroundColor: '#e22137', width:'500px', display:'flex', margin:'auto', marginBottom:'20px' }}
                        variant="filled"> You can not place an order, your cart is empty! </Alert>)}

            {
                warning &&
                <Alert style={{color: 'black', backgroundColor: '#76d300', width:'500px', display:'flex', margin:'auto', marginBottom:'20px'}}
                       variant="filled"> Order was Confirmed Successfully! </Alert>
            }
            <Button onClick={()=>{navigate('/home')}} className="d-block m-auto mb-5 w-25 border-0" style={{backgroundColor:'#f1c309'}} type="submit">
                Return Home
            </Button>


        </>

    );
}

