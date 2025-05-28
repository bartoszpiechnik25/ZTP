from worker.worker import Worker
from worker.config import Config


def main():
    config = Config()
    worker = Worker(config)
    worker.run()


if __name__ == "__main__":
    main()
