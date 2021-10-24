from flask import Flask
# Needed for localhost testing.
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit

app = Flask(__name__)

# Socket io setup.
app.config['SECRET_KEY'] = 'secret!'
# |cors_allowed_origins| is required for localhost testing.
socket = SocketIO(app, cors_allowed_origins="*")

# For localhost testing.
CORS(app)


@socket.on('connect')
def test_connect():
    emit('custom-server-msg',
         {'data': 'Print this out via in your client'})


@socket.on('message')
def test_message(data):
    print("received", data)
    emit('custom-server-msg',
         {'data': data})


if __name__ == '__main__':
    print("Starting websocket server")
