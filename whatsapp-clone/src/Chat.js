import React, { useEffect, useState, useRef } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import db from "./firebase";
import firebase from "firebase";
import "./Chat.css";
import { useStatevalue } from "./StateProvide";

function Chat() {
  const [Input, setInput] = useState("");
  const { roomID } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStatevalue();
  useEffect(() => {
    if (roomID) {
      db.collection("rooms")
        .doc(roomID)
        .onSnapshot((snapshoot) => setroomName(snapshoot.data().name));
      db.collection("rooms")
        .doc(roomID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomID]);
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessgae = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomID).collection("messages").add({
      message: Input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="Chat">
      <div className="Chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_info">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
        {messages.map((message) => (
          <p
            className={`chatMessage ${
              message.name === user.displayName && "chat-receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
