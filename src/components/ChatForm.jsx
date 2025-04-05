import React, { useRef } from 'react'


const ChatForm = ({setChatHistory}) => {
  const inputRef = useRef()
  const handleFormSubmit = (e)=> {
  
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if( !userMessage ) return;
    inputRef.current.value = "";
    
    //Update The chat history with the user Message
    setChatHistory( history => [...history, { role: "user", text: userMessage} ] )
  }

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
        <button className="material-symbols-rounded"> keyboard_arrow_up </button>
    </form>
)
}

export default ChatForm
