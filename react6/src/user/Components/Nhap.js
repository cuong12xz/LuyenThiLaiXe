import React, { useEffect, useRef, useState } from "react"
import { Nav, NavDropdown, Navbar, Container, Form, FormControl, Button } from "react-bootstrap"
export default function Nhap() {
    const [show, setShow] = useState(false)
    // const [countdown,setCountdown]=useState(60)
    // useEffect(()=>{
    //   const timeId =setInterval(()=>{
    //     setCountdown(prevState=>prevState-1)

    //   },1000)
    //   return ()=>{
    //     clearInterval(timeId)
    //   }
    // },[])
    // if(count ===58){
      //   clearInterval(timeId.current)
        
      // }


      const clock =useRef()
    const [count,setCount]=useState({min:20, sec: 0})
    const timeId =useRef()
      const handleStart=()=>{
        timeId.current=setInterval(()=>{
          
          setCount(prevCount=>{
            if(prevCount.sec === 0) {
              return {min: prevCount.min -1, sec:59}
            }
            return {...prevCount, sec: prevCount.sec-1}
          })
        },1000)
      }
      console.log(count);
        const handleStop=()=>{
          clearInterval(timeId.current)
         
        }
    return (
        <div>
            <button onClick={() => setShow(!show)}>sdf</button>
            
            {
            show && ( <div>{count}</div>)
            }
            <br/>
            <button onClick={handleStart}>bat dau</button>
            <button onClick={handleStop}>dung lai</button>
            {count.min}:{count.sec <10 ? `0${count.sec}` : count.sec}
           
        </div>

        //     <Navbar bg="light" expand="lg">
        //   <Container fluid>
        //     <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        //     <Navbar.Toggle aria-controls="navbarScroll" />
        //     <Navbar.Collapse id="navbarScroll">
        //       <Nav
        //         className="me-auto my-2 my-lg-0"
        //         style={{ maxHeight: '100px' }}
        //         navbarScroll
        //       >
        //         <Nav.Link href="#action1">Home</Nav.Link>
        //         <Nav.Link href="#action2">Link</Nav.Link>
        //         <NavDropdown title="Link" id="navbarScrollingDropdown">
        //           <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        //           <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        //           <NavDropdown.Divider />
        //           <NavDropdown.Item href="#action5">
        //             Something else here
        //           </NavDropdown.Item>
        //         </NavDropdown>
        //         <Nav.Link href="#" disabled>
        //           Link
        //         </Nav.Link>
        //       </Nav>
        //       <Form className="d-flex">
        //         <FormControl
        //           type="search"
        //           placeholder="Search"
        //           className="me-2"
        //           aria-label="Search"
        //         />
        //         <Button variant="outline-success">Search</Button>
        //       </Form>
        //     </Navbar.Collapse>
        //   </Container>
        // </Navbar>
    )
}
