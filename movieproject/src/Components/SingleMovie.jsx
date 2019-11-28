import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OMDBGETimdbID from '../API/OMDB-GET-imdbID';

class SingleMovie extends Component {
  state = {
    isLoading: true
  };

  render() {
    let { movie, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='spinner-grow' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      );
    } else {
      return (
        <div className='col-4 col-sm-3 col-md-2 px-1'>
          <Link to={'/movie-detail/' + movie.imdbID}>
            <img src={movie.Poster} style={{ width: '100%' }} className='mb-2' alt={movie.Title} />
          </Link>
        </div>
      );
    }
  }

  componentDidMount = async () => {
    let movieID = this.props.movie.imdbID;
    let movie = await OMDBGETimdbID(movieID);
    this.setState({
      movie: movie,
      isLoading: false
    });
  };
}
export default SingleMovie;
