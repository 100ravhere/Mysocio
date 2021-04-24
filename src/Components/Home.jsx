import React,{useState}from 'react'
import {Card,Alert,Button} from "react-bootstrap";
import {useAuth} from "../Contexts/AuthContext"
import {Link,useHistory} from "react-router-dom"
import {ChatEngine} from "react-chat-engine";
import ChatFeed from "./ChatFeed"
// import io from 'socket.io-client'
// const ENDPOINT= 'localhost:5000'
// var connectionOptions =  {
//     "force new connection" : true,
//     "reconnectionAttempts": "Infinity", 
//     "timeout" : 10000,                  
//     "transports" : ["websocket"]
// };


// let socket;
export default function Home() {
    const [error,setError] = useState("");
    const {currentUser,logout} = useAuth()
    const history = useHistory()

    async function handleLogout()
    {
        setError("")
        try{
            await logout()
            localStorage.setItem('username','logout')
            localStorage.setItem('password','logout')
            history.push("/")
            window.location.reload();
        }
        catch{
            setError("Failed to log out")
        }
    }

    return (
        <>
         <Card id="homeCard">
                <Card.Body>
                    <h2 className="text-center mb-4" style={{fontSize:"1.5em"}}>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong className="buttonHome">Email:</strong> {currentUser.email} 
                    <Link to="/update-profile" className="btn btn-warning w-100 mt-3 buttonHome" > UpdateProfile</Link>
                </Card.Body><div className="w-100 text-center mt-2">
                    <Button variant="warning" id="buttonHome" onClick={handleLogout}>Log Out</Button>
                </div> </Card>
                <ChatEngine
			height='100vh'
			userName={localStorage.getItem('username')}
			userSecret={localStorage.getItem('password')}
			projectID='02554e37-a77b-4d1d-a6ae-18f8a4accf8d'
      renderChatFeed={(chatAppProps)=><ChatFeed{...chatAppProps}/>}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
      /> 
           
                
        </>
        )
}


