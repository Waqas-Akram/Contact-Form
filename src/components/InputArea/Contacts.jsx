import React,{useState,useEffect} from 'react';
import InputArea from './InputArea'
import {Col , Row , Container,Table, Jumbotron} from 'react-bootstrap';
import  fireDb from '../Firebase';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


const Contacts = () => {
    const [contactObjects ,setContactObjects]=useState({});
    const [currentId , setCurrentId] = useState('');
    
    useEffect(()=>{
        fireDb.child('contacts').on('value',snapshot=>{
            if(snapshot.val()!=null){
                setContactObjects({
                    ...snapshot.val()
                })
            }
            else{
                setContactObjects({
                    ...snapshot.val()
                })

            }
        })
    },[])
    const addOrEdit = obj =>{
        if(currentId==""){
        fireDb.child("contacts").push(
            obj,
            err=>{
                if(err){
                    console.log(err)
                }
            }
        )
    }
    else{
        fireDb.child(`contacts/${currentId}`).set(
            obj,
            err=>{
                if(err){
                    console.log(err)
                }
                else{
                    setCurrentId('');
                    alert("Updated Successfully")
                }
            }
        )

    }

    }
    const onDelete =key=>{
        if(window.confirm("Are you sure to delete this from database??")){
            fireDb.child(`contacts/${key}`).remove(
                err=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        setCurrentId('');

                    }
                }
            )
        }
    }
    return (
        <div>
            <Container>
            <InputArea {...({addOrEdit, currentId, contactObjects})}/>
            <Row className="justify-content-md-center">
            </Row>
            </Container>
            <br/>
            <Col xs="12" md="12" lg="12">
            <Jumbotron fluid className="justify-content-md-center">
                
                
                <h1 class="display-4" style={{textAlign:"center"}}>Contact List</h1>
                <Container>
                <Table className="justify-content-md-center table table-striped table-responsive table-borderless" style={{textAlign:"center"}}>
                   <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObjects).map(id=>{
                                return <tr key={id}>
                                    <td>{contactObjects[id].fullName}</td>
                                    <td>{contactObjects[id].mobile}</td>
                                    <td>{contactObjects[id].email}</td>
                                    <td>{contactObjects[id].address}</td>
                                    <td>
                                        <button style={{ backgroundColor:"transparent",border:"none"}} onClick={()=>{setCurrentId(id)}}><EditIcon style={{color:"blue" , backgroundColor:"none",border:"none"}}/></button>
                                        <button style={{ backgroundColor:"transparent",border:"none"}} onClick={()=>{onDelete(id)}}><DeleteOutlineIcon style={{color:"red"}}/></button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>

                </Table>
                </Container>

                
                
                </Jumbotron>
                </Col>
            
        </div>
    )
}

export default Contacts;
