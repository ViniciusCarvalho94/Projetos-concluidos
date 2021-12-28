import React from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends React.Component {
  render() {
    const {
      searchText, onSearchTextChange, bookmarkedOnly,
      onBookmarkedChange, selectedGenre, onSelectedGenreChange,
    } = this.props;

    return (
      <form data-testid="search-bar-form">
        <label
          htmlFor="search"
          data-testid="text-input-label"
          onChange={ onSearchTextChange }
        >
          Inclui o texto
          <input type="text" data-testid="text-input" value={ searchText } />
        </label>

        <label htmlFor="checkbox" data-testid="checkbox-input-label">
          Mostrar somente favoritos
          <input
            type="checkbox"
            data-testid="checkbox-input"
            checked={ bookmarkedOnly }
            onChange={ onBookmarkedChange }
          />
        </label>

        <label htmlFor="select" data-testid="select-input-label">
          Filtrar por gênero
          <select
            data-testid="select-input"
            value={ selectedGenre }
            onChange={ onSelectedGenreChange }
          >
            <option data-testid="select-option" value="">Todos</option>
            <option data-testid="select-option" value="action">Ação</option>
            <option data-testid="select-option" value="comedy">Comédia</option>
            <option data-testid="select-option" value="thriller">Suspense</option>
          </select>
        </label>
      </form>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};
