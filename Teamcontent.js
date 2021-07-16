
import React, { useState,useEffect } from 'react'

import {useHistory } from 'react-router-dom';


import { Button, Card, Col, ListGroup, Modal, Row } from 'react-bootstrap';

import { BrowserRouter, Link, Route ,Switch} from 'react-router-dom';
import Files from './Files';
// import Navteam from './Navteam';
import Posts from './Posts';
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFilePost } from "react-icons/bs";
import { VscFiles } from "react-icons/vsc";
import { MdVideoCall } from "react-icons/md";
import { BiCalendarPlus } from "react-icons/bi";
import styles from "./teamcontent.module.css";
import Header from '../../Components/Navbar/Navbar';
import { HiOutlineChatAlt2 } from "react-icons/hi";
// import photo from "./depositphotos_124789918-stock-photo-teamwork-and-teambuilding-concept-in.jpg"
// import photo2 from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg"

const Teamcontent = (props) => {
    const history=useHistory();
    let local=JSON.parse(localStorage.getItem("user-info"))
    const urluser = local.user.url;
    console.log(props)
    const id=props.match.params.id; //team id
    const token = localStorage.getItem("token");
    // console.log(id)
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [members, setMembers] = useState([]);
    
  useEffect(() => {
    fetch(`https://boiling-shelf-43809.herokuapp.com/team/60ef50c9cb1b8600222633ca/viewMember`,{
        headers:{"authorization":`${token}`}
    }).then(resp=>resp.json())
    .then(result=>{
        setMembers(result.memberData)
        console.log("members",result.memberData)
    })
  },[])
  const handlechat=(userId)=>{
    console.log(userId)
    

    //     fetch(`https://boiling-shelf-43809.herokuapp.com/check-conversations/${userId}`,
    //    { headers:{"authorization":`${token}`}}
    //     ).then(resp=>{
    //         if(!resp.ok){
    //             throw Error("error")
    //         }
    //        return resp.json();
    //     })
    //     .then(result=>{console.log(result)})
    //     .catch(err=>{
    //         // history.push(`/Message/${userId}`)
    //         console.log(err.message)})
    
  }
    return (
       <>
       <Header/>
         <div >
                
            <Row>
                  {/* sidebar */}
            <Col className={styles.sidebarteam} md={3}>

                    {/* teams Card */}
                    <Card className={styles.cardposts}  style={{ width: '20rem' }}>
                    <Card.Header className={styles.sidetitle} >
                       <h4> Team 1</h4>
                        <div className={styles.iconsdiv}>
                        <BiCalendarPlus className={styles.iconcard} style={{marginRight:"15px",cursor:"pointer"}}/>
                        <Link to="/JitsiComponent"><MdVideoCall className={styles.iconcard}/></Link>
                        </div>
                    </Card.Header>
                    {/* <Card.Img className={styles.imgteam} style={{marginTop:"10px", borderRadius:"5%"}} variant="top" src={photo} /> */}
                    <Card.Body className="text-center">
                        
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary" onClick={handleShow}>View members</Button>

                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Team members</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                members.map(item=>{
                                    return(
                                        <div key={item.id} style={{display:"flex",justifyContent:"space-between"}}>
                                        <p>{item.name}</p>
                                        <Link to={`/Message?userId=${item.id}`}>
                                        <HiOutlineChatAlt2
                                        //  onClick={()=>{handlechat(item.id)}}
                                         
                                         />
                                         </Link>
                                         </div>
                                    )
                                })
                            }
                            
                        </Modal.Body>
                    </Modal>
                    </Card.Body>
                    </Card>

                    {/* teams Category */}
                    <Card className={styles.cardposts} style={{ width: '20rem' }}>
                    <Card.Header className={styles.sidetitle}>Category</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{padding:"0px"}}> 
                            <Link to={"/Teamcontent/"+id} className={styles.categorylist}> <BsFilePost/> Posts</Link>
                            </ListGroup.Item>
                        <ListGroup.Item style={{padding:"0px"}}>
                            <Link to={"/files/"+id} className={styles.categorylist}><VscFiles/> Files</Link>
                            </ListGroup.Item>
                        
                    </ListGroup>
                    </Card>
        
                </Col>

                <Col md={9}>
                    {/* posts content */}
                    <Posts id={id}/>
                </Col>    
               </Row>
               
        </div>

        </> 
    )
      
}

export default Teamcontent
