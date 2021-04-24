import React,{useRef,useState} from "react";
import {Link,useHistory} from "react-router-dom"
import {Form , Button,Alert} from 'react-bootstrap';
import {useAuth} from "../Contexts/AuthContext";
export default function UpdateProfile()
{

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef =useRef();
   const {currentUser,updatePassword,updateEmail} =useAuth()
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)
   const history = useHistory()
 async function handleSubmit(e)
 
   {
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value)
    {
        return setError("Password do not match")
    }
    const promises = []
    setLoading(true)
    if(emailRef.current.value !== currentUser.email)
    {
        promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value)
    {
        promises.push(updatePassword(passwordRef.current.value))
    }
    Promise.all(promises).then(()=>{
        history.push("/home")
    })
    .catch(()=>
    setError("Failed to update Account")
    )
    .finally(()=>
    setLoading(false))
   

   }
     return(
        <>
         <div className="container">
     <div className="d-flex justify-content-center h-100">
         <div className="card">
         <div className="card-header">
                 <h1>Update Profile</h1>
               </div>
               {error && <Alert variant="danger">{error}</Alert>}
           <div className="card-body" >
        <Form onSubmit={handleSubmit}>
            
            <Form.Group id = "email" >
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Email"  type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
            <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
              <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading}  className = "w-100 btn-warning" type="submit">
                Update changes
            </Button>
            <Link className="r-link justify-content-center link text-underlined loginlinks" to="/home">Cancel</Link>
        </Form>
    
  </div>

 </div></div>  </div>
  </>
				

    )}
