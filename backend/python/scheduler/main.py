from server.server import serve
from server.config import Config


def main():
    config = Config()
    serve(config)


if __name__ == "__main__":
    main()
