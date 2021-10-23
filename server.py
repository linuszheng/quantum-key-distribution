from flask import Flask
from qiskit import QuantumCircuit, assemble, Aer

app = Flask(__name__)

qc=0

def getResults(qc):
	sim = Aer.get_backend('aer_simulator') 
	result = sim.run(qc).result()
	counts = result.get_counts()
	return counts

def measureStandard(qc, bit):
	qc.measure(bit,bit)		# outputs measurement of qbit0 to cbit0

def measureHadamard(qc, bit):
	qc.h(0)
	qc.measure(bit,bit)

def createCircuit(size):
	qc = QuantumCircuit(size,size)	# 2 quantum bits, 2 classical bits
	return qc

@app.route("/<size>")
def initializeCircuit(size):
	qc = createCircuit(int(size))
	qc.h(0)
	qc.h(1)
	measureStandard(qc, 0)
	measureHadamard(qc, 1)
	measureStandard(qc, 2)
	measureHadamard(qc, 3)
	return getResults(qc)


