# Project Overview
QUANTUM KEY DISTRIBUTION

IDEA PITCH:
Visual demonstration of how quantum key distribution (BB84 protocol) works through a live and interactive simulation.

IDEA DESCRIPTION:
	A major challenge of symmetric cryptographic schemes is safely selecting and communicating a shared "key". Our project illustrates how Quantum Computing allows us to implement secure key distribution protocols by taking advantage of qubits' tendency to "collapse" if observed by an unauthorized third agent. Our project walks through the entirety of this process, from the generation of the initial bitstrings to the final validation step. Each of these stages is also visialized through an intuitive real-time user interface.
	
A great feature of our interactive system is users' ability to choose to play as one of three entities: Alice who generates the key, Bob who receives it, and Eve who attempts to "eavesdrop" and acquire the key without being detected. By choosing the length of the key or selecting which qubits Eve should try to measure, players can discover the protocol's strengths and vulnerabilities under different conditions in a fun and engaging way.

In addition to demonstrating the functionality of the BB84 key distribution protocol, our project educates the audience about the concept of quantum measurement and the way it causes qubits to collapse to different states depending on the basis being used. It also provides a valuable connection between theoretical quantum concepts and useful real-world applications.

# Directions

I struggled with a minimal example that bootstraps a WebSocket connection
between a React client and a Flask backend.

# Running the backend

# Only required for the first time

<pre><code>
cd backend
python3 -m venv venv
. venv/bin/activate
pip3 install -r requirements.txt
</code></pre>

# Run the server

<pre><code>
./launch-server.sh
</code></pre>

# Running the frontend

# Only required for the first time

<pre><code>
cd frontend
npm install
</code></pre>

# Run the client

<pre><code>
npm start
</code></pre>

# How we used Qiskit

We used Qiskit to simulate the qubits transmitted from Alice to Bob through the "Quantum Channel" visible in our UI. More specifically, we created QuantumCircuit objects which contained quantum bits. These qubits were then modified using Pauli-X and Hadamard gates. They were also measured into classical bit registers. While we used a simulator to run our circuits, they are also compatible with real IBM quantum computers.

# What we learned

Through this project, we learned the basics of quantum computing, such as creating qubits, using quantum gates, and performing measurments with different bases. Additionally, we gained a better understanding of quantum cryptography and private key encryption. Finally, this project boosted our knowledge of the mathematical representations of qubits and the ways in which they can be manupulated using linear algebra.
