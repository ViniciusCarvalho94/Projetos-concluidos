import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;

    this.state = {
      id,
      loading: true,
      movieFind: [],
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const { id } = this.state;
    const response = await movieAPI.getMovie(id);
    this.setState({
      loading: false,
      movieFind: response,
    });
  }

  delete = async () => {
    const { id } = this.state;
    await movieAPI.deleteMovie(id);
  }

  render() {
    const { id, loading, movieFind } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movieFind;
    return (
      <div data-testid="movie-details">
        {loading === true ? <Loading />
          : (
            <div>
              <img alt="Movie Cover" src={ `../${imagePath}` } />
              <p>{ `Title: ${title}` }</p>
              <p>{ `Subtitle: ${subtitle}` }</p>
              <p>{ `Storyline: ${storyline}` }</p>
              <p>{ `Genre: ${genre}` }</p>
              <p>{ `Rating: ${rating}` }</p>
              <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
              <Link to="/">VOLTAR</Link>
              <Link to="/" onClick={ this.delete }>DELETAR</Link>
            </div>
          )}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
