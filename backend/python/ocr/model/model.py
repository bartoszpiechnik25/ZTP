from transformers import AutoProcessor, AutoModelForImageTextToText
import torch


class OCR:
    def __init__(self, model: str):
        self._device = "cuda" if torch.cuda_is_available() else "cpu"
        self.model = AutoModelForImageTextToText.from_pretrained(
            model, device_map=self._device
        )
        self.processor = AutoProcessor.from_pretrained(model)

    def detect_text(self, document):
        pass
