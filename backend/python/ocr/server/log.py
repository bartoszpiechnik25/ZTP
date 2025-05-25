import logging
from rich.logging import RichHandler

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s - %(levelname)s - %(message)s",
                    handlers=[RichHandler(rich_tracebacks=True)])

logger = logging.getLogger("document-ocr")

