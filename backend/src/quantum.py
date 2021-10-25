from qiskit import QuantumCircuit, assemble, Aer
from random import randint

sim = Aer.get_backend('aer_simulator')

circuits = []
qubits = []
aString = ""
bString = ""
	
# classical binary bitstring length n
def randomBitstring(n):
	bitstring = ""
	for i in range(n):
		x = randint(1,2)
		bitstring += "0" if x==1 else "1"
	return bitstring
	
# assigns string value (0,1,+,-) to qubit
def qubitString(a,b):
	if a=="0" and b=="0":
		return "0"
	elif a=="1" and b=="0":
		return "1"
	elif a=="0" and b=="1":
		return "+"
	elif a=="1" and b=="1":
		return "-"

def generateQubits(n, a, b):
	qubits = [""]*n
	for i in range(n):
		q = QuantumCircuit(1,1)
		circuits.append(q)
		if(int(a[i])==1):
			q.x(0)
		if(int(b[i])==1):
			q.h(0)

		qubits[i] = qubitString(a[i],b[i])
	return qubits

def measureQubits(n, b2):
	result=[""]*n
	for i in range(n):
		q = circuits[i]
		result[i]=measureQubit(i, int(b2[i]))
	return result


# input: n
# return a, b as strings, and qubits are an array of strings
# generates a, b as random bit strings of length n, from which it generates the qubits
def generateAlice(n):
	# global qubits
	global aString, bString, qubits
	aString = randomBitstring(n)
	bString = randomBitstring(n)
	qubits = generateQubits(n, aString, bString)
	print(aString)
	print(bString)
	print(qubits)
	return {
		"a": aString,
		"b": bString,
		"qubits": qubits
	}
	
# index: the qubit to measure, basis: 0 for (0, 1), 1 for (+ , -)
# measures the qubit, returns the result as a string. 
# used for Eve's single qubit measurement
def measureQubit(index, basis):
	q = circuits[index]
	print("CIRCUIT #"+str(index))
	print("basis "+str(basis))
	# Use Hadamard gate to flip to 0,1 basis so we can measure, then flip back
	if basis==1:
		q.h(0)
		q.measure(0,0)
		q.h(0)
	else:
		q.measure(0,0)

	# for debugging purposes, see probability distribution of 100 measurements
	print(sim.run(q, shots=100).result().get_counts())
	# simulate single measurement
	result = sim.run(q, shots=1, memory=True).result()
	measuredState = result.get_memory(q)[0]
	print(measuredState)
	
	if basis==0:
		return measuredState
	else:
		return "+" if measuredState=="0" else "-"

# first randomly generate b', then measures all the qubits.
# return b' as string, measurement outcome as array of strings.
def measureBob(n): 
	b2 = randomBitstring(n)
	print(b2)
	result = measureQubits(n, b2)
	return {
		"b2": b2, 
		"result": result
	}


def sendBases(isBob):
	pass

# drop the list of indices from the state
def drop(indices, s):
	for i in reversed(range(0,len(s))):
		if i in indices:
			s = s[0:i]+s[i+1:]
	return s
	
def chooseRandomIndices(n):
	indices = []
	for i in range(int(n)):
		if(randint(0,1)==0):
			indices.append(i)
	return indices
	
def getDifferentIndices(x,y):
	indices = []
	for i in range(len(x)):
		if(x[i]!=y[i]):
			indices.append(i)
	return indices

