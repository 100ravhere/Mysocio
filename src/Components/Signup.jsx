import React,{useRef,useState} from "react";
import {useHistory} from "react-router-dom"
import {Form , Button,Alert} from 'react-bootstrap';
import {useAuth} from "../Contexts/AuthContext";
import axios from 'axios';
export default function Signup()
{
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef =useRef();
   const {signup} =useAuth()
   const [error,setError] = useState("")
   const [loading,setLoading] = useState(false)
   const history = useHistory()
   async function handleSubmit(e)
   {
       const usernameRefname = usernameRef.current.value;
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmRef.current.value)
    {
        return setError("Password do not match")
    }

    try
    {
        const passwordRefnamename = passwordRef.current.value;
        console.log(usernameRefname,passwordRefnamename)
        setError("")
        setLoading(true)
        await signup(emailRef.current.value,passwordRef.current.value)
         await axios
                .post('https://api.chatengine.io/projects/people/',
                  { username: usernameRefname, secret: passwordRefnamename },
                  { headers: { 'Private-Key': '3da1733c-e8b8-44f3-9280-8961f7ab20ff' } },
                )
         
            // const authObject={'Project-ID':"2eeafa49-6a6e-4adc-aee2-102ba90dfdb4",'User-Name':usernameRefname,'User-Secret':passwordRef.current.value}
            //     await axios.get('https://api.chatengine.io/chats', { headers: authObject });
          
                localStorage.setItem('username', usernameRefname);
                localStorage.setItem('password', passwordRefnamename);
          
               
                
          
        history.push("/")
    }
    catch{
        setError("Failed to create an account")
    }
    setLoading(false)

   }
     return(
        <>
         <div className="container">
     <div className="d-flex justify-content-center h-100">
         <div className="card">
         <div className="card-header">
                 <h1>Sign up</h1>
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
            <Form.Group id="password-confirm">
              <Form.Control placeholder="Confirm Password" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading}  className = "w-100 btn-warning" type="submit">
                Sign up
            </Button>

        </Form>
    
  </div></div>
  <div className="card-footer">
                 
  </div></div>
  <div className="d-flex justify-content-center links">
      
                <p>Already have a account? <button className="btn"><a  className="r-link link text-underlined" href="/"><b>Login Now</b></a></button></p>
               </div>
            </div>
  </>
				

    )}
