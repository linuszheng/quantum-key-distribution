from flask import Flask
from qiskit import QuantumCircuit, assemble, Aer
from random import randint

app = Flask(__name__)

qc=0

def getResults():
	sim = Aer.get_backend('aer_simulator') 
	result = sim.run(qc).result()
	counts = result.get_counts()
	return counts

def measureStandard(bit):
	qc.measure(bit,bit)		# outputs measurement of qbit0 to cbit0

def measureHadamard(bit):
	qc.h(0)
	qc.measure(bit,bit)

def createCircuit(size):
	qc = QuantumCircuit(size,size)	# 2 quantum bits, 2 classical bits
	return qc

def generateRandom(size):
	for i in range(size):
		x = randint(2)
		y = randint(2)
		if x==1:
			qc.x(i)
		if y==1:
			qc.h(i)

def initializeCircuit(size):
	qc = createCircuit(int(size))
	qc.h(0)
	qc.h(1)
	measureStandard(0)
	measureHadamard(1)
	measureStandard(2)
	measureHadamard(3)
	return getResults(qc)

# APIS to implement

# input: n
# return a, b as strings, and qubits are an array of strings
# generates a, b as random bit strings of length n, from which it generates the qubits
def generateAlice(n):
    pass

# index: the qubit to measure, basis: 0 for 0, 1, 1 for + , -
# measures the qubit, returns the result as a string. 
def measureQubit(index, basis):
    pass

# first randomly generate b', then measures all the qubits.
# return b' as string, measurement outcome as array of strings.
def measureBob(): 
    pass


def sendBases(isBob):
    pass

# drop the list of indices from the state
def drop(indices):
    pass


