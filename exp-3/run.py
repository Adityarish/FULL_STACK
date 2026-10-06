import functools
import http.server
import os
import socketserver
import webbrowser

PORT = 8003
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


def main():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIRECTORY)
    with socketserver.TCPServer(("", PORT), handler) as server:
        url = f"http://localhost:{PORT}/"
        print(f"Serving exp-3 at {url} (Ctrl+C to stop)")
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
