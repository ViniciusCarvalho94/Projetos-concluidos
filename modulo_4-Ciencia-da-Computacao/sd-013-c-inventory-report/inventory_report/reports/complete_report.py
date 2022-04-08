from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    def count_company(company_name_list):
        count_company = 0
        company_unique_names_list = list(dict.fromkeys(company_name_list))
        company_list = []
        for name in company_unique_names_list:
            count_company = company_name_list.count(name)
            company_list.append(dict(name=name, count=count_company))
        return company_list

    @classmethod
    def generate(cls, data):
        simple_report = SimpleReport.generate(data)
        company_name_list = []
        for company_name in data:
            company_name_list.append(company_name["nome_da_empresa"])
        company_list = cls.count_company(company_name_list)
        company_stock_list = list(
            map(
                lambda item: f'{item["name"]}: {item["count"]}',
                company_list
            )
        )
        company_string = ""
        for item in company_stock_list:
            company_string += f'- {item}\n'
        return (
            f'{simple_report}\n'
            f'Produtos estocados por empresa: \n'
            f'{company_string}'
        )
