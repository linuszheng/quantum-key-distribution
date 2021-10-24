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
