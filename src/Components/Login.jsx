import React,{useRef,useState} from "react";
import {Link,useHistory} from "react-router-dom"
import {Form , Button,Alert} from 'react-bootstrap';
import {useAuth} from "../Contexts/AuthContext";
import axios from 'axios';
export default function Login()
{
   
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
   const {login} =useAuth()
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)
   const history = useHistory()
   async function handleSubmit(e)
   {
    e.preventDefault()
   const usernamename =  usernameRef.current.value;
   const passwordname = passwordRef.current.value;
    try
    {
        const authObject = { 'Project-ID': '02554e37-a77b-4d1d-a6ae-18f8a4accf8d', 'User-Name':usernamename, 'User-Secret':passwordname  };
        setError("")
        setLoading(true)
        await login(emailRef.current.value,passwordRef.current.value)
        await axios.get('https://api.chatengine.io/chats', { headers: authObject });
        localStorage.setItem('username', usernameRef.current.value);
                localStorage.setItem('password', passwordRef.current.value);
          
        history.push("/home")
        window.location.reload();
    }
    catch{
        setError("Failed to Log in")
    }
    setLoading(false)

   }
     return(
        <>
         <div>
     <div className="d-flex justify-content-center h-100">
         <div className="card">
         <div className="card-header">
                 <h1>Log in</h1>
               </div>
               {error && <Alert variant="danger">{error}</Alert>}
           <div className="card-body" >
        <Form onSubmit={handleSubmit}>
        <Form.Group id="username">
                
                <Form.Control type="text" placeholder="Username" className='form-control'ref={usernameRef} required />
            </Form.Group>
            <Form.Group id = "email" >
                <Form.Control placeholder="Email"  type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control placeholder="Password" type="password" ref={passwordRef} required />
            </Form.Group>
          
           
            <Button disabled={loading}  className = "w-100 btn-warning" type="submit">
                Log in
            </Button>

        </Form>
    <div className="w-100 text-center mt-2"><Link to="/forgot-password" className="r-link link text-underlined loginlinks">Forgot Password?</Link></div>
  </div></div>
  <div className="card-footer">
                 
  </div></div>
  <div className="d-flex justify-content-center links">
      
                <p>Need an account? <b><a className="r-link link text-underlined loginlinks" href="/signup">Sign up</a></b></p>
               </div>
            </div>
  </>
				

    )}
