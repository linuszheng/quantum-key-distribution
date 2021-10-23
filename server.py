from flask import Flask
from qiskit import QuantumCircuit, assemble, Aer

app = Flask(__name__)

def getResults(qc):
	sim = Aer.get_backend('aer_simulator') 
	result = sim.run(qc).result()
	counts = result.get_counts()
	return counts

def measureStandard(qc, bit):
	qc.measure(bit,bit)		# outputs measurement of qbit0 to cbit0
	qc.measure(1,1)			# outputs measurement of qbit1 to cbit1

def measureHadamard(qc):
	qc.measure()

def createQubits(qc):
	qc.h(0)
	pass

def createCircuit():
	qc = QuantumCircuit(2,2)	# 2 quantum bits, 2 classical bits
	return qc

@app.route("/")
def hello_world():
	qc = createCircuit()
	qc.h(0)
	measureStandard(qc, 0)
	return getResults(qc)

