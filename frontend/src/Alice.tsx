import React, { useEffect } from "react";

const Alice = () => {
  // @ts-ignore
  const socket = window.socket;
  useEffect(() => {
    setSocketListeners();
  }, []);

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("qubitsGenerated", (data: any) => {
      console.log("a: " + data.a);
      console.log("b: " + data.b);
      console.log("qubits: " + data.qubits);
    });

    socket.on("qubitMeasured", (data: any) => {
      console.log("eve measured: " + data);
    });

    socket.on("qubitsMeasured", (data: any) => {
      console.log("bob's bases: "+data.b2);
      console.log("bob measured: " + data.result);
    });

  };
  return (
    <div>
      Alice
      <button
        onClick={() => {
          socket.emit("generateAlice", 5);
          socket.emit("measureEve", 2, 0);
          socket.emit("measureBob", 5);
        }}
      >Generate Alice Qubits</button>
    </div>
  );
};

export default Alice;
