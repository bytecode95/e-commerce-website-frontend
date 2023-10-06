import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import {useState} from "react";
import Alert from "@mui/material/Alert";


export default function RateProduct(props) {
    const [value, setValue] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [description, setDescription] = useState();

    const handlesubmit = (e) =>{
        e.preventDefault();
        props.getReviewData({value, name, email, description})
        setValue('');
        setName('');
        setEmail('');
        setValue('');
    }

    return (
        <>

            <Form onSubmit={handlesubmit} className={"w-50 m-auto"}>
                <Form.Group className="mt-2 p-2" >
                    <Form.Label>Your Rating</Form.Label><br/>
                    <Rating name="half-rating" defaultValue={0} precision={0.5}
                            onChange={(e) => {setValue(e.target.value);}}
                    />
                    <br/>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control onChange={(e)=>{setName(e.target.value)}}  id="add-name" type="text" />
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

        </>


    );
}