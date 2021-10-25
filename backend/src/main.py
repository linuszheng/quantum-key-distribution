from flask import Flask
# Needed for localhost testing.
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
from quantum import *

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

@socket.on('generateAlice')
def createAliceQubits(n):
	emit('qubitsGenerated',generateAlice(n), broadcast=True)

@socket.on('measureEve')
def measureQubitEve(index, basis):
	emit("qubitMeasured", {
        "index": index,
        "value": measureQubit(index, basis),
    }, broadcast=True)

@socket.on('measureBob')
def measureAllBob(n):
	emit("qubitsMeasured", measureBob(n), broadcast=True)

@socket.on('dropIndices')
def dropIndices(indices, s):
	emit("newValues", drop(indices, a), broadcast=True)

@socket.on('bobBasesReport')
def bobBasesBroadcast(bobBases):
    emit("bobBases", bobBases, broadcast=True)

@socket.on('aliceBasesReport')
def bobBasesBroadcast(aliceBases):
    emit("aliceBases", aliceBases, broadcast=True)

if __name__ == '__main__':
    print("Starting websocket server")
