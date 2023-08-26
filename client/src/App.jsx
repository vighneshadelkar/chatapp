import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const username = nanoid(4);

  console.log(chat)

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, username });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <h1>chatty app</h1>
      <div className="chatContainer">
        <div className="chatWrapper">
          <div className="chats">
            {chat.map((payload) => {
              return (
                <p key={nanoid(10)}>
                  {payload.message}
                  <span> id:{username}</span>
                </p>
              );
            })}
          </div>
          <form onSubmit={sendChat}>
            <input
              type="text"
              name="chat"
              placeholder="send text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
