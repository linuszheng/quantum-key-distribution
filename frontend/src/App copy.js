import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(io("http://localhost:5000"));
  useEffect(() => {
    setSocketListeners();
  }, []);

  const setSocketListeners = () => {
    socket.on("connect", () => {
      console.log("Websocket connected: " + socket.connected);
    });

    socket.on("custom-server-msg", (data) => {
      console.log("Data received: " + data.data);
    });
  };

  return (
    <div className="App">
      <h1>Websocket Testing..check console</h1>
      <button
        onClick={() => {
          socket.emit("message", "hey");
          console.log("hey");
        }}
      >
        Hey
      </button>
    </div>
  );
};

export default App;
