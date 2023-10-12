import './style.css'
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import HomeIcon from '@mui/icons-material/Home';
import Container from "react-bootstrap/Container";
import instance from "../../service/AxiosOrder.js";
import {Form} from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import Base_Url from '../../common/BaseURL.jsx'

export default function ProductDetails({updateCart}) {

    const {id} = useParams();
    const [item, setItem] = useState([])
    const [amount, setAmount] = useState(1);
    const navigate = useNavigate();


    useEffect(() => {
        const getDataById = async () => {
            const {data} = await instance.get(`/${id}`)
            //console.log(data);
            setItem(data[0])
        }

        getDataById();
        getReviewById();


    }, [id]);

    //review handling
    const [value, setValue] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [description, setDescription] = useState();

    const handleReview = async(e)=>{
        e.preventDefault();
        try{
            const response = await instance.post(
                '/review',
                {
                    product_id: id,
                    rating: value,
                    email: email,
                    name: name,
                    description: description,
                },
            );
            console.log(response);
        }catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error);
        }
    }

    //get one product review
    const [reviews , setReviews] = useState([]);

    const reviewRatings = reviews.map((val)=>{
        return val.rating
    })
    //console.log(reviewRatings)

    let rating = 0;
    for(let i=0; i<reviewRatings.length; i++){
        rating += reviewRatings[i];
    }
    const finalRating = rating/reviewRatings.length ;
    //console.log(finalRating)



    const getReviewById = () => {
        instance.get(`/getreview/${id}`)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                setReviews(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    return (
        <>
            <Button className="d-block mx-auto mt-4 mb-4 " style={{backgroundColor:'black', border:'none'}} onClick={()=>{navigate('/home')}} >Continue Shopping <span><HomeIcon/></span></Button>

            <Container>
                <Card className="d-flex flex-row flex-sm-wrap m-auto border-1 p-3 w-50 mt-3 mb-5 border-1 align-items-center ">
                    <Card.Img style={{maxWidth: '300px', maxHeight:'300px'}} src={`${Base_Url}${item.pro_image}`} alt={'productimage'}/>
                    <Card.Body>
                        <Card.Title className="fs-3">{item.pro_name}</Card.Title>
                        <Rating name="read-only" value={finalRating} readOnly />
                        <Card.Text className="mt-2 fw-bold">
                            LKR: {item.price}
                        </Card.Text>
                        <Card.Text className="mt-2">
                            {item.description}
                        </Card.Text>
                        <div>
                            <input type="number" id="typeNumber" onChange={(val) => {
                                setAmount(val.target.value)
                            }} defaultValue={1} min={1} max={item.quantity} className="form-control w-auto mb-3 "/>
                        </div>
                        <Button
                            style={{backgroundColor:'#76d300', border:'none', color:'black', fontWeight:'bold', padding:'10px', paddingInline:'25px'}}
                            className="d-flex justify-content-center"
                            onClick={() => {
                                updateCart(item, amount)
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Card.Body>
                </Card>

                <Form onSubmit={handleReview} className={"w-50 m-auto"}>
                    <Form.Group className="mt-2 p-2" >
                        <Form.Label>Your Rating</Form.Label><br/>
                        <Rating name="half-rating" defaultValue={0} precision={0.5}
                                onChange={(e) => {setValue(e.target.value);}}
                        />
                        <br/>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control onChange={(e)=>setName(e.target.value)}  id="add-name" type="text" />
                        <Form.Label>Your Email Address</Form.Label>
                        <Alert style ={{padding:'0px'}} severity="info">Your email address will not be published.</Alert>
                        <Form.Control onChange={(e)=>{setEmail(e.target.value)}}  id="add-email" type="text"  />
                    </Form.Group>
                    <Form.Group className="mb-3 p-2" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(e)=>{setDescription(e.target.value)}}  as="textarea" rows={3} />
                    </Form.Group>

                    <Button className="w-25 d-block m-auto mb-2" type="submit"  variant="primary">Submit</Button>
                </Form>
            </Container>



        </>

    )
}