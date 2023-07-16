import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState('');
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
    return (
        <div>
            <form onSubmit={(event) => sendChat(event)}>
                <input type="text" name="message" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your message here" className="h-[8vh] w-[80%] p-4" />
                <button className="h-[8vh] w-[20%] p-4 bg-red-400">send</button>
            </form>
        </div>
    )
}

export default ChatInput;