import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div data-testid="movie-card">
        <img src={ movie.imagePath } alt={ `${movie.title}` } />
        <h3>{ movie.title }</h3>
        <h4>{ movie.subtitle }</h4>
        <p>{ movie.storyline }</p>
        <p>{ movie.rating }</p>
        <Link to={ `/movies/${movie.id}` }>VER DETALHES</Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
