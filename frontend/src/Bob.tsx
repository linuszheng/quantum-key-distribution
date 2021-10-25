import React from "react";

const Bob = () => {

  // @ts-ignore
  const socket = window.socket;
  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("qubitsGenerated", (data: any) => {
      // create string of unknown (question mark) qubit values
      console.log(data.qubits);
    });
    socket.on("qubitsMeasured", (data: any) => {
      // reveal qubit values
      console.log(data.result);
      // send b2 over classical channel??
      console.log(data.b2);
    });
  };

  return (<div>Bob
    <button
    onClick={() => {
      socket.emit("measureBob", 5);
    }}>
      Measure Bob
  </button>
  <button
    onClick={() => {
      socket.emit("drop", 5);
    }}>
      Measure Bob
  </button>
  </div>);
};

export default Bob;
