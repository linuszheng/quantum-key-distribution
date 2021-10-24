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
	
#classical binary bitstring length n
def randomBitstring(n):
	bitstring = ""
	for i in range(n):
		x = randint(1,2)
		bitstring += "0" if x==1 else "1"
	return bitstring
	
#assigns string value (0,1,+,-) to qubit
def qubitString(vector):
	x = vector[0].real
	y = vector[1].real
	if x==1 and y==0:
		return "0"
	elif x==0 and y==1:
		return "1"
	elif y>0:
		return "+"
	elif y<0:
		return "-"
	return


# APIS to implement

sim = Aer.get_backend('aer_simulator')

# input: n
# return a, b as strings, and qubits are an array of strings
# generates a, b as random bit strings of length n, from which it generates the qubits
def generateAlice(n):
	a = randomBitstring(n)
	b = randomBitstring(n)
	qubits = [""]*n
	for i in range(n):
		q = createCircuit(1)
		if(int(a[i])==1):
			q.x(0)
		if(int(b[i])==1):
			q.h(0)
		#from measurment tutorial
		q.save_statevector()
		result = sim.run(q).result()
		vector = result.get_statevector()
		qubits[i] = qubitString(vector)
	return[a,b,qubits]
	
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


