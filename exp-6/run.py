import os
import subprocess
import sys

DIRECTORY = os.path.dirname(os.path.abspath(__file__))


def main():
    if not os.path.isdir(os.path.join(DIRECTORY, "node_modules")):
        print("Installing dependencies...")
        subprocess.run(["npm", "install"], cwd=DIRECTORY, check=True)
    if not os.path.isfile(os.path.join(DIRECTORY, ".env")):
        sys.exit("Missing .env file with the MongoDB connection string.")
    try:
        subprocess.run(["node", "app.js"], cwd=DIRECTORY, check=True)
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
