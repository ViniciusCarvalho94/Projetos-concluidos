from src.jobs import read


def get_unique_job_types(path):
    job_unique = []

    file_content = read(path)
    for line in file_content:
        if line["job_type"] not in job_unique:
            job_unique.append(line["job_type"])

    return job_unique


def filter_by_job_type(jobs, job_type):
    filter_job_type = []

    for line in jobs:
        if line["job_type"] == job_type:
            filter_job_type.append(line)

    return filter_job_type


def get_unique_industries(path):
    industries_unique = []

    file_content = read(path)
    for line in file_content:
        industry = line["industry"]
        if industry != '' and industry not in industries_unique:
            industries_unique.append(line["industry"])

    return industries_unique


def filter_by_industry(jobs, industry):
    filter_industry = []

    for line in jobs:
        if line["industry"] == industry:
            filter_industry.append(line)

    return filter_industry


def get_max_salary(path):
    max_salary = 0

    file_content = read(path)
    for line in file_content:
        salary = line["max_salary"]
        if salary != 'invalid' and salary != '' and float(salary) > max_salary:
            max_salary = float(salary)

    return max_salary


def get_min_salary(path):
    file_content = read(path)
    min_salary = float(file_content[3]["min_salary"])
    for line in file_content:
        salary = line["min_salary"]
        if salary != 'invalid' and salary != '' and float(salary) < min_salary:
            min_salary = float(salary)

    return min_salary


def matches_salary_range(job, salary):
    if "min_salary" not in job or "max_salary" not in job:
        raise ValueError

    max_salary = job["max_salary"]
    min_salary = job["min_salary"]

    if type(max_salary) is not int or type(min_salary) is not int:
        raise ValueError

    if min_salary > max_salary:
        raise ValueError

    if min_salary <= salary <= max_salary:
        return True
    return False


def filter_by_salary_range(jobs, salary):
    filter_salary_range = []

    for line in jobs:
        min_salary = line["min_salary"]
        max_salary = line["max_salary"]
        if type(salary) is int and min_salary <= salary <= max_salary:
            filter_salary_range.append(line)

    return filter_salary_range
