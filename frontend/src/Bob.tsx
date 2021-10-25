import React from "react";

const Bob = () => {
  // @ts-ignore
  const socket = window.socket;
  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("qubitsGenerated", (data: any) => {
      console.log(data)
    });
  };


  return <div>Bob</div>;
};

export default Bob;
