import pytest
from src.sorting import sort_by


def test_sort_by_criteria():
    with pytest.raises(ValueError, match="invalid sorting criteria: xablau"):
        sort_by([{"max_salary": 10, "min_salary": 0}], "xablau")
