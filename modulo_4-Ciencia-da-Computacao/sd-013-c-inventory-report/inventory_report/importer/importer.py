from abc import ABC, abstractmethod


class Importer(ABC):
    @staticmethod
    @abstractmethod
    def read_file(cls, path):
        raise NotImplementedError
