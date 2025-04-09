import { useState, useRef, useEffect } from "react"
import ChatbotIcon from "./components/ChatbotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage"

const App = () => {

  const [chatHistory, setChatHistory ] = useState([]);
  const chatBodyRef = useRef();

  const generateBotResponse = async ( history ) => {

    const updateHistory = (text) => {
      setChatHistory( (prev) => [...prev.filter((msg) => msg.text !==  "Thinking..."), {role: "model", text}] )
    }

    history = history.map( ({role, text }) => ({role, parts: [{text}]}) );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contents: history })
    }

    try {
      /**
       * Api call to get the bot response
       */
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions );
      const data = await response.json();
      if( !response.ok ) throw new Error( data.error.message || "Something went wrong!" );
      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponse);
    } catch( error ) {
      console.log(error);
    }
  }

  useEffect(() => {
    chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory])

  return (
    <div className='container'>
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text"> ChatBot </h2>
          </div>
          <button className="material-symbols-rounded"> keyboard_arrow_down </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
              Hey there 👋 <br/> How can I help you today?
            </p>
          </div>

          {/** Render the chat history Dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
          
        </div>
        
        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App
