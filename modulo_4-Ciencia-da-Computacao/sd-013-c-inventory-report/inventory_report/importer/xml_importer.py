from inventory_report.importer.importer import Importer
import xml.etree.ElementTree as ET


class XmlImporter(Importer):
    def import_data(path):
        if path.endswith(".xml"):
            data = []
            read_xml = ET.parse(path).getroot()
            for product in read_xml:
                obj = {}
                for attribute in product:
                    obj[attribute.tag] = attribute.text
                data.append(obj)
            return data
        else:
            raise ValueError('Arquivo inválido')
