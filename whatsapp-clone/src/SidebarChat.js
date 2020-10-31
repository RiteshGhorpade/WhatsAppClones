import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";

function SidebarChat(props) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (props.id) {
      db.collection("rooms")
        .doc(props.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [props.id]);
  const createChat = () => {
    const roomName = prompt("Please Enter The name for Chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !props.addnewChat ? (
    <Link to={`/rooms/${props.id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h4>{props.name}</h4>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarchat">
      <h3>Add New Room</h3>
      {/* <AddCircleIcon/> */}
    </div>
  );
}

export default SidebarChat;
