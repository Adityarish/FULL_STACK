import os
import subprocess

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

print("Product API: http://localhost:3000/api/products (Ctrl+C to stop)")
try:
    subprocess.run(["node", "server.js"], cwd=DIRECTORY, check=True)
except KeyboardInterrupt:
    print("\nStopped.")
