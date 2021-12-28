import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';
import Subtitle from './Subtitle';
import Image from './Image';
import Storyline from './Storyline';

export default class AddMovie extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      title: '',
      subtitle: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { onClick } = this.props;
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form">
        <Title value={ title } handleChange={ this.handleChange } />
        <Subtitle value={ subtitle } handleChange={ this.handleChange } />
        <Image value={ imagePath } handleChange={ this.handleChange } />
        <Storyline value={ storyline } handleChange={ this.handleChange } />
        <label htmlFor="rating" data-testid="rating-input-label">
          Avaliação
          <input
            type="number"
            data-testid="rating-input"
            name="rating"
            value={ rating }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="genre" data-testid="genre-input-label">
          Gênero
          <select
            data-testid="genre-input"
            name="genre"
            value={ genre }
            onChange={ this.handleChange }
          >
            <option data-testid="genre-option" value="action">Ação</option>
            <option data-testid="genre-option" value="comedy">Comédia</option>
            <option data-testid="genre-option" value="thriller">Suspense</option>
          </select>
        </label>
        <button type="submit" data-testid="send-button" onClick={ onClick }>
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};
