import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
// import img from '../img/bird.png.png';
// import img from '../img/birds.png';
import dog from '../img/video.png';
import {UilUser ,UilDialpadAlt} from '@iconscout/react-unicons';

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="Lobby" >
      <div className="left" >
        <img src={dog} alt="" className="img"/>
      </div>
      {/* <img src={img} alt="" /> */}
      <div className="right">
      <h1 className="h2">Welcome !</h1>
      <h1 className="h1">Sign In</h1>
      <form onSubmit={handleSubmitForm}>
        {/* <label htmlFor="email" className="label">Email ID</label> */}
        <div className="input-container">
        <span class="icon"><UilUser className="icons"/></span>
        <input

className="transparent-input"
          type="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <br />
        <div className="input-container">

       
        <span class="icon"> < UilDialpadAlt  className="icons"/></span>
       
        {/* <label className="label" htmlFor="room">Room Number</label> */}
        <input
          type="text"
          id="room"
          className="transparent-input"
          placeholder="Enter Room No."
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        /> </div>
        <br />
        <button className="button">Join</button>
      </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
