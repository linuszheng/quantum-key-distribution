from flask import Flask
from qiskit import QuantumCircuit, assemble, Aer
from random import randint

app = Flask(__name__)
sim = Aer.get_backend('aer_simulator')


circuits = []
qubits = []

#get count results of circuit q
#def getCounts(q):
#	result = sim.run(q).result()
#	counts = result.get_counts()
#	return counts
	
#classical binary bitstring length n
def randomBitstring(n):
	bitstring = ""
	for i in range(n):
		x = randint(1,2)
		bitstring += "0" if x==1 else "1"
	return bitstring
	
#assigns string value (0,1,+,-) to qubit
def qubitString(a,b):
	if a=="0" and b=="0":
		return "0"
	elif a=="0" and b=="1":
		return "1"
	elif a=="1" and b=="0":
		return "+"
	elif a=="1" and b=="1":
		return "-"


# APIS to implement


# input: n
# return a, b as strings, and qubits are an array of strings
# generates a, b as random bit strings of length n, from which it generates the qubits
@app.route('/generateAlice/<int:n>')
def generateAlice(n):
	# global qubits
	a = randomBitstring(n)
	b = randomBitstring(n)
	qubits = [""]*n
	for i in range(n):
		q = QuantumCircuit(1,1)
		circuits.append(q)
		if(int(a[i])==1):
			q.x(0)
		if(int(b[i])==1):
			q.h(0)

		qubits[i] = qubitString(a[i],b[i])
	print(a)
	print(b)
	print(qubits)
	return {
		"a": a,
		"b": b,
		"qubits": qubits
	}
	
# index: the qubit to measure, basis: 0 for 0, 1, 1 for + , -
# measures the qubit, returns the result as a string. 
@app.route('/measureQubit/<int:index>/<int:basis>')
def measureQubit(index, basis):
	q = circuits[index]
	print(q)
	if basis==1:
		q.h(0)
	
	q.measure(0,0)

	#my understanding is that we apply Hadamard again to return qubit back to original state after measuring in the +/- basis
	#please correct if I am wrong
	if basis==1:
		q.h(0)


	print(q)
	#run one simulation to measure
	result = sim.run(q, shots=1, memory=True).result()
	memory = result.get_memory(q)[0]
	print(memory)
	
	if basis==0:
		return memory
	else:
		return "+" if memory=="0" else "-"

# first randomly generate b', then measures all the qubits.
# return b' as string, measurement outcome as array of strings.
def measureBob(n): 
	b2 = randomBitstring(n)
	print(b2)
	result=[""]*n
	for i in range(n):
		q = circuits[i]
		result[i]=measureQubit(i, int(b2[i]))

	print(result)

	return {
		"b2": b2, 
		"result": result
	}


def sendBases(isBob):
	pass

# drop the list of indices from the state
def drop(indices, a, a2):
	for i in reversed(range(0,len(a))):
		if i in indices:
			a = a[0:i]+a[i+1:]
			a2 = a2[0:i]+a2[i+1:]
	return {
		"a": a, 
		"a2": a2
	}

#ind = [0,1]
#print(drop(ind,"aa","bb"))
#generateAlice(5)
#measureBob(5)
