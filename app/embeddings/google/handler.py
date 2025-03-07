import chromadb.utils.embedding_functions as embedding_functions
from loguru import logger


class GoogleEm:

    def __init__(self,api_key:str = ""):
        logger.info("Initialising embedding providers")
        self.ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=api_key)

    def load_emb(self):
        return self.ef

    def health_check(self) -> None:
        pass

