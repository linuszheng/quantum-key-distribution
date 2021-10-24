import React from "react";
import io from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io("http://localhost:5000"),
    };
    this.setSocketListeners = this.setSocketListeners.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.setSocketListeners();
  }

  setSocketListeners() {
    this.state.socket.on("connect", () => {
      console.log("Websocket connected: " + this.state.socket.connected);
    });

    this.state.socket.on("custom-server-msg", (data) => {
      console.log("Data received: " + data.data);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Websocket Testing..check console</h1>
        <button
          onClick={() => {
            this.state.socket.emit("message", "hey");
            console.log("hey");
          }}
        >
          Hey
        </button>
      </div>
    );
  }
}

export default App;
