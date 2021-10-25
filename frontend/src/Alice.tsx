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

    socket.on("custom-server-msg", (data: any) => {
      console.log("Data received: " + data.data);
    });
  };
  return (
    <div>
      Alice
      <button
        onClick={() => {
          // @ts-ignore
          window.socket.emit("message", "hey");
        }}
      ></button>
    </div>
  );
};

export default Alice;
