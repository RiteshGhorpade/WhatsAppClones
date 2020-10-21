import React, { useEffect, useState, useRef } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import db from "./firebase";
// import firebase from "firebase";
import "./Chat.css";

function Chat() {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const [Input, setInput] = useState("");
  const sendMessgae = (e) => {
    e.preventDefault();
    console.log(Input);
    setInput("");
  };
  return (
    <div className="Chat">
      <div className="Chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_info">
          <h3>Room Name</h3>
          <p>Last Seen ...</p>
        </div>
        <div className="class_header_roght">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        <p className={`chatMessage ${true && "chat-receiver"}`}>
          <span className="chat__name">Ritesh Ghorpade</span>
          Hey
          <span className="chat_timestamp">3:52pm</span>
        </p>
        <p className="chatMessage">Hey</p>
      </div>
      <div className="chatfooter">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a Message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessgae} type="submit">
            Send a message{" "}
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
