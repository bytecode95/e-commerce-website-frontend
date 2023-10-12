import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import instance from "../../service/AxiosOrder.js";

export default function OrderDetails() {
    const navigate = useNavigate();


    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [adressline1, setAdressLine1] = useState('');
    const [adressline2, setAdressLine2] = useState('');
    const [town, setTown] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [contactnumber, setContactNumber] = useState('');
    const [province, serProvince] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if(firstName === "" && lastName ==="" && unitNumber==="" && adressline1==="" && adressline2==="" && town==="" && zipcode==="" && contactnumber==="" && province===""){
            alert('all fields are mandatory');
        }else{
            instance.post('/orderinfo', {
                first_name: firstName,
                last_name: lastName,
                unit_number: unitNumber,
                addressline_1: adressline1,
                addressline_2: adressline2,
                phone_number: contactnumber,
                city:town,
                zip:zipcode,
                province:province,
            }, {
                headers:{token: localStorage.getItem("token") }
            } )
                .then(function (response) {
                    console.log(response);
                    navigate('/placeorder')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    return (
        <Container className="mt-3 mb-5">
            <Form onSubmit={handleSubmit}>
                <div className="fs-4 text-black text-center mb-3">Contact Information</div>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={(val)=>{setFirstname(val.target.value)}} type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(val)=>{setLastname(val.target.value)}} type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Unit Number</Form.Label>
                        <Form.Control onChange={(val)=>{setUnitNumber(val.target.value)}} type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Address line 1</Form.Label>
                        <Form.Control onChange={(val)=>{setAdressLine1(val.target.value)}}  type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Address line 2</Form.Label>
                        <Form.Control onChange={(val)=>{setAdressLine2(val.target.value)}} type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Town/City</Form.Label>
                        <Form.Control onChange={(val)=>{setTown(val.target.value)}} type="text" placeholder="Kotte.." />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control onChange={(val)=>{setZipCode(val.target.value)}}  type="text" placeholder="Zip Code" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Contact Number 1</Form.Label>
                        <Form.Control onChange={(val)=>{setContactNumber(val.target.value)}} type="tel" placeholder="Phone Number" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select onChange={(val)=>{serProvince(val.target.value)}} defaultValue="Choose...">
                            <option value={'none'}>Choose...</option>
                            <option value={'Central'}>Central</option>
                            <option value={'North Central'}>North Central</option>
                            <option value={'Northern'}>Northern</option>
                            <option value={'Eastern'}>Eastern</option>
                            <option value={'North Western'}>North Western</option>
                            <option value={'Southern'}>Southern</option>
                            <option value={'Uva'}>Uva</option>
                            <option value={'Sabaragamuwa'}>Sabaragamuwa</option>
                            <option value={'Western'}>Western</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button   className="d-block m-auto w-25" variant="primary" type={'submit'}>
                    Submit
                </Button>
                <h5 className="text-center mt-4 text-dark">If you have already have an account please go to <Link className="text-decoration-none" to={'/placeorder'}>this</Link> page</h5>
            </Form>
        </Container>

    );
}

