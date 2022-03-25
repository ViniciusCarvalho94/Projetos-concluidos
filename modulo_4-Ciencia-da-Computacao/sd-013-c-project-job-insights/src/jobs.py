from functools import lru_cache
import csv


@lru_cache
def read(path):
    jobs = []

    with open(path) as job_file:
        job_file_content = csv.reader(job_file)
        header, *data = job_file_content
        for line in data:
            job = {}
            for index in range(len(header)):
                job[header[index]] = line[index]
            jobs.append(job)

    return jobs
