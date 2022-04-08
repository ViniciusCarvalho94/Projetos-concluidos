from datetime import date, datetime


class SimpleReport:
    def string_to_date(date):
        return datetime.strptime(
            date,
            "%Y-%m-%d",
        ).date()

    def count_company(company_name_list):
        count_company = 0
        company_name = company_name_list[0]
        for name in company_name_list:
            count = company_name_list.count(name)
            if count > count_company:
                count_company = count
                company_name = name
        return company_name

    @classmethod
    def generate(cls, list):
        manufacturing_date_final = min(
            [date["data_de_fabricacao"] for date in list]
        )
        expiration_date_final = cls.string_to_date(
            list[0]["data_de_validade"]
        )
        company_name_list = []
        for item in list:
            company_name_list.append(item["nome_da_empresa"])
            expiration_date = cls.string_to_date(item["data_de_validade"])
            if date.today() < expiration_date < expiration_date_final:
                expiration_date_final = expiration_date

        company_name_final = cls.count_company(company_name_list)
        manufacturing_text = 'Data de fabricação mais antiga:'
        expiration_text = 'Data de validade mais próxima:'
        company_Text = 'Empresa com maior quantidade de produtos estocados:'
        return (
            f'{manufacturing_text} {manufacturing_date_final}\n'
            f'{expiration_text} {expiration_date_final}\n'
            f'{company_Text} {company_name_final}\n'
        )
