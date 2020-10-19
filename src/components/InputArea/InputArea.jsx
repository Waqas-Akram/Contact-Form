import React ,{useState , useEffect} from 'react';
import styles from "./InputArea.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col , Container, Form , Button, Jumbotron} from 'react-bootstrap';
import firebase from 'firebase';

const InputArea = (props) => {
    const initialFieldValues={
        fullName:'',
        mobile:'',
        email:'',
        address:''
    };
    const [values, setValues]=useState(initialFieldValues);
    useEffect(()=>{
      if(props.currentId==""){
        setValues({
          ...initialFieldValues
        })
      }
      else{
          setValues({
            ...props.contactObjects[props.currentId]
          })
        }
      
    },[props.currentId , props.contactObjects])
    const handleInputChange = (event)=>{
        let {name , value}=event.target;
        setValues({
            ...values,
            [name]:value
        })
    };
    const handleFormSubmit = (event)=>{
        event.preventDefault();
        props.addOrEdit(values);
    }
    return (
        <div >
       <Container>
          
  <Row className="justify-content-md-center">
    <Col xs="12" md="12" lg="12">
    <Jumbotron style={{marginTop:"20px"}}>
           <h1 style={{textAlign: 'center'}}>Contact Info</h1>
           </Jumbotron>
    </Col>
    <Col xs="12" md="12" lg="6">
    <Form  autoComplete="off">
    <h1 className="display-4 text-primary">Contact Register</h1><br/>
  <Form.Group controlId="formBasicText">
    <Form.Label >Full Name</Form.Label>
    <Form.Control  type="text" placeholder="Enter Your Full Name" name="fullName" onChange={handleInputChange} value={values.fullName}/>
  </Form.Group>
  <Form.Group controlId="formBasicText">
    <Form.Label >Email</Form.Label>
    <Form.Control  type="eamil" placeholder="Enter Your Email" name="email" onChange={handleInputChange} value={values.email}/>
  </Form.Group>

  <Form.Group controlId="formBasicText">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control type="text" placeholder="Enter Your Phone Number" name="mobile"onChange={handleInputChange} value={values.mobile} />
  </Form.Group>
  <Form.Group controlId="formBasicText">
    <Form.Label>Address</Form.Label>
    <Form.Control as ="textarea" placeholder="Enter your Address" rows="3" name="address" onChange={handleInputChange} value={values.address}/>
  </Form.Group>
  <Form.Group controlId="formBasicText">
    <Form.Control className="btn-primary" type="Submit"  value={props.currentId==""?"Save":"Update"} onClick={handleFormSubmit} />
  </Form.Group>
  {/* <Button variant="primary" type="submit"  value= {props.currentId==""?"Save":"Update"}onClick={handleFormSubmit}> */}
  {/* </Button> */}
</Form>
    </Col>
  </Row>
</Container>
      </div>
    )
}

export default InputArea;
