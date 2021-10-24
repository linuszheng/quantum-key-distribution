from flask import Flask
from qiskit import QuantumCircuit, assemble, Aer
from random import randint

app = Flask(__name__)
sim = Aer.get_backend('aer_simulator')


circuits = []
qubits = []

#get count results of circuit q
def getCounts(q):
	result = sim.run(q).result()
	counts = result.get_counts()
	return counts
	
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
		#from measurment tutorial
		q.save_statevector()
		result = sim.run(q).result()
		vector = result.get_statevector()
		qubits[i] = qubitString(vector)
	# print(a)
	# print(b)
	# print(qubits)
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
	result = sim.run(q).result()
	vector = result.get_statevector()
	# print(vector)
	# print(index)
	# print(qubits)
	# print(qubits[index])
	# print(qubitString(vector))
	if basis==1:
		q.h(0)
	q.measure(0,0)
	if basis==1:
		q.h(0)
	results = getCounts(q)
	# print(results)
	res="1"
	if len(results.keys())>1:
		res=list(results.keys())[randint(0,1)]
	elif list(results.keys())[0]=="0":
		res="0"
	if basis==0:
		return res
	else:
		return "+" if res=="1" else "-"

# first randomly generate b', then measures all the qubits.
# return b' as string, measurement outcome as array of strings.
def measureBob(n): 
	b2 = randomBitstring(n)
	result=[""]*n
	for i in range(n):
		q = circuits[i]
		result[i]=getCounts(q)[0]
	return (b2, result)


def sendBases(isBob):
	pass

# drop the list of indices from the state
def drop(indices):
	pass


