import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState();
  const [text, setText] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [arrFiltered, setArrFiltered] = useState();
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filters, setFilters] = useState({});
  const [colunmFilter, setColunmFilter] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    setFilters({
      filterByName,
      filterByNumericValues,
    });
  }, [filterByName, filterByNumericValues]);

  function newColumnFilter() {
    setFilterByNumericValues([
      {
        column,
        comparison,
        value: number,
      },
    ]);
    const newFilter = colunmFilter.filter((e) => e !== column);
    setColunmFilter(newFilter);
  }

  useEffect(() => {
    if (data) {
      setArrFiltered(data.results);
    }
  }, [data]);

  function concatFilter() {
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column,
        comparison,
        value: number,
      }]);
  }

  function handleClick() {
    newColumnFilter();
    concatFilter();
    let filtered = [];
    if (comparison === 'maior que') {
      filtered = data.results.filter((e) => Number((e[column]) > Number(number)));
    } else if (comparison === 'menor que') {
      filtered = data.results.filter((e) => Number((e[column]) < Number(number)));
    } else {
      filtered = data.results.filter((e) => Number((e[column]) === number));
    }
    setArrFiltered(filtered);
  }

  useEffect(() => {
    setFilterByName({
      name: text,
    });
  }, [text]);

  useEffect(() => {
    if (data) {
      const filtered = data.results.filter(({ name }) => name.toLowerCase()
        .includes(text.toLowerCase()));
      setArrFiltered(filtered);
    }
  }, [text, data]);

  async function fetchPlanets() {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(url).then((resp) => resp.json());
    setData(response);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const obj = {
    data,
    filterByName,
    filterByNumericValues,
    filters,
    arrFiltered,
    text,
    column,
    number,
    comparison,
    colunmFilter,
    setColunmFilter,
    handleClick,
    setText,
    setColumn,
    setComparison,
    setNumber,
  };
  return (
    <PlanetsContext.Provider value={ obj }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
