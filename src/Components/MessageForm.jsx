import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import React,{useState} from "react" 
import {sendMessage } from "react-chat-engine"
const MessageForm = (props)=> {
    const [value,SetValue] = useState('')
    const {creds,chatId} = props;
    const handleChange =(event)=>
    {
        SetValue(event.target.value)
        
    }
    const handleSubmit=(event)=>
    {
        event.preventDefault();
        const text = value.trim();
        if(text.length>0)
        {
        sendMessage(creds,chatId,{text});
        SetValue('')
        }
    }
    const handleUpload=(event)=>
    {
        sendMessage(creds,chatId,{files:event.target.files,text:''})
    }
    
    return(
        <div>
            <form className="message-form" onSubmit={handleSubmit} >
                <input className="message-input" placeholder="Send a message" value={value}  type="text" name="" onChange={handleChange}
                onSubmit={handleSubmit}/>
                <label htmlFor="upload-button"><span className="image-button" ><PictureOutlined className="picture-icon" /></span></label>
                <input type="file"  multiple={false} id="upload-button" onChange={handleUpload} style={{display:'none'}}/>
                <button type="submit" className="send-button" ><SendOutlined className="send-icon" /></button>
            </form>
        </div>
    )
}
export default MessageForm;